'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '../../../../lib/supabase';
import { adminStyles } from '../../../../components/admin/AdminStyles';
import { formatDate } from '../../../../lib/format';
import BorrowerInfoTab from '../../../../components/admin/BorrowerInfoTab';
import EntitiesTab from '../../../../components/admin/EntitiesTab';
import LoansTab from '../../../../components/admin/LoansTab';

export default function BorrowerDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [borrower, setBorrower] = useState(null);
  const [entities, setEntities] = useState([]);
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState('info');
  const [toast, setToast] = useState(null);

  const showToast = useCallback((type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 4000);
  }, []);

  const fetchBorrower = useCallback(async () => {
    setLoading(true);

    const [borrowerRes, entitiesRes, loansRes] = await Promise.all([
      supabase.from('borrowers').select('*').eq('id', id).single(),
      supabase.from('borrower_entities').select('*').eq('borrower_id', id).order('created_at', { ascending: false }),
      supabase.from('loans').select('*').eq('borrower_id', id).order('created_at', { ascending: false }),
    ]);

    if (borrowerRes.error) {
      showToast('error', 'Borrower not found');
      router.push('/admin/borrowers');
      return;
    }

    setBorrower(borrowerRes.data);
    setEntities(entitiesRes.data || []);
    setLoans(loansRes.data || []);
    setLoading(false);
  }, [id, router, showToast]);

  useEffect(() => {
    fetchBorrower();
  }, [fetchBorrower]);

  async function handleDeleteBorrower() {
    if (!confirm('Are you sure you want to delete this borrower? This action cannot be undone.')) return;

    const { error } = await supabase.from('borrowers').delete().eq('id', id);
    if (error) {
      showToast('error', `Delete failed: ${error.message}`);
      return;
    }
    router.push('/admin/borrowers');
  }

  if (loading) {
    return (
      <>
        <style>{adminStyles}</style>
        <div className="admin-loading">
          <div className="admin-spinner" />
          Loading borrower...
        </div>
      </>
    );
  }

  if (!borrower) return null;

  return (
    <>
      <style>{adminStyles}</style>
      {toast && (
        <div className={`admin-toast admin-toast-${toast.type}`}>
          {toast.message}
        </div>
      )}

      <Link href="/admin/borrowers" className="admin-back-link">
        ← Back to Borrowers
      </Link>

      <div className="admin-detail-header">
        <div>
          <h1 className="admin-detail-name">
            {borrower.first_name} {borrower.last_name}
          </h1>
          <div className="admin-detail-meta">
            {borrower.email && (
              <span>
                <a href={`mailto:${borrower.email}`}>{borrower.email}</a>
              </span>
            )}
            {borrower.phone && <span>{borrower.phone}</span>}
            <span>Added {formatDate(borrower.created_at)}</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <Link
            href={`/admin/borrowers/${id}/edit`}
            className="admin-btn admin-btn-secondary admin-btn-sm"
          >
            Edit
          </Link>
          <button
            className="admin-btn admin-btn-danger admin-btn-sm"
            onClick={handleDeleteBorrower}
          >
            Delete
          </button>
        </div>
      </div>

      <div className="admin-tabs">
        {[
          { key: 'info', label: 'Overview' },
          { key: 'entities', label: `Entities (${entities.length})` },
          { key: 'loans', label: `Loans (${loans.length})` },
        ].map((t) => (
          <button
            key={t.key}
            className={`admin-tab ${tab === t.key ? 'active' : ''}`}
            onClick={() => setTab(t.key)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'info' && <BorrowerInfoTab borrower={borrower} />}
      {tab === 'entities' && (
        <EntitiesTab
          borrowerId={id}
          entities={entities}
          onRefresh={fetchBorrower}
          showToast={showToast}
        />
      )}
      {tab === 'loans' && <LoansTab loans={loans} />}
    </>
  );
}

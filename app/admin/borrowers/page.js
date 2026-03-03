'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '../../../lib/supabase';
import { adminStyles } from '../../../components/admin/AdminStyles';
import { formatDate } from '../../../lib/format';

const PAGE_SIZE = 25;

const COLUMNS = [
  { key: 'name', label: 'Full Name' },
  { key: 'email', label: 'Email' },
  { key: 'phone', label: 'Phone' },
  { key: 'credit_score', label: 'Credit Score' },
  { key: 'experience_count', label: 'Experience' },
  { key: 'entity_count', label: 'Entities' },
  { key: 'loan_count', label: 'Loans' },
  { key: 'created_at', label: 'Created' },
];

export default function BorrowersPage() {
  const router = useRouter();
  const [borrowers, setBorrowers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState('');
  const [sortCol, setSortCol] = useState('created_at');
  const [sortDir, setSortDir] = useState(false);

  const fetchBorrowers = useCallback(async () => {
    setLoading(true);

    let query = supabase
      .from('borrowers')
      .select(`
        *,
        borrower_entities(id),
        loans(id)
      `, { count: 'exact' });

    if (search) {
      query = query.or(
        `first_name.ilike.%${search}%,last_name.ilike.%${search}%,email.ilike.%${search}%`
      );
    }

    const actualSortCol = sortCol === 'name' ? 'last_name' : sortCol;
    if (!['entity_count', 'loan_count'].includes(sortCol)) {
      query = query.order(actualSortCol, { ascending: sortDir });
    } else {
      query = query.order('created_at', { ascending: false });
    }

    query = query.range(page * PAGE_SIZE, (page + 1) * PAGE_SIZE - 1);

    const { data, error, count } = await query;

    if (error) {
      setBorrowers([]);
      setTotalCount(0);
    } else {
      let mapped = data.map((borrower) => ({
        ...borrower,
        entity_count: borrower.borrower_entities?.length || 0,
        loan_count: borrower.loans?.length || 0,
      }));

      if (sortCol === 'entity_count' || sortCol === 'loan_count') {
        mapped.sort((a, b) => sortDir
          ? a[sortCol] - b[sortCol]
          : b[sortCol] - a[sortCol]
        );
      }

      setBorrowers(mapped);
      setTotalCount(count || 0);
    }

    setLoading(false);
  }, [search, sortCol, sortDir, page]);

  useEffect(() => {
    fetchBorrowers();
  }, [fetchBorrowers]);

  function handleSort(col) {
    if (sortCol === col) {
      setSortDir(!sortDir);
    } else {
      setSortCol(col);
      setSortDir(true);
    }
    setPage(0);
  }

  function handleSearch(value) {
    setSearch(value);
    setPage(0);
  }

  const totalPages = Math.ceil(totalCount / PAGE_SIZE);
  const startRow = page * PAGE_SIZE + 1;
  const endRow = Math.min((page + 1) * PAGE_SIZE, totalCount);

  return (
    <>
      <style>{adminStyles}</style>

      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">
            <em>Borrowers</em>
          </h1>
          <p className="admin-page-subtitle">
            {totalCount} total borrower{totalCount !== 1 ? 's' : ''}
          </p>
        </div>
        <Link href="/admin/borrowers/new" className="admin-btn admin-btn-primary">
          + Add Borrower
        </Link>
      </div>

      <div className="admin-search-bar">
        <input
          type="text"
          className="admin-search-input"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      <div className="admin-table-wrap">
        {loading ? (
          <div className="admin-loading">
            <div className="admin-spinner" />
            Loading borrowers...
          </div>
        ) : borrowers.length === 0 ? (
          <div className="admin-empty">
            <div className="admin-empty-icon">&#128100;</div>
            <h3>{search ? 'No results found' : 'No borrowers yet'}</h3>
            <p>
              {search
                ? 'Try adjusting your search.'
                : 'Add your first borrower to get started.'}
            </p>
            {!search && (
              <Link href="/admin/borrowers/new" className="admin-btn admin-btn-primary">
                + Add Borrower
              </Link>
            )}
          </div>
        ) : (
          <>
            <table className="admin-table">
              <thead>
                <tr>
                  {COLUMNS.map((col) => (
                    <th
                      key={col.key}
                      className={sortCol === col.key ? 'sorted' : ''}
                      onClick={() => handleSort(col.key)}
                    >
                      {col.label}
                      {sortCol === col.key && (
                        <span style={{ marginLeft: 4 }}>
                          {sortDir ? '▲' : '▼'}
                        </span>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {borrowers.map((borrower) => (
                  <tr
                    key={borrower.id}
                    className="admin-table-row-link"
                    onClick={() => router.push(`/admin/borrowers/${borrower.id}`)}
                  >
                    <td style={{ color: '#fff', fontWeight: 500 }}>
                      {borrower.first_name} {borrower.last_name}
                    </td>
                    <td>{borrower.email || '—'}</td>
                    <td>{borrower.phone || '—'}</td>
                    <td>
                      {borrower.credit_score ? (
                        <span className={`admin-badge ${borrower.credit_score >= 700 ? 'admin-badge-gold' : 'admin-badge-blue'}`}>
                          {borrower.credit_score}
                        </span>
                      ) : '—'}
                    </td>
                    <td>{borrower.experience_count}</td>
                    <td>{borrower.entity_count}</td>
                    <td>{borrower.loan_count}</td>
                    <td>{formatDate(borrower.created_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {totalPages > 1 && (
              <div className="admin-pagination">
                <span className="admin-pagination-info">
                  Showing {startRow}–{endRow} of {totalCount}
                </span>
                <div className="admin-pagination-btns">
                  <button
                    className="admin-pagination-btn"
                    disabled={page === 0}
                    onClick={() => setPage(page - 1)}
                  >
                    Previous
                  </button>
                  <button
                    className="admin-pagination-btn"
                    disabled={page >= totalPages - 1}
                    onClick={() => setPage(page + 1)}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '../../../../../lib/supabase';
import { adminStyles } from '../../../../../components/admin/AdminStyles';
import { formatPhone, formatSSNLastFour, US_STATES } from '../../../../../lib/format';

export default function EditBorrowerPage() {
  const { id } = useParams();
  const router = useRouter();
  const [form, setForm] = useState(null);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    async function load() {
      const { data, error } = await supabase
        .from('borrowers')
        .select('*')
        .eq('id', id)
        .single();

      if (error || !data) {
        router.push('/admin/borrowers');
        return;
      }

      setForm({
        first_name: data.first_name || '',
        last_name: data.last_name || '',
        email: data.email || '',
        phone: data.phone || '',
        address_line1: data.address_line1 || '',
        address_line2: data.address_line2 || '',
        city: data.city || '',
        state: data.state || '',
        zip: data.zip || '',
        country: data.country || 'US',
        ssn_last_four: data.ssn_last_four || '',
        date_of_birth: data.date_of_birth || '',
        is_us_citizen: data.is_us_citizen ?? true,
        credit_score: data.credit_score ?? '',
        credit_report_date: data.credit_report_date || '',
        experience_count: data.experience_count ?? 0,
        notes: data.notes || '',
      });
      setLoading(false);
    }
    load();
  }, [id, router]);

  function updateField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: null }));
  }

  function validate() {
    const newErrors = {};
    if (!form.first_name.trim()) newErrors.first_name = 'First name is required';
    if (!form.last_name.trim()) newErrors.last_name = 'Last name is required';
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Enter a valid email';
    }
    if (form.ssn_last_four && form.ssn_last_four.length !== 4) {
      newErrors.ssn_last_four = 'Must be exactly 4 digits';
    }
    if (form.credit_score && (form.credit_score < 300 || form.credit_score > 850)) {
      newErrors.credit_score = 'Must be between 300 and 850';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    setSaving(true);
    const payload = { ...form };

    Object.keys(payload).forEach((key) => {
      if (typeof payload[key] === 'string' && payload[key].trim() === '') {
        payload[key] = null;
      }
    });

    if (payload.credit_score) payload.credit_score = parseInt(payload.credit_score, 10);
    if (payload.experience_count) payload.experience_count = parseInt(payload.experience_count, 10);

    payload.first_name = form.first_name.trim();
    payload.last_name = form.last_name.trim();

    const { error } = await supabase
      .from('borrowers')
      .update(payload)
      .eq('id', id);

    setSaving(false);

    if (error) {
      setToast({ type: 'error', message: `Update failed: ${error.message}` });
      setTimeout(() => setToast(null), 4000);
      return;
    }

    router.push(`/admin/borrowers/${id}`);
  }

  if (loading || !form) {
    return (
      <>
        <style>{adminStyles}</style>
        <div className="admin-loading">
          <div className="admin-spinner" />
          Loading...
        </div>
      </>
    );
  }

  return (
    <>
      <style>{adminStyles}</style>
      {toast && (
        <div className={`admin-toast admin-toast-${toast.type}`}>
          {toast.message}
        </div>
      )}

      <Link href={`/admin/borrowers/${id}`} className="admin-back-link">
        ← Back to Borrower
      </Link>

      <div className="admin-page-header">
        <h1 className="admin-page-title">
          Edit <em>{form.first_name} {form.last_name}</em>
        </h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="admin-form-card">
          <h3>Personal Information</h3>
          <p>Update contact and identity details.</p>
          <div className="admin-form-grid">
            <div className="admin-field">
              <label className="admin-label">
                First Name <span className="required">*</span>
              </label>
              <input
                className="admin-input"
                type="text"
                value={form.first_name}
                onChange={(e) => updateField('first_name', e.target.value)}
              />
              {errors.first_name && <span className="admin-field-error">{errors.first_name}</span>}
            </div>
            <div className="admin-field">
              <label className="admin-label">
                Last Name <span className="required">*</span>
              </label>
              <input
                className="admin-input"
                type="text"
                value={form.last_name}
                onChange={(e) => updateField('last_name', e.target.value)}
              />
              {errors.last_name && <span className="admin-field-error">{errors.last_name}</span>}
            </div>
            <div className="admin-field">
              <label className="admin-label">Email</label>
              <input
                className="admin-input"
                type="email"
                value={form.email}
                onChange={(e) => updateField('email', e.target.value)}
              />
              {errors.email && <span className="admin-field-error">{errors.email}</span>}
            </div>
            <div className="admin-field">
              <label className="admin-label">Phone</label>
              <input
                className="admin-input"
                type="tel"
                value={form.phone}
                onChange={(e) => updateField('phone', formatPhone(e.target.value))}
              />
            </div>
            <div className="admin-field">
              <label className="admin-label">Date of Birth</label>
              <input
                className="admin-input"
                type="date"
                value={form.date_of_birth}
                onChange={(e) => updateField('date_of_birth', e.target.value)}
              />
            </div>
            <div className="admin-field">
              <label className="admin-label">SSN Last 4</label>
              <input
                className="admin-input"
                type="text"
                maxLength={4}
                value={form.ssn_last_four}
                onChange={(e) => updateField('ssn_last_four', formatSSNLastFour(e.target.value))}
              />
              {errors.ssn_last_four && <span className="admin-field-error">{errors.ssn_last_four}</span>}
            </div>
            <div className="admin-field admin-form-full">
              <div className="admin-checkbox-group">
                <input
                  type="checkbox"
                  className="admin-checkbox"
                  id="edit_is_us_citizen"
                  checked={form.is_us_citizen}
                  onChange={(e) => updateField('is_us_citizen', e.target.checked)}
                />
                <label htmlFor="edit_is_us_citizen" className="admin-checkbox-label">
                  U.S. Citizen or Permanent Resident
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="admin-form-card">
          <h3>Mailing Address</h3>
          <p>Update the borrower&apos;s mailing address.</p>
          <div className="admin-form-grid">
            <div className="admin-field admin-form-full">
              <label className="admin-label">Address Line 1</label>
              <input
                className="admin-input"
                type="text"
                value={form.address_line1}
                onChange={(e) => updateField('address_line1', e.target.value)}
              />
            </div>
            <div className="admin-field admin-form-full">
              <label className="admin-label">Address Line 2</label>
              <input
                className="admin-input"
                type="text"
                value={form.address_line2}
                onChange={(e) => updateField('address_line2', e.target.value)}
              />
            </div>
            <div className="admin-field">
              <label className="admin-label">City</label>
              <input
                className="admin-input"
                type="text"
                value={form.city}
                onChange={(e) => updateField('city', e.target.value)}
              />
            </div>
            <div className="admin-field">
              <label className="admin-label">State</label>
              <select
                className="admin-input"
                value={form.state}
                onChange={(e) => updateField('state', e.target.value)}
              >
                <option value="">Select state</option>
                {US_STATES.map((st) => (
                  <option key={st} value={st}>{st}</option>
                ))}
              </select>
            </div>
            <div className="admin-field">
              <label className="admin-label">ZIP Code</label>
              <input
                className="admin-input"
                type="text"
                value={form.zip}
                onChange={(e) => updateField('zip', e.target.value)}
              />
            </div>
            <div className="admin-field">
              <label className="admin-label">Country</label>
              <input
                className="admin-input"
                type="text"
                value={form.country}
                onChange={(e) => updateField('country', e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="admin-form-card">
          <h3>Credit & Experience</h3>
          <p>Financial profile and lending history.</p>
          <div className="admin-form-grid">
            <div className="admin-field">
              <label className="admin-label">Credit Score</label>
              <input
                className="admin-input"
                type="number"
                min="300"
                max="850"
                value={form.credit_score}
                onChange={(e) => updateField('credit_score', e.target.value)}
              />
              {errors.credit_score && <span className="admin-field-error">{errors.credit_score}</span>}
            </div>
            <div className="admin-field">
              <label className="admin-label">Credit Report Date</label>
              <input
                className="admin-input"
                type="date"
                value={form.credit_report_date}
                onChange={(e) => updateField('credit_report_date', e.target.value)}
              />
            </div>
            <div className="admin-field">
              <label className="admin-label">Experience (# of Deals)</label>
              <input
                className="admin-input"
                type="number"
                min="0"
                value={form.experience_count}
                onChange={(e) => updateField('experience_count', e.target.value)}
              />
            </div>
            <div className="admin-field admin-form-full">
              <label className="admin-label">Notes</label>
              <textarea
                className="admin-textarea"
                value={form.notes}
                onChange={(e) => updateField('notes', e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="admin-form-actions" style={{ borderTop: 'none', paddingTop: 0 }}>
          <Link
            href={`/admin/borrowers/${id}`}
            className="admin-btn admin-btn-secondary"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="admin-btn admin-btn-primary"
            disabled={saving}
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </>
  );
}

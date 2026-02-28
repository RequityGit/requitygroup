'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '../../../../lib/supabase';
import { adminStyles } from '../../../../components/admin/AdminStyles';
import { formatPhone, formatSSNLastFour, US_STATES } from '../../../../lib/format';

const INITIAL_FORM = {
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  address_line1: '',
  address_line2: '',
  city: '',
  state: '',
  zip: '',
  country: 'US',
  ssn_last_four: '',
  date_of_birth: '',
  is_us_citizen: true,
  credit_score: '',
  credit_report_date: '',
  experience_count: 0,
  notes: '',
};

export default function NewBorrowerPage() {
  const router = useRouter();
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);
  const [step, setStep] = useState(1);

  function updateField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
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
    if (form.zip && !/^\d{5}(-\d{4})?$/.test(form.zip)) {
      newErrors.zip = 'Enter a valid ZIP code';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) {
      const firstErrorStep = errors.first_name || errors.last_name ? 1 :
        errors.email || errors.ssn_last_four ? 1 : 2;
      setStep(firstErrorStep);
      return;
    }

    setSaving(true);
    const payload = { ...form };

    // Clean up empty strings to null
    Object.keys(payload).forEach((key) => {
      if (typeof payload[key] === 'string' && payload[key].trim() === '') {
        payload[key] = null;
      }
    });

    // Convert numeric fields
    if (payload.credit_score) payload.credit_score = parseInt(payload.credit_score, 10);
    if (payload.experience_count) payload.experience_count = parseInt(payload.experience_count, 10);

    // first_name and last_name must not be null
    payload.first_name = form.first_name.trim();
    payload.last_name = form.last_name.trim();

    const { data, error } = await supabase
      .from('borrowers')
      .insert([payload])
      .select()
      .single();

    setSaving(false);

    if (error) {
      setToast({ type: 'error', message: `Failed to save: ${error.message}` });
      setTimeout(() => setToast(null), 4000);
      return;
    }

    router.push(`/admin/borrowers/${data.id}`);
  }

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

      <div className="admin-page-header">
        <h1 className="admin-page-title">
          Add <em>Borrower</em>
        </h1>
      </div>

      {/* Step indicators */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 32 }}>
        {[
          { num: 1, label: 'Personal Info' },
          { num: 2, label: 'Address & Details' },
          { num: 3, label: 'Credit & Experience' },
        ].map((s) => (
          <button
            key={s.num}
            onClick={() => setStep(s.num)}
            style={{
              flex: 1,
              padding: '12px 16px',
              background: step === s.num ? 'rgba(198,169,98,0.1)' : 'rgba(255,255,255,0.03)',
              border: `1px solid ${step === s.num ? 'rgba(198,169,98,0.3)' : 'rgba(255,255,255,0.06)'}`,
              borderRadius: 8,
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'all 0.2s',
            }}
          >
            <span style={{
              display: 'block',
              fontSize: 11,
              fontWeight: 700,
              color: step === s.num ? 'var(--champagne)' : 'rgba(255,255,255,0.3)',
              marginBottom: 2,
            }}>
              STEP {s.num}
            </span>
            <span style={{
              fontSize: 13,
              fontWeight: 500,
              color: step === s.num ? '#fff' : 'rgba(255,255,255,0.5)',
            }}>
              {s.label}
            </span>
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        {/* Step 1: Personal Information */}
        {step === 1 && (
          <div className="admin-form-card">
            <h3>Personal Information</h3>
            <p>Basic contact details for the borrower.</p>

            <div className="admin-form-grid">
              <div className="admin-field">
                <label className="admin-label">
                  First Name <span className="required">*</span>
                </label>
                <input
                  className="admin-input"
                  type="text"
                  placeholder="John"
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
                  placeholder="Smith"
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
                  placeholder="john@example.com"
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
                  placeholder="(555) 123-4567"
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
                  placeholder="1234"
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
                    id="is_us_citizen"
                    checked={form.is_us_citizen}
                    onChange={(e) => updateField('is_us_citizen', e.target.checked)}
                  />
                  <label htmlFor="is_us_citizen" className="admin-checkbox-label">
                    U.S. Citizen or Permanent Resident
                  </label>
                </div>
              </div>
            </div>

            <div className="admin-form-actions">
              <Link href="/admin/borrowers" className="admin-btn admin-btn-secondary">
                Cancel
              </Link>
              <button
                type="button"
                className="admin-btn admin-btn-primary"
                onClick={() => setStep(2)}
              >
                Next: Address →
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Address */}
        {step === 2 && (
          <div className="admin-form-card">
            <h3>Mailing Address</h3>
            <p>Borrower&apos;s primary mailing address.</p>

            <div className="admin-form-grid">
              <div className="admin-field admin-form-full">
                <label className="admin-label">Address Line 1</label>
                <input
                  className="admin-input"
                  type="text"
                  placeholder="123 Main Street"
                  value={form.address_line1}
                  onChange={(e) => updateField('address_line1', e.target.value)}
                />
              </div>
              <div className="admin-field admin-form-full">
                <label className="admin-label">Address Line 2</label>
                <input
                  className="admin-input"
                  type="text"
                  placeholder="Suite 100"
                  value={form.address_line2}
                  onChange={(e) => updateField('address_line2', e.target.value)}
                />
              </div>
              <div className="admin-field">
                <label className="admin-label">City</label>
                <input
                  className="admin-input"
                  type="text"
                  placeholder="Dallas"
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
                  placeholder="75201"
                  value={form.zip}
                  onChange={(e) => updateField('zip', e.target.value)}
                />
                {errors.zip && <span className="admin-field-error">{errors.zip}</span>}
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

            <div className="admin-form-actions">
              <button
                type="button"
                className="admin-btn admin-btn-secondary"
                onClick={() => setStep(1)}
              >
                ← Back
              </button>
              <button
                type="button"
                className="admin-btn admin-btn-primary"
                onClick={() => setStep(3)}
              >
                Next: Credit →
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Credit & Experience */}
        {step === 3 && (
          <div className="admin-form-card">
            <h3>Credit & Experience</h3>
            <p>Financial profile and lending experience.</p>

            <div className="admin-form-grid">
              <div className="admin-field">
                <label className="admin-label">Credit Score</label>
                <input
                  className="admin-input"
                  type="number"
                  min="300"
                  max="850"
                  placeholder="720"
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
                  placeholder="0"
                  value={form.experience_count}
                  onChange={(e) => updateField('experience_count', e.target.value)}
                />
              </div>
              <div className="admin-field admin-form-full">
                <label className="admin-label">Notes</label>
                <textarea
                  className="admin-textarea"
                  placeholder="Internal notes about this borrower..."
                  value={form.notes}
                  onChange={(e) => updateField('notes', e.target.value)}
                />
              </div>
            </div>

            <div className="admin-form-actions">
              <button
                type="button"
                className="admin-btn admin-btn-secondary"
                onClick={() => setStep(2)}
              >
                ← Back
              </button>
              <button
                type="submit"
                className="admin-btn admin-btn-primary"
                disabled={saving}
              >
                {saving ? 'Saving...' : 'Create Borrower'}
              </button>
            </div>
          </div>
        )}
      </form>
    </>
  );
}

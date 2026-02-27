'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

/* ─── Loan Programs ─── */
const LOAN_TYPES = [
  {
    id: 'CRE Bridge',
    label: 'CRE Bridge',
    desc: 'Short-term bridge financing for commercial real estate acquisitions and refinances.',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 34h28" />
        <path d="M8 34V18l12-8 12 8v16" />
        <path d="M16 34v-8h8v8" />
        <rect x="14" y="20" width="4" height="4" />
        <rect x="22" y="20" width="4" height="4" />
      </svg>
    ),
  },
  {
    id: 'Manufactured Housing',
    label: 'Manufactured Housing',
    desc: 'Financing for manufactured housing communities and park acquisitions.',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="16" width="32" height="16" rx="2" />
        <path d="M4 22h32" />
        <path d="M10 16V12h6v4" />
        <circle cx="12" cy="32" r="2" />
        <circle cx="28" cy="32" r="2" />
        <path d="M20 22v10" />
      </svg>
    ),
  },
  {
    id: 'RV Park',
    label: 'RV Park',
    desc: 'Capital for RV parks, campgrounds, and outdoor hospitality properties.',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 30l12-18 12 18" />
        <path d="M14 30l6-9 6 9" />
        <path d="M20 12V8" />
        <path d="M4 30h32" />
        <path d="M18 30v-4h4v4" />
      </svg>
    ),
  },
  {
    id: 'Multifamily',
    label: 'Multifamily',
    desc: 'Financing for apartment buildings and multifamily residential properties.',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="6" y="8" width="28" height="26" />
        <path d="M6 16h28" />
        <path d="M6 24h28" />
        <path d="M16 8v26" />
        <path d="M26 8v26" />
        <path d="M18 34v-4h4v4" />
      </svg>
    ),
  },
  {
    id: 'Fix & Flip',
    label: 'Fix & Flip',
    desc: 'Short-term loans for residential property renovation and resale.',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 6l14 12H6L20 6z" />
        <rect x="10" y="18" width="20" height="16" />
        <rect x="16" y="24" width="8" height="10" />
        <path d="M30 14l4-4M34 10l-3 1 2 2-1 3" />
      </svg>
    ),
  },
  {
    id: 'DSCR Rental',
    label: 'DSCR Rental',
    desc: 'Long-term rental property loans based on property cash flow, not personal income.',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="8" y="6" width="24" height="28" rx="2" />
        <path d="M14 14h12" />
        <path d="M14 20h12" />
        <path d="M14 26h8" />
        <path d="M20 6V2" />
        <circle cx="30" cy="30" r="6" fill="var(--navy-deep)" />
        <path d="M30 27v6M28 30h4" />
      </svg>
    ),
  },
  {
    id: 'New Construction',
    label: 'New Construction',
    desc: 'Ground-up construction financing for residential and commercial projects.',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 34V14h16v20" />
        <path d="M10 34h24" />
        <path d="M18 20h8" />
        <path d="M18 26h8" />
        <path d="M22 14V6l-8 8" />
        <path d="M6 34l4-10" />
        <path d="M8 24v10" />
      </svg>
    ),
  },
];

const US_STATES = [
  'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD',
  'MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC',
  'SD','TN','TX','UT','VT','VA','WA','WV','WI','WY',
];

const EXIT_STRATEGIES = [
  'Refinance — Permanent Loan',
  'Refinance — Agency Loan',
  'Sell / Disposition',
  'Refinance — Other Bridge',
  'Hold Long-Term',
  'Other',
];

const TIMELINES = [
  'Immediate — Under Contract',
  'Within 30 Days',
  '30–60 Days',
  '60–90 Days',
  '90+ Days',
  'Just Exploring Options',
];

const EXPERIENCE_LEVELS = [
  'First-Time Investor',
  '1–3 Deals Completed',
  '4–10 Deals Completed',
  '10–25 Deals Completed',
  '25+ Deals Completed',
  'Institutional / Fund',
];

/* ─── Helpers ─── */
function formatPhone(value) {
  const digits = value.replace(/\D/g, '').slice(0, 10);
  if (digits.length === 0) return '';
  if (digits.length <= 3) return `(${digits}`;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

function formatCurrency(value) {
  const digits = value.replace(/\D/g, '');
  if (!digits) return '';
  return '$' + parseInt(digits).toLocaleString('en-US');
}

/* ─── Component ─── */
export default function ApplyPage() {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const formRef = useRef(null);

  const [form, setForm] = useState({
    loanType: '',
    propertyAddress: '',
    city: '',
    state: '',
    purchasePrice: '',
    loanAmount: '',
    unitsOrLots: '',
    rehabBudget: '',
    exitStrategy: '',
    timeline: '',
    additionalNotes: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    experienceLevel: '',
  });

  const set = (field) => (e) => {
    let value = e.target.value;
    if (field === 'phone') value = formatPhone(value);
    if (['purchasePrice', 'loanAmount', 'rehabBudget'].includes(field)) value = formatCurrency(value);
    setForm((prev) => ({ ...prev, [field]: value }));
    setError('');
  };

  const selectLoanType = (id) => {
    setForm((prev) => ({ ...prev, loanType: id }));
    setError('');
  };

  const showRehab = ['Fix & Flip', 'New Construction', 'CRE Bridge'].includes(form.loanType);
  const rehabLabel = form.loanType === 'New Construction' ? 'Construction Budget' : form.loanType === 'Fix & Flip' ? 'Rehab Budget' : 'Rehab / Renovation Budget';
  const unitsLabel = ['Manufactured Housing', 'RV Park', 'Multifamily'].includes(form.loanType) ? 'Number of Units' : 'Number of Units / Lots';

  function validateStep() {
    if (step === 1 && !form.loanType) return 'Please select a loan program.';
    if (step === 2) {
      if (!form.loanAmount) return 'Please enter the loan amount requested.';
    }
    if (step === 3) {
      if (!form.firstName) return 'Please enter your first name.';
      if (!form.lastName) return 'Please enter your last name.';
      if (!form.email) return 'Please enter your email address.';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return 'Please enter a valid email address.';
      if (!form.phone || form.phone.replace(/\D/g, '').length < 10) return 'Please enter a valid phone number.';
      if (!form.experienceLevel) return 'Please select your experience level.';
    }
    return '';
  }

  function goNext() {
    const err = validateStep();
    if (err) { setError(err); return; }
    setDirection(1);
    setStep((s) => Math.min(s + 1, 3));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function goBack() {
    setDirection(-1);
    setStep((s) => Math.max(s - 1, 1));
    setError('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function handleSubmit() {
    const err = validateStep();
    if (err) { setError(err); return; }

    setSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/loan-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Submission failed');
      setSubmitted(true);
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  /* ─── Success Screen ─── */
  if (submitted) {
    return (
      <div className="apply-page">
        <style>{applyStyles}</style>
        <Header />
        <div className="apply-container">
          <div className="success-card">
            <div className="success-icon">
              <svg viewBox="0 0 48 48" fill="none" stroke="var(--champagne)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="24" cy="24" r="20" />
                <path d="M15 24l6 6 12-12" />
              </svg>
            </div>
            <h2>Loan Request Submitted</h2>
            <p>Thank you, {form.firstName}. Our lending team will review your <strong>{form.loanType}</strong> request and reach out within 24 hours.</p>
            <div className="success-details">
              <div className="success-detail-row">
                <span>Loan Amount</span>
                <strong>{form.loanAmount}</strong>
              </div>
              {form.city && (
                <div className="success-detail-row">
                  <span>Location</span>
                  <strong>{form.city}{form.state ? `, ${form.state}` : ''}</strong>
                </div>
              )}
            </div>
            <div className="success-trust">
              <div className="trust-item"><span className="trust-icon">&#9743;</span> We&apos;ll call you at {form.phone}</div>
              <div className="trust-item"><span className="trust-icon">&#9993;</span> Confirmation sent to {form.email}</div>
            </div>
            <Link href="/" className="btn-back-home">Back to Home</Link>
          </div>
        </div>
      </div>
    );
  }

  /* ─── Form ─── */
  return (
    <div className="apply-page">
      <style>{applyStyles}</style>
      <Header />

      {/* Trust Bar */}
      <div className="trust-bar">
        <div className="trust-bar-inner">
          <div className="trust-badge">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
            No Credit Pull Required
          </div>
          <div className="trust-badge">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
            24hr Turnaround
          </div>
          <div className="trust-badge">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" /></svg>
            <a href="tel:+18133275180">813.327.5180</a>
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="progress-section">
        <div className="progress-bar-track">
          <div className="progress-bar-fill" style={{ width: `${(step / 3) * 100}%` }} />
        </div>
        <div className="progress-steps">
          {['Loan Type', 'Deal Details', 'Contact Info'].map((label, i) => (
            <div key={label} className={`progress-step ${step > i + 1 ? 'completed' : ''} ${step === i + 1 ? 'active' : ''}`}>
              <div className="progress-dot">
                {step > i + 1 ? (
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 8l3 3 5-5" /></svg>
                ) : (
                  <span>{i + 1}</span>
                )}
              </div>
              <span className="progress-label">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Form Content */}
      <div className="apply-container" ref={formRef}>
        <div className={`step-wrapper step-enter-${direction > 0 ? 'right' : 'left'}`} key={step}>

          {/* Step 1 — Loan Type */}
          {step === 1 && (
            <div className="step-content">
              <div className="step-header">
                <h1>Select Your Loan Program</h1>
                <p>Choose the financing product that best matches your deal.</p>
              </div>
              <div className="loan-type-grid">
                {LOAN_TYPES.map((lt) => (
                  <button
                    key={lt.id}
                    type="button"
                    className={`loan-type-card ${form.loanType === lt.id ? 'selected' : ''}`}
                    onClick={() => selectLoanType(lt.id)}
                  >
                    <div className="lt-icon">{lt.icon}</div>
                    <div className="lt-label">{lt.label}</div>
                    <div className="lt-desc">{lt.desc}</div>
                    {form.loanType === lt.id && (
                      <div className="lt-check">
                        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8l4 4 6-6" /></svg>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2 — Deal Details */}
          {step === 2 && (
            <div className="step-content">
              <div className="step-header">
                <h1>Deal Details</h1>
                <p>Tell us about the property and your financing needs.</p>
              </div>
              <div className="form-grid">
                <div className="form-group full">
                  <label>Property Address</label>
                  <input type="text" placeholder="123 Main Street" value={form.propertyAddress} onChange={set('propertyAddress')} />
                </div>
                <div className="form-group">
                  <label>City</label>
                  <input type="text" placeholder="Tampa" value={form.city} onChange={set('city')} />
                </div>
                <div className="form-group">
                  <label>State</label>
                  <select value={form.state} onChange={set('state')}>
                    <option value="">Select State</option>
                    {US_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label>Purchase Price / Current Value</label>
                  <input type="text" placeholder="$0" value={form.purchasePrice} onChange={set('purchasePrice')} />
                </div>
                <div className="form-group">
                  <label>Loan Amount Requested <span className="required">*</span></label>
                  <input type="text" placeholder="$0" value={form.loanAmount} onChange={set('loanAmount')} />
                </div>
                <div className="form-group">
                  <label>{unitsLabel}</label>
                  <input type="text" placeholder="e.g. 24" value={form.unitsOrLots} onChange={set('unitsOrLots')} />
                </div>
                {showRehab && (
                  <div className="form-group">
                    <label>{rehabLabel}</label>
                    <input type="text" placeholder="$0" value={form.rehabBudget} onChange={set('rehabBudget')} />
                  </div>
                )}
                <div className="form-group">
                  <label>Exit Strategy</label>
                  <select value={form.exitStrategy} onChange={set('exitStrategy')}>
                    <option value="">Select Exit Strategy</option>
                    {EXIT_STRATEGIES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label>Timeline to Close</label>
                  <select value={form.timeline} onChange={set('timeline')}>
                    <option value="">Select Timeline</option>
                    {TIMELINES.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div className="form-group full">
                  <label>Additional Notes</label>
                  <textarea rows={4} placeholder="Any other details about the deal..." value={form.additionalNotes} onChange={set('additionalNotes')} />
                </div>
              </div>
            </div>
          )}

          {/* Step 3 — Contact Info */}
          {step === 3 && (
            <div className="step-content">
              <div className="step-header">
                <h1>Contact Information</h1>
                <p>Let us know how to reach you.</p>
              </div>
              <div className="step3-layout">
                <div className="form-grid">
                  <div className="form-group">
                    <label>First Name <span className="required">*</span></label>
                    <input type="text" placeholder="John" value={form.firstName} onChange={set('firstName')} />
                  </div>
                  <div className="form-group">
                    <label>Last Name <span className="required">*</span></label>
                    <input type="text" placeholder="Smith" value={form.lastName} onChange={set('lastName')} />
                  </div>
                  <div className="form-group">
                    <label>Email <span className="required">*</span></label>
                    <input type="email" placeholder="john@company.com" value={form.email} onChange={set('email')} />
                  </div>
                  <div className="form-group">
                    <label>Phone <span className="required">*</span></label>
                    <input type="tel" placeholder="(813) 327-5180" value={form.phone} onChange={set('phone')} />
                  </div>
                  <div className="form-group">
                    <label>Company <span className="optional">(Optional)</span></label>
                    <input type="text" placeholder="Company Name" value={form.company} onChange={set('company')} />
                  </div>
                  <div className="form-group">
                    <label>Real Estate Experience <span className="required">*</span></label>
                    <select value={form.experienceLevel} onChange={set('experienceLevel')}>
                      <option value="">Select Experience Level</option>
                      {EXPERIENCE_LEVELS.map((l) => <option key={l} value={l}>{l}</option>)}
                    </select>
                  </div>
                </div>

                {/* Live Deal Summary */}
                <div className="deal-summary">
                  <div className="deal-summary-header">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" /></svg>
                    Deal Summary
                  </div>
                  <div className="deal-summary-body">
                    <div className="ds-row">
                      <span>Loan Program</span>
                      <strong>{form.loanType || '—'}</strong>
                    </div>
                    {form.loanAmount && (
                      <div className="ds-row highlight">
                        <span>Loan Amount</span>
                        <strong>{form.loanAmount}</strong>
                      </div>
                    )}
                    {form.purchasePrice && (
                      <div className="ds-row">
                        <span>Purchase Price</span>
                        <strong>{form.purchasePrice}</strong>
                      </div>
                    )}
                    {form.city && (
                      <div className="ds-row">
                        <span>Location</span>
                        <strong>{form.city}{form.state ? `, ${form.state}` : ''}</strong>
                      </div>
                    )}
                    {form.unitsOrLots && (
                      <div className="ds-row">
                        <span>{unitsLabel}</span>
                        <strong>{form.unitsOrLots}</strong>
                      </div>
                    )}
                    {showRehab && form.rehabBudget && (
                      <div className="ds-row">
                        <span>{rehabLabel}</span>
                        <strong>{form.rehabBudget}</strong>
                      </div>
                    )}
                    {form.exitStrategy && (
                      <div className="ds-row">
                        <span>Exit Strategy</span>
                        <strong>{form.exitStrategy}</strong>
                      </div>
                    )}
                    {form.timeline && (
                      <div className="ds-row">
                        <span>Timeline</span>
                        <strong>{form.timeline}</strong>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Error */}
        {error && (
          <div className="form-error">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M12 8v4M12 16h.01" /></svg>
            {error}
          </div>
        )}

        {/* Navigation */}
        <div className="form-nav">
          {step > 1 ? (
            <button type="button" className="btn-back" onClick={goBack}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M13 8H3M7 4L3 8l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              Back
            </button>
          ) : (
            <Link href="/" className="btn-back">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M13 8H3M7 4L3 8l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              Home
            </Link>
          )}
          {step < 3 ? (
            <button type="button" className="btn-next" onClick={goNext}>
              Continue
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          ) : (
            <button type="button" className="btn-submit" onClick={handleSubmit} disabled={submitting}>
              {submitting ? (
                <>
                  <span className="spinner" />
                  Submitting...
                </>
              ) : (
                <>
                  Submit Loan Request
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="apply-footer">
        <p>&copy; 2026 Requity Group &middot; 401 E Jackson St, Suite 3300, Tampa, FL 33602</p>
      </div>
    </div>
  );
}

/* ─── Header ─── */
function Header() {
  return (
    <div className="apply-header">
      <div className="apply-header-inner">
        <Link href="/" className="apply-logo">
          <img src="/logo-light.png" alt="Requity" style={{ height: 28 }} />
          <span className="logo-tag">LENDING</span>
        </Link>
        <a href="tel:+18133275180" className="header-phone">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" /></svg>
          813.327.5180
        </a>
      </div>
    </div>
  );
}

/* ─── Styles ─── */
const applyStyles = `
  /* ── Page ── */
  .apply-page {
    min-height: 100vh;
    background: var(--navy-deep);
    font-family: var(--font-body);
    color: #fff;
  }

  /* ── Header ── */
  .apply-header {
    border-bottom: 1px solid rgba(255,255,255,0.06);
    background: rgba(8, 21, 37, 0.92);
    backdrop-filter: blur(20px);
    position: sticky;
    top: 0;
    z-index: 50;
  }
  .apply-header-inner {
    max-width: 1100px;
    margin: 0 auto;
    padding: 20px 32px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .apply-logo {
    display: flex;
    align-items: center;
    gap: 10px;
    color: #fff;
    text-decoration: none;
    letter-spacing: 1px;
  }
  .apply-logo img { height: 28px; width: auto; }
  .logo-tag {
    font-family: var(--font-body);
    font-size: 10px;
    letter-spacing: 3px;
    color: rgba(255,255,255,0.4);
    margin-left: 10px;
    text-transform: uppercase;
    font-weight: 500;
    vertical-align: middle;
  }
  .header-phone {
    display: flex;
    align-items: center;
    gap: 8px;
    color: rgba(255,255,255,0.6);
    text-decoration: none;
    font-size: 14px;
    font-weight: 500;
    transition: color 0.3s;
  }
  .header-phone:hover { color: var(--champagne); }

  /* ── Trust Bar ── */
  .trust-bar {
    background: rgba(232, 98, 44, 0.06);
    border-bottom: 1px solid rgba(232, 98, 44, 0.12);
  }
  .trust-bar-inner {
    max-width: 1100px;
    margin: 0 auto;
    padding: 14px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 40px;
    flex-wrap: wrap;
  }
  .trust-badge {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 13px;
    color: var(--champagne);
    font-weight: 500;
    letter-spacing: 0.3px;
  }
  .trust-badge a {
    color: var(--champagne);
    text-decoration: none;
  }
  .trust-badge svg { opacity: 0.8; }

  /* ── Progress ── */
  .progress-section {
    max-width: 600px;
    margin: 40px auto 0;
    padding: 0 32px;
  }
  .progress-bar-track {
    width: 100%;
    height: 3px;
    background: rgba(255,255,255,0.08);
    border-radius: 3px;
    overflow: hidden;
    margin-bottom: 24px;
  }
  .progress-bar-fill {
    height: 100%;
    background: linear-gradient(90deg, var(--champagne), var(--champagne-lt));
    border-radius: 3px;
    transition: width 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .progress-steps {
    display: flex;
    justify-content: space-between;
  }
  .progress-step {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
  }
  .progress-dot {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    border: 2px solid rgba(255,255,255,0.15);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    font-weight: 600;
    color: rgba(255,255,255,0.3);
    transition: all 0.4s;
  }
  .progress-dot svg { width: 14px; height: 14px; }
  .progress-step.active .progress-dot {
    border-color: var(--champagne);
    color: var(--champagne);
    box-shadow: 0 0 0 4px rgba(232, 98, 44, 0.15);
  }
  .progress-step.completed .progress-dot {
    border-color: var(--champagne);
    background: var(--champagne);
    color: #fff;
  }
  .progress-label {
    font-size: 12px;
    color: rgba(255,255,255,0.35);
    letter-spacing: 0.5px;
    font-weight: 500;
    text-transform: uppercase;
    transition: color 0.3s;
  }
  .progress-step.active .progress-label { color: var(--champagne); }
  .progress-step.completed .progress-label { color: rgba(255,255,255,0.6); }

  /* ── Container ── */
  .apply-container {
    max-width: 900px;
    margin: 0 auto;
    padding: 48px 32px 60px;
  }

  /* ── Step Transitions ── */
  .step-wrapper {
    animation: stepIn 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }
  @keyframes stepIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  /* ── Step Header ── */
  .step-header {
    margin-bottom: 40px;
  }
  .step-header h1 {
    font-family: var(--font-display);
    font-size: clamp(28px, 4vw, 40px);
    font-weight: 400;
    color: #fff;
    margin-bottom: 10px;
    line-height: 1.2;
  }
  .step-header p {
    font-size: 16px;
    color: rgba(255,255,255,0.5);
    font-weight: 400;
    line-height: 1.5;
  }

  /* ── Loan Type Grid ── */
  .loan-type-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 16px;
  }
  .loan-type-card {
    position: relative;
    background: rgba(255,255,255,0.025);
    border: 1px solid rgba(255,255,255,0.08);
    padding: 28px 24px;
    cursor: pointer;
    transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
    text-align: left;
    color: #fff;
    font-family: inherit;
    border-radius: 0;
    outline: none;
  }
  .loan-type-card:hover {
    border-color: rgba(232, 98, 44, 0.3);
    background: rgba(232, 98, 44, 0.04);
    transform: translateY(-3px);
    box-shadow: 0 8px 32px rgba(0,0,0,0.2);
  }
  .loan-type-card.selected {
    border-color: var(--champagne);
    background: rgba(232, 98, 44, 0.08);
    box-shadow: 0 0 0 1px var(--champagne), 0 8px 32px rgba(232, 98, 44, 0.15);
  }
  .lt-icon {
    width: 40px;
    height: 40px;
    margin-bottom: 16px;
    color: rgba(255,255,255,0.35);
    transition: color 0.3s;
  }
  .loan-type-card:hover .lt-icon,
  .loan-type-card.selected .lt-icon { color: var(--champagne); }
  .lt-label {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 8px;
    letter-spacing: 0.2px;
  }
  .lt-desc {
    font-size: 13px;
    color: rgba(255,255,255,0.4);
    line-height: 1.55;
    font-weight: 400;
  }
  .lt-check {
    position: absolute;
    top: 16px;
    right: 16px;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background: var(--champagne);
    display: flex;
    align-items: center;
    justify-content: center;
    animation: popIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  .lt-check svg { width: 12px; height: 12px; color: #fff; }
  @keyframes popIn {
    from { transform: scale(0); }
    to { transform: scale(1); }
  }

  /* ── Form Grid ── */
  .form-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }
  .form-group.full { grid-column: 1 / -1; }
  .form-group label {
    display: block;
    font-size: 12px;
    font-weight: 600;
    color: rgba(255,255,255,0.55);
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 8px;
  }
  .required { color: var(--champagne); }
  .optional { color: rgba(255,255,255,0.3); font-weight: 400; text-transform: none; letter-spacing: 0; }
  .form-group input,
  .form-group select,
  .form-group textarea {
    width: 100%;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.1);
    color: #fff;
    font-family: var(--font-body);
    font-size: 15px;
    padding: 14px 16px;
    transition: all 0.3s;
    outline: none;
    border-radius: 0;
    -webkit-appearance: none;
  }
  .form-group select {
    background-image: url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='rgba(255,255,255,0.4)' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 16px center;
    padding-right: 40px;
  }
  .form-group textarea { resize: vertical; min-height: 100px; }
  .form-group input::placeholder,
  .form-group textarea::placeholder { color: rgba(255,255,255,0.2); }
  .form-group input:focus,
  .form-group select:focus,
  .form-group textarea:focus {
    border-color: var(--champagne);
    background: rgba(232, 98, 44, 0.04);
    box-shadow: 0 0 0 3px rgba(232, 98, 44, 0.1);
  }
  .form-group select option {
    background: var(--navy-deep);
    color: #fff;
  }

  /* ── Step 3 Layout ── */
  .step3-layout {
    display: grid;
    grid-template-columns: 1fr 340px;
    gap: 40px;
    align-items: start;
  }

  /* ── Deal Summary ── */
  .deal-summary {
    background: rgba(255,255,255,0.025);
    border: 1px solid rgba(255,255,255,0.08);
    position: sticky;
    top: 100px;
  }
  .deal-summary-header {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 20px 24px;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    color: var(--champagne);
    border-bottom: 1px solid rgba(255,255,255,0.06);
  }
  .deal-summary-body {
    padding: 8px 0;
  }
  .ds-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 24px;
    border-bottom: 1px solid rgba(255,255,255,0.04);
  }
  .ds-row:last-child { border-bottom: none; }
  .ds-row span {
    font-size: 12px;
    color: rgba(255,255,255,0.4);
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  .ds-row strong {
    font-size: 14px;
    color: #fff;
    font-weight: 500;
    text-align: right;
    max-width: 60%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .ds-row.highlight strong { color: var(--champagne); font-weight: 700; font-size: 16px; }

  /* ── Error ── */
  .form-error {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 14px 20px;
    background: rgba(220, 38, 38, 0.1);
    border: 1px solid rgba(220, 38, 38, 0.25);
    color: #fca5a5;
    font-size: 14px;
    font-weight: 500;
    margin-top: 20px;
    animation: shake 0.4s ease;
  }
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-6px); }
    75% { transform: translateX(6px); }
  }

  /* ── Navigation ── */
  .form-nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 40px;
    padding-top: 32px;
    border-top: 1px solid rgba(255,255,255,0.06);
  }
  .btn-back {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 14px 24px;
    color: rgba(255,255,255,0.5);
    font-size: 14px;
    font-weight: 500;
    background: none;
    border: 1px solid rgba(255,255,255,0.1);
    cursor: pointer;
    transition: all 0.3s;
    font-family: inherit;
    text-decoration: none;
  }
  .btn-back:hover { color: #fff; border-color: rgba(255,255,255,0.25); }
  .btn-next,
  .btn-submit {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 16px 36px;
    background: var(--champagne);
    color: #fff;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 0.5px;
    border: none;
    cursor: pointer;
    transition: all 0.3s;
    font-family: inherit;
    text-transform: uppercase;
  }
  .btn-next:hover,
  .btn-submit:hover {
    background: var(--champagne-lt);
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(232, 98, 44, 0.3);
  }
  .btn-submit:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
  .btn-next svg,
  .btn-submit svg { transition: transform 0.3s; }
  .btn-next:hover svg,
  .btn-submit:hover svg { transform: translateX(3px); }

  /* ── Spinner ── */
  .spinner {
    display: inline-block;
    width: 16px;
    height: 16px;
    border: 2px solid rgba(255,255,255,0.3);
    border-top-color: #fff;
    border-radius: 50%;
    animation: spin 0.6s linear infinite;
  }
  @keyframes spin { to { transform: rotate(360deg); } }

  /* ── Success ── */
  .success-card {
    max-width: 520px;
    margin: 60px auto;
    text-align: center;
    padding: 56px 40px;
    background: rgba(255,255,255,0.025);
    border: 1px solid rgba(255,255,255,0.08);
  }
  .success-icon { width: 56px; height: 56px; margin: 0 auto 28px; }
  .success-icon svg { width: 100%; height: 100%; }
  .success-card h2 {
    font-family: var(--font-display);
    font-size: 32px;
    font-weight: 400;
    margin-bottom: 16px;
  }
  .success-card p {
    font-size: 15px;
    color: rgba(255,255,255,0.6);
    line-height: 1.65;
    margin-bottom: 32px;
  }
  .success-details {
    padding: 20px;
    background: rgba(232, 98, 44, 0.06);
    border: 1px solid rgba(232, 98, 44, 0.15);
    margin-bottom: 24px;
  }
  .success-detail-row {
    display: flex;
    justify-content: space-between;
    padding: 8px 0;
  }
  .success-detail-row span { color: rgba(255,255,255,0.4); font-size: 13px; }
  .success-detail-row strong { color: var(--champagne); font-size: 15px; }
  .success-trust {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 32px;
  }
  .trust-item {
    font-size: 13px;
    color: rgba(255,255,255,0.45);
  }
  .trust-icon { margin-right: 6px; }
  .btn-back-home {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 14px 32px;
    background: rgba(255,255,255,0.06);
    color: #fff;
    text-decoration: none;
    font-size: 14px;
    font-weight: 500;
    border: 1px solid rgba(255,255,255,0.1);
    transition: all 0.3s;
  }
  .btn-back-home:hover { background: rgba(255,255,255,0.1); border-color: rgba(255,255,255,0.2); }

  /* ── Footer ── */
  .apply-footer {
    text-align: center;
    padding: 32px;
    border-top: 1px solid rgba(255,255,255,0.04);
  }
  .apply-footer p {
    font-size: 12px;
    color: rgba(255,255,255,0.25);
  }

  /* ── Responsive ── */
  @media (max-width: 800px) {
    .step3-layout { grid-template-columns: 1fr; }
    .deal-summary { position: static; }
  }
  @media (max-width: 640px) {
    .apply-container { padding: 32px 16px 48px; }
    .apply-header-inner { padding: 16px 16px; }
    .form-grid { grid-template-columns: 1fr; }
    .loan-type-grid { grid-template-columns: 1fr; }
    .trust-bar-inner { gap: 12px; flex-direction: column; padding: 12px 16px; }
    .trust-badge { font-size: 12px; }
    .form-nav { flex-direction: column-reverse; gap: 12px; }
    .btn-next, .btn-submit, .btn-back { width: 100%; justify-content: center; }
    .progress-section { padding: 0 16px; }
    .progress-label { font-size: 10px; }
    .step-header h1 { font-size: 26px; }
    .step-header p { font-size: 14px; }
    .success-card { padding: 40px 20px; margin: 40px auto; }
    .success-card h2 { font-size: 26px; }
    .form-group label { font-size: 11px; }
    .form-group input,
    .form-group select,
    .form-group textarea { font-size: 16px; padding: 12px 14px; }
  }
`;

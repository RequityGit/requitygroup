'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
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

/* ─── Loan Program Requirements (extensible — add new loan types here) ─── */
const LOAN_PROGRAMS = {
  'Fix & Flip': {
    arvLabel: 'After Repair Value (ARV)',
    programs: [
      {
        id: 'premier',
        name: 'Premier Program',
        interestRate: 9.0,
        rateType: 'Fixed',
        originationPoints: 2.0,
        pointsNote: 'Typical',
        maxLTV: 70.0,
        ltvNote: 'Hard Cap',
        maxLTC: 90.0,
        ltcNote: 'Hard Cap',
        maxLTP: 90.0,
        maxTerm: 12,
        termNote: 'Extensions available',
        requirements: {
          minCreditScore: 650,
          minDeals24Months: 3,
          citizenship: 'us_resident',
        },
        highlights: ['Lowest rate available', 'Up to 90% of total cost', 'Up to 70% of ARV'],
      },
      {
        id: 'balance_sheet',
        name: 'Balance Sheet',
        interestRate: 12.0,
        rateType: 'Fixed',
        originationPoints: 3.0,
        pointsNote: 'Minimum',
        maxLTV: 65.0,
        ltvNote: 'Before adjustments',
        maxLTC: 85.0,
        ltcNote: 'Before adjustments',
        maxLTP: 85.0,
        maxTerm: 12,
        termNote: 'Extensions available',
        requirements: {
          minCreditScore: 0,
          minDeals24Months: 0,
          citizenship: 'any',
        },
        highlights: ['No credit score minimum', 'New investors welcome', 'Foreign nationals OK'],
      },
    ],
  },
  // To add auto-quoting for another program, add an entry like:
  // 'DSCR Rental': { arvLabel: 'Estimated Property Value', programs: [...] },
};

const CREDIT_SCORE_RANGES = [
  '760 or higher',
  '720–759',
  '680–719',
  '650–679',
  '620–649',
  'Below 620',
  'Not sure',
];

const DEALS_24_MONTHS = [
  '0 — First deal',
  '1–2 deals',
  '3–5 deals',
  '6–10 deals',
  '10+ deals',
];

const CITIZENSHIP_OPTIONS = [
  'US Citizen',
  'Permanent Resident (Green Card)',
  'Foreign National',
  'Other / Not Sure',
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

function parseCurrency(value) {
  if (!value) return 0;
  return parseInt(value.replace(/[^0-9]/g, '')) || 0;
}

function parseCreditScore(value) {
  if (!value || value === 'Not sure') return 0;
  const match = value.match(/^(\d+)/);
  return match ? parseInt(match[1]) : 0;
}

function parseDeals(value) {
  if (!value) return 0;
  if (value.startsWith('0')) return 0;
  if (value.startsWith('1')) return 1;
  if (value.startsWith('3')) return 3;
  if (value.startsWith('6')) return 6;
  if (value.startsWith('10+')) return 10;
  return 0;
}

/* ─── Qualification & Terms Engine ─── */
function qualifyForProgram(form) {
  const config = LOAN_PROGRAMS[form.loanType];
  if (!config) return null;

  const creditScore = parseCreditScore(form.creditScore);
  const deals = parseDeals(form.dealsInLast24Months);
  const isUSResident = ['US Citizen', 'Permanent Resident (Green Card)'].includes(form.citizenshipStatus);

  for (const program of config.programs) {
    const req = program.requirements;
    const meetsCredit = req.minCreditScore === 0 || creditScore >= req.minCreditScore;
    const meetsExperience = deals >= req.minDeals24Months;
    const meetsCitizenship = req.citizenship === 'any' || isUSResident;

    if (meetsCredit && meetsExperience && meetsCitizenship) {
      return program;
    }
  }
  // Fallback to last program (least restrictive)
  return config.programs[config.programs.length - 1];
}

function calculateTerms(form, program) {
  const purchasePrice = parseCurrency(form.purchasePrice);
  const rehabBudget = parseCurrency(form.rehabBudget);
  const arv = parseCurrency(form.afterRepairValue);
  const requestedLoan = parseCurrency(form.loanAmount);
  const totalCost = purchasePrice + rehabBudget;

  const maxByLTV = arv > 0 ? Math.floor(arv * (program.maxLTV / 100)) : null;
  const maxByLTC = totalCost > 0 ? Math.floor(totalCost * (program.maxLTC / 100)) : null;
  const maxByLTP = purchasePrice > 0 ? Math.floor(purchasePrice * (program.maxLTP / 100)) : null;

  const constraints = [maxByLTV, maxByLTC, maxByLTP].filter((v) => v !== null);
  const maxLoan = constraints.length > 0 ? Math.min(...constraints) : null;

  const estimatedLoan =
    maxLoan !== null
      ? requestedLoan > 0
        ? Math.min(requestedLoan, maxLoan)
        : maxLoan
      : requestedLoan;

  const originationFee = estimatedLoan > 0 ? Math.floor(estimatedLoan * (program.originationPoints / 100)) : null;
  const monthlyInterest = estimatedLoan > 0 ? Math.round((estimatedLoan * (program.interestRate / 100)) / 12) : null;

  return {
    programName: program.name,
    programId: program.id,
    interestRate: program.interestRate,
    rateType: program.rateType,
    originationPoints: program.originationPoints,
    maxLTV: program.maxLTV,
    maxLTC: program.maxLTC,
    maxLTP: program.maxLTP,
    maxTerm: program.maxTerm,
    termNote: program.termNote,
    maxLoan,
    estimatedLoan,
    originationFee,
    monthlyInterest,
    maxByLTV,
    maxByLTC,
    maxByLTP,
    purchasePrice,
    rehabBudget,
    arv,
    totalCost,
    capped: maxLoan !== null && requestedLoan > maxLoan,
  };
}

/* ─── Component ─── */
export default function ApplyPage() {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [generatedTerms, setGeneratedTerms] = useState(null);
  const formRef = useRef(null);
  const addressInputRef = useRef(null);
  const autocompleteRef = useRef(null);

  const [form, setForm] = useState({
    loanType: '',
    propertyAddress: '',
    city: '',
    state: '',
    purchasePrice: '',
    loanAmount: '',
    unitsOrLots: '',
    rehabBudget: '',
    afterRepairValue: '',
    timeline: '',
    // Borrower qualification fields
    creditScore: '',
    dealsInLast24Months: '',
    citizenshipStatus: '',
    // Contact info
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
    if (['purchasePrice', 'loanAmount', 'rehabBudget', 'afterRepairValue'].includes(field)) value = formatCurrency(value);
    setForm((prev) => ({ ...prev, [field]: value }));
    setError('');
  };

  const selectLoanType = (id) => {
    if (form.loanType === id) {
      setDirection(1);
      setStep((s) => Math.min(s + 1, totalSteps));
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    setForm((prev) => ({ ...prev, loanType: id }));
    setError('');
  };

  /* ─── Google Places Autocomplete ─── */
  const initAutocomplete = useCallback(() => {
    if (!addressInputRef.current || !window.google?.maps?.places) return;
    if (autocompleteRef.current) return;
    const ac = new window.google.maps.places.Autocomplete(addressInputRef.current, {
      types: ['address'],
      componentRestrictions: { country: 'us' },
      fields: ['address_components', 'formatted_address'],
    });
    ac.addListener('place_changed', () => {
      const place = ac.getPlace();

      // Best case: full address components available
      if (place.address_components) {
        let streetNumber = '', route = '', city = '', st = '', zip = '';
        for (const c of place.address_components) {
          const t = c.types;
          if (t.includes('street_number')) streetNumber = c.long_name;
          if (t.includes('route')) route = c.long_name;
          if (t.includes('locality')) city = c.long_name;
          if (t.includes('sublocality_level_1') && !city) city = c.long_name;
          if (t.includes('administrative_area_level_1')) st = c.short_name;
          if (t.includes('postal_code')) zip = c.long_name;
        }
        const street = streetNumber ? `${streetNumber} ${route}` : route;
        const displayAddress = [street, city, st].filter(Boolean).join(', ') + (zip ? ` ${zip}` : '');
        if (addressInputRef.current) addressInputRef.current.value = displayAddress;
        setForm((prev) => ({
          ...prev,
          propertyAddress: street || displayAddress || prev.propertyAddress,
          city: city || prev.city,
          state: st || prev.state,
        }));
        return;
      }

      // Fallback: use formatted_address, place name, or the input's current value
      const fallback = place.formatted_address || place.name
        || (addressInputRef.current ? addressInputRef.current.value : '');
      if (fallback) {
        if (addressInputRef.current) addressInputRef.current.value = fallback;
        setForm((prev) => ({ ...prev, propertyAddress: fallback }));
      }
    });
    autocompleteRef.current = ac;
  }, []);

  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY) return;
    if (window.google?.maps?.places) { initAutocomplete(); return; }
    if (document.querySelector('script[src*="maps.googleapis.com/maps/api/js"]')) return;
    const s = document.createElement('script');
    s.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY}&libraries=places`;
    s.async = true;
    s.defer = true;
    s.onload = () => initAutocomplete();
    document.head.appendChild(s);
  }, [initAutocomplete]);

  useEffect(() => {
    if (step === 2) {
      const t = setTimeout(() => initAutocomplete(), 150);
      return () => clearTimeout(t);
    } else {
      // Clean up old autocomplete instance
      if (autocompleteRef.current && window.google?.maps?.event) {
        window.google.maps.event.clearInstanceListeners(autocompleteRef.current);
      }
      autocompleteRef.current = null;
    }
  }, [step, initAutocomplete]);

  const hasAutoTerms = !!LOAN_PROGRAMS[form.loanType];
  const totalSteps = 4;
  const showRehab = ['Fix & Flip', 'New Construction', 'CRE Bridge'].includes(form.loanType);
  const rehabLabel = form.loanType === 'New Construction' ? 'Construction Budget' : form.loanType === 'Fix & Flip' ? 'Rehab Budget' : 'Rehab / Renovation Budget';
  const unitsLabel = ['Manufactured Housing', 'RV Park', 'Multifamily'].includes(form.loanType) ? 'Number of Units' : 'Number of Units / Lots';
  const arvLabel = LOAN_PROGRAMS[form.loanType]?.arvLabel || 'After Repair Value (ARV)';
  const stepLabels = ['Loan Type', 'Deal Details', 'Loan Terms', 'Contact Info'];

  function validateStep() {
    if (step === 1 && !form.loanType) return 'Please select a loan program.';
    if (step === 2) {
      if (!form.loanAmount) return 'Please enter the loan amount requested.';
      if (hasAutoTerms) {
        if (!form.purchasePrice) return 'Please enter the purchase price.';
        if (!form.afterRepairValue) return 'Please enter the after repair value.';
        if (!form.creditScore) return 'Please select your credit score range.';
        if (!form.dealsInLast24Months) return 'Please select your deal experience.';
        if (!form.citizenshipStatus) return 'Please select your citizenship status.';
      }
    }
    // Step 3 (terms) needs no validation
    if (step === 4) {
      if (!form.firstName) return 'Please enter your first name.';
      if (!form.lastName) return 'Please enter your last name.';
      if (!form.email) return 'Please enter your email address.';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return 'Please enter a valid email address.';
      if (!form.phone || form.phone.replace(/\D/g, '').length < 10) return 'Please enter a valid phone number.';
      if (!hasAutoTerms && !form.experienceLevel) return 'Please select your experience level.';
    }
    return '';
  }

  function goNext() {
    // Sync address input DOM value to form state (Google Places may update DOM directly)
    if (step === 2 && addressInputRef.current) {
      const domValue = addressInputRef.current.value;
      if (domValue && domValue !== form.propertyAddress) {
        setForm((prev) => ({ ...prev, propertyAddress: domValue }));
      }
    }

    const err = validateStep();
    if (err) { setError(err); return; }

    // Calculate terms when moving to step 3
    if (step === 2 && hasAutoTerms) {
      const program = qualifyForProgram(form);
      if (program) {
        const terms = calculateTerms(form, program);
        setGeneratedTerms(terms);
      }
    }

    setDirection(1);
    setStep((s) => Math.min(s + 1, totalSteps));
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
      const payload = {
        ...form,
        generatedTerms: generatedTerms || null,
      };
      const res = await fetch('/api/loan-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
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
            <p>Thank you, {form.firstName}. {generatedTerms ? <>Your <strong>{generatedTerms.programName}</strong> term sheet for your <strong>{form.loanType}</strong> deal has been sent to your email.</> : <>Our lending team will review your <strong>{form.loanType}</strong> request and reach out within 24 hours.</>}</p>
            <div className="success-details">
              {generatedTerms && (
                <div className="success-detail-row">
                  <span>Program</span>
                  <strong>{generatedTerms.programName}</strong>
                </div>
              )}
              <div className="success-detail-row">
                <span>{generatedTerms ? 'Est. Loan Amount' : 'Loan Amount'}</span>
                <strong>{generatedTerms ? '$' + generatedTerms.estimatedLoan.toLocaleString() : form.loanAmount}</strong>
              </div>
              {generatedTerms && (
                <div className="success-detail-row">
                  <span>Interest Rate</span>
                  <strong>{generatedTerms.interestRate}% {generatedTerms.rateType}</strong>
                </div>
              )}
              {form.city && (
                <div className="success-detail-row">
                  <span>Location</span>
                  <strong>{form.city}{form.state ? `, ${form.state}` : ''}</strong>
                </div>
              )}
            </div>
            <div className="success-trust">
              <div className="trust-item"><span className="trust-icon">&#9743;</span> We&apos;ll call you at {form.phone}</div>
              <div className="trust-item"><span className="trust-icon">&#9993;</span> {generatedTerms ? 'Term sheet' : 'Confirmation'} sent to {form.email}</div>
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
          <div className="progress-bar-fill" style={{ width: `${(step / totalSteps) * 100}%` }} />
        </div>
        <div className="progress-steps">
          {stepLabels.map((label, i) => (
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
                <p>Tell us about the property and your financing needs.{hasAutoTerms ? ' We\u2019ll generate your loan terms instantly.' : ''}</p>
              </div>
              <div className="form-grid">
                <div className="form-group full">
                  <label>Property Address</label>
                  <input ref={addressInputRef} type="text" placeholder="Start typing an address..." defaultValue={form.propertyAddress} onChange={(e) => { setForm((prev) => ({ ...prev, propertyAddress: e.target.value })); setError(''); }} autoComplete="new-password" />
                </div>
                <div className="form-group">
                  <label>Purchase Price {hasAutoTerms && <span className="required">*</span>}</label>
                  <input type="text" placeholder="$0" value={form.purchasePrice} onChange={set('purchasePrice')} />
                </div>
                <div className="form-group">
                  <label>Loan Amount Requested <span className="required">*</span></label>
                  <input type="text" placeholder="$0" value={form.loanAmount} onChange={set('loanAmount')} />
                </div>
                {!hasAutoTerms && (
                  <div className="form-group">
                    <label>{unitsLabel}</label>
                    <input type="text" placeholder="e.g. 24" value={form.unitsOrLots} onChange={set('unitsOrLots')} />
                  </div>
                )}
                {showRehab && (
                  <div className="form-group">
                    <label>{rehabLabel}</label>
                    <input type="text" placeholder="$0" value={form.rehabBudget} onChange={set('rehabBudget')} />
                  </div>
                )}
                {hasAutoTerms && (
                  <div className="form-group">
                    <label>{arvLabel} <span className="required">*</span></label>
                    <input type="text" placeholder="$0" value={form.afterRepairValue} onChange={set('afterRepairValue')} />
                  </div>
                )}
                <div className="form-group">
                  <label>Timeline to Close</label>
                  <select value={form.timeline} onChange={set('timeline')}>
                    <option value="">Select Timeline</option>
                    {TIMELINES.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>

              {/* Borrower Profile — shown for auto-quote programs */}
              {hasAutoTerms && (
                <>
                  <div className="section-divider">
                    <span>Borrower Profile</span>
                  </div>
                  <p className="section-subtitle">This information determines your loan program and rate.</p>
                  <div className="form-grid">
                    <div className="form-group">
                      <label>Credit Score Range <span className="required">*</span></label>
                      <select value={form.creditScore} onChange={set('creditScore')}>
                        <option value="">Select Range</option>
                        {CREDIT_SCORE_RANGES.map((c) => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Deals in Last 24 Months <span className="required">*</span></label>
                      <select value={form.dealsInLast24Months} onChange={set('dealsInLast24Months')}>
                        <option value="">Select Experience</option>
                        {DEALS_24_MONTHS.map((d) => <option key={d} value={d}>{d}</option>)}
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Citizenship / Residency <span className="required">*</span></label>
                      <select value={form.citizenshipStatus} onChange={set('citizenshipStatus')}>
                        <option value="">Select Status</option>
                        {CITIZENSHIP_OPTIONS.map((c) => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {/* Step 3 — Loan Terms */}
          {step === 3 && (
            <div className="step-content">
              {hasAutoTerms && generatedTerms ? (
                <>
                  <div className="step-header">
                    <h1>Your Estimated Loan Terms</h1>
                    <p>Based on your deal details and borrower profile, you qualify for our <strong>{generatedTerms.programName}</strong>.</p>
                  </div>

                  {/* Program Badge */}
                  <div className="term-program-badge">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                    {generatedTerms.programName}
                  </div>

                  {/* Key Metrics Row */}
                  <div className="terms-metrics-row">
                    <div className="term-metric">
                      <div className="tm-value">{generatedTerms.interestRate}%</div>
                      <div className="tm-label">Interest Rate</div>
                      <div className="tm-note">{generatedTerms.rateType}</div>
                    </div>
                    <div className="term-metric">
                      <div className="tm-value">{generatedTerms.originationPoints}%</div>
                      <div className="tm-label">Origination</div>
                      <div className="tm-note">{generatedTerms.originationFee ? '$' + generatedTerms.originationFee.toLocaleString() : '—'}</div>
                    </div>
                    <div className="term-metric">
                      <div className="tm-value">{generatedTerms.maxTerm} Mo</div>
                      <div className="tm-label">Loan Term</div>
                      <div className="tm-note">{generatedTerms.termNote}</div>
                    </div>
                  </div>

                  {/* Estimated Loan Details */}
                  <div className="terms-details-card">
                    <div className="tdc-header">Estimated Loan Details</div>
                    <div className="tdc-body">
                      {generatedTerms.maxLoan !== null && (
                        <div className="tdc-row">
                          <span>Maximum Loan Amount</span>
                          <strong>${generatedTerms.maxLoan.toLocaleString()}</strong>
                        </div>
                      )}
                      <div className="tdc-row highlight">
                        <span>Estimated Loan Amount</span>
                        <strong>${generatedTerms.estimatedLoan.toLocaleString()}</strong>
                      </div>
                      {generatedTerms.capped && (
                        <div className="tdc-note-row">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M12 8v4M12 16h.01" /></svg>
                          Your requested amount exceeds the program maximum. Estimated amount has been adjusted.
                        </div>
                      )}
                      {generatedTerms.originationFee !== null && (
                        <div className="tdc-row">
                          <span>Origination Fee ({generatedTerms.originationPoints}%)</span>
                          <strong>${generatedTerms.originationFee.toLocaleString()}</strong>
                        </div>
                      )}
                      {generatedTerms.monthlyInterest !== null && (
                        <div className="tdc-row">
                          <span>Est. Monthly Interest</span>
                          <strong>${generatedTerms.monthlyInterest.toLocaleString()}</strong>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Leverage Limits */}
                  <div className="terms-details-card">
                    <div className="tdc-header">Leverage Limits</div>
                    <div className="tdc-body">
                      {generatedTerms.maxByLTV !== null && (
                        <div className="tdc-leverage-row">
                          <div className="lev-top">
                            <span>LTV (% of ARV)</span>
                            <strong>{generatedTerms.maxLTV}%</strong>
                          </div>
                          <div className="lev-bar">
                            <div className="lev-fill" style={{ width: `${generatedTerms.maxLTV}%` }} />
                          </div>
                          <div className="lev-detail">Max: ${generatedTerms.maxByLTV.toLocaleString()}</div>
                        </div>
                      )}
                      {generatedTerms.maxByLTC !== null && (
                        <div className="tdc-leverage-row">
                          <div className="lev-top">
                            <span>LTC (% of Total Cost)</span>
                            <strong>{generatedTerms.maxLTC}%</strong>
                          </div>
                          <div className="lev-bar">
                            <div className="lev-fill" style={{ width: `${generatedTerms.maxLTC}%` }} />
                          </div>
                          <div className="lev-detail">Max: ${generatedTerms.maxByLTC.toLocaleString()}</div>
                        </div>
                      )}
                      {generatedTerms.maxByLTP !== null && (
                        <div className="tdc-leverage-row">
                          <div className="lev-top">
                            <span>LTP (% of Purchase Price)</span>
                            <strong>{generatedTerms.maxLTP}%</strong>
                          </div>
                          <div className="lev-bar">
                            <div className="lev-fill" style={{ width: `${generatedTerms.maxLTP}%` }} />
                          </div>
                          <div className="lev-detail">Max: ${generatedTerms.maxByLTP.toLocaleString()}</div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Disclaimer */}
                  <div className="terms-disclaimer">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" /></svg>
                    These terms are estimates based on the information provided and are subject to full underwriting review, property appraisal, and final approval. Actual terms may vary.
                  </div>
                </>
              ) : (
                <>
                  <div className="step-header">
                    <h1>Personalized Terms</h1>
                    <p>Our lending team will prepare custom terms tailored to your deal.</p>
                  </div>
                  <div className="custom-terms-card">
                    <div className="ctc-icon">
                      <svg viewBox="0 0 48 48" fill="none" stroke="var(--champagne)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="8" y="4" width="32" height="40" rx="2" />
                        <path d="M16 14h16M16 22h16M16 30h10" />
                        <circle cx="36" cy="36" r="8" fill="var(--navy-deep)" stroke="var(--champagne)" />
                        <path d="M36 33v6M34 36h4" stroke="var(--champagne)" strokeWidth="2" />
                      </svg>
                    </div>
                    <h3>Custom {form.loanType} Terms</h3>
                    <p>After reviewing your deal details, a member of our lending team will reach out with a personalized term sheet within <strong>24 hours</strong>.</p>
                    <div className="ctc-features">
                      <div className="ctc-feature">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="var(--champagne)" strokeWidth="1.5"><path d="M3 8l4 4 6-6" /></svg>
                        Competitive rates
                      </div>
                      <div className="ctc-feature">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="var(--champagne)" strokeWidth="1.5"><path d="M3 8l4 4 6-6" /></svg>
                        Flexible structures
                      </div>
                      <div className="ctc-feature">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="var(--champagne)" strokeWidth="1.5"><path d="M3 8l4 4 6-6" /></svg>
                        Fast closings
                      </div>
                    </div>
                    <p className="ctc-note">Proceed to the next step to provide your contact information.</p>
                  </div>
                </>
              )}
            </div>
          )}

          {/* Step 4 — Contact Info */}
          {step === 4 && (
            <div className="step-content">
              <div className="step-header">
                <h1>Contact Information</h1>
                <p>{generatedTerms ? 'Enter your details to receive your term sheet via email.' : 'Let us know how to reach you.'}</p>
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
                  {!hasAutoTerms && (
                    <div className="form-group">
                      <label>Real Estate Experience <span className="required">*</span></label>
                      <select value={form.experienceLevel} onChange={set('experienceLevel')}>
                        <option value="">Select Experience Level</option>
                        {EXPERIENCE_LEVELS.map((l) => <option key={l} value={l}>{l}</option>)}
                      </select>
                    </div>
                  )}
                </div>

                {/* Sidebar — Terms Summary or Deal Summary */}
                <div className="deal-summary">
                  {generatedTerms ? (
                    <>
                      <div className="deal-summary-header">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" /></svg>
                        Term Sheet Summary
                      </div>
                      <div className="deal-summary-body">
                        <div className="ds-row highlight">
                          <span>Program</span>
                          <strong>{generatedTerms.programName}</strong>
                        </div>
                        <div className="ds-row highlight">
                          <span>Est. Loan</span>
                          <strong>${generatedTerms.estimatedLoan.toLocaleString()}</strong>
                        </div>
                        <div className="ds-row">
                          <span>Rate</span>
                          <strong>{generatedTerms.interestRate}% {generatedTerms.rateType}</strong>
                        </div>
                        <div className="ds-row">
                          <span>Points</span>
                          <strong>{generatedTerms.originationPoints}%</strong>
                        </div>
                        <div className="ds-row">
                          <span>Term</span>
                          <strong>{generatedTerms.maxTerm} Months</strong>
                        </div>
                        {generatedTerms.monthlyInterest && (
                          <div className="ds-row">
                            <span>Monthly Interest</span>
                            <strong>${generatedTerms.monthlyInterest.toLocaleString()}</strong>
                          </div>
                        )}
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="deal-summary-header">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" /></svg>
                        Deal Summary
                      </div>
                      <div className="deal-summary-body">
                        <div className="ds-row">
                          <span>Loan Program</span>
                          <strong>{form.loanType || '\u2014'}</strong>
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
                        {form.timeline && (
                          <div className="ds-row">
                            <span>Timeline</span>
                            <strong>{form.timeline}</strong>
                          </div>
                        )}
                      </div>
                    </>
                  )}
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
          {step < totalSteps ? (
            <button type="button" className="btn-next" onClick={goNext}>
              {step === 3 && generatedTerms ? 'Get My Term Sheet' : 'Continue'}
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
                  {generatedTerms ? 'Submit & Email Term Sheet' : 'Submit Loan Request'}
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
    max-width: 720px;
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

  /* ── Section Divider ── */
  .section-divider {
    display: flex;
    align-items: center;
    gap: 16px;
    margin: 36px 0 12px;
  }
  .section-divider::before,
  .section-divider::after {
    content: '';
    flex: 1;
    height: 1px;
    background: rgba(255,255,255,0.08);
  }
  .section-divider span {
    font-size: 12px;
    font-weight: 600;
    color: var(--champagne);
    text-transform: uppercase;
    letter-spacing: 2px;
    white-space: nowrap;
  }
  .section-subtitle {
    font-size: 14px;
    color: rgba(255,255,255,0.4);
    margin-bottom: 20px;
    line-height: 1.5;
  }

  /* ── Term Sheet Display (Step 3) ── */
  .term-program-badge {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 12px 28px;
    background: linear-gradient(135deg, rgba(198,169,98,0.15), rgba(198,169,98,0.05));
    border: 1px solid rgba(198,169,98,0.35);
    color: var(--champagne);
    font-size: 15px;
    font-weight: 600;
    letter-spacing: 1px;
    text-transform: uppercase;
    margin-bottom: 32px;
    animation: popIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .terms-metrics-row {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    margin-bottom: 28px;
  }
  .term-metric {
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.08);
    padding: 28px 20px;
    text-align: center;
    transition: border-color 0.3s;
    animation: stepIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }
  .term-metric:nth-child(2) { animation-delay: 0.1s; }
  .term-metric:nth-child(3) { animation-delay: 0.2s; }
  .tm-value {
    font-family: var(--font-display);
    font-size: clamp(28px, 4vw, 36px);
    font-weight: 400;
    color: var(--champagne);
    line-height: 1.1;
    margin-bottom: 8px;
  }
  .tm-label {
    font-size: 12px;
    font-weight: 600;
    color: rgba(255,255,255,0.55);
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 4px;
  }
  .tm-note {
    font-size: 11px;
    color: rgba(255,255,255,0.3);
  }

  .terms-details-card {
    background: rgba(255,255,255,0.02);
    border: 1px solid rgba(255,255,255,0.08);
    margin-bottom: 20px;
    animation: stepIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    animation-delay: 0.15s;
    opacity: 0;
  }
  .tdc-header {
    padding: 18px 24px;
    font-size: 12px;
    font-weight: 600;
    color: var(--champagne);
    text-transform: uppercase;
    letter-spacing: 1.5px;
    border-bottom: 1px solid rgba(255,255,255,0.06);
  }
  .tdc-body { padding: 8px 0; }
  .tdc-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 14px 24px;
    border-bottom: 1px solid rgba(255,255,255,0.04);
  }
  .tdc-row:last-child { border-bottom: none; }
  .tdc-row span {
    font-size: 13px;
    color: rgba(255,255,255,0.5);
  }
  .tdc-row strong {
    font-size: 15px;
    color: #fff;
    font-weight: 600;
  }
  .tdc-row.highlight strong {
    color: var(--champagne);
    font-size: 18px;
    font-weight: 700;
  }
  .tdc-note-row {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 24px;
    font-size: 12px;
    color: rgba(255,200,100,0.7);
    background: rgba(255,200,100,0.05);
    border-bottom: 1px solid rgba(255,255,255,0.04);
  }

  /* Leverage bars */
  .tdc-leverage-row {
    padding: 16px 24px;
    border-bottom: 1px solid rgba(255,255,255,0.04);
  }
  .tdc-leverage-row:last-child { border-bottom: none; }
  .lev-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
  }
  .lev-top span {
    font-size: 13px;
    color: rgba(255,255,255,0.5);
  }
  .lev-top strong {
    font-size: 14px;
    color: var(--champagne);
    font-weight: 600;
  }
  .lev-bar {
    width: 100%;
    height: 6px;
    background: rgba(255,255,255,0.06);
    border-radius: 3px;
    overflow: hidden;
    margin-bottom: 6px;
  }
  .lev-fill {
    height: 100%;
    background: linear-gradient(90deg, var(--champagne), var(--champagne-lt));
    border-radius: 3px;
    transition: width 1s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .lev-detail {
    font-size: 11px;
    color: rgba(255,255,255,0.3);
  }

  .terms-disclaimer {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    padding: 16px 20px;
    background: rgba(255,255,255,0.02);
    border: 1px solid rgba(255,255,255,0.06);
    font-size: 12px;
    color: rgba(255,255,255,0.35);
    line-height: 1.6;
    margin-top: 8px;
  }
  .terms-disclaimer svg { flex-shrink: 0; margin-top: 1px; }

  /* ── Custom Terms Card (non-auto-quote) ── */
  .custom-terms-card {
    text-align: center;
    padding: 56px 40px;
    background: rgba(255,255,255,0.025);
    border: 1px solid rgba(255,255,255,0.08);
    max-width: 560px;
    margin: 0 auto;
  }
  .ctc-icon { width: 56px; height: 56px; margin: 0 auto 24px; }
  .ctc-icon svg { width: 100%; height: 100%; }
  .custom-terms-card h3 {
    font-family: var(--font-display);
    font-size: 28px;
    font-weight: 400;
    color: #fff;
    margin-bottom: 16px;
  }
  .custom-terms-card p {
    font-size: 15px;
    color: rgba(255,255,255,0.5);
    line-height: 1.7;
    margin-bottom: 24px;
  }
  .ctc-features {
    display: flex;
    justify-content: center;
    gap: 24px;
    flex-wrap: wrap;
    margin-bottom: 28px;
  }
  .ctc-feature {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    color: rgba(255,255,255,0.6);
    font-weight: 500;
  }
  .ctc-note {
    font-size: 13px !important;
    color: rgba(255,255,255,0.35) !important;
    margin-bottom: 0 !important;
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
    .terms-metrics-row { grid-template-columns: 1fr; }
    .term-metric { padding: 20px 16px; }
    .tm-value { font-size: 28px; }
    .ctc-features { flex-direction: column; align-items: center; }
    .progress-section { max-width: 100%; }
  }

  /* ── Google Places Autocomplete Dropdown ── */
  .pac-container {
    background: #0d1f35;
    border: 1px solid rgba(198,169,98,0.3);
    border-radius: 8px;
    font-family: 'DM Sans', sans-serif;
    margin-top: 4px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.4);
    z-index: 10000;
  }
  .pac-item {
    color: rgba(255,255,255,0.7);
    border-top: 1px solid rgba(255,255,255,0.06);
    padding: 10px 14px;
    cursor: pointer;
    font-size: 14px;
    line-height: 1.5;
    transition: background 0.2s;
  }
  .pac-item:first-child { border-top: none; }
  .pac-item:hover { background: rgba(198,169,98,0.1); }
  .pac-item-selected, .pac-item-selected:hover { background: rgba(198,169,98,0.15); }
  .pac-item-query { color: #fff; font-weight: 400; }
  .pac-matched { color: inherit; font-weight: inherit; }
  .pac-icon { display: none; }
  .pac-item span:last-child { color: rgba(255,255,255,0.35); font-size: 12px; }
  .pac-logo::after { margin: 4px 12px; }
`;

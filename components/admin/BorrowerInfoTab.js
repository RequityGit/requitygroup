'use client';

import { formatDate } from '../../lib/format';

export function BorrowerInfoTab({ borrower }) {
  const personalFields = [
    { label: 'First Name', value: borrower.first_name },
    { label: 'Last Name', value: borrower.last_name },
    { label: 'Email', value: borrower.email },
    { label: 'Phone', value: borrower.phone },
    { label: 'Date of Birth', value: formatDate(borrower.date_of_birth) },
    { label: 'SSN Last 4', value: borrower.ssn_last_four ? `••••${borrower.ssn_last_four}` : null },
    { label: 'U.S. Citizen', value: borrower.is_us_citizen ? 'Yes' : 'No' },
  ];

  const addressFields = [
    { label: 'Address', value: [borrower.address_line1, borrower.address_line2].filter(Boolean).join(', ') },
    { label: 'City', value: borrower.city },
    { label: 'State', value: borrower.state },
    { label: 'ZIP', value: borrower.zip },
    { label: 'Country', value: borrower.country },
  ];

  const creditFields = [
    { label: 'Credit Score', value: borrower.credit_score },
    { label: 'Report Date', value: formatDate(borrower.credit_report_date) },
    { label: 'Experience', value: `${borrower.experience_count} deal${borrower.experience_count !== 1 ? 's' : ''}` },
  ];

  return (
    <>
      <div className="admin-form-card">
        <h3>Personal Information</h3>
        <p>Contact and identity details.</p>
        <div className="admin-info-grid">
          {personalFields.map((field) => (
            <div key={field.label} className="admin-info-item">
              <label>{field.label}</label>
              <span>{field.value || '—'}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="admin-form-card">
        <h3>Mailing Address</h3>
        <p>Primary mailing address on file.</p>
        <div className="admin-info-grid">
          {addressFields.map((field) => (
            <div key={field.label} className="admin-info-item">
              <label>{field.label}</label>
              <span>{field.value || '—'}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="admin-form-card">
        <h3>Credit & Experience</h3>
        <p>Financial profile snapshot.</p>
        <div className="admin-info-grid">
          {creditFields.map((field) => (
            <div key={field.label} className="admin-info-item">
              <label>{field.label}</label>
              <span>{field.value || '—'}</span>
            </div>
          ))}
        </div>
      </div>

      {borrower.notes && (
        <div className="admin-form-card">
          <h3>Notes</h3>
          <p style={{ whiteSpace: 'pre-wrap', color: 'rgba(255,255,255,0.6)', marginBottom: 0 }}>
            {borrower.notes}
          </p>
        </div>
      )}
    </>
  );
}

export default BorrowerInfoTab;

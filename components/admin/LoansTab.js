'use client';

import { formatDate } from '../../lib/format';

export function LoansTab({ loans }) {
  if (loans.length === 0) {
    return (
      <div className="admin-form-card" style={{ textAlign: 'center', padding: '48px 24px' }}>
        <p style={{ color: 'rgba(255,255,255,0.4)' }}>
          No loans associated with this borrower yet.
        </p>
      </div>
    );
  }

  return (
    <div className="admin-table-wrap">
      <table className="admin-table">
        <thead>
          <tr>
            <th>Loan ID</th>
            <th>Status</th>
            <th>Loan Type</th>
            <th>Amount</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          {loans.map((loan) => (
            <tr key={loan.id}>
              <td style={{ fontFamily: 'monospace', fontSize: 12 }}>
                {loan.id.slice(0, 8)}...
              </td>
              <td>
                <span className={`admin-badge ${loan.status === 'active' ? 'admin-badge-gold' : 'admin-badge-blue'}`}>
                  {loan.status || 'draft'}
                </span>
              </td>
              <td>{loan.loan_type || '—'}</td>
              <td>
                {loan.loan_amount
                  ? `$${Number(loan.loan_amount).toLocaleString('en-US', { minimumFractionDigits: 0 })}`
                  : '—'}
              </td>
              <td>{formatDate(loan.created_at)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LoansTab;

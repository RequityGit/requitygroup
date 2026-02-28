export const adminStyles = `
  /* ── Admin shared styles ── */
  .admin-page-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 32px;
  }
  .admin-page-title {
    font-family: var(--font-display);
    font-size: 28px;
    font-weight: 500;
    color: #fff;
  }
  .admin-page-title em {
    font-style: italic;
    color: var(--champagne);
    font-weight: 400;
  }
  .admin-page-subtitle {
    font-size: 14px;
    color: rgba(255,255,255,0.4);
    margin-top: 4px;
  }
  .admin-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 10px 20px;
    border-radius: 6px;
    font-family: var(--font-body);
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    text-decoration: none;
    border: none;
  }
  .admin-btn-primary {
    background: var(--champagne);
    color: var(--navy-deep);
  }
  .admin-btn-primary:hover {
    background: var(--champagne-lt);
    transform: translateY(-1px);
  }
  .admin-btn-secondary {
    background: rgba(255,255,255,0.06);
    color: rgba(255,255,255,0.7);
    border: 1px solid rgba(255,255,255,0.1);
  }
  .admin-btn-secondary:hover {
    background: rgba(255,255,255,0.1);
    color: #fff;
  }
  .admin-btn-danger {
    background: rgba(220,38,38,0.1);
    color: #f87171;
    border: 1px solid rgba(220,38,38,0.2);
  }
  .admin-btn-danger:hover {
    background: rgba(220,38,38,0.2);
  }
  .admin-btn-sm {
    padding: 6px 14px;
    font-size: 12px;
  }

  /* ── Search & filters ── */
  .admin-search-bar {
    display: flex;
    gap: 12px;
    margin-bottom: 24px;
    flex-wrap: wrap;
  }
  .admin-search-input {
    flex: 1;
    min-width: 200px;
    padding: 10px 16px;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 6px;
    color: #fff;
    font-family: var(--font-body);
    font-size: 14px;
    transition: border-color 0.2s;
  }
  .admin-search-input::placeholder {
    color: rgba(255,255,255,0.3);
  }
  .admin-search-input:focus {
    outline: none;
    border-color: var(--champagne);
  }
  .admin-select {
    padding: 10px 16px;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 6px;
    color: #fff;
    font-family: var(--font-body);
    font-size: 14px;
    cursor: pointer;
    min-width: 140px;
  }
  .admin-select:focus {
    outline: none;
    border-color: var(--champagne);
  }
  .admin-select option {
    background: var(--navy);
    color: #fff;
  }

  /* ── Table ── */
  .admin-table-wrap {
    background: var(--navy);
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 12px;
    overflow: hidden;
  }
  .admin-table {
    width: 100%;
    border-collapse: collapse;
  }
  .admin-table th {
    text-align: left;
    padding: 14px 16px;
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: rgba(255,255,255,0.4);
    border-bottom: 1px solid rgba(255,255,255,0.06);
    cursor: pointer;
    user-select: none;
    white-space: nowrap;
  }
  .admin-table th:hover {
    color: rgba(255,255,255,0.7);
  }
  .admin-table th.sorted {
    color: var(--champagne);
  }
  .admin-table td {
    padding: 14px 16px;
    font-size: 14px;
    color: rgba(255,255,255,0.7);
    border-bottom: 1px solid rgba(255,255,255,0.04);
  }
  .admin-table tr:last-child td {
    border-bottom: none;
  }
  .admin-table tr:hover td {
    background: rgba(255,255,255,0.02);
  }
  .admin-table-row-link {
    cursor: pointer;
  }

  /* ── Pagination ── */
  .admin-pagination {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    border-top: 1px solid rgba(255,255,255,0.06);
  }
  .admin-pagination-info {
    font-size: 13px;
    color: rgba(255,255,255,0.4);
  }
  .admin-pagination-btns {
    display: flex;
    gap: 8px;
  }
  .admin-pagination-btn {
    padding: 6px 14px;
    border-radius: 6px;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.1);
    color: rgba(255,255,255,0.6);
    font-size: 13px;
    cursor: pointer;
    transition: all 0.2s;
  }
  .admin-pagination-btn:hover:not(:disabled) {
    background: rgba(255,255,255,0.08);
    color: #fff;
  }
  .admin-pagination-btn:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }

  /* ── Empty state ── */
  .admin-empty {
    text-align: center;
    padding: 80px 24px;
  }
  .admin-empty-icon {
    font-size: 48px;
    margin-bottom: 16px;
    opacity: 0.3;
  }
  .admin-empty h3 {
    font-family: var(--font-display);
    font-size: 24px;
    font-weight: 500;
    color: #fff;
    margin-bottom: 8px;
  }
  .admin-empty p {
    font-size: 14px;
    color: rgba(255,255,255,0.4);
    margin-bottom: 24px;
  }

  /* ── Form styles ── */
  .admin-form-card {
    background: var(--navy);
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 12px;
    padding: 32px;
    margin-bottom: 24px;
  }
  .admin-form-card h3 {
    font-family: var(--font-display);
    font-size: 20px;
    font-weight: 500;
    color: #fff;
    margin-bottom: 4px;
  }
  .admin-form-card p {
    font-size: 13px;
    color: rgba(255,255,255,0.35);
    margin-bottom: 24px;
  }
  .admin-form-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }
  .admin-form-grid-3 {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 20px;
  }
  .admin-form-full {
    grid-column: 1 / -1;
  }
  .admin-field {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .admin-label {
    font-size: 12px;
    font-weight: 600;
    color: rgba(255,255,255,0.5);
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }
  .admin-label .required {
    color: var(--champagne);
    margin-left: 2px;
  }
  .admin-input {
    padding: 10px 14px;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 6px;
    color: #fff;
    font-family: var(--font-body);
    font-size: 14px;
    transition: border-color 0.2s;
  }
  .admin-input:focus {
    outline: none;
    border-color: var(--champagne);
  }
  .admin-input::placeholder {
    color: rgba(255,255,255,0.25);
  }
  .admin-input:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  .admin-textarea {
    padding: 10px 14px;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 6px;
    color: #fff;
    font-family: var(--font-body);
    font-size: 14px;
    min-height: 80px;
    resize: vertical;
    transition: border-color 0.2s;
  }
  .admin-textarea:focus {
    outline: none;
    border-color: var(--champagne);
  }
  .admin-checkbox-group {
    display: flex;
    align-items: center;
    gap: 8px;
    padding-top: 8px;
  }
  .admin-checkbox {
    width: 18px;
    height: 18px;
    accent-color: var(--champagne);
    cursor: pointer;
  }
  .admin-checkbox-label {
    font-size: 14px;
    color: rgba(255,255,255,0.7);
    cursor: pointer;
  }
  .admin-form-actions {
    display: flex;
    gap: 12px;
    justify-content: flex-end;
    margin-top: 32px;
    padding-top: 24px;
    border-top: 1px solid rgba(255,255,255,0.06);
  }
  .admin-field-error {
    font-size: 12px;
    color: #f87171;
    margin-top: 2px;
  }
  .admin-toast {
    position: fixed;
    bottom: 24px;
    right: 24px;
    padding: 14px 20px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    z-index: 1000;
    animation: slideUp 0.3s ease;
  }
  .admin-toast-success {
    background: rgba(34,197,94,0.15);
    color: #4ade80;
    border: 1px solid rgba(34,197,94,0.2);
  }
  .admin-toast-error {
    background: rgba(220,38,38,0.15);
    color: #f87171;
    border: 1px solid rgba(220,38,38,0.2);
  }
  @keyframes slideUp {
    from { opacity: 0; transform: translateY(12px); }
    to { opacity: 1; transform: translateY(0); }
  }

  /* ── Detail page ── */
  .admin-detail-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 32px;
  }
  .admin-back-link {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    color: rgba(255,255,255,0.4);
    text-decoration: none;
    font-size: 13px;
    margin-bottom: 12px;
    transition: color 0.2s;
  }
  .admin-back-link:hover {
    color: var(--champagne);
  }
  .admin-detail-name {
    font-family: var(--font-display);
    font-size: 32px;
    font-weight: 500;
    color: #fff;
  }
  .admin-detail-meta {
    display: flex;
    gap: 24px;
    margin-top: 8px;
  }
  .admin-detail-meta span {
    font-size: 13px;
    color: rgba(255,255,255,0.4);
  }
  .admin-detail-meta a {
    color: var(--champagne);
    text-decoration: none;
  }
  .admin-tabs {
    display: flex;
    gap: 4px;
    margin-bottom: 24px;
    border-bottom: 1px solid rgba(255,255,255,0.06);
  }
  .admin-tab {
    padding: 10px 20px;
    font-size: 13px;
    font-weight: 500;
    color: rgba(255,255,255,0.4);
    background: none;
    border: none;
    cursor: pointer;
    border-bottom: 2px solid transparent;
    margin-bottom: -1px;
    transition: all 0.2s;
  }
  .admin-tab:hover {
    color: rgba(255,255,255,0.7);
  }
  .admin-tab.active {
    color: var(--champagne);
    border-bottom-color: var(--champagne);
  }

  /* ── Info grid ── */
  .admin-info-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 20px;
  }
  .admin-info-item label {
    display: block;
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: rgba(255,255,255,0.35);
    margin-bottom: 4px;
  }
  .admin-info-item span {
    font-size: 15px;
    color: rgba(255,255,255,0.8);
  }

  /* ── Badge ── */
  .admin-badge {
    display: inline-flex;
    align-items: center;
    padding: 3px 10px;
    border-radius: 99px;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.03em;
  }
  .admin-badge-gold {
    background: rgba(198,169,98,0.15);
    color: var(--champagne);
  }
  .admin-badge-blue {
    background: rgba(59,130,246,0.15);
    color: #60a5fa;
  }

  /* ── Entity card ── */
  .admin-entity-card {
    background: rgba(255,255,255,0.02);
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 10px;
    padding: 20px;
    transition: border-color 0.2s;
  }
  .admin-entity-card:hover {
    border-color: rgba(255,255,255,0.12);
  }
  .admin-entity-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 16px;
  }
  .admin-entity-name {
    font-size: 16px;
    font-weight: 600;
    color: #fff;
  }
  .admin-entity-type {
    font-size: 12px;
    color: rgba(255,255,255,0.4);
    margin-top: 2px;
  }
  .admin-entity-actions {
    display: flex;
    gap: 8px;
  }
  .admin-entity-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }
  .admin-entity-field label {
    display: block;
    font-size: 10px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: rgba(255,255,255,0.3);
    margin-bottom: 2px;
  }
  .admin-entity-field span {
    font-size: 13px;
    color: rgba(255,255,255,0.6);
  }

  /* ── Loading ── */
  .admin-loading {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 80px 24px;
    color: rgba(255,255,255,0.4);
    font-size: 14px;
  }
  .admin-spinner {
    width: 24px;
    height: 24px;
    border: 2px solid rgba(255,255,255,0.1);
    border-top-color: var(--champagne);
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
    margin-right: 12px;
  }
  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  /* ── Modal ── */
  .admin-modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    animation: fadeIn 0.2s ease;
  }
  .admin-modal {
    background: var(--navy);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 12px;
    padding: 32px;
    width: 90%;
    max-width: 600px;
    max-height: 85vh;
    overflow-y: auto;
  }
  .admin-modal h3 {
    font-family: var(--font-display);
    font-size: 22px;
    font-weight: 500;
    color: #fff;
    margin-bottom: 24px;
  }

  /* ── Responsive ── */
  @media (max-width: 768px) {
    .admin-form-grid { grid-template-columns: 1fr; }
    .admin-form-grid-3 { grid-template-columns: 1fr; }
    .admin-page-header { flex-direction: column; gap: 16px; align-items: flex-start; }
    .admin-search-bar { flex-direction: column; }
    .admin-detail-header { flex-direction: column; gap: 16px; }
    .admin-entity-grid { grid-template-columns: 1fr; }
    .admin-info-grid { grid-template-columns: 1fr 1fr; }
  }
`;

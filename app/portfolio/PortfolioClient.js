'use client';

import { useState } from 'react';

export default function PortfolioClient({ properties, propertyTypes }) {
  const [filter, setFilter] = useState('All');
  const filtered = filter === 'All' ? properties : properties.filter((p) => p.propertyType === filter);

  return (
    <>
      <style>{portfolioStyles}</style>

      <section className="pf-section">
        <div className="container">
          {/* Filters */}
          {propertyTypes.length > 1 && (
            <div className="pf-filters">
              <button
                className={`pf-filter-btn ${filter === 'All' ? 'active' : ''}`}
                onClick={() => setFilter('All')}
              >
                All Properties
              </button>
              {propertyTypes.map((type) => (
                <button
                  key={type}
                  className={`pf-filter-btn ${filter === type ? 'active' : ''}`}
                  onClick={() => setFilter(type)}
                >
                  {type}
                </button>
              ))}
            </div>
          )}

          {/* Stats Bar */}
          <div className="pf-stats">
            <div className="pf-stat">
              <span className="pf-stat-value">{filtered.length}</span>
              <span className="pf-stat-label">{filtered.length === 1 ? 'Property' : 'Properties'}</span>
            </div>
            {propertyTypes.length > 0 && filter === 'All' && (
              <div className="pf-stat">
                <span className="pf-stat-value">{propertyTypes.length}</span>
                <span className="pf-stat-label">Asset Classes</span>
              </div>
            )}
          </div>

          {/* Grid */}
          <div className="pf-grid">
            {filtered.map((property, i) => (
              <div key={property.id} className="pf-card" style={{ animationDelay: `${i * 0.08}s` }}>
                <div className="pf-card-image">
                  {property.imageUrl ? (
                    <img src={property.imageUrl} alt={property.name} loading="lazy" />
                  ) : (
                    <div className="pf-card-placeholder">
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M21 15l-5-5L5 21" /></svg>
                    </div>
                  )}
                  <div className="pf-card-overlay">
                    {property.propertyType && (
                      <span className="pf-card-badge">{property.propertyType}</span>
                    )}
                    {property.status && (
                      <span className="pf-card-status">{property.status}</span>
                    )}
                  </div>
                </div>
                <div className="pf-card-body">
                  <h3 className="pf-card-name">{property.name}</h3>
                  {property.location && (
                    <div className="pf-card-location">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>
                      {property.location}
                    </div>
                  )}
                  <div className="pf-card-details">
                    {property.units && (
                      <div className="pf-card-detail">
                        <span className="pf-detail-label">Units</span>
                        <span className="pf-detail-value">{property.units}</span>
                      </div>
                    )}
                    {property.acreage && (
                      <div className="pf-card-detail">
                        <span className="pf-detail-label">Acreage</span>
                        <span className="pf-detail-value">{property.acreage}</span>
                      </div>
                    )}
                    {property.yearAcquired && (
                      <div className="pf-card-detail">
                        <span className="pf-detail-label">Acquired</span>
                        <span className="pf-detail-value">{property.yearAcquired}</span>
                      </div>
                    )}
                  </div>
                  {property.description && (
                    <p className="pf-card-desc">{property.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '60px 0' }}>
              <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 16 }}>
                No properties found for this filter.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

const portfolioStyles = `
  .pf-section {
    padding: 0 0 100px;
  }

  /* Filters */
  .pf-filters {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    margin-bottom: 32px;
    padding-bottom: 24px;
    border-bottom: 1px solid rgba(255,255,255,0.06);
  }
  .pf-filter-btn {
    padding: 10px 22px;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.08);
    color: rgba(255,255,255,0.5);
    font-family: inherit;
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 0.5px;
    cursor: pointer;
    transition: all 0.3s;
  }
  .pf-filter-btn:hover {
    border-color: rgba(201, 168, 76, 0.3);
    color: rgba(255,255,255,0.8);
  }
  .pf-filter-btn.active {
    background: rgba(201, 168, 76, 0.1);
    border-color: var(--gold);
    color: var(--gold);
  }

  /* Stats */
  .pf-stats {
    display: flex;
    gap: 40px;
    margin-bottom: 40px;
  }
  .pf-stat {
    display: flex;
    align-items: baseline;
    gap: 8px;
  }
  .pf-stat-value {
    font-family: var(--font-display);
    font-size: 32px;
    font-weight: 300;
    color: var(--gold);
  }
  .pf-stat-label {
    font-size: 13px;
    color: rgba(255,255,255,0.4);
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  /* Grid */
  .pf-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
    gap: 24px;
  }
  @media (max-width: 480px) {
    .pf-grid { grid-template-columns: 1fr; }
  }

  /* Card */
  .pf-card {
    background: rgba(255,255,255,0.02);
    border: 1px solid rgba(255,255,255,0.06);
    overflow: hidden;
    transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
    animation: cardIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    opacity: 0;
  }
  @keyframes cardIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .pf-card:hover {
    border-color: rgba(201, 168, 76, 0.2);
    transform: translateY(-4px);
    box-shadow: 0 16px 48px rgba(0,0,0,0.3);
  }

  /* Card Image */
  .pf-card-image {
    position: relative;
    aspect-ratio: 16/10;
    overflow: hidden;
    background: rgba(255,255,255,0.03);
  }
  .pf-card-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .pf-card:hover .pf-card-image img { transform: scale(1.06); }
  .pf-card-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgba(255,255,255,0.1);
  }

  /* Card Overlay */
  .pf-card-overlay {
    position: absolute;
    top: 16px;
    left: 16px;
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }
  .pf-card-badge {
    padding: 5px 14px;
    background: rgba(10, 15, 26, 0.8);
    backdrop-filter: blur(8px);
    border: 1px solid rgba(201, 168, 76, 0.2);
    font-size: 11px;
    font-weight: 600;
    color: var(--gold);
    text-transform: uppercase;
    letter-spacing: 1px;
  }
  .pf-card-status {
    padding: 5px 14px;
    background: rgba(10, 15, 26, 0.8);
    backdrop-filter: blur(8px);
    font-size: 11px;
    font-weight: 500;
    color: rgba(255,255,255,0.6);
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  /* Card Body */
  .pf-card-body {
    padding: 24px;
  }
  .pf-card-name {
    font-family: var(--font-display);
    font-size: 24px;
    font-weight: 400;
    margin-bottom: 8px;
    line-height: 1.25;
    color: #fff;
  }
  .pf-card-location {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 13px;
    color: var(--gold);
    margin-bottom: 16px;
    letter-spacing: 0.5px;
  }
  .pf-card-details {
    display: flex;
    gap: 20px;
    padding: 16px 0;
    border-top: 1px solid rgba(255,255,255,0.06);
    border-bottom: 1px solid rgba(255,255,255,0.06);
    margin-bottom: 12px;
  }
  .pf-card-detail {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  .pf-detail-label {
    font-size: 10px;
    color: rgba(255,255,255,0.35);
    text-transform: uppercase;
    letter-spacing: 1px;
  }
  .pf-detail-value {
    font-size: 15px;
    font-weight: 500;
    color: #fff;
  }
  .pf-card-desc {
    font-size: 14px;
    color: rgba(255,255,255,0.45);
    line-height: 1.6;
    font-weight: 300;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`;

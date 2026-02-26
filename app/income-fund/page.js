'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function IncomeFundPage() {
  useEffect(() => {
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) e.target.classList.add('visible');
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    reveals.forEach(el => observer.observe(el));

    const mobileToggle = document.getElementById('mobileToggle');
    const navLinks = document.getElementById('navLinks');
    mobileToggle?.addEventListener('click', () => navLinks?.classList.toggle('open'));
    navLinks?.querySelectorAll('a').forEach(l =>
      l.addEventListener('click', () => navLinks?.classList.remove('open'))
    );

    return () => observer.disconnect();
  }, []);

  const ArrowIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  return (
    <>
      <style>{fundPageStyles}</style>

      {/* Navigation */}
      <nav id="navbar" className="scrolled">
        <div className="container">
          <Link href="/" className="nav-logo">REQUIT<span>Y</span></Link>
          <ul className="nav-links" id="navLinks">
            <li><Link href="/income-fund" style={{ color: 'var(--gold)' }}>Income Fund</Link></li>
            <li><Link href="/lending">Lending</Link></li>
            <li><Link href="/portfolio">Portfolio</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/insights">Insights</Link></li>
            <li><a href="https://investors.appfolioim.com/trg/investor/login">Investor Login</a></li>
            <li><Link href="/#invest" className="nav-cta">Invest With Us</Link></li>
          </ul>
          <button className="mobile-toggle" id="mobileToggle" aria-label="Menu">
            <span></span><span></span><span></span>
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="if-hero">
        <div className="container">
          <div className="if-hero-grid">
            <div className="if-hero-content">
              <div className="section-eyebrow" style={{ opacity: 0, animation: 'fadeUp 0.8s 0.2s forwards' }}>Income Fund</div>
              <h1 style={{ opacity: 0, animation: 'fadeUp 0.8s 0.4s forwards' }}>Consistent Returns,<br />Backed by <em>Real Assets</em></h1>
              <p className="if-hero-desc" style={{ opacity: 0, animation: 'fadeUp 0.8s 0.6s forwards' }}>
                The Requity Income Fund provides accredited investors with access to a diversified portfolio of real estate debt and equity positions, generating consistent monthly distributions backed by tangible assets.
              </p>
              <div className="if-hero-actions" style={{ opacity: 0, animation: 'fadeUp 0.8s 0.8s forwards' }}>
                <a href="#invest" className="btn-primary">Request Information <ArrowIcon /></a>
                <a href="https://investors.appfolioim.com/trg/investor/login" className="btn-secondary">Investor Login</a>
              </div>
            </div>
            <div className="if-hero-card" style={{ opacity: 0, animation: 'fadeIn 1s 0.6s forwards' }}>
              <div className="fund-card">
                <div className="fund-card-label">Now Open to Investors</div>
                <div className="fund-card-title">Requity Income Fund</div>
                <p className="fund-card-desc">A diversified real estate credit fund targeting consistent monthly income backed by tangible assets with conservative underwriting.</p>
                <div className="if-card-stats-grid">
                  <div className="if-card-stat">
                    <div className="if-card-stat-value">$70M+</div>
                    <div className="if-card-stat-label">Capital Raised</div>
                  </div>
                  <div className="if-card-stat">
                    <div className="if-card-stat-value">Monthly</div>
                    <div className="if-card-stat-label">Distributions</div>
                  </div>
                  <div className="if-card-stat">
                    <div className="if-card-stat-value">32</div>
                    <div className="if-card-stat-label">Properties</div>
                  </div>
                  <div className="if-card-stat">
                    <div className="if-card-stat-value">$150M+</div>
                    <div className="if-card-stat-label">AUM</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="if-benefits">
        <div className="container">
          <div className="if-benefits-header reveal">
            <div className="section-eyebrow">Why the Income Fund</div>
            <h2 className="section-title">Built for Income-Focused Investors</h2>
            <p className="section-desc">Our fund is designed to deliver reliable monthly cash flow while maintaining the safety and security of real asset backing.</p>
          </div>
          <div className="if-benefits-grid">
            <div className="if-benefit-card reveal reveal-delay-1">
              <div className="if-benefit-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
                </svg>
              </div>
              <h3>Monthly Distributions</h3>
              <p>Receive consistent monthly cash flow deposited directly to your account. Our distributions have been paid on time, every month, since inception.</p>
            </div>
            <div className="if-benefit-card reveal reveal-delay-2">
              <div className="if-benefit-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3>Asset-Backed Security</h3>
              <p>Every dollar in the fund is secured by tangible real estate assets with conservative loan-to-value ratios. Your capital is protected by real property.</p>
            </div>
            <div className="if-benefit-card reveal reveal-delay-3">
              <div className="if-benefit-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3>Proven Track Record</h3>
              <p>Over $70M in investor capital raised and deployed across 70+ loans with consistent performance through all market conditions.</p>
            </div>
            <div className="if-benefit-card reveal reveal-delay-1">
              <div className="if-benefit-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                  <line x1="9" y1="9" x2="9.01" y2="9" />
                  <line x1="15" y1="9" x2="15.01" y2="9" />
                </svg>
              </div>
              <h3>Investor-First Approach</h3>
              <p>Transparent reporting, consistent communication, and detailed property-level updates. You always know exactly where your money is working.</p>
            </div>
            <div className="if-benefit-card reveal reveal-delay-2">
              <div className="if-benefit-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2zM22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" />
                </svg>
              </div>
              <h3>Operational Expertise</h3>
              <p>We don&apos;t just lend — we operate. Our deep real estate expertise means smarter underwriting, better asset selection, and superior risk management.</p>
            </div>
            <div className="if-benefit-card reveal reveal-delay-3">
              <div className="if-benefit-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="3" width="7" height="7" />
                  <rect x="14" y="3" width="7" height="7" />
                  <rect x="3" y="14" width="7" height="7" />
                  <rect x="14" y="14" width="7" height="7" />
                </svg>
              </div>
              <h3>Diversified Portfolio</h3>
              <p>Capital deployed across multiple loans, property types, and geographic markets — reducing concentration risk and enhancing stability.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="if-process">
        <div className="container">
          <div className="if-process-header reveal">
            <div className="section-eyebrow">How It Works</div>
            <h2 className="section-title">Simple, Transparent Investing</h2>
          </div>
          <div className="if-process-grid">
            <div className="if-process-step reveal reveal-delay-1">
              <div className="if-process-number">01</div>
              <h3>Request Information</h3>
              <p>Submit your interest and our investor relations team will provide you with the fund offering documents and answer any questions.</p>
            </div>
            <div className="if-process-connector reveal">
              <svg width="40" height="2" viewBox="0 0 40 2"><line x1="0" y1="1" x2="40" y2="1" stroke="rgba(201,168,76,0.3)" strokeWidth="1" strokeDasharray="4 4" /></svg>
            </div>
            <div className="if-process-step reveal reveal-delay-2">
              <div className="if-process-number">02</div>
              <h3>Review &amp; Subscribe</h3>
              <p>Review the private placement memorandum, complete the subscription agreement, and fund your investment through our secure portal.</p>
            </div>
            <div className="if-process-connector reveal">
              <svg width="40" height="2" viewBox="0 0 40 2"><line x1="0" y1="1" x2="40" y2="1" stroke="rgba(201,168,76,0.3)" strokeWidth="1" strokeDasharray="4 4" /></svg>
            </div>
            <div className="if-process-step reveal reveal-delay-3">
              <div className="if-process-number">03</div>
              <h3>Earn Monthly Income</h3>
              <p>Begin receiving monthly distributions deposited directly to your account, with full transparency into fund performance and portfolio activity.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Composition */}
      <section className="if-composition">
        <div className="container">
          <div className="if-composition-grid">
            <div className="reveal">
              <div className="section-eyebrow">Fund Composition</div>
              <h2 className="section-title">Where Your Capital Works</h2>
              <p className="section-desc">The Income Fund deploys capital across a diversified mix of real estate debt and equity positions, focusing on asset types where our operational expertise provides an information advantage.</p>
              <div className="if-asset-list">
                <div className="if-asset-item">
                  <div className="if-asset-dot"></div>
                  <div>
                    <h4>Bridge Loans</h4>
                    <p>Short-term financing to real estate operators for acquisitions and renovations, secured by the underlying property.</p>
                  </div>
                </div>
                <div className="if-asset-item">
                  <div className="if-asset-dot"></div>
                  <div>
                    <h4>Manufactured Housing</h4>
                    <p>Debt and equity positions in manufactured housing communities — a resilient, affordable housing asset class.</p>
                  </div>
                </div>
                <div className="if-asset-item">
                  <div className="if-asset-dot"></div>
                  <div>
                    <h4>RV Parks &amp; Campgrounds</h4>
                    <p>Investments in outdoor hospitality properties benefiting from long-term secular demand growth.</p>
                  </div>
                </div>
                <div className="if-asset-item">
                  <div className="if-asset-dot"></div>
                  <div>
                    <h4>Multifamily Residential</h4>
                    <p>Apartment and multifamily positions in high-growth Southeast markets with strong fundamentals.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="reveal reveal-delay-2">
              <div className="if-composition-card">
                <h3>Fund Highlights</h3>
                <div className="if-highlight-row">
                  <span>Structure</span>
                  <strong>Reg D 506(c) Fund</strong>
                </div>
                <div className="if-highlight-row">
                  <span>Investor Type</span>
                  <strong>Accredited Investors</strong>
                </div>
                <div className="if-highlight-row">
                  <span>Distributions</span>
                  <strong>Monthly</strong>
                </div>
                <div className="if-highlight-row">
                  <span>Reporting</span>
                  <strong>Monthly + Quarterly</strong>
                </div>
                <div className="if-highlight-row">
                  <span>Investor Portal</span>
                  <strong>AppFolio Investment Manager</strong>
                </div>
                <div className="if-highlight-row">
                  <span>Fund Admin</span>
                  <strong>Third-Party Audited</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="if-testimonials">
        <div className="container">
          <div className="if-testimonials-header reveal">
            <div className="section-eyebrow">Investor Testimonials</div>
            <h2 className="section-title">What Our Investors Say</h2>
          </div>
        </div>
        <div style={{ maxWidth: '100%', padding: '0 48px' }}>
          <div className="testimonial-track">
            <div className="testimonial-card"><div className="testimonial-quote">&ldquo;</div><p className="testimonial-text">I have invested as an LP alongside Dylan and the Requity Group team across multiple asset classes over several geographic markets. Their reporting style and communication cadence is timely, consistent, and detailed, and I always feel well-informed on my investments.</p><div className="testimonial-stars">&#9733; &#9733; &#9733; &#9733; &#9733;</div><div className="testimonial-author">Todd G.</div><div className="testimonial-role">Limited Partner</div></div>
            <div className="testimonial-card"><div className="testimonial-quote">&ldquo;</div><p className="testimonial-text">As a seasoned real estate investor with over 18 years of experience, I have worked with a wide variety of operators. What stands out about Dylan and the team at Requity is their detailed property-level reporting and consistent communication.</p><div className="testimonial-stars">&#9733; &#9733; &#9733; &#9733; &#9733;</div><div className="testimonial-author">Ben E.</div><div className="testimonial-role">Limited Partner</div></div>
            <div className="testimonial-card"><div className="testimonial-quote">&ldquo;</div><p className="testimonial-text">This group is one of the only that have consistently overdelivered — sometimes substantially — on their projections. Their team is highly responsive and provides clear and consistent investor updates.</p><div className="testimonial-stars">&#9733; &#9733; &#9733; &#9733; &#9733;</div><div className="testimonial-author">Marshall F.</div><div className="testimonial-role">Limited Partner</div></div>
            <div className="testimonial-card"><div className="testimonial-quote">&ldquo;</div><p className="testimonial-text">I&apos;ve invested in 22 private real estate syndications with 18 different sponsors over the last 6 years. Dylan Marma and the team at TRG have earned the spot of my very favorite syndication sponsor.</p><div className="testimonial-stars">&#9733; &#9733; &#9733; &#9733; &#9733;</div><div className="testimonial-author">Russell R.</div><div className="testimonial-role">Limited Partner</div></div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section" id="invest">
        <div className="container">
          <div className="reveal">
            <div className="section-eyebrow">Get Started</div>
            <h2 className="section-title">Ready to Earn Monthly Income?</h2>
            <p className="section-desc" style={{ maxWidth: 560, margin: '0 auto 48px', textAlign: 'center' }}>
              Join our community of sophisticated investors earning consistent, asset-backed returns. Request information today and our team will be in touch.
            </p>
            <Link href="/apply-to-invest" className="btn-primary">
              Apply to Invest <ArrowIcon />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <Link href="/" className="nav-logo" style={{ fontSize: 24 }}>REQUIT<span style={{ color: 'var(--gold)' }}>Y</span></Link>
              <p>A vertically integrated real estate investment company applying operational expertise to small-cap real estate.</p>
            </div>
            <div className="footer-col"><h4>Invest</h4><Link href="/income-fund">Income Fund</Link><Link href="/apply-to-invest">Apply to Invest</Link><a href="https://investors.appfolioim.com/trg/investor/login">Investor Login</a><Link href="/portfolio">Portfolio</Link></div>
            <div className="footer-col"><h4>Lending</h4><Link href="/lending">Loan Programs</Link><Link href="/apply">Loan Request</Link><Link href="/apply">Apply for a Loan</Link></div>
            <div className="footer-col"><h4>Company</h4><Link href="/about">About</Link><Link href="/insights">Insights</Link></div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2026 Requity Group. All rights reserved.</p>
            <div className="footer-contact"><a href="tel:+18132880636">813.288.0636</a> &middot; <a href="mailto:contact@requitygroup.com">contact@requitygroup.com</a><br />401 E Jackson St, Suite 3300, Tampa, FL 33602</div>
          </div>
        </div>
      </footer>

      {/* Disclaimer */}
      <div className="if-disclaimer">
        <div className="container">
          <p>This page is for informational purposes only and does not constitute an offer to sell or a solicitation of an offer to buy any securities. Offers are made only to accredited investors through the fund&apos;s private placement memorandum. Past performance is not indicative of future results. All investments involve risk, including the potential loss of principal.</p>
        </div>
      </div>
    </>
  );
}

const fundPageStyles = `
  /* Hero */
  .if-hero {
    min-height: 100vh;
    display: flex;
    align-items: center;
    position: relative;
    overflow: hidden;
    background: linear-gradient(165deg, var(--navy) 0%, #0d1424 50%, var(--navy-light) 100%);
  }
  .if-hero::before {
    content: '';
    position: absolute;
    top: -30%;
    right: -15%;
    width: 700px;
    height: 700px;
    background: radial-gradient(circle, rgba(201, 168, 76, 0.08) 0%, transparent 70%);
    pointer-events: none;
  }
  .if-hero::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(201, 168, 76, 0.2), transparent);
  }
  .if-hero-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 80px;
    align-items: center;
    padding: 140px 0 100px;
  }
  .if-hero h1 {
    font-family: var(--font-display);
    font-size: clamp(40px, 5vw, 62px);
    font-weight: 300;
    line-height: 1.1;
    margin-bottom: 28px;
  }
  .if-hero h1 em {
    font-style: italic;
    color: var(--gold);
  }
  .if-hero-desc {
    font-size: 17px;
    line-height: 1.75;
    color: var(--text-secondary);
    max-width: 520px;
    margin-bottom: 40px;
    font-weight: 300;
  }
  .if-hero-actions {
    display: flex;
    gap: 20px;
    align-items: center;
  }
  @media (max-width: 968px) {
    .if-hero-grid { grid-template-columns: 1fr; gap: 48px; padding: 120px 0 60px; }
    .if-hero-actions { flex-direction: column; align-items: flex-start; }
  }

  /* Hero Card */
  .if-hero-card .fund-card {
    background: rgba(255,255,255,0.02);
    border: 1px solid rgba(255,255,255,0.06);
    padding: 48px;
    position: relative;
    overflow: hidden;
  }
  .if-hero-card .fund-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 2px;
    background: var(--gold);
  }
  .if-card-stats-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
    padding-top: 32px;
    border-top: 1px solid rgba(255,255,255,0.06);
  }
  .if-card-stat-value {
    font-family: var(--font-display);
    font-size: 28px;
    font-weight: 300;
    color: var(--gold);
    margin-bottom: 4px;
  }
  .if-card-stat-label {
    font-size: 11px;
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 1.5px;
  }
  @media (max-width: 968px) {
    .if-hero-card .fund-card { padding: 36px; }
  }

  /* Benefits */
  .if-benefits {
    background: var(--navy-light);
    border-top: 1px solid rgba(255,255,255,0.04);
    border-bottom: 1px solid rgba(255,255,255,0.04);
  }
  .if-benefits-header { margin-bottom: 72px; }
  .if-benefits-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2px;
  }
  .if-benefit-card {
    padding: 48px 40px;
    background: rgba(255,255,255,0.02);
    border: 1px solid rgba(255,255,255,0.04);
    transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
    position: relative;
    overflow: hidden;
  }
  .if-benefit-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: var(--gold);
    transform: scaleX(0);
    transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .if-benefit-card:hover::before { transform: scaleX(1); }
  .if-benefit-card:hover {
    background: rgba(201, 168, 76, 0.04);
    transform: translateY(-4px);
  }
  .if-benefit-icon {
    width: 56px;
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid rgba(201, 168, 76, 0.3);
    color: var(--gold);
    margin-bottom: 28px;
  }
  .if-benefit-card h3 {
    font-family: var(--font-display);
    font-size: 24px;
    font-weight: 400;
    margin-bottom: 14px;
    letter-spacing: 0.5px;
  }
  .if-benefit-card p {
    font-size: 15px;
    line-height: 1.7;
    color: var(--text-secondary);
    font-weight: 300;
  }
  @media (max-width: 968px) {
    .if-benefits-grid { grid-template-columns: 1fr; }
    .if-benefit-card { padding: 36px 28px; }
  }

  /* Process */
  .if-process {
    background: var(--navy);
  }
  .if-process-header {
    text-align: center;
    margin-bottom: 80px;
  }
  .if-process-header .section-title {
    max-width: 600px;
    margin: 0 auto 20px;
  }
  .if-process-grid {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    gap: 0;
  }
  .if-process-step {
    flex: 1;
    max-width: 320px;
    text-align: center;
    padding: 0 24px;
  }
  .if-process-number {
    font-family: var(--font-display);
    font-size: 56px;
    font-weight: 300;
    color: rgba(201, 168, 76, 0.2);
    line-height: 1;
    margin-bottom: 24px;
  }
  .if-process-step h3 {
    font-family: var(--font-display);
    font-size: 24px;
    font-weight: 400;
    margin-bottom: 16px;
  }
  .if-process-step p {
    font-size: 15px;
    line-height: 1.7;
    color: var(--text-secondary);
    font-weight: 300;
  }
  .if-process-connector {
    display: flex;
    align-items: center;
    padding-top: 28px;
    flex-shrink: 0;
  }
  @media (max-width: 768px) {
    .if-process-grid { flex-direction: column; align-items: center; gap: 40px; }
    .if-process-connector { transform: rotate(90deg); }
  }

  /* Composition */
  .if-composition {
    background: var(--navy-light);
    border-top: 1px solid rgba(255,255,255,0.04);
    border-bottom: 1px solid rgba(255,255,255,0.04);
  }
  .if-composition-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 80px;
    align-items: start;
  }
  .if-asset-list {
    display: flex;
    flex-direction: column;
    gap: 28px;
    margin-top: 40px;
  }
  .if-asset-item {
    display: flex;
    gap: 20px;
    align-items: flex-start;
  }
  .if-asset-dot {
    width: 10px;
    height: 10px;
    min-width: 10px;
    background: var(--gold);
    margin-top: 6px;
  }
  .if-asset-item h4 {
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 6px;
  }
  .if-asset-item p {
    font-size: 14px;
    color: var(--text-secondary);
    line-height: 1.6;
    font-weight: 300;
  }
  .if-composition-card {
    background: rgba(255,255,255,0.02);
    border: 1px solid rgba(255,255,255,0.06);
    position: relative;
    overflow: hidden;
    position: sticky;
    top: 120px;
  }
  .if-composition-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 2px;
    background: var(--gold);
  }
  .if-composition-card h3 {
    font-family: var(--font-display);
    font-size: 24px;
    font-weight: 400;
    padding: 32px 36px;
    border-bottom: 1px solid rgba(255,255,255,0.06);
  }
  .if-highlight-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 18px 36px;
    border-bottom: 1px solid rgba(255,255,255,0.04);
  }
  .if-highlight-row:last-child { border-bottom: none; }
  .if-highlight-row span {
    font-size: 14px;
    color: var(--text-muted);
  }
  .if-highlight-row strong {
    font-size: 14px;
    color: var(--white);
    font-weight: 500;
  }
  @media (max-width: 968px) {
    .if-composition-grid { grid-template-columns: 1fr; gap: 48px; }
    .if-composition-card { position: static; }
  }

  /* Testimonials */
  .if-testimonials {
    background: var(--navy);
    overflow: hidden;
  }
  .if-testimonials-header { margin-bottom: 64px; }

  /* Disclaimer */
  .if-disclaimer {
    background: var(--navy-light);
    padding: 24px 0;
    border-top: 1px solid rgba(255,255,255,0.04);
  }
  .if-disclaimer p {
    font-size: 11px;
    color: var(--text-muted);
    line-height: 1.7;
    max-width: 800px;
  }
`;

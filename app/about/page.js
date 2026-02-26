'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function AboutPage() {
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
      <style>{aboutPageStyles}</style>

      {/* Navigation */}
      <nav id="navbar" className="scrolled">
        <div className="container">
          <Link href="/" className="nav-logo">REQUIT<span>Y</span></Link>
          <ul className="nav-links" id="navLinks">
            <li><Link href="/income-fund">Income Fund</Link></li>
            <li><Link href="/lending">Lending</Link></li>
            <li><Link href="/portfolio">Portfolio</Link></li>
            <li><Link href="/about" style={{ color: 'var(--gold)' }}>About</Link></li>
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
      <section className="ab-hero">
        <div className="container">
          <div className="ab-hero-content">
            <div className="section-eyebrow" style={{ opacity: 0, animation: 'fadeUp 0.8s 0.2s forwards' }}>About Requity</div>
            <h1 style={{ opacity: 0, animation: 'fadeUp 0.8s 0.4s forwards' }}>Operational Expertise.<br /><em>Investor-First</em> Approach.</h1>
            <p className="ab-hero-desc" style={{ opacity: 0, animation: 'fadeUp 0.8s 0.6s forwards' }}>
              Requity Group is a vertically integrated real estate investment company that applies deep operational expertise to small-cap real estate. We create value in niche markets that institutional capital cannot efficiently pursue.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="ab-mission">
        <div className="container">
          <div className="ab-mission-grid">
            <div className="reveal">
              <div className="section-eyebrow">Our Mission</div>
              <h2 className="section-title">Creating Value Through<br />Vertically Integrated Operations</h2>
              <p className="section-desc">From acquisitions to operations to lending, we control every element of the value chain. This integrated approach allows us to deliver superior risk-adjusted returns while maintaining the transparency and communication our investors expect.</p>
            </div>
            <div className="ab-mission-stats reveal reveal-delay-2">
              <div className="ab-stat-item">
                <div className="ab-stat-value">$150M+</div>
                <div className="ab-stat-label">Assets Under Management</div>
              </div>
              <div className="ab-stat-item">
                <div className="ab-stat-value">32</div>
                <div className="ab-stat-label">Properties Acquired</div>
              </div>
              <div className="ab-stat-item">
                <div className="ab-stat-value">70+</div>
                <div className="ab-stat-label">Loans Originated</div>
              </div>
              <div className="ab-stat-item">
                <div className="ab-stat-value">3,000+</div>
                <div className="ab-stat-label">Units Transacted</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="ab-services">
        <div className="container">
          <div className="ab-services-header reveal">
            <div className="section-eyebrow">What We Do</div>
            <h2 className="section-title">Three Pillars of Our Platform</h2>
            <p className="section-desc">Our vertically integrated model spans three core competencies, each reinforcing the others to create a resilient and high-performing investment platform.</p>
          </div>
          <div className="ab-services-grid">
            <div className="ab-service-card reveal reveal-delay-1">
              <div className="ab-service-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div className="ab-service-number">01</div>
              <h3>Invest</h3>
              <p>We source the majority of our acquisitions off-market through our extensive network and direct outreach strategies. Our focus on manufactured housing, RV parks, and multifamily assets in the Southeast allows us to find value where institutional capital cannot.</p>
              <Link href="/income-fund" className="ab-service-link">Income Fund <ArrowIcon /></Link>
            </div>
            <div className="ab-service-card reveal reveal-delay-2">
              <div className="ab-service-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div className="ab-service-number">02</div>
              <h3>Operate</h3>
              <p>Each acquisition is managed by TRG Living, our subsidiary property management company. We rigorously execute on property improvement programs with decades of combined operational experience, ensuring every asset reaches its full potential.</p>
              <Link href="/portfolio" className="ab-service-link">View Portfolio <ArrowIcon /></Link>
            </div>
            <div className="ab-service-card reveal reveal-delay-3">
              <div className="ab-service-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
                </svg>
              </div>
              <div className="ab-service-number">03</div>
              <h3>Lend</h3>
              <p>We provide structured credit solutions to real estate operators, backed by asset-level underwriting and operational insight. Our lending arm generates consistent yield for income-focused investors through the Requity Income Fund.</p>
              <Link href="/lending" className="ab-service-link">Loan Programs <ArrowIcon /></Link>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="ab-team">
        <div className="container">
          <div className="ab-team-header reveal">
            <div className="section-eyebrow">Leadership</div>
            <h2 className="section-title">Meet Our Team</h2>
            <p className="section-desc">A seasoned team of real estate professionals with deep operational expertise across acquisitions, asset management, and investor relations.</p>
          </div>
          <div className="ab-team-grid">
            <div className="ab-team-card reveal reveal-delay-1">
              <div className="ab-team-photo">
                <div className="ab-team-initials">DM</div>
              </div>
              <h3>Dylan Marma, CCIM</h3>
              <div className="ab-team-role">Principal &amp; CEO</div>
              <p>Dylan leads Requity Group&apos;s investment strategy and portfolio management. With principal investments totaling over $150 million across 750+ multifamily apartments and 2,000+ manufactured housing and RV sites, he brings deep expertise in small-cap commercial real estate. Dylan holds a degree in Accounting and Finance from the University at Albany.</p>
            </div>
            <div className="ab-team-card reveal reveal-delay-2">
              <div className="ab-team-photo">
                <div className="ab-team-initials">CD</div>
              </div>
              <h3>Charlie DeHart</h3>
              <div className="ab-team-role">Principal</div>
              <p>Charlie co-manages the company alongside Dylan, driving strategy around deal structure, investor alignment, and portfolio growth. His focus on creating reliable returns, simple deal structures, and transparent reporting is central to how Requity operates.</p>
            </div>
            <div className="ab-team-card reveal reveal-delay-3">
              <div className="ab-team-photo">
                <div className="ab-team-initials">JV</div>
              </div>
              <h3>Jet van Aardt</h3>
              <div className="ab-team-role">Asset Manager</div>
              <p>As Asset Manager with a focus on operations, Jet is responsible for identifying and executing strategic initiatives across the portfolio. His mission is to create organizational focus and accountability, remove obstacles, and drive operational excellence across all properties.</p>
            </div>
            <div className="ab-team-card reveal reveal-delay-1">
              <div className="ab-team-photo">
                <div className="ab-team-initials">LV</div>
              </div>
              <h3>Luis Velez</h3>
              <div className="ab-team-role">Head of Investor Relations</div>
              <p>Luis leads investor relations at Requity, serving as the primary point of contact for current and prospective investors. He ensures the transparent communication and detailed reporting that Requity&apos;s investors have come to expect.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="ab-values">
        <div className="container">
          <div className="ab-values-header reveal">
            <div className="section-eyebrow">Our Principles</div>
            <h2 className="section-title">What Drives Us</h2>
          </div>
          <div className="ab-values-grid">
            <div className="ab-value-card reveal reveal-delay-1">
              <div className="ab-value-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </div>
              <h3>Transparency</h3>
              <p>Detailed property-level reporting, consistent communication, and full visibility into how your capital is deployed. You always know exactly where your money is working.</p>
            </div>
            <div className="ab-value-card reveal reveal-delay-2">
              <div className="ab-value-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3>Integrity</h3>
              <p>We align our interests with our investors and consistently deliver on our commitments. Our track record of overdelivering on projections speaks for itself.</p>
            </div>
            <div className="ab-value-card reveal reveal-delay-3">
              <div className="ab-value-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3>Operational Excellence</h3>
              <p>We don&apos;t just acquire and hold — we actively improve every asset in our portfolio through hands-on management and strategic capital deployment.</p>
            </div>
            <div className="ab-value-card reveal">
              <div className="ab-value-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
                </svg>
              </div>
              <h3>Community Impact</h3>
              <p>We place significant emphasis on enhancing and building authentic relationships with the communities we invest in, creating value for residents alongside our investors.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="ab-testimonials">
        <div className="container">
          <div className="ab-testimonials-header reveal">
            <div className="section-eyebrow">Investor Testimonials</div>
            <h2 className="section-title">Trusted by Sophisticated Investors</h2>
          </div>
        </div>
        <div style={{ maxWidth: '100%', padding: '0 48px' }}>
          <div className="testimonial-track">
            <div className="testimonial-card"><div className="testimonial-quote">&ldquo;</div><p className="testimonial-text">I have invested as an LP alongside Dylan and the Requity Group team across multiple asset classes over several geographic markets. Their reporting style and communication cadence is timely, consistent, and detailed, and I always feel well-informed on my investments.</p><div className="testimonial-stars">&#9733; &#9733; &#9733; &#9733; &#9733;</div><div className="testimonial-author">Todd G.</div><div className="testimonial-role">Limited Partner</div></div>
            <div className="testimonial-card"><div className="testimonial-quote">&ldquo;</div><p className="testimonial-text">As a seasoned real estate investor with over 18 years of experience, I have worked with a wide variety of operators. What stands out about Dylan and the team at Requity is their detailed property-level reporting and consistent communication.</p><div className="testimonial-stars">&#9733; &#9733; &#9733; &#9733; &#9733;</div><div className="testimonial-author">Ben E.</div><div className="testimonial-role">Limited Partner</div></div>
            <div className="testimonial-card"><div className="testimonial-quote">&ldquo;</div><p className="testimonial-text">This group is one of the only that have consistently overdelivered — sometimes substantially — on their projections. Their team is highly responsive and provides clear and consistent investor updates.</p><div className="testimonial-stars">&#9733; &#9733; &#9733; &#9733; &#9733;</div><div className="testimonial-author">Marshall F.</div><div className="testimonial-role">Limited Partner</div></div>
            <div className="testimonial-card"><div className="testimonial-quote">&ldquo;</div><p className="testimonial-text">I&apos;ve invested in 22 private real estate syndications with 18 different sponsors over the last 6 years. Dylan Marma and the team at TRG have earned the spot of my very favorite syndication sponsor.</p><div className="testimonial-stars">&#9733; &#9733; &#9733; &#9733; &#9733;</div><div className="testimonial-author">Russell R.</div><div className="testimonial-role">Limited Partner</div></div>
            <div className="testimonial-card"><div className="testimonial-quote">&ldquo;</div><p className="testimonial-text">Dylan and his team at TRG have re-positioned Royal Valley over the past 3 years and turned it into a wonderful investment with great cash flow, along with increasing its market value by 40%.</p><div className="testimonial-stars">&#9733; &#9733; &#9733; &#9733; &#9733;</div><div className="testimonial-author">Jeffrey C.</div><div className="testimonial-role">Limited Partner — 35 Years in CRE</div></div>
            <div className="testimonial-card"><div className="testimonial-quote">&ldquo;</div><p className="testimonial-text">My investments with the Requity Group have been my 2 favorite investments so far. Payouts have been on time, as discussed, and there has been zero headache at all. Dylan has been prompt and professional.</p><div className="testimonial-stars">&#9733; &#9733; &#9733; &#9733; &#9733;</div><div className="testimonial-author">Chad M.</div><div className="testimonial-role">Limited Partner</div></div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section" id="invest">
        <div className="container">
          <div className="reveal">
            <div className="section-eyebrow">Get Started</div>
            <h2 className="section-title">Partner With Requity</h2>
            <p className="section-desc" style={{ maxWidth: 560, margin: '0 auto 48px', textAlign: 'center' }}>
              Whether you&apos;re looking to invest for consistent returns or need capital for your next real estate project, we&apos;d love to hear from you.
            </p>
            <div className="ab-cta-actions">
              <Link href="/income-fund" className="btn-primary">
                Explore the Income Fund <ArrowIcon />
              </Link>
              <Link href="/lending" className="btn-secondary">
                Lending Programs <ArrowIcon />
              </Link>
            </div>
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
    </>
  );
}

const aboutPageStyles = `
  /* Hero */
  .ab-hero {
    min-height: 70vh;
    display: flex;
    align-items: center;
    position: relative;
    overflow: hidden;
    background: linear-gradient(165deg, var(--navy) 0%, #0d1424 50%, var(--navy-light) 100%);
  }
  .ab-hero::before {
    content: '';
    position: absolute;
    top: -30%;
    right: -15%;
    width: 700px;
    height: 700px;
    background: radial-gradient(circle, rgba(201, 168, 76, 0.08) 0%, transparent 70%);
    pointer-events: none;
  }
  .ab-hero::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(201, 168, 76, 0.2), transparent);
  }
  .ab-hero-content {
    max-width: 800px;
    padding: 160px 0 100px;
  }
  .ab-hero h1 {
    font-family: var(--font-display);
    font-size: clamp(40px, 5vw, 62px);
    font-weight: 300;
    line-height: 1.1;
    margin-bottom: 28px;
  }
  .ab-hero h1 em {
    font-style: italic;
    color: var(--gold);
  }
  .ab-hero-desc {
    font-size: 18px;
    line-height: 1.75;
    color: var(--text-secondary);
    max-width: 640px;
    font-weight: 300;
  }

  /* Mission */
  .ab-mission {
    background: var(--navy-light);
    border-top: 1px solid rgba(255,255,255,0.04);
    border-bottom: 1px solid rgba(255,255,255,0.04);
  }
  .ab-mission-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 80px;
    align-items: center;
  }
  .ab-mission-stats {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2px;
  }
  .ab-stat-item {
    padding: 40px 32px;
    background: rgba(255,255,255,0.02);
    border: 1px solid rgba(255,255,255,0.04);
    transition: all 0.4s;
  }
  .ab-stat-item:hover {
    background: rgba(201, 168, 76, 0.04);
  }
  .ab-stat-value {
    font-family: var(--font-display);
    font-size: 42px;
    font-weight: 300;
    color: var(--gold);
    line-height: 1;
    margin-bottom: 8px;
  }
  .ab-stat-label {
    font-size: 12px;
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 2px;
  }
  @media (max-width: 968px) {
    .ab-mission-grid { grid-template-columns: 1fr; gap: 48px; }
  }

  /* Services */
  .ab-services {
    background: var(--navy);
  }
  .ab-services-header {
    margin-bottom: 72px;
  }
  .ab-services-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2px;
  }
  .ab-service-card {
    padding: 56px 44px;
    background: rgba(255,255,255,0.02);
    border: 1px solid rgba(255,255,255,0.04);
    transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }
  .ab-service-card::before {
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
  .ab-service-card:hover::before { transform: scaleX(1); }
  .ab-service-card:hover {
    background: rgba(201, 168, 76, 0.04);
    transform: translateY(-4px);
  }
  .ab-service-icon {
    width: 56px;
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid rgba(201, 168, 76, 0.3);
    color: var(--gold);
    margin-bottom: 24px;
  }
  .ab-service-number {
    font-family: var(--font-display);
    font-size: 56px;
    font-weight: 300;
    color: rgba(201, 168, 76, 0.15);
    line-height: 1;
    margin-bottom: 20px;
  }
  .ab-service-card h3 {
    font-family: var(--font-display);
    font-size: 28px;
    font-weight: 400;
    margin-bottom: 16px;
    letter-spacing: 0.5px;
  }
  .ab-service-card p {
    font-size: 15px;
    line-height: 1.75;
    color: var(--text-secondary);
    font-weight: 300;
    flex-grow: 1;
  }
  .ab-service-link {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: var(--gold);
    text-decoration: none;
    margin-top: 28px;
    padding-top: 20px;
    border-top: 1px solid rgba(255,255,255,0.06);
    transition: gap 0.3s;
  }
  .ab-service-link:hover { gap: 14px; }
  @media (max-width: 968px) {
    .ab-services-grid { grid-template-columns: 1fr; }
    .ab-service-card { padding: 40px 32px; }
  }

  /* Team */
  .ab-team {
    background: var(--navy-light);
    border-top: 1px solid rgba(255,255,255,0.04);
    border-bottom: 1px solid rgba(255,255,255,0.04);
  }
  .ab-team-header {
    margin-bottom: 72px;
  }
  .ab-team-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;
  }
  .ab-team-card {
    padding: 48px 32px;
    background: rgba(255,255,255,0.02);
    border: 1px solid rgba(255,255,255,0.04);
    transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
    position: relative;
    overflow: hidden;
  }
  .ab-team-card::before {
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
  .ab-team-card:hover::before { transform: scaleX(1); }
  .ab-team-card:hover {
    background: rgba(201, 168, 76, 0.04);
    transform: translateY(-4px);
  }
  .ab-team-photo {
    width: 80px;
    height: 80px;
    border: 1px solid rgba(201, 168, 76, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 28px;
  }
  .ab-team-initials {
    font-family: var(--font-display);
    font-size: 28px;
    font-weight: 400;
    color: var(--gold);
  }
  .ab-team-card h3 {
    font-family: var(--font-display);
    font-size: 22px;
    font-weight: 400;
    margin-bottom: 6px;
  }
  .ab-team-role {
    font-size: 12px;
    color: var(--gold);
    letter-spacing: 1.5px;
    text-transform: uppercase;
    margin-bottom: 20px;
  }
  .ab-team-card p {
    font-size: 14px;
    line-height: 1.7;
    color: var(--text-secondary);
    font-weight: 300;
  }
  @media (max-width: 968px) {
    .ab-team-grid { grid-template-columns: 1fr 1fr; }
  }
  @media (max-width: 600px) {
    .ab-team-grid { grid-template-columns: 1fr; }
  }

  /* Values */
  .ab-values {
    background: var(--navy);
  }
  .ab-values-header {
    text-align: center;
    margin-bottom: 72px;
  }
  .ab-values-header .section-title {
    max-width: 500px;
    margin: 0 auto 20px;
  }
  .ab-values-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 2px;
  }
  .ab-value-card {
    padding: 48px 36px;
    background: rgba(255,255,255,0.02);
    border: 1px solid rgba(255,255,255,0.04);
    transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
    position: relative;
    overflow: hidden;
  }
  .ab-value-card::before {
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
  .ab-value-card:hover::before { transform: scaleX(1); }
  .ab-value-card:hover {
    background: rgba(201, 168, 76, 0.04);
    transform: translateY(-4px);
  }
  .ab-value-icon {
    width: 56px;
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid rgba(201, 168, 76, 0.3);
    color: var(--gold);
    margin-bottom: 28px;
  }
  .ab-value-card h3 {
    font-family: var(--font-display);
    font-size: 22px;
    font-weight: 400;
    margin-bottom: 14px;
  }
  .ab-value-card p {
    font-size: 14px;
    line-height: 1.7;
    color: var(--text-secondary);
    font-weight: 300;
  }
  @media (max-width: 968px) {
    .ab-values-grid { grid-template-columns: 1fr 1fr; }
  }
  @media (max-width: 600px) {
    .ab-values-grid { grid-template-columns: 1fr; }
    .ab-value-card { padding: 36px 28px; }
  }

  /* Testimonials */
  .ab-testimonials {
    background: var(--navy-light);
    border-top: 1px solid rgba(255,255,255,0.04);
    overflow: hidden;
  }
  .ab-testimonials-header { margin-bottom: 64px; }

  /* CTA */
  .ab-cta-actions {
    display: flex;
    gap: 20px;
    justify-content: center;
    align-items: center;
  }
  @media (max-width: 600px) {
    .ab-cta-actions { flex-direction: column; }
  }
`;

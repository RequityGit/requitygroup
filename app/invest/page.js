'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const INVESTOR_FAQS = [
  {
    category: 'Getting Started',
    questions: [
      {
        q: 'What is the Requity Income Fund?',
        a: 'The Requity Income Fund is a private real estate credit fund that provides accredited investors with access to a diversified portfolio of real estate debt and equity positions. The fund generates consistent monthly distributions backed by tangible real estate assets with conservative underwriting.',
      },
      {
        q: 'Who is eligible to invest?',
        a: 'The Requity Income Fund is available exclusively to accredited investors as defined by SEC Regulation D, Rule 506(c). An accredited investor generally includes individuals with a net worth exceeding $1 million (excluding primary residence) or annual income exceeding $200,000 ($300,000 jointly with a spouse) for the past two years.',
      },
      {
        q: 'How do I get started with investing?',
        a: 'Getting started is simple. Submit a request through our Request Access page, and our investor relations team will provide you with the fund offering documents, including the Private Placement Memorandum (PPM). After reviewing the materials, you can complete the subscription agreement and fund your investment through our secure portal.',
      },
      {
        q: 'Is there a minimum investment amount?',
        a: 'Yes, there is a minimum investment amount to participate in the Requity Income Fund. Please contact our investor relations team or submit a Request Access form to receive detailed information about the current minimum investment requirements and fund terms.',
      },
    ],
  },
  {
    category: 'Returns & Distributions',
    questions: [
      {
        q: 'How often are distributions paid?',
        a: 'Distributions are paid monthly and deposited directly into your bank account. Our distributions have been paid on time, every month, since the fund\u2019s inception.',
      },
      {
        q: 'What kind of returns can I expect?',
        a: 'The fund targets competitive risk-adjusted returns generated through a diversified portfolio of real estate debt and equity positions. Specific target returns are detailed in the Private Placement Memorandum. Past performance is not indicative of future results, and all investments carry risk, including potential loss of principal.',
      },
      {
        q: 'How are distributions calculated?',
        a: 'Distributions are calculated based on the fund\u2019s net income from its portfolio of real estate loans and equity positions, allocated proportionally to each investor\u2019s capital account balance. The fund\u2019s income is generated primarily through interest payments on loans and cash flow from equity positions.',
      },
      {
        q: 'Are distributions reinvested or paid out?',
        a: 'By default, distributions are paid out directly to your designated bank account each month. If you prefer to reinvest your distributions to compound your returns, please discuss this option with our investor relations team.',
      },
    ],
  },
  {
    category: 'Fund Structure & Strategy',
    questions: [
      {
        q: 'What is the fund\u2019s legal structure?',
        a: 'The Requity Income Fund is structured as a Regulation D, Rule 506(c) private placement offering. This structure is designed for accredited investors and allows the fund to operate with the flexibility needed to pursue attractive real estate credit opportunities.',
      },
      {
        q: 'What types of assets does the fund invest in?',
        a: 'The fund deploys capital across a diversified mix of real estate debt and equity positions, focusing on asset types where our operational expertise provides an information advantage. This includes bridge loans, manufactured housing communities, RV parks and campgrounds, and multifamily residential properties.',
      },
      {
        q: 'How is my investment secured?',
        a: 'Every dollar in the fund is backed by tangible real estate assets. Loans are secured by the underlying properties with conservative loan-to-value ratios. Our vertically integrated model means we have deep knowledge of the assets backing each investment, providing an additional layer of risk management.',
      },
      {
        q: 'How does Requity manage risk?',
        a: 'Risk management is at the core of our approach. We maintain conservative loan-to-value ratios, diversify across multiple loans, property types, and geographic markets, and leverage our operational expertise to underwrite deals more thoroughly. Our hands-on experience as real estate operators gives us insight that purely financial lenders lack.',
      },
    ],
  },
  {
    category: 'Reporting & Transparency',
    questions: [
      {
        q: 'What reporting will I receive as an investor?',
        a: 'Investors receive detailed monthly and quarterly reports covering fund performance, portfolio composition, and individual loan-level details. Reports are accessible through the AppFolio Investment Manager portal. Our commitment to transparency means you always know exactly where your capital is deployed.',
      },
      {
        q: 'How do I access my investor portal?',
        a: 'All investors have access to the AppFolio Investment Manager portal, which provides real-time visibility into your investment, distribution history, tax documents, and fund reporting. You can log in through the Investor Login link on our website.',
      },
      {
        q: 'Is the fund independently audited?',
        a: 'Yes, the Requity Income Fund undergoes third-party audits to ensure transparency and accuracy in financial reporting. The fund also utilizes a third-party fund administrator to independently track and verify all investor capital accounts and distributions.',
      },
      {
        q: 'Will I receive tax documents?',
        a: 'Yes, investors receive a Schedule K-1 annually, which reports your share of the fund\u2019s income, gains, losses, and deductions for the tax year. K-1s are made available through the investor portal. We recommend consulting with a qualified tax advisor regarding the tax implications of your investment.',
      },
    ],
  },
  {
    category: 'Liquidity & Redemptions',
    questions: [
      {
        q: 'Can I redeem my investment at any time?',
        a: 'The fund has specific redemption provisions outlined in the Private Placement Memorandum. While the fund is designed as a longer-term investment, there are provisions for capital redemption subject to certain terms and notice periods. Please review the PPM or contact our investor relations team for specific details.',
      },
      {
        q: 'How is the fund different from a REIT?',
        a: 'Unlike publicly traded REITs, the Requity Income Fund is a private placement offering that provides direct access to a curated portfolio of real estate credit and equity positions. Benefits include reduced market volatility (since it\u2019s not subject to public market fluctuations), more concentrated and hands-on management, and the ability to leverage our operational expertise for superior underwriting.',
      },
      {
        q: 'What happens to my investment if market conditions change?',
        a: 'Our fund is designed with downside protection in mind. Conservative loan-to-value ratios, diversification across asset types and geographies, and our hands-on operational approach provide multiple layers of protection. Our team has successfully navigated various market conditions, and our asset-backed approach provides stability even in uncertain environments.',
      },
    ],
  },
];

export default function InvestPage() {
  const [openItems, setOpenItems] = useState({});

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

  const toggleItem = (key) => {
    setOpenItems(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const ArrowIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  return (
    <>
      <style>{investPageStyles}</style>

      {/* ══════ DARK ZONE ══════ */}
      <div className="dark-zone">
        <div className="iv-hero">
          {/* Navigation */}
          <nav className="scrolled">
            <Link href="/" className="nav-logo"><img src="/logo-light.png" alt="Requity" /></Link>
            <ul className="nav-links" id="navLinks">
              <li><Link href="/invest" style={{ color: 'var(--champagne)' }}>Invest</Link></li>
              <li><Link href="/lending">Borrow</Link></li>
              <li><Link href="/about">About</Link></li>
              <li><a href="https://investors.appfolioim.com/trg/investor/login" className="nav-cta">Investor Login &rarr;</a></li>
            </ul>
            <button className="mobile-toggle" id="mobileToggle" aria-label="Menu">
              <span></span><span></span><span></span>
            </button>
          </nav>

          {/* Hero content */}
          <div className="iv-hero-body">
            <div className="iv-hero-eyebrow" style={{ opacity: 0, animation: 'fadeUp 0.8s 0.2s forwards' }}>Invest With Requity</div>
            <h1 style={{ opacity: 0, animation: 'fadeUp 0.8s 0.4s forwards' }}>Invest in <em>Value-Add</em><br />Real Estate</h1>
            <p className="iv-hero-p" style={{ opacity: 0, animation: 'fadeUp 0.8s 0.6s forwards' }}>
              Access institutional-quality real estate investments through our vertically integrated platform. From income-producing credit strategies to direct equity, we offer accredited investors pathways to consistent, asset-backed returns.
            </p>
            <div className="iv-hero-actions" style={{ opacity: 0, animation: 'fadeUp 0.8s 0.8s forwards' }}>
              <Link href="/request-access" className="btn-primary">Request Access <ArrowIcon /></Link>
              <a href="https://investors.appfolioim.com/trg/investor/login" className="btn-secondary">Investor Login</a>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="stats-bar" style={{ margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <div className="stat-cell"><div className="stat-num champagne">$150M+</div><div className="stat-lbl">Assets Under Management</div></div>
          <div className="stat-cell"><div className="stat-num">32</div><div className="stat-lbl">Properties Acquired</div></div>
          <div className="stat-cell"><div className="stat-num">70+</div><div className="stat-lbl">Loans Originated</div></div>
          <div className="stat-cell"><div className="stat-num champagne">$70M+</div><div className="stat-lbl">Investor Capital Raised</div></div>
        </div>

        <div style={{ height: 64, background: 'var(--navy-deep)' }} />
      </div>

      {/* Curved transition */}
      <div className="dark-to-light" />

      {/* ══════ LIGHT ZONE ══════ */}
      <div className="light-zone">
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>

          {/* Why Invest */}
          <section className="iv-why">
            <div className="iv-why-header reveal">
              <h2>Why Invest With <em>Requity Group</em></h2>
              <p>We don&apos;t just raise capital — we operate every asset in our portfolio. Our vertically integrated model gives investors access to a team with deep operational expertise, transparent reporting, and a proven track record.</p>
            </div>
            <div className="iv-why-grid">
              <div className="card iv-why-card reveal reveal-delay-1">
                <div className="iv-why-icon">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2zM22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" />
                  </svg>
                </div>
                <h3>Vertically Integrated</h3>
                <p>From acquisitions to operations to lending, we control every element of the value chain — delivering superior underwriting, asset management, and investor returns.</p>
              </div>
              <div className="card iv-why-card reveal reveal-delay-2">
                <div className="iv-why-icon">
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
              <div className="card iv-why-card reveal reveal-delay-3">
                <div className="iv-why-icon">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <h3>Proven Track Record</h3>
                <p>Over $70M in investor capital raised and deployed across 70+ loans with consistent performance through all market conditions.</p>
              </div>
              <div className="card iv-why-card reveal reveal-delay-1">
                <div className="iv-why-icon">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3>Asset-Backed Security</h3>
                <p>Every dollar is secured by tangible real estate assets with conservative loan-to-value ratios. Your capital is protected by real property.</p>
              </div>
            </div>
          </section>

          {/* Income Fund Product Card */}
          <section className="iv-product">
            <div className="iv-product-header reveal">
              <h2>Investment <em>Opportunities</em></h2>
            </div>
            <Link href="/income-fund" className="iv-fund-card card reveal" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
              <div className="iv-fund-inner">
                <div className="iv-fund-content">
                  <div className="iv-fund-label">Now Open to Investors</div>
                  <h3>Requity Income Fund</h3>
                  <p>A diversified real estate credit fund targeting consistent monthly income backed by tangible assets with conservative underwriting. The fund deploys capital across bridge loans, manufactured housing, RV parks, and multifamily properties.</p>
                  <div className="iv-fund-stats">
                    <div className="iv-fund-stat">
                      <strong>Monthly</strong>
                      <span>Distributions</span>
                    </div>
                    <div className="iv-fund-stat">
                      <strong>$70M+</strong>
                      <span>Capital Raised</span>
                    </div>
                    <div className="iv-fund-stat">
                      <strong>Accredited</strong>
                      <span>Investors Only</span>
                    </div>
                    <div className="iv-fund-stat">
                      <strong>Asset-Backed</strong>
                      <span>Real Estate</span>
                    </div>
                  </div>
                  <span className="iv-fund-link">Explore the Income Fund <ArrowIcon /></span>
                </div>
              </div>
            </Link>
          </section>

          {/* Testimonials */}
          <div className="iv-testimonials">
            <div className="iv-testimonials-header reveal">
              <h2>What Our <em>Investors</em> Say</h2>
            </div>
            <div className="iv-testimonials-grid">
              <div className="test-card reveal">
                <div className="big-q">&ldquo;</div>
                <div className="stars">&#9733; &#9733; &#9733; &#9733; &#9733;</div>
                <div className="quote-text">&ldquo;I have invested as an LP alongside Dylan and the Requity Group team across multiple asset classes over several geographic markets. Their reporting style and communication cadence is timely, consistent, and detailed, and I always feel well-informed on my investments.&rdquo;</div>
                <div className="author-name">Todd G.</div>
                <div className="author-role">Limited Partner</div>
              </div>
              <div className="test-card reveal reveal-delay-1">
                <div className="big-q">&ldquo;</div>
                <div className="stars">&#9733; &#9733; &#9733; &#9733; &#9733;</div>
                <div className="quote-text">&ldquo;As a seasoned real estate investor with over 18 years of experience, I have worked with a wide variety of operators. What stands out about Dylan and the team at Requity is their detailed property-level reporting and consistent communication.&rdquo;</div>
                <div className="author-name">Ben E.</div>
                <div className="author-role">Limited Partner</div>
              </div>
            </div>
            <div className="iv-testimonials-grid" style={{ marginTop: 20 }}>
              <div className="test-card reveal">
                <div className="big-q">&ldquo;</div>
                <div className="stars">&#9733; &#9733; &#9733; &#9733; &#9733;</div>
                <div className="quote-text">&ldquo;This group is one of the only that have consistently overdelivered — sometimes substantially — on their projections. Their team is highly responsive and provides clear and consistent investor updates.&rdquo;</div>
                <div className="author-name">Marshall F.</div>
                <div className="author-role">Limited Partner</div>
              </div>
              <div className="test-card reveal reveal-delay-1">
                <div className="big-q">&ldquo;</div>
                <div className="stars">&#9733; &#9733; &#9733; &#9733; &#9733;</div>
                <div className="quote-text">&ldquo;I&apos;ve invested in 22 private real estate syndications with 18 different sponsors over the last 6 years. Dylan Marma and the team at TRG have earned the spot of my very favorite syndication sponsor.&rdquo;</div>
                <div className="author-name">Russell R.</div>
                <div className="author-role">Limited Partner</div>
              </div>
            </div>
          </div>

          {/* Investor FAQ */}
          <section className="iv-faq">
            <div className="iv-faq-header reveal">
              <h2>Investor <em>FAQ</em></h2>
              <p>Common questions about investing with Requity Group.</p>
            </div>
            <div className="iv-faq-content">
              {INVESTOR_FAQS.map((section) => (
                <div key={section.category} className="fq-section reveal">
                  <h2 className="fq-section-title">{section.category}</h2>
                  <div className="fq-items">
                    {section.questions.map((item, i) => {
                      const key = `${section.category}-${i}`;
                      const isOpen = openItems[key];
                      return (
                        <div key={key} className={`fq-item ${isOpen ? 'open' : ''}`}>
                          <button className="fq-question" onClick={() => toggleItem(key)}>
                            <span>{item.q}</span>
                            <svg className="fq-chevron" width="20" height="20" viewBox="0 0 20 20" fill="none">
                              <path d="M5 8l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </button>
                          <div className="fq-answer">
                            <p>{item.a}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
            <div className="iv-faq-more reveal" style={{ textAlign: 'center', marginTop: 40 }}>
              <Link href="/investor-faq" className="btn-primary-light">View All Investor FAQs <ArrowIcon /></Link>
            </div>
          </section>

          {/* CTA */}
          <section className="iv-cta">
            <div className="iv-cta-banner reveal">
              <div className="iv-cta-eyebrow">Get Started</div>
              <h2>Ready to <em>Invest?</em></h2>
              <p>Join our community of sophisticated investors earning consistent, asset-backed returns. Request information today and our team will be in touch.</p>
              <Link href="/request-access" className="btn-primary" style={{ borderRadius: 8 }}>
                Request Access <ArrowIcon />
              </Link>
            </div>
          </section>

          {/* Footer */}
          <footer>
            <div className="footer-grid">
              <div className="footer-brand">
                <Link href="/" className="nav-logo"><img src="/logo-light.png" alt="Requity" /></Link>
                <p>A vertically integrated real estate investment company headquartered in Tampa, Florida.</p>
              </div>
              <div className="footer-col"><h4>Company</h4><Link href="/about">About</Link><Link href="/portfolio">Portfolio</Link><Link href="/insights">Insights</Link></div>
              <div className="footer-col"><h4>Invest</h4><Link href="/income-fund">Income Fund</Link><a href="https://investors.appfolioim.com/trg/investor/login">Investor Login</a><Link href="/request-access">Request Access</Link><Link href="/investor-faq">Investor FAQ</Link></div>
              <div className="footer-col"><h4>Lending</h4><Link href="/lending">Loan Programs</Link><Link href="/apply">Request a Quote</Link><Link href="/apply">Loan Application</Link><Link href="/borrower-faq">Borrower FAQ</Link></div>
            </div>
            <div className="footer-bottom">
              <p>&copy; 2026 Requity Group. All rights reserved. &nbsp;|&nbsp; 401 E Jackson St Ste 3300, Tampa, FL 33602 &nbsp;|&nbsp; 813.288.0636</p>
            </div>
          </footer>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="iv-disclaimer">
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 40px' }}>
          <p>This page is for informational purposes only and does not constitute an offer to sell or a solicitation of an offer to buy any securities. Offers are made only to accredited investors through the fund&apos;s private placement memorandum. Past performance is not indicative of future results. All investments involve risk, including the potential loss of principal.</p>
        </div>
      </div>
    </>
  );
}

const investPageStyles = `
  /* ── Hero ── */
  .iv-hero {
    position: relative;
    min-height: 560px;
    display: flex;
    flex-direction: column;
  }
  .iv-hero::before {
    content: '';
    position: absolute; inset: 0;
    background:
      linear-gradient(180deg,
        rgba(8,21,37,0.5) 0%,
        rgba(8,21,37,0.15) 40%,
        rgba(8,21,37,0.7) 75%,
        var(--navy-deep) 100%),
      radial-gradient(ellipse at 70% 20%, rgba(198,169,98,0.06) 0%, transparent 50%),
      radial-gradient(ellipse at 20% 80%, rgba(30,65,112,0.12) 0%, transparent 50%);
    pointer-events: none;
  }
  .iv-hero > * { position: relative; z-index: 2; }
  .iv-hero nav { position: relative; }

  .iv-hero-body {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 84px 48px 60px;
  }
  .iv-hero-eyebrow {
    font-family: var(--font-body);
    font-size: 11px; font-weight: 600;
    text-transform: uppercase; letter-spacing: 0.22em;
    color: var(--champagne);
    margin-bottom: 28px;
    display: flex; align-items: center; gap: 16px;
  }
  .iv-hero-eyebrow::before,
  .iv-hero-eyebrow::after {
    content: ''; width: 40px; height: 1px;
    background: linear-gradient(to right, transparent, rgba(212,197,169,0.4), transparent);
  }
  .iv-hero-body h1 {
    font-family: var(--font-display);
    font-size: clamp(40px, 5vw, 62px);
    font-weight: 500; color: #fff;
    line-height: 1.08; letter-spacing: -0.01em;
    max-width: 800px; margin-bottom: 24px;
  }
  .iv-hero-body h1 em {
    font-style: italic; font-weight: 400; color: var(--champagne);
  }
  .iv-hero-p {
    font-size: 16px; font-weight: 400;
    color: rgba(255,255,255,0.42);
    max-width: 640px; line-height: 1.7;
    margin-bottom: 36px;
  }
  .iv-hero-actions {
    display: flex; gap: 16px; align-items: center;
  }
  @media (max-width: 968px) {
    .iv-hero-body { padding: 72px 32px 48px; }
  }
  @media (max-width: 600px) {
    .iv-hero-body { padding: 60px 20px 40px; }
    .iv-hero-p { font-size: 15px; }
    .iv-hero-actions { flex-direction: column; width: 100%; }
    .iv-hero-actions .btn-primary,
    .iv-hero-actions .btn-secondary { width: 100%; justify-content: center; }
  }

  /* ── Why Invest ── */
  .iv-why {
    padding: 40px 0 64px;
  }
  .iv-why-header {
    margin-bottom: 40px;
    max-width: 700px;
  }
  .iv-why-header h2 {
    font-family: var(--font-display);
    font-size: clamp(28px, 3.5vw, 40px);
    font-weight: 500; color: var(--text-dark);
    line-height: 1.12; margin-bottom: 16px;
  }
  .iv-why-header h2 em {
    font-style: italic; color: var(--champagne-dk); font-weight: 400;
  }
  .iv-why-header p {
    font-size: 15px; color: var(--text-muted);
    line-height: 1.7;
  }
  .iv-why-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
  }
  .iv-why-card {
    padding: 32px 24px;
  }
  .iv-why-icon {
    width: 48px; height: 48px;
    display: flex; align-items: center; justify-content: center;
    border-radius: 12px;
    background: rgba(8,21,37,0.04);
    color: var(--navy);
    margin-bottom: 20px;
  }
  .iv-why-card h3 {
    font-family: var(--font-body);
    font-size: 16px; font-weight: 600;
    color: var(--text-dark);
    margin-bottom: 10px;
  }
  .iv-why-card p {
    font-size: 14px; color: var(--text-muted);
    line-height: 1.65;
  }
  @media (max-width: 968px) {
    .iv-why-grid { grid-template-columns: repeat(2, 1fr); }
  }
  @media (max-width: 600px) {
    .iv-why-grid { grid-template-columns: 1fr; }
  }

  /* ── Product Card (Income Fund) ── */
  .iv-product {
    padding: 0 0 64px;
  }
  .iv-product-header {
    margin-bottom: 32px;
  }
  .iv-product-header h2 {
    font-family: var(--font-display);
    font-size: clamp(28px, 3.5vw, 36px);
    font-weight: 500; color: var(--text-dark); line-height: 1.12;
  }
  .iv-product-header h2 em { font-style: italic; color: var(--champagne-dk); font-weight: 400; }
  .iv-fund-card {
    transition: transform 0.35s cubic-bezier(0.16,1,0.3,1), box-shadow 0.35s;
    cursor: pointer;
  }
  .iv-fund-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 40px rgba(8,21,37,0.08);
  }
  .iv-fund-inner {
    padding: 48px;
  }
  .iv-fund-label {
    font-family: var(--font-body);
    font-size: 11px; font-weight: 600;
    text-transform: uppercase; letter-spacing: 0.18em;
    color: var(--champagne-dk);
    margin-bottom: 16px;
  }
  .iv-fund-content h3 {
    font-family: var(--font-display);
    font-size: clamp(24px, 3vw, 32px);
    font-weight: 500; color: var(--text-dark);
    line-height: 1.15; margin-bottom: 16px;
  }
  .iv-fund-content > p {
    font-size: 15px; color: var(--text-muted);
    line-height: 1.7; max-width: 700px; margin-bottom: 32px;
  }
  .iv-fund-stats {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;
    padding: 24px 0;
    border-top: 1px solid rgba(8,21,37,0.06);
    border-bottom: 1px solid rgba(8,21,37,0.06);
    margin-bottom: 24px;
  }
  .iv-fund-stat strong {
    display: block;
    font-family: var(--font-display);
    font-size: 18px; font-weight: 600;
    color: var(--text-dark);
    margin-bottom: 4px;
  }
  .iv-fund-stat span {
    font-size: 12px;
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }
  .iv-fund-link {
    font-family: var(--font-body);
    font-size: 14px; font-weight: 600;
    color: var(--champagne-dk);
    display: inline-flex; align-items: center; gap: 8px;
    transition: gap 0.25s;
  }
  .iv-fund-card:hover .iv-fund-link {
    gap: 12px;
  }
  @media (max-width: 768px) {
    .iv-fund-inner { padding: 32px 24px; }
    .iv-fund-stats { grid-template-columns: repeat(2, 1fr); }
  }
  @media (max-width: 600px) {
    .iv-fund-stats { grid-template-columns: 1fr 1fr; gap: 16px; }
  }

  /* ── Testimonials ── */
  .iv-testimonials {
    padding: 0 0 64px;
  }
  .iv-testimonials-header {
    margin-bottom: 32px;
  }
  .iv-testimonials-header h2 {
    font-family: var(--font-display);
    font-size: clamp(28px, 3.5vw, 36px);
    font-weight: 500; color: var(--text-dark); line-height: 1.12;
  }
  .iv-testimonials-header h2 em { font-style: italic; color: var(--champagne-dk); font-weight: 400; }
  .iv-testimonials-grid {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 20px;
  }
  @media (max-width: 900px) {
    .iv-testimonials-grid { grid-template-columns: 1fr; }
  }

  /* ── FAQ ── */
  .iv-faq {
    padding: 0 0 64px;
  }
  .iv-faq-header {
    margin-bottom: 40px;
  }
  .iv-faq-header h2 {
    font-family: var(--font-display);
    font-size: clamp(28px, 3.5vw, 36px);
    font-weight: 500; color: var(--text-dark);
    line-height: 1.12; margin-bottom: 12px;
  }
  .iv-faq-header h2 em { font-style: italic; color: var(--champagne-dk); font-weight: 400; }
  .iv-faq-header p {
    font-size: 15px; color: var(--text-muted); line-height: 1.7;
  }
  .iv-faq-content {
    padding: 0;
  }

  /* FAQ accordion styles */
  .fq-section {
    margin-bottom: 48px;
  }
  .fq-section:last-child {
    margin-bottom: 0;
  }
  .fq-section-title {
    font-family: var(--font-display);
    font-size: clamp(24px, 3vw, 32px);
    font-weight: 500;
    color: var(--text-dark);
    margin-bottom: 24px;
    padding-bottom: 16px;
    border-bottom: 1px solid rgba(8,21,37,0.08);
  }
  .fq-items {
    display: flex;
    flex-direction: column;
    gap: 0;
  }
  .fq-item {
    border-bottom: 1px solid rgba(8,21,37,0.06);
  }
  .fq-item:last-child {
    border-bottom: none;
  }
  .fq-question {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 24px;
    padding: 20px 0;
    background: none;
    border: none;
    cursor: pointer;
    text-align: left;
    font-family: var(--font-body);
    font-size: 16px;
    font-weight: 500;
    color: var(--text-dark);
    transition: color 0.25s;
  }
  .fq-question:hover {
    color: var(--navy-muted);
  }
  .fq-chevron {
    flex-shrink: 0;
    color: var(--text-muted);
    transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .fq-item.open .fq-chevron {
    transform: rotate(180deg);
  }
  .fq-answer {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.4s cubic-bezier(0.16, 1, 0.3, 1), padding 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    padding: 0 0 0 0;
  }
  .fq-item.open .fq-answer {
    max-height: 400px;
    padding: 0 0 24px 0;
  }
  .fq-answer p {
    font-size: 15px;
    line-height: 1.75;
    color: var(--text-muted);
    max-width: 800px;
  }

  /* ── CTA Banner ── */
  .iv-cta {
    padding: 0 0 64px;
  }
  .iv-cta-banner {
    background: linear-gradient(135deg, var(--navy-deep), var(--navy));
    border-radius: 18px; padding: clamp(36px, 6vw, 64px);
    text-align: center;
    position: relative; overflow: hidden;
  }
  .iv-cta-banner::before {
    content: ''; position: absolute; right: -60px; top: -60px;
    width: 280px; height: 280px; border-radius: 50%;
    background: rgba(30,65,112,0.2); pointer-events: none;
  }
  .iv-cta-banner::after {
    content: ''; position: absolute; left: 30%; bottom: -100px;
    width: 220px; height: 220px; border-radius: 50%;
    background: rgba(212,197,169,0.04); pointer-events: none;
  }
  .iv-cta-banner > * { position: relative; z-index: 1; }
  .iv-cta-eyebrow {
    font-family: var(--font-body); font-size: 11px; font-weight: 600;
    letter-spacing: 0.22em; text-transform: uppercase;
    color: var(--champagne); margin-bottom: 20px;
  }
  .iv-cta-banner h2 {
    font-family: var(--font-display);
    font-size: clamp(32px, 4vw, 44px);
    font-weight: 500; color: #fff;
    line-height: 1.12; margin-bottom: 20px;
  }
  .iv-cta-banner h2 em { font-style: italic; color: var(--champagne); font-weight: 400; }
  .iv-cta-banner p {
    font-size: 15px; color: rgba(255,255,255,0.4);
    line-height: 1.7; max-width: 560px;
    margin: 0 auto 40px;
  }
  @media (max-width: 600px) {
    .iv-cta-banner { border-radius: 14px; }
  }

  /* ── Disclaimer ── */
  .iv-disclaimer {
    background: var(--cream);
    padding: 0 0 32px;
  }
  .iv-disclaimer p {
    font-size: 11px;
    color: var(--text-muted);
    line-height: 1.7;
    max-width: 800px;
    opacity: 0.6;
  }

  /* Footer spacing */
  footer { margin-top: 0; }
`;

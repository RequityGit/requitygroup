'use client';

import { useEffect } from 'react';

export default function HomePage() {
  useEffect(() => {
    const navbar = document.getElementById('navbar');
    const handleScroll = () => navbar?.classList.toggle('scrolled', window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);

    const mobileToggle = document.getElementById('mobileToggle');
    const navLinks = document.getElementById('navLinks');
    mobileToggle?.addEventListener('click', () => navLinks?.classList.toggle('open'));
    navLinks?.querySelectorAll('a').forEach(l =>
      l.addEventListener('click', () => navLinks?.classList.remove('open'))
    );

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

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const t = document.querySelector(this.getAttribute('href'));
        if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const ArrowIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  return (
    <>
      <nav id="navbar">
        <div className="container">
          <a href="/" className="nav-logo">REQUIT<span>Y</span></a>
          <ul className="nav-links" id="navLinks">
            <li><a href="/income-fund">Income Fund</a></li>
            <li><a href="/lending">Lending</a></li>
            <li><a href="/portfolio">Portfolio</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#insights">Insights</a></li>
            <li><a href="https://investors.appfolioim.com/trg/investor/login">Investor Login</a></li>
            <li><a href="#invest" className="nav-cta">Invest With Us</a></li>
          </ul>
          <button className="mobile-toggle" id="mobileToggle" aria-label="Menu">
            <span></span><span></span><span></span>
          </button>
        </div>
      </nav>

      <section className="hero">
        <div className="container">
          <div className="hero-grid">
            <div>
              <div className="hero-eyebrow">Private Real Estate Investment Firm</div>
              <h1>Investing &amp; Lending in <em>Value-Add</em> Real Estate</h1>
              <p className="hero-desc">Requity is a vertically integrated real estate investment company that applies operational expertise to small-cap real estate. We create value in niche markets that institutional capital sources cannot efficiently pursue.</p>
              <div className="hero-actions">
                <a href="#invest" className="btn-primary">Join Investor List <ArrowIcon /></a>
                <a href="#fund" className="btn-secondary">View Income Fund</a>
              </div>
            </div>
            <div className="hero-visual">
              <div className="hero-stats-card">
                <h3>Our Track Record</h3>
                <div className="hero-stat-row">
                  <div className="hero-stat"><div className="hero-stat-number">32</div><div className="hero-stat-label">Properties<br />Acquired</div></div>
                  <div className="hero-stat"><div className="hero-stat-number">$150M+</div><div className="hero-stat-label">Assets Under<br />Management</div></div>
                  <div className="hero-stat"><div className="hero-stat-number">70+</div><div className="hero-stat-label">Loans<br />Originated</div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="services" id="about">
        <div className="container">
          <div className="services-header reveal">
            <div className="section-eyebrow">What We Do</div>
            <h2 className="section-title">A Vertically Integrated<br />Approach to Real Estate</h2>
            <p className="section-desc">From acquisition to operations to lending, we control every element of the value chain — delivering superior risk-adjusted returns to our investors.</p>
          </div>
          <div className="services-grid">
            <div className="service-card reveal reveal-delay-1"><div className="service-number">01</div><h3>Invest</h3><p>We source the majority of our acquisitions off-market through our extensive network and direct outreach strategies. Our focus on niche markets allows us to find value where institutional capital cannot.</p></div>
            <div className="service-card reveal reveal-delay-2"><div className="service-number">02</div><h3>Operate</h3><p>We rigorously execute on our property improvement program using our in-house management company with decades of combined experience. Operational excellence is the foundation of every return we deliver.</p></div>
            <div className="service-card reveal reveal-delay-3"><div className="service-number">03</div><h3>Lend</h3><p>We provide structured credit solutions to real estate operators, backed by asset-level underwriting and operational insight. Our lending arm generates consistent yield for income-focused investors.</p></div>
          </div>
        </div>
      </section>

      <section className="portfolio" id="portfolio">
        <div className="container">
          <div className="portfolio-header reveal">
            <div><div className="section-eyebrow">Portfolio</div><h2 className="section-title">Featured Investments</h2></div>
            <a href="/portfolio" className="view-all">View All Properties <ArrowIcon /></a>
          </div>
          <div className="portfolio-grid">
            <div className="portfolio-card reveal reveal-delay-1">
              <img src="https://requitygroup.com/wp-content/uploads/2024/11/royal_valley_jacksonville_nc-1024x421.webp" alt="Bloomington/Jacksonville Portfolio" loading="lazy" />
              <div className="portfolio-overlay"><div className="portfolio-location">Bloomington, IN &amp; Jacksonville, NC</div><div className="portfolio-name">Bloomington/Jacksonville Portfolio</div></div>
            </div>
            <div className="portfolio-card reveal reveal-delay-2">
              <img src="https://requitygroup.com/wp-content/uploads/2024/07/large-4026-Spring-Place-Rd-SE-Cleveland-TN-7_1280x600-1024x475.webp" alt="East TN" loading="lazy" />
              <div className="portfolio-overlay"><div className="portfolio-location">Cleveland, TN</div><div className="portfolio-name">East Tennessee Portfolio</div></div>
            </div>
            <div className="portfolio-card reveal reveal-delay-3">
              <img src="https://requitygroup.com/wp-content/uploads/2024/07/210-Conner-Heights-Rd-Pigeon-Forge-TN-76_1280x600-1024x475.webp" alt="Gateway Campground" loading="lazy" />
              <div className="portfolio-overlay"><div className="portfolio-location">Pigeon Forge, TN</div><div className="portfolio-name">Gateway Campground</div></div>
            </div>
          </div>
        </div>
      </section>

      <section className="fund" id="fund">
        <div className="container">
          <div className="fund-grid">
            <div className="reveal">
              <div className="section-eyebrow">Income Fund</div>
              <h2 className="section-title">Consistent Returns,<br />Backed by Real Assets</h2>
              <p className="section-desc">Our Income Fund provides investors with access to a diversified portfolio of real estate debt and equity positions, generating consistent monthly distributions.</p>
              <div className="fund-features">
                <div className="fund-feature">
                  <div className="fund-feature-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" /></svg></div>
                  <div><h4>Monthly Distributions</h4><p>Consistent cash flow paid directly to investors on a monthly basis.</p></div>
                </div>
                <div className="fund-feature">
                  <div className="fund-feature-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg></div>
                  <div><h4>Asset-Backed Security</h4><p>Every dollar secured by tangible real estate assets with conservative LTV ratios.</p></div>
                </div>
                <div className="fund-feature">
                  <div className="fund-feature-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg></div>
                  <div><h4>Proven Track Record</h4><p>Over $70M in investor capital raised with consistent performance across market cycles.</p></div>
                </div>
              </div>
            </div>
            <div className="reveal reveal-delay-2">
              <div className="fund-card">
                <div className="fund-card-label">Now Open</div>
                <div className="fund-card-title">Requity Income Fund</div>
                <p className="fund-card-desc">A diversified real estate credit fund providing investors with consistent monthly income backed by tangible assets.</p>
                <div className="fund-card-stats">
                  <div><div className="fund-card-stat-value">$70M+</div><div className="fund-card-stat-label">Capital Raised</div></div>
                  <div><div className="fund-card-stat-value">Monthly</div><div className="fund-card-stat-label">Distributions</div></div>
                </div>
                <a href="#invest" className="btn-primary" style={{ marginTop: 40, display: 'inline-flex' }}>Request Information <ArrowIcon /></a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="testimonials">
        <div className="container">
          <div className="testimonials-header reveal">
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

      <section className="fund" id="lending">
        <div className="container">
          <div className="lending-banner reveal">
            <div><h3>Requity Lending</h3><p>Commercial and residential bridge loans for real estate operators. Fast execution, competitive terms.</p></div>
            <a href="/apply" className="btn-primary">Request a Loan <ArrowIcon /></a>
          </div>
        </div>
      </section>

      <section className="insights" id="insights">
        <div className="container">
          <div className="insights-header reveal">
            <div><div className="section-eyebrow">Insights</div><h2 className="section-title">Latest from Requity</h2></div>
            <a href="/insights" className="view-all">View All <ArrowIcon /></a>
          </div>
          <div className="insights-grid">
            <a href="#" className="insight-card reveal reveal-delay-1"><img src="https://requitygroup.com/wp-content/uploads/2023/08/0993e7b6-f899-4080-aec3-5c9c0328319d-1024x576.jpg" alt="Syndication Legal Docs" className="insight-img" loading="lazy" /><div className="insight-date">August 2023</div><div className="insight-title">Decoding: Real Estate Syndication Legal Documents</div></a>
            <a href="#" className="insight-card reveal reveal-delay-2"><img src="https://requitygroup.com/wp-content/uploads/2023/08/hiringbestpractices-1024x576.jpeg" alt="Hiring Best Practices" className="insight-img" loading="lazy" /><div className="insight-date">August 2023</div><div className="insight-title">Hiring Best Practices</div></a>
            <a href="#" className="insight-card reveal reveal-delay-3"><img src="https://requitygroup.com/wp-content/uploads/2023/08/thumbnail-1-version-2-2-1024x576.png" alt="Acquisitions Best Practices" className="insight-img" loading="lazy" /><div className="insight-date">August 2023</div><div className="insight-title">Acquisitions Best Practices with Troy Trecroce</div></a>
          </div>
        </div>
      </section>

      <section className="cta-section" id="invest">
        <div className="container">
          <div className="reveal">
            <div className="section-eyebrow">Get Started</div>
            <h2 className="section-title">Join Our Investor Community</h2>
            <p className="section-desc">Gain access to institutional-quality real estate investments with transparent reporting, consistent distributions, and a proven operational team.</p>
            <a href="/apply-to-invest" className="btn-primary">Apply to Invest <ArrowIcon /></a>
          </div>
        </div>
      </section>

      <footer>
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <a href="/" className="nav-logo" style={{ fontSize: 24 }}>REQUIT<span style={{ color: 'var(--gold)' }}>Y</span></a>
              <p>A vertically integrated real estate investment company applying operational expertise to small-cap real estate.</p>
            </div>
            <div className="footer-col"><h4>Invest</h4><a href="/income-fund">Income Fund</a><a href="/apply-to-invest">Apply to Invest</a><a href="https://investors.appfolioim.com/trg/investor/login">Investor Login</a><a href="/portfolio">Portfolio</a></div>
            <div className="footer-col"><h4>Lending</h4><a href="/lending">Loan Programs</a><a href="/apply">Loan Request</a><a href="/apply">Apply for a Loan</a></div>
            <div className="footer-col"><h4>Company</h4><a href="#about">About</a><a href="#insights">Insights</a><a href="/testimonials">Testimonials</a></div>
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

'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const INSIGHTS = [
  {
    id: 'decoding-syndication-legal-docs',
    title: 'Decoding: Real Estate Syndication Legal Documents',
    date: 'August 2023',
    category: 'Education',
    image: 'https://requitygroup.com/wp-content/uploads/2023/08/0993e7b6-f899-4080-aec3-5c9c0328319d-1024x576.jpg',
    excerpt: 'A comprehensive breakdown of the key legal documents involved in real estate syndication — from private placement memorandums to subscription agreements — and what investors should look for.',
  },
  {
    id: 'hiring-best-practices',
    title: 'Hiring Best Practices',
    date: 'August 2023',
    category: 'Operations',
    image: 'https://requitygroup.com/wp-content/uploads/2023/08/hiringbestpractices-1024x576.jpeg',
    excerpt: 'How to avoid hiring bias and use experiential interview questions to uncover problem-solving skills, resilience, and cultural fit when building your real estate operations team.',
  },
  {
    id: 'acquisitions-best-practices',
    title: 'Acquisitions Best Practices with Troy Trecroce',
    date: 'August 2023',
    category: 'Acquisitions',
    image: 'https://requitygroup.com/wp-content/uploads/2023/08/thumbnail-1-version-2-2-1024x576.png',
    excerpt: 'Troy Trecroce joins Requity Insights to discuss best practices for sourcing, underwriting, and closing off-market real estate acquisitions in competitive markets.',
  },
  {
    id: 'seasonal-rv-campgrounds',
    title: 'Why Seasonal RV Campgrounds Are a Hidden Gem',
    date: 'July 2023',
    category: 'Asset Class',
    image: 'https://requitygroup.com/wp-content/uploads/2024/07/210-Conner-Heights-Rd-Pigeon-Forge-TN-76_1280x600-1024x475.webp',
    excerpt: 'Seasonal RV campgrounds are one of the least understood gems in real estate. Unlike transient campgrounds, seasonal parks feature owners who pay 12 months up front — creating predictable, recession-resistant cash flow.',
  },
  {
    id: 'seller-financing-rv-parks',
    title: 'Seller Financing for RV Parks & Campgrounds',
    date: 'June 2023',
    category: 'Acquisitions',
    image: 'https://requitygroup.com/wp-content/uploads/2024/11/royal_valley_jacksonville_nc-1024x421.webp',
    excerpt: 'How seller financing allows sellers to monetize their property with tax advantages and cash flow benefits — and why understanding the seller\'s circumstances creates mutually beneficial deal structures.',
  },
  {
    id: 'manufactured-housing-opportunity',
    title: 'The Manufactured Housing Opportunity',
    date: 'May 2023',
    category: 'Asset Class',
    image: 'https://requitygroup.com/wp-content/uploads/2024/07/large-4026-Spring-Place-Rd-SE-Cleveland-TN-7_1280x600-1024x475.webp',
    excerpt: 'Manufactured housing communities represent one of the most resilient asset classes in commercial real estate. We explore why this affordable housing niche continues to outperform.',
  },
];

const CATEGORIES = ['All', ...Array.from(new Set(INSIGHTS.map(i => i.category)))];

export default function InsightsPage() {
  const [activeCategory, setActiveCategory] = useState('All');

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

  useEffect(() => {
    const reveals = document.querySelectorAll('.in-card');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) e.target.classList.add('visible');
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    reveals.forEach(el => {
      el.classList.remove('visible');
      observer.observe(el);
    });
    return () => observer.disconnect();
  }, [activeCategory]);

  const filteredInsights = activeCategory === 'All'
    ? INSIGHTS
    : INSIGHTS.filter(i => i.category === activeCategory);

  const ArrowIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  return (
    <>
      <style>{insightsPageStyles}</style>

      {/* Navigation */}
      <nav id="navbar" className="scrolled">
        <div className="container">
          <Link href="/" className="nav-logo">REQUIT<span>Y</span></Link>
          <ul className="nav-links" id="navLinks">
            <li><Link href="/income-fund">Income Fund</Link></li>
            <li><Link href="/lending">Lending</Link></li>
            <li><Link href="/portfolio">Portfolio</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/insights" style={{ color: 'var(--gold)' }}>Insights</Link></li>
            <li><a href="https://investors.appfolioim.com/trg/investor/login">Investor Login</a></li>
            <li><Link href="/#invest" className="nav-cta">Invest With Us</Link></li>
          </ul>
          <button className="mobile-toggle" id="mobileToggle" aria-label="Menu">
            <span></span><span></span><span></span>
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="in-hero">
        <div className="container">
          <div className="in-hero-content">
            <div className="section-eyebrow" style={{ opacity: 0, animation: 'fadeUp 0.8s 0.2s forwards' }}>Insights</div>
            <h1 style={{ opacity: 0, animation: 'fadeUp 0.8s 0.4s forwards' }}>Market Intelligence &amp;<br /><em>Real Estate</em> Expertise</h1>
            <p className="in-hero-desc" style={{ opacity: 0, animation: 'fadeUp 0.8s 0.6s forwards' }}>
              Perspectives on commercial real estate investing, market trends, operational strategies, and asset class deep dives from the Requity Group team.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Article */}
      <section className="in-featured">
        <div className="container">
          <div className="in-featured-card reveal">
            <div className="in-featured-image">
              <img src={INSIGHTS[0].image} alt={INSIGHTS[0].title} loading="lazy" />
            </div>
            <div className="in-featured-content">
              <div className="in-featured-meta">
                <span className="in-category-badge">{INSIGHTS[0].category}</span>
                <span className="in-date">{INSIGHTS[0].date}</span>
              </div>
              <h2>{INSIGHTS[0].title}</h2>
              <p>{INSIGHTS[0].excerpt}</p>
              <span className="in-read-more">Read Article <ArrowIcon /></span>
            </div>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="in-articles">
        <div className="container">
          <div className="in-articles-header reveal">
            <div className="section-eyebrow">All Articles</div>
            <h2 className="section-title">Browse by Topic</h2>
          </div>
          <div className="in-filters reveal">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                className={`in-filter-btn${activeCategory === cat ? ' active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="in-articles-grid">
            {filteredInsights.map((insight, i) => (
              <div key={insight.id} className={`in-card reveal${i < 3 ? ` reveal-delay-${i + 1}` : ''}`}>
                <div className="in-card-image">
                  <img src={insight.image} alt={insight.title} loading="lazy" />
                </div>
                <div className="in-card-body">
                  <div className="in-card-meta">
                    <span className="in-category-badge">{insight.category}</span>
                    <span className="in-date">{insight.date}</span>
                  </div>
                  <h3>{insight.title}</h3>
                  <p>{insight.excerpt}</p>
                  <span className="in-read-more">Read Article <ArrowIcon /></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="in-newsletter">
        <div className="container">
          <div className="in-newsletter-card reveal">
            <div className="in-newsletter-content">
              <div className="section-eyebrow">Stay Informed</div>
              <h2 className="section-title">Get Requity Insights Delivered</h2>
              <p className="section-desc">Market updates, asset class deep dives, and investment perspectives — delivered directly from our team.</p>
            </div>
            <div className="in-newsletter-action">
              <Link href="/#invest" className="btn-primary">Join Our Investor List <ArrowIcon /></Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="container">
          <div className="reveal">
            <div className="section-eyebrow">Get Started</div>
            <h2 className="section-title">Ready to Invest?</h2>
            <p className="section-desc" style={{ maxWidth: 560, margin: '0 auto 48px', textAlign: 'center' }}>
              Join our community of sophisticated investors earning consistent, asset-backed returns through the Requity Income Fund.
            </p>
            <Link href="/income-fund" className="btn-primary">
              Explore the Income Fund <ArrowIcon />
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
    </>
  );
}

const insightsPageStyles = `
  /* Hero */
  .in-hero {
    min-height: 60vh;
    display: flex;
    align-items: center;
    position: relative;
    overflow: hidden;
    background: linear-gradient(165deg, var(--navy) 0%, #0d1424 50%, var(--navy-light) 100%);
  }
  .in-hero::before {
    content: '';
    position: absolute;
    top: -30%;
    right: -15%;
    width: 700px;
    height: 700px;
    background: radial-gradient(circle, rgba(201, 168, 76, 0.08) 0%, transparent 70%);
    pointer-events: none;
  }
  .in-hero::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(201, 168, 76, 0.2), transparent);
  }
  .in-hero-content {
    max-width: 800px;
    padding: 160px 0 80px;
  }
  .in-hero h1 {
    font-family: var(--font-display);
    font-size: clamp(40px, 5vw, 62px);
    font-weight: 300;
    line-height: 1.1;
    margin-bottom: 28px;
  }
  .in-hero h1 em {
    font-style: italic;
    color: var(--gold);
  }
  .in-hero-desc {
    font-size: 18px;
    line-height: 1.75;
    color: var(--text-secondary);
    max-width: 640px;
    font-weight: 300;
  }

  /* Featured */
  .in-featured {
    background: var(--navy-light);
    border-top: 1px solid rgba(255,255,255,0.04);
    border-bottom: 1px solid rgba(255,255,255,0.04);
    padding: 80px 0;
  }
  .in-featured-card {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0;
    background: rgba(255,255,255,0.02);
    border: 1px solid rgba(255,255,255,0.06);
    overflow: hidden;
    transition: all 0.5s;
  }
  .in-featured-card:hover {
    border-color: rgba(201, 168, 76, 0.2);
  }
  .in-featured-image {
    overflow: hidden;
  }
  .in-featured-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
    filter: brightness(0.85);
  }
  .in-featured-card:hover .in-featured-image img {
    transform: scale(1.05);
    filter: brightness(1);
  }
  .in-featured-content {
    padding: 56px 48px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .in-featured-meta {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 20px;
  }
  .in-category-badge {
    font-size: 11px;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--gold);
    padding: 6px 14px;
    border: 1px solid rgba(201, 168, 76, 0.3);
    font-weight: 500;
  }
  .in-date {
    font-size: 13px;
    color: var(--text-muted);
  }
  .in-featured-content h2 {
    font-family: var(--font-display);
    font-size: 32px;
    font-weight: 400;
    line-height: 1.25;
    margin-bottom: 16px;
  }
  .in-featured-content p {
    font-size: 15px;
    line-height: 1.7;
    color: var(--text-secondary);
    font-weight: 300;
    margin-bottom: 28px;
  }
  .in-read-more {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: var(--gold);
    transition: gap 0.3s;
    cursor: pointer;
  }
  .in-read-more:hover { gap: 14px; }
  @media (max-width: 968px) {
    .in-featured-card { grid-template-columns: 1fr; }
    .in-featured-image { aspect-ratio: 16/9; }
    .in-featured-content { padding: 40px 32px; }
  }

  /* Articles */
  .in-articles {
    background: var(--navy);
  }
  .in-articles-header {
    margin-bottom: 32px;
  }
  .in-filters {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    margin-bottom: 56px;
  }
  .in-filter-btn {
    padding: 10px 24px;
    background: transparent;
    border: 1px solid rgba(255,255,255,0.1);
    color: var(--text-secondary);
    font-family: var(--font-body);
    font-size: 13px;
    font-weight: 400;
    letter-spacing: 0.5px;
    cursor: pointer;
    transition: all 0.3s;
  }
  .in-filter-btn:hover {
    border-color: rgba(201, 168, 76, 0.3);
    color: var(--gold);
  }
  .in-filter-btn.active {
    background: var(--gold);
    border-color: var(--gold);
    color: var(--navy);
    font-weight: 600;
  }
  .in-articles-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 32px;
  }
  .in-card {
    background: rgba(255,255,255,0.02);
    border: 1px solid rgba(255,255,255,0.06);
    overflow: hidden;
    transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
    cursor: pointer;
  }
  .in-card:hover {
    border-color: rgba(201, 168, 76, 0.2);
    transform: translateY(-6px);
    box-shadow: 0 16px 48px rgba(0,0,0,0.2);
  }
  .in-card-image {
    overflow: hidden;
    aspect-ratio: 16/9;
  }
  .in-card-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: brightness(0.85);
    transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .in-card:hover .in-card-image img {
    transform: scale(1.08);
    filter: brightness(1);
  }
  .in-card-body {
    padding: 32px;
  }
  .in-card-meta {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 16px;
  }
  .in-card-body h3 {
    font-family: var(--font-display);
    font-size: 22px;
    font-weight: 400;
    line-height: 1.3;
    margin-bottom: 12px;
    transition: color 0.3s;
  }
  .in-card:hover .in-card-body h3 {
    color: var(--gold);
  }
  .in-card-body p {
    font-size: 14px;
    line-height: 1.7;
    color: var(--text-secondary);
    font-weight: 300;
    margin-bottom: 20px;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  @media (max-width: 968px) {
    .in-articles-grid { grid-template-columns: 1fr 1fr; }
  }
  @media (max-width: 600px) {
    .in-articles-grid { grid-template-columns: 1fr; }
    .in-card-body { padding: 24px; }
  }

  /* Newsletter */
  .in-newsletter {
    background: var(--navy-light);
    border-top: 1px solid rgba(255,255,255,0.04);
    border-bottom: 1px solid rgba(255,255,255,0.04);
    padding: 80px 0;
  }
  .in-newsletter-card {
    background: linear-gradient(135deg, var(--navy-mid) 0%, var(--navy) 100%);
    border: 1px solid rgba(201, 168, 76, 0.15);
    padding: 64px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 40px;
  }
  .in-newsletter-content .section-title {
    margin-bottom: 16px;
  }
  .in-newsletter-content .section-desc {
    margin-bottom: 0;
  }
  @media (max-width: 768px) {
    .in-newsletter-card { flex-direction: column; text-align: center; padding: 40px 32px; }
    .in-newsletter-content .section-desc { max-width: none; }
  }
`;

import Link from 'next/link';
import { findCollectionByName, getField, getImageUrl } from '../../lib/webflow';
import PortfolioClient from './PortfolioClient';

export const metadata = {
  title: 'Portfolio | Requity Group',
  description: 'Explore our portfolio of real estate investments across manufactured housing, multifamily, RV parks, and more.',
};

// Revalidate every 5 minutes
export const revalidate = 300;

// Try multiple collection name patterns to find the right one
const COLLECTION_NAMES = ['portfolio', 'properties', 'property', 'investments', 'deals', 'projects'];

async function getPortfolioData() {
  if (!process.env.WEBFLOW_API_TOKEN || !process.env.WEBFLOW_SITE_ID) {
    return { items: [], error: 'config' };
  }

  for (const name of COLLECTION_NAMES) {
    try {
      const result = await findCollectionByName(name);
      if (result && result.items.length > 0) {
        return { items: result.items, collection: result.collection, error: null };
      }
    } catch (e) {
      console.error(`Error fetching collection "${name}":`, e);
    }
  }

  return { items: [], error: 'not_found' };
}

/**
 * Normalize a Webflow item into a standard portfolio card shape.
 * Webflow field names vary, so we check multiple possibilities.
 */
function normalizeItem(item) {
  const fd = item.fieldData || {};

  // Try common field name patterns for each property
  const name = fd.name || fd.title || fd['property-name'] || fd['project-name'] || 'Untitled Property';
  const slug = fd.slug || item.slug || '';

  const location = fd.location || fd.city || fd.address || fd['property-location'] || fd['city-state'] || '';
  const state = fd.state || '';
  const fullLocation = state && location && !location.includes(state) ? `${location}, ${state}` : location;

  // Image: try multiple field names
  const imageField = fd['main-image'] || fd.image || fd['hero-image'] || fd.thumbnail ||
    fd['featured-image'] || fd['cover-image'] || fd.photo || fd['main-photo'] || null;
  const imageUrl = typeof imageField === 'string' ? imageField : imageField?.url || null;

  const propertyType = fd['property-type'] || fd.type || fd.category || fd['asset-class'] || '';
  const units = fd.units || fd['number-of-units'] || fd['unit-count'] || fd['total-units'] || '';
  const status = fd.status || fd['deal-status'] || fd['investment-status'] || '';
  const description = fd.description || fd.summary || fd['short-description'] || fd.excerpt || '';
  const acreage = fd.acreage || fd.acres || fd['lot-size'] || '';
  const yearAcquired = fd['year-acquired'] || fd.year || fd['acquisition-year'] || fd['date-acquired'] || '';

  return {
    id: item.id || item._id,
    name,
    slug,
    location: fullLocation,
    imageUrl,
    propertyType,
    units,
    status,
    description,
    acreage,
    yearAcquired,
  };
}

export default async function PortfolioPage() {
  const { items, error } = await getPortfolioData();
  const properties = items.map(normalizeItem);

  // Extract unique property types for filtering
  const propertyTypes = [...new Set(properties.map((p) => p.propertyType).filter(Boolean))];

  return (
    <div style={{ minHeight: '100vh', background: '#0a0f1a' }}>
      {/* Navigation */}
      <nav id="navbar" className="scrolled">
        <div className="container">
          <Link href="/" className="nav-logo">REQUIT<span>Y</span></Link>
          <ul className="nav-links" id="navLinks">
            <li><Link href="/income-fund">Income Fund</Link></li>
            <li><Link href="/lending">Lending</Link></li>
            <li><Link href="/portfolio" style={{ color: 'var(--gold)' }}>Portfolio</Link></li>
            <li><Link href="/#about">About</Link></li>
            <li><Link href="/#insights">Insights</Link></li>
            <li><a href="https://investors.appfolioim.com/trg/investor/login">Investor Login</a></li>
            <li><Link href="/#invest" className="nav-cta">Invest With Us</Link></li>
          </ul>
        </div>
      </nav>

      {/* Hero */}
      <section style={{
        paddingTop: 160,
        paddingBottom: 80,
        background: 'linear-gradient(165deg, #0a0f1a 0%, #0d1424 50%, #111827 100%)',
        position: 'relative',
        textAlign: 'center',
      }}>
        <div className="container">
          <div className="section-eyebrow">Our Portfolio</div>
          <h1 className="section-title" style={{ maxWidth: 700, margin: '0 auto 20px' }}>
            Real Estate Investments<br />Across the Southeast
          </h1>
          <p className="section-desc" style={{ maxWidth: 560, margin: '0 auto', textAlign: 'center' }}>
            A diversified portfolio of value-add properties including manufactured housing communities,
            multifamily, RV parks, and more.
          </p>
        </div>
      </section>

      {/* Portfolio Grid */}
      {error === 'config' ? (
        <section style={{ padding: '80px 0' }}>
          <div className="container" style={{ textAlign: 'center' }}>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 16 }}>
              Portfolio data will appear here once Webflow CMS is connected.
            </p>
            <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 14, marginTop: 8 }}>
              Add WEBFLOW_API_TOKEN and WEBFLOW_SITE_ID environment variables to enable.
            </p>
          </div>
        </section>
      ) : properties.length === 0 ? (
        <section style={{ padding: '80px 0' }}>
          <div className="container" style={{ textAlign: 'center' }}>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 16 }}>
              No portfolio items found in Webflow CMS.
            </p>
            <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 14, marginTop: 8 }}>
              Check that your Webflow CMS has a collection named &quot;Portfolio&quot;, &quot;Properties&quot;, or &quot;Investments&quot;.
            </p>
          </div>
        </section>
      ) : (
        <PortfolioClient properties={properties} propertyTypes={propertyTypes} />
      )}

      {/* CTA */}
      <section className="cta-section" id="invest">
        <div className="container">
          <div>
            <div className="section-eyebrow">Get Started</div>
            <h2 className="section-title">Interested in Investing?</h2>
            <p className="section-desc" style={{ maxWidth: 560, margin: '0 auto 48px', textAlign: 'center' }}>
              Gain access to institutional-quality real estate investments with transparent reporting
              and consistent distributions.
            </p>
            <Link href="/#invest" className="btn-primary">
              Apply to Invest
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
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
            <div className="footer-col"><h4>Company</h4><Link href="/#about">About</Link><Link href="/#insights">Insights</Link><Link href="/testimonials">Testimonials</Link></div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2026 Requity Group. All rights reserved.</p>
            <div className="footer-contact"><a href="tel:+18132880636">813.288.0636</a> &middot; <a href="mailto:contact@requitygroup.com">contact@requitygroup.com</a><br />401 E Jackson St, Suite 3300, Tampa, FL 33602</div>
          </div>
        </div>
      </footer>
    </div>
  );
}

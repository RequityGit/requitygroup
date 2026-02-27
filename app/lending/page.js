import { findCollectionByName, getField } from '../../lib/webflow';
import LendingClient from './LendingClient';

export const metadata = {
  title: 'Lending | Requity Group',
  description: 'Bridge loans for commercial and residential real estate. Fast closings, flexible terms, and certainty of execution.',
};

export const revalidate = 300;

const BORROWER_COLLECTION_NAMES = ['borrower-testimonials', 'borrower testimonials'];

function getType(fd) {
  const raw = fd.type || fd.category || fd['testimonial-type'] || '';
  if (typeof raw === 'string') return raw.toLowerCase().trim();
  if (typeof raw === 'object' && raw !== null) return (raw.name || raw.slug || '').toLowerCase().trim();
  return '';
}

function mapTestimonialItem(item) {
  const fd = item.fieldData || {};
  return {
    id: item.id || item._id,
    name: fd.name || fd.title || fd['borrower-name'] || fd['author-name'] || fd.author || '',
    quote: fd.quote || fd.testimonial || fd['quote-text'] || fd.text || fd.body || fd.content || '',
    role: fd.role || fd.company || fd.title_2 || fd['borrower-role'] || fd['loan-type'] || fd.subtitle || '',
    type: getType(fd),
  };
}

function isBorrowerTestimonial(item) {
  return item.type === 'borrower' || item.type === 'lending';
}

async function getTestimonials() {
  if (!process.env.WEBFLOW_API_TOKEN || !process.env.WEBFLOW_SITE_ID) {
    return [];
  }

  // First, try dedicated borrower testimonials collections
  for (const name of BORROWER_COLLECTION_NAMES) {
    try {
      const result = await findCollectionByName(name);
      if (result && result.items.length > 0) {
        return result.items
          .filter((item) => !item.isDraft && !item.isArchived)
          .map(mapTestimonialItem)
          .filter((t) => t.quote);
      }
    } catch (err) {
      // Continue to next collection name
    }
  }

  // Fallback: generic "testimonials" collection — filter to borrower-only
  try {
    const result = await findCollectionByName('testimonials');
    if (result && result.items.length > 0) {
      return result.items
        .filter((item) => !item.isDraft && !item.isArchived)
        .map(mapTestimonialItem)
        .filter((t) => t.quote && isBorrowerTestimonial(t));
    }
  } catch (err) {
    // ignore
  }

  return [];
}

export default async function LendingPage() {
  const testimonials = await getTestimonials();
  return <LendingClient testimonials={testimonials} />;
}

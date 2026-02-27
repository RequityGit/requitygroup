import { findCollectionByName, getField } from '../../lib/webflow';
import { getLoanIndexes } from '../../lib/loan-indexes';
import LendingClient from './LendingClient';

export const metadata = {
  title: 'Lending | Requity Group',
  description: 'Bridge loans for commercial and residential real estate. Fast closings, flexible terms, and certainty of execution.',
};

export const revalidate = 300;

const BORROWER_COLLECTION_NAMES = ['borrower-testimonials', 'borrower testimonials'];

function resolveOptionValue(raw) {
  if (!raw) return '';
  if (typeof raw === 'string') return raw.toLowerCase().trim();
  if (typeof raw === 'object') return (raw.name || raw.slug || raw.value || '').toLowerCase().trim();
  return '';
}

function getType(fd) {
  // Check explicit field names first
  const explicit = fd.type || fd['type-2'] || fd.category || fd['testimonial-type'] || fd['testimonial-category'];
  if (explicit) return resolveOptionValue(explicit);

  // Fallback: scan all keys for any field containing "type" or "category"
  for (const key of Object.keys(fd)) {
    const lk = key.toLowerCase();
    if ((lk.includes('type') || lk.includes('category')) && fd[key]) {
      return resolveOptionValue(fd[key]);
    }
  }
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
  return item.type.includes('borrower') || item.type.includes('lending');
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
      // Debug: log first item's fieldData to diagnose field names and type format
      const firstFd = result.items[0]?.fieldData || {};
      console.log('[Testimonials Debug] Collection:', result.collection?.displayName, result.collection?.slug);
      console.log('[Testimonials Debug] Field keys:', Object.keys(firstFd));
      console.log('[Testimonials Debug] Type-related fields:', JSON.stringify(
        Object.fromEntries(Object.entries(firstFd).filter(([k]) => {
          const lk = k.toLowerCase();
          return lk.includes('type') || lk.includes('category');
        }))
      ));

      const mapped = result.items
        .filter((item) => !item.isDraft && !item.isArchived)
        .map(mapTestimonialItem);

      console.log('[Testimonials Debug] Mapped types:', mapped.map((t) => ({ name: t.name, type: t.type })));

      return mapped.filter((t) => t.quote && isBorrowerTestimonial(t));
    }
  } catch (err) {
    console.error('[Testimonials Error]', err);
  }

  return [];
}

export default async function LendingPage() {
  const [testimonials, loanIndexes] = await Promise.all([
    getTestimonials(),
    getLoanIndexes(),
  ]);
  return <LendingClient testimonials={testimonials} loanIndexes={loanIndexes} />;
}

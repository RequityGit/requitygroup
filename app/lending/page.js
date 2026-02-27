import { findCollectionByName, getField } from '../../lib/webflow';
import LendingClient from './LendingClient';

export const metadata = {
  title: 'Lending | Requity Group',
  description: 'Bridge loans for commercial and residential real estate. Fast closings, flexible terms, and certainty of execution.',
};

export const revalidate = 300;

const COLLECTION_NAMES = ['borrower-testimonials', 'borrower testimonials', 'testimonials'];

async function getTestimonials() {
  if (!process.env.WEBFLOW_API_TOKEN || !process.env.WEBFLOW_SITE_ID) {
    return [];
  }

  for (const name of COLLECTION_NAMES) {
    try {
      const result = await findCollectionByName(name);
      if (result && result.items.length > 0) {
        return result.items
          .filter((item) => !item.isDraft && !item.isArchived)
          .map((item) => {
            const fd = item.fieldData || {};
            return {
              id: item.id || item._id,
              name: fd.name || fd.title || fd['borrower-name'] || fd['author-name'] || fd.author || '',
              quote: fd.quote || fd.testimonial || fd['quote-text'] || fd.text || fd.body || fd.content || '',
              role: fd.role || fd.title_2 || fd['borrower-role'] || fd['loan-type'] || fd.subtitle || '',
            };
          })
          .filter((t) => t.quote);
      }
    } catch (err) {
      // Continue to next collection name
    }
  }

  return [];
}

export default async function LendingPage() {
  const testimonials = await getTestimonials();
  return <LendingClient testimonials={testimonials} />;
}

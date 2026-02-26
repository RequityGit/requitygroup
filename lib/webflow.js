const WEBFLOW_API = 'https://api.webflow.com/v2';

function headers() {
  return {
    Authorization: `Bearer ${process.env.WEBFLOW_API_TOKEN}`,
    'Content-Type': 'application/json',
  };
}

async function fetchWebflow(path) {
  const res = await fetch(`${WEBFLOW_API}${path}`, {
    headers: headers(),
    next: { revalidate: 300 }, // cache for 5 minutes
  });
  if (!res.ok) {
    console.error(`Webflow API error: ${res.status} ${res.statusText} for ${path}`);
    return null;
  }
  return res.json();
}

/** List all CMS collections for the site */
export async function getCollections() {
  const siteId = process.env.WEBFLOW_SITE_ID;
  const data = await fetchWebflow(`/sites/${siteId}/collections`);
  return data?.collections || [];
}

/** Get a single collection by ID */
export async function getCollection(collectionId) {
  const data = await fetchWebflow(`/collections/${collectionId}`);
  return data;
}

/** Get all items from a collection (handles pagination) */
export async function getCollectionItems(collectionId, limit = 100) {
  let allItems = [];
  let offset = 0;
  let hasMore = true;

  while (hasMore) {
    const data = await fetchWebflow(
      `/collections/${collectionId}/items?limit=${Math.min(limit, 100)}&offset=${offset}`
    );
    if (!data || !data.items) break;

    allItems = allItems.concat(data.items);
    offset += data.items.length;
    hasMore = data.items.length === 100 && allItems.length < limit;
  }

  return allItems;
}

/**
 * Find a collection by name (case-insensitive partial match).
 * Returns { collection, items } or null.
 */
export async function findCollectionByName(name) {
  const collections = await getCollections();
  const match = collections.find(
    (c) => c.displayName?.toLowerCase().includes(name.toLowerCase()) ||
           c.slug?.toLowerCase().includes(name.toLowerCase())
  );
  if (!match) return null;

  const items = await getCollectionItems(match.id);
  return { collection: match, items };
}

/**
 * Get all published CMS data organized by collection name.
 * Returns a map: { collectionSlug: { collection, items } }
 */
export async function getAllCMSData() {
  const collections = await getCollections();
  const results = {};

  for (const col of collections) {
    const items = await getCollectionItems(col.id);
    results[col.slug] = {
      collection: col,
      items: items.filter((item) => !item.isDraft && !item.isArchived),
    };
  }

  return results;
}

/**
 * Extract a readable field value from a Webflow item.
 * Webflow CMS items store data in fieldData.
 */
export function getField(item, fieldName) {
  return item?.fieldData?.[fieldName] ?? null;
}

/**
 * Get image URL from a Webflow image field.
 */
export function getImageUrl(item, fieldName) {
  const field = getField(item, fieldName);
  if (!field) return null;
  if (typeof field === 'string') return field;
  return field?.url || null;
}

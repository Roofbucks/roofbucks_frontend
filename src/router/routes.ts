/**
 * ROUTES
 *
 * ===============================================
 *
 * This object depicts the component url structure.
 * It contains a key-value pair of components and their respective URLs
 *
 */

export const Routes = {
  // General
  home: "/",
  listing: "/listing",
  marketplace: "/marketplace",
  propertyListing: "/property/listing/:id",
  propertyListingID: (id) => `/property/listing/${id}`,
  propertyMarketplace: "/property/marketplace/:id",
  propertyMarketplaceID: (id) => `/property/marketplace/${id}`,
  agents: "/agents",
  about: `/about`,
  contact: `/contact`,
  terms: `/terms-of-service`,
  privacy: `/privacy-policy`,
};

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
  signup: "/?signup=true",
  login: "/?login=true",
  recovery: "/?recovery=true",
  verification: "/?verification=true",
  reset: "/?reset=true",
  listing: "/listing",
  marketplace: "/marketplace",
  property: `/property/:id`,
  propertyID: (id) => `/property/${id}`,
  agents: "/agents",
  about: `/about`,
  contact: `/contact`,
  terms: `/terms-of-service`,
  privacy: `/privacy-policy`,
  refund: `/refund-policy`,

  // Profile
  profileSetup: (view = "") => `/profile/setup${view}`,
  profile: `/profile/:id`,
  profileID: (id) => `/profile/${id}`,

  // Dashboard
  overview: `/overview`,
  properties: `/properties`,
  editProperty: `/property/edit/:id`,
  editPropertyID: (id) => `/property/edit/${id}`,
  addProperty: `/properties/add`,
  finances: `/finances`,
  settings: `/settings`,
  inbox: `/inbox`,
};

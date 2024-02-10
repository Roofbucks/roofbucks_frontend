/*
=================================
PROPERTIES URLS
=================================
*/

import { appendParams } from "helpers";

/**
 * Add property url
 *
 * @returns url string
 *
 */

export const addPropertyURL = () => `/properties/new/`;

/**
 * Fetch properties url
 *
 * @returns url string
 *
 */
export const fetchPropertiesURL = ({ search, page }) =>
  `/properties/?${appendParams({ search, page })}`;

export const fetchPropertyURL = (id) => `/properties/single/${id}/`;

/**
 * Add property url
 *
 * @returns url string
 *
 */

export const updatePropertyURL = (id) => `/properties/update/${id}/`;

/**
 * Fetch similar properties url
 *
 * @returns url string
 *
 */

export const fetchSimilarPropertiesURL = (id) =>
  `/properties/similar_properties/${id}/`;

/**
 * Fetch stays for a property URL
 *
 * @returns url string
 *
 */

export const fetchStaysURL = (id) => `/properties/stay-periods/${id}/`;

/**
 * Delete stay for a property URL
 *
 * @returns url string
 *
 */

export const deleteStayURL = ({ propertyID, stayIndex }) =>
  `/properties/stay-periods/${propertyID}/${stayIndex}/`;

/**
 * Add stays
 *
 * @returns url string
 *
 */

export const addStaysURL = (id) => `/properties/stay-periods/${id}/`;

/**
 * Fetch marketplace properties
 *
 * @returns url string
 *
 */

export const marketplaceURL = (params) =>
  `/properties/marketplace/?${appendParams(params)}`;

/**
 * Fetch listings properties
 *
 * @returns url string
 *
 */

export const listingsURL = (params) =>
  `/properties/listings/?${appendParams(params)}`;

/**
 * Apply for a property listing url
 *
 * @returns url string
 *
 */

export const listingApplicationURL = () =>
  `/properties/listing_application_request/`;

/**
 * Invest in a marketplace property url
 *
 * @returns url string
 *
 */

export const marketplaceInvestmentURL = () =>
  `/properties/marketplace_application_request/`;

/**
 * Fetch agent properties url
 *
 * @returns url string
 *
 */
export const fetchAgentPropertiesURL = ({ search, page }) =>
  `/properties/agent_properties/?${appendParams({ search, page, limit: 15 })}`;

/**
 * Fetch shareholder properties url
 *
 * @returns url string
 *
 */
export const fetchShareholderPropertiesURL = ({ search, page }) =>
  `/properties/shareholder_properties/?${appendParams({
    search,
    page,
    limit: 10,
  })}`;

/**
 * Buy back url
 *
 * @returns url string
 *
 */
export const buyBackURL = (property) => `/properties/buy_back/${property}/`;

/**
 * Pay rent url
 *
 * @returns url string
 *
 */
export const payRentURL = (property) => `/properties/pay_rent/${property}/`;

/**
 * Fetch shareholder applications url
 *
 * @returns url string
 *
 */
export const fetchApplicationsURL = (page) =>
  `/user/shareholder_applications/?${appendParams({ page, limit: 10 })}`;

/**
 * Property payment url
 *
 * @returns url string
 *
 */
export const propertyPaymentURL = (txnId) =>
  `/properties/complete_payment/${txnId}`;

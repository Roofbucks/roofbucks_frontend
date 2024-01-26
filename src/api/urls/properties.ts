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

export const marketplaceURL = ({
  search,
  page,
  limit,
  country,
  state,
  budget,
  type,
  status,
}) =>
  `/properties/marketplace/?${appendParams({
    search,
    page,
    limit,
    country,
    state,
    budget,
    apartment_type: type,
    completion_status: status,
  })}`;

/**
 * Fetch listings properties
 *
 * @returns url string
 *
 */

export const listingsURL = ({
  search,
  page,
  limit,
  country,
  state,
  budget,
  type,
  status,
}) =>
  `/properties/listings/?${appendParams({
    search,
    page,
    limit,
    country,
    state,
    budget,
    apartment_type: type,
    completion_status: status,
  })}`;

/**
 * Apply for a property listing url
 *
 * @returns url string
 *
 */

export const listingApplicationURL = () => `/properties/listing_application_request/`;

/**
 * Invest in a marketplace property url
 *
 * @returns url string
 *
 */

export const marketplaceInvestmentURL = () =>
  `/properties/listing_application_request/`;

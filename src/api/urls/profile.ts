/*
=================================
PROFILE URLS
=================================
*/

import { appendParams } from "helpers";

/**
 * Fetch profile url
 *
 * @returns url string
 *
 */

export const fetchProfileURL = () => `/user/profile/`;

/**
 * Create agent profile url
 *
 * @returns url string
 *
 */

export const createAgentProfileURL = () => `/user/profile/`;

/**
 * Add business url
 *
 * @returns url string
 *
 */

export const addBusinessURL = () => `/user/add_business/`;

/**
 * Verify company url
 *
 * @returns url string
 *
 */

export const verifyCompanyURL = () => `/auth/company-verification/`;

/**
 * Fetch business url
 *
 * @returns url string
 *
 */

export const fetchBusinessURL = ({ id, orderBy = "" }) =>
  `/user/business_profile/${id}/?${appendParams({
    order_by: orderBy,
  })}`;

/**
 * Add billing url
 *
 * @returns url string
 *
 */

export const addBillingURL = () => `/user/add_bank_information/`;

/**
 * Update password url
 *
 * @returns url string
 *
 */
export const updatePasswordURL = () => `/auth/change-password/`;

/**
 * Fetch banks url
 *
 * @returns url string
 *
 */
export const fetchBanksURL = () => `/properties/get_banks`;

/**
 * Update personal profile url
 *
 * @returns url string
 *
 */
export const updateProfileURL = () => `/user/profile/`;

/**
 * Update business profile url
 *
 * @returns url string
 *
 */
export const updateBusinessURL = () => `/user/add_business/`;

/**
 * Fetch overview stat url
 *
 * @returns url string
 *
 */
export const fetchStatURL = (params) => `/user/stat/?${appendParams(params)}`;

/**
 * Fetch overview graph url
 *
 * @returns url string
 *
 */
export const fetchGraphURL = (params) => `/user/graph/?${appendParams(params)}`;

/**
 * Mark activity as read url
 *
 * @returns url string
 *
 */
export const markAsReadURL = (id) => `/user/mark_as_read/${id}/`;

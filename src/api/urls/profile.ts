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
 * Fetch overview data url
 *
 * @returns url string
 *
 */
export const fetchOverviewURL = () => `/user/overview/`;

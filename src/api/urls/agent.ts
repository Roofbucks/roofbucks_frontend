/*
=================================
AGENT URLS
=================================
*/

import { appendParams } from "helpers";

/**
 * Fetch agents url
 *
 * @returns url string
 *
 */

export const fetchAgentsURL = ({ search, page }) =>
  `/user/agent_list/?${appendParams({ search, page })}`;

/**
 * Fetch agent profile url
 *
 * @returns url string
 *
 */

export const fetchAgentURL = ({ id }: {id?: string}) =>
  `/user/profile?${appendParams({ user_id: id })}`;

/**
 * Fetch agent reviews url
 *
 * @returns url string
 *
 */

export const fetchReviewsURL = ({ id }) => `/user/business_reviews/${id}/`;

/**
 * Add agent review url
 *
 * @returns url string
 *
 */

export const addReviewURL = ({ id }) => `/user/add_reviews/${id}/`;

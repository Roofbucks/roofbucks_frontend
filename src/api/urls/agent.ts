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

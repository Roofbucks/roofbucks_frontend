/*
=================================
FINANCE URLS
=================================
*/

import { appendParams } from "helpers";

/**
 * Fetch transactions url
 *
 * @returns url string
 *
 */

export const fetchTransactionsURL = (params) =>
  `/user/transactions/?${appendParams(params)}`;

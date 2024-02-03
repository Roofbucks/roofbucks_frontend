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

/**
 * Fetch bank accounts url
 *
 * @returns url string
 *
 */

export const fetchBankAccountsURL = () =>
  `/user/get_bank_details/?${appendParams({ page: 1, limit: 6 })}`;

/**
 * Add bank account url
 *
 * @returns url string
 *
 */

export const addBankAccountURL = () => `/user/add_bank_information/`;

/**
 * Set primary bank account url
 *
 * @returns url string
 *
 */

export const setPrimaryBankAccountURL = (index) => `/user/bank/${index}/`;

/**
 * Delete bank account url
 *
 * @returns url string
 *
 */

export const deleteBankAccountURL = (index) => `/user/bank/${index}/`;

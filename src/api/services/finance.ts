/*
=================================
FINANCE SERVICES
=================================
*/

import {
  addBankAccountURL,
  deleteBankAccountURL,
  deleteRequest,
  fetchBankAccountsURL,
  fetchTransactionsURL,
  getRequest,
  patchRequest,
  setPrimaryBankAccountURL,
} from "api";

interface fetchTransactionsParams {
  page: number;
  limit: number;
}

/**
 * Fetch transactions service
 * @returns axios promise
 */

export const fetchTransactionsService = (params: fetchTransactionsParams) => {
  const requestData = {
    url: fetchTransactionsURL(params),
  };

  return getRequest(requestData);
};

/**
 * Fetch bank accounts service
 * @returns axios promise
 */

export const fetchBankAccountsService = () => {
  const requestData = {
    url: fetchBankAccountsURL(),
  };

  return getRequest(requestData);
};

export interface addBankAccountRequestData {
  bank_information: {
    account_name: string;
    account_number: string;
    bank_name: string;
    country: string;
  };
}

/**
 * Add bank account service
 * @returns axios promise
 */

export const addBankAccountService = (data: addBankAccountRequestData) => {
  const requestData = {
    url: addBankAccountURL(),
    data,
  };

  return patchRequest(requestData);
};

/**
 * Set primary bank account service
 * @returns axios promise
 */

export const setPrimaryBankAccountService = (index: number) => {
  const requestData = {
    url: setPrimaryBankAccountURL(index),
  };

  return getRequest(requestData);
};

/**
 * Delete bank account service
 * @returns axios promise
 */

export const deleteBankAccountService = (index: number) => {
  const requestData = {
    url: deleteBankAccountURL(index),
  };

  return deleteRequest(requestData);
};

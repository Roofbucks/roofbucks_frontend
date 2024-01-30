/*
=================================
FINANCE SERVICES
=================================
*/

import { fetchTransactionsURL, getRequest } from "api";

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

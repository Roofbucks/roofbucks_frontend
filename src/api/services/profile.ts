/*
=================================
PROFILE SERVICES
=================================
*/

import {
  patchRequest,
  createAgentProfileURL,
  postRequest,
  addBusinessURL,
  verifyCompanyURL,
  getRequest,
  fetchProfileURL,
  fetchBusinessURL,
  addBillingURL,
} from "api";

/**
 * Fetch profile  service
 * @returns axios promise
 */

export const fetchProfileService = () => {
  const requestData = {
    url: fetchProfileURL(),
  };

  return getRequest(requestData);
};

/**
 * Create agent profile service
 * @returns axios promise
 */

export const createAgentProfileService = (data: FormData) => {
  const requestData = {
    url: createAgentProfileURL(),
    data: data,
    config: {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  };

  return patchRequest(requestData);
};

/**
 * Add business service
 * @returns axios promise
 */

export const addBusinessService = (data: FormData) => {
  const requestData = {
    url: addBusinessURL(),
    data,
  };

  return postRequest(requestData);
};

interface VerifyCompanyRequestData {
  registration_number: string;
  company_name: string;
}
/**
 * Verify company service
 * @returns axios promise
 */

export const verifyCompanyService = (data: VerifyCompanyRequestData) => {
  const requestData = {
    url: verifyCompanyURL(),
    data,
  };

  return postRequest(requestData);
};

interface FetchBusinessProps {
  id: string;
  orderBy?: string;
}

/**
 * Fetch business service
 * @returns axios promise
 */

export const fetchBusinessService = ({ id, orderBy }: FetchBusinessProps) => {
  const requestData = {
    url: fetchBusinessURL({ id, orderBy }),
  };

  return getRequest(requestData);
};

export interface addBillingServiceRequestData {
  bank_information: {
    account_name: string;
    account_number: string;
    bank_name: string;
    country: string;
  };
}
/**
 * Create agent profile service
 * @returns axios promise
 */

export const addBillingService = (data: addBillingServiceRequestData) => {
  const requestData = {
    url: addBillingURL(),
    data: data,
  };

  return patchRequest(requestData);
};

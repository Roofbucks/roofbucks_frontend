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
  updatePasswordURL,
  fetchBanksURL,
  updateProfileURL,
  updateBusinessURL,
  fetchOverviewURL,
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

export interface UpdatePasswordRequestData {
  current_password: string;
  new_password: string;
}

/**
 * Update password service
 * @returns axios promise
 */

export const updatePasswordService = (data: UpdatePasswordRequestData) => {
  const requestData = {
    url: updatePasswordURL(),
    data: data,
  };

  return postRequest(requestData);
};

/**
 * Fetch banks service
 * @returns axios promise
 */

export const fetchBanksService = () => {
  const requestData = {
    url: fetchBanksURL(),
  };

  return getRequest(requestData);
};

/**
 * Update personal profile service
 * @returns axios promise
 */

export const updateProfileService = (data: FormData) => {
  const requestData = {
    url: updateProfileURL(),
    data,
  };

  return patchRequest(requestData);
};

/**
 * Update business profile service
 * @returns axios promise
 */

export const updateBusinessService = (data: FormData) => {
  const requestData = {
    url: updateBusinessURL(),
    data,
  };

  return patchRequest(requestData);
};

/**
 * Fetch overview data service
 * @returns axios promise
 */

export const fetchOverviewService = () => {
  const requestData = {
    url: fetchOverviewURL(),
  };

  return getRequest(requestData);
};

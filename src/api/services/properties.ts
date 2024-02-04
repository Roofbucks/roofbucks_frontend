/*
=================================
PROPERTIES SERVICES
=================================
*/

import {
  deleteRequest,
  getRequest,
  patchRequest,
  postRequest,
} from "api/requestProcessor";
import {
  addPropertyURL,
  addStaysURL,
  buyBackURL,
  deleteStayURL,
  fetchAgentPropertiesURL,
  fetchPropertiesURL,
  fetchPropertyURL,
  fetchShareholderPropertiesURL,
  fetchSimilarPropertiesURL,
  fetchStaysURL,
  listingApplicationURL,
  listingsURL,
  marketplaceInvestmentURL,
  marketplaceURL,
  payRentURL,
  updatePropertyURL,
} from "api/urls";

/**
 * Create agent property service
 * @returns axios promise
 */

export const addPropertyService = (data: FormData) => {
  const requestData = {
    url: addPropertyURL(),
    data: data,
    config: {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  };

  return postRequest(requestData);
};

/**
 * Fetch agent properties service
 * @returns axios promise
 */

export const fetchPropertiesService = ({ search, page }) => {
  const requestData = {
    url: fetchPropertiesURL({ search, page }),
  };

  return getRequest(requestData);
};

/**
 * Fetch single property service
 * @returns axios promise
 */

export const fetchPropertyService = (id: string) => {
  const requestData = {
    url: fetchPropertyURL(id),
  };

  return getRequest(requestData);
};

export const updatePropertyService = ({
  data,
  id,
}: {
  data: FormData;
  id: string;
}) => {
  const requestData = {
    url: updatePropertyURL(id),
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
 * Fetch similar properties
 * @returns axios promise
 */

export const fetchSimilarPropertiesService = (id: string) => {
  const requestData = {
    url: fetchSimilarPropertiesURL(id),
  };

  return getRequest(requestData);
};

/**
 * Fetch stays
 * @returns axios promise
 */

export const fetchStaysService = (id: string) => {
  const requestData = {
    url: fetchStaysURL(id),
  };

  return getRequest(requestData);
};

/**
 * Delete stay
 * @returns axios promise
 */

export const deleteStayService = ({ propertyID, stayIndex }) => {
  const requestData = {
    url: deleteStayURL({ propertyID, stayIndex }),
  };

  return deleteRequest(requestData);
};

interface AddStayRequestData {
  stay_periods: string[][];
}

/**
 * Delete stay
 * @returns axios promise
 */

export const addStaysService = ({
  id,
  data,
}: {
  id: string;
  data: AddStayRequestData;
}) => {
  const requestData = {
    url: addStaysURL(id),
    data,
  };

  return patchRequest(requestData);
};

interface MarketplaceParams {
  search: string;
  page: string;
  limit: string;
  country: string;
  apartment_type: string;
  budget_range: string;
  completion_status: "Completed" | "In-progress" | string;
}

/**
 * Fetch marketplace properties
 * @returns axios promise
 */

export const marketplaceService = (params: MarketplaceParams) => {
  const requestData = {
    url: marketplaceURL(params),
  };

  return getRequest(requestData);
};

interface ListingsParams {
  search: string;
  page: string;
  limit: string;
  country: string;
  apartment_type: string;
  budget_range: string;
  completion_status: "Completed" | "In-progress" | string;
}

/**
 * Fetch listings properties
 * @returns axios promise
 */

export const listingsService = (params: ListingsParams) => {
  const requestData = {
    url: listingsURL(params),
  };

  return getRequest(requestData);
};

export interface listingApplicationRequestData {
  property_id: string;
  current_location: string;
  social_link: string;
  reason_for_purchase: string;
  percentage_ownership: number;
  intent_for_full_ownership: boolean;
}

/**
 * Apply for a property listing properties service
 * @returns axios promise
 */

export const listingApplicationService = (
  data: listingApplicationRequestData
) => {
  const requestData = {
    url: listingApplicationURL(),
    data,
  };

  return postRequest(requestData);
};

export interface marketplaceInvestmentRequestData {
  property_id: string;
  current_location: string;
  social_link: string;
  investment_timeline: string;
  investment_focus: number;
  expected_ROI: number;
  investor_type: string;
}

/**
 * Invest in a marketplace property service
 * @returns axios promise
 */

export const marketplaceInvestmentService = (
  data: marketplaceInvestmentRequestData
) => {
  const requestData = {
    url: marketplaceInvestmentURL(),
    data,
  };

  return postRequest(requestData);
};

/**
 * Fetch agent properties service
 * @returns axios promise
 */

export const fetchAgentPropertiesService = ({ search, page }) => {
  const requestData = {
    url: fetchAgentPropertiesURL({ search, page }),
  };

  return getRequest(requestData);
};

/**
 * Fetch shareholder properties service
 * @returns axios promise
 */

export const fetchShareholderPropertiesService = ({ search, page }) => {
  const requestData = {
    url: fetchShareholderPropertiesURL({ search, page }),
  };

  return getRequest(requestData);
};

/**
 * Buy back service
 * @returns axios promise
 */

export const buyBackService = (property: string) => {
  const requestData = {
    url: buyBackURL(property),
  };

  return getRequest(requestData);
};

/**
 * Pay rent service
 * @returns axios promise
 */

export const payRentService = (property: string) => {
  const requestData = {
    url: payRentURL(property),
  };

  return getRequest(requestData);
};

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
  deleteStayURL,
  fetchPropertiesURL,
  fetchPropertyURL,
  fetchSimilarPropertiesURL,
  fetchStaysURL,
  marketplaceURL,
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

  return postRequest(requestData);
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
  state: string;
  budget: string;
  type: string;
  status: string;
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

/*
=================================
PROPERTIES SERVICES
=================================
*/

import { getRequest, postRequest } from "api/requestProcessor";
import { addPropertyURL, fetchPropertiesURL } from "api/urls";

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
 * Fetch agent property service
 * @returns axios promise
 */

export const fetchPropertiesService = ({ search, page }) => {
  const requestData = {
    url: fetchPropertiesURL({ search, page }),
  };

  return getRequest(requestData);
};

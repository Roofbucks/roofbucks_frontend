/*
=================================
PROPERTIES SERVICES
=================================
*/

import { postRequest } from "api/requestProcessor";
import { addPropertyURL } from "api/urls";

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

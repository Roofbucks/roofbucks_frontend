/**
 * Fetch agents
 * @returns axios promise
 */

import { getRequest } from "api/requestProcessor";
import { fetchAgentsURL } from "api/urls";

export const fetchAgentsService = ({search, page}) => {
  const requestData = {
    url: fetchAgentsURL({ search, page }),
  };

  return getRequest(requestData);
};

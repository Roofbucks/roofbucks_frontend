/**
 * Fetch agents
 * @returns axios promise
 */

import { getRequest, postRequest } from "api/requestProcessor";
import {
  addReviewURL,
  fetchAgentURL,
  fetchAgentsURL,
  fetchReviewsURL,
} from "api/urls";

export const fetchAgentsService = ({ search, page }) => {
  const requestData = {
    url: fetchAgentsURL({ search, page }),
  };

  return getRequest(requestData);
};

export const fetchAgentService = ({ id }: {id?: string}) => {
  const requestData = {
    url: fetchAgentURL({ id }),
  };

  return getRequest(requestData);
};

export const fetchReviewsService = ({ id }) => {
  const requestData = {
    url: fetchReviewsURL({ id }),
  };

  return getRequest(requestData);
};

interface AddReviewRequestData {
  rating: number;
  review: string;
}

export const addReviewService = ({
  id,
  data,
}: {
  id: string;
  data: AddReviewRequestData;
}) => {
  const requestData = {
    url: addReviewURL({ id }),
    data,
  };

  return postRequest(requestData);
};

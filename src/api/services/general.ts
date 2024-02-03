/*
=================================
GENERAL SERVICES
=================================
*/

import { contactUsURL, postRequest } from "api";

export interface contactUsRequestData {
  name: string;
  email: string;
  phone: string;
  country: string;
  body: string;
}

/**
 * Contact us service
 * @returns axios promise
 */

export const contactUsService = (data: contactUsRequestData) => {
  const requestData = {
    url: contactUsURL(),
    data,
  };

  return postRequest(requestData);
};

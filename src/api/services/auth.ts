/*
=================================
AUTH SERVICES
=================================
*/

import {
  postRequest,
  resendVerificationURL,
  signupURL,
  signupVerificationURL,
} from "api";

interface SignupRequestData {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}
/**
 * Signup  service
 * @returns axios promise
 */

export const signupService = (data: SignupRequestData) => {
  const requestData = {
    url: signupURL(),
    data,
  };

  return postRequest(requestData);
};

interface SignupVerificationRequestData {
  email: string;
  token: string;
}
/**
 * Signup verification service
 * @returns axios promise
 */

export const signupVerificationService = (
  data: SignupVerificationRequestData
) => {
  const requestData = {
    url: signupVerificationURL(),
    data,
  };

  return postRequest(requestData);
};

interface ResendVerificationData {
  email: string;
}
/**
 * resend verification service
 * @returns axios promise
 */

export const resendVerificationService = (data: ResendVerificationData) => {
  const requestData = {
    url: resendVerificationURL(),
    data,
  };

  return postRequest(requestData);
};

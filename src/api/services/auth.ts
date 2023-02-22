/*
=================================
AUTH SERVICES
=================================
*/

import {
  getRequest,
  loginURL,
  newPasswordURL,
  patchRequest,
  postRequest,
  refreshTokenURL,
  resendVerificationURL,
  resetPasswordURL,
  signupURL,
  signupVerificationURL,
} from "api";

interface SignupRequestData {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  role: number;
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

interface loginData {
  email: string;
  password: string;
}
/**
 * login service
 * @returns axios promise
 */

export const loginService = (data: loginData) => {
  const requestData = {
    url: loginURL(),
    data,
  };

  return postRequest(requestData);
};

interface resetPasswordData {
  email: string;
}
/**
 * request password reset service
 * @returns axios promise
 */

export const resetPasswordService = (data: resetPasswordData) => {
  const requestData = {
    url: resetPasswordURL(),
    data,
  };

  return postRequest(requestData);
};

interface newPasswordData {
  password: string;
  uid64: string;
  token: string;
}
/**
 * reset password service
 * @returns axios promise
 */

export const newPasswordService = (data: newPasswordData) => {
  const requestData = {
    url: newPasswordURL(),
    data,
  };

  return patchRequest(requestData);
};

interface refreshTokenData {
  refresh: string;
}
/**
 * refresh JWT service
 * @returns axios promise
 */

export const refreshTokenService = (data: refreshTokenData) => {
  const requestData = {
    url: refreshTokenURL(),
    data,
  };

  return postRequest(requestData);
};

/*
=================================
AUTH SERVICES
=================================
*/

import {
  axiosInstanceUnauth,
  loginURL,
  newPasswordURL,
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
  return axiosInstanceUnauth.post(signupURL(), data);
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
  return axiosInstanceUnauth.post(signupVerificationURL(), data);
};

interface ResendVerificationData {
  email: string;
}
/**
 * resend verification service
 * @returns axios promise
 */

export const resendVerificationService = (data: ResendVerificationData) => {
  return axiosInstanceUnauth.post(resendVerificationURL(), data);
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
  return axiosInstanceUnauth.post(loginURL(), data);
};

interface resetPasswordData {
  email: string;
}
/**
 * request password reset service
 * @returns axios promise
 */

export const resetPasswordService = (data: resetPasswordData) => {
  return axiosInstanceUnauth.post(resetPasswordURL(), data);
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
  return axiosInstanceUnauth.patch(newPasswordURL(), data);
};

interface refreshTokenData {
  refresh: string;
}
/**
 * refresh JWT service
 * @returns axios promise
 */

export const refreshTokenService = (data: refreshTokenData) => {
  return axiosInstanceUnauth.post(refreshTokenURL(), data);
};

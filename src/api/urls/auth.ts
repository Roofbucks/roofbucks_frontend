/*
=================================
AUTH URLS
=================================
*/

/**
 * Signup url
 *
 * @returns url string
 *
 */

export const signupURL = () => `/auth/signup/`;

/**
 * Signup OTP Verification URL
 *
 * @returns url string
 *
 */

export const signupVerificationURL = () => `/auth/verify-email/`;

/**
 * Resend Verification mail URL
 *
 * @returns url string
 *
 */

export const resendVerificationURL = () => `/auth/resend-verification-mail/`;

/**
 * Login URL
 *
 * @returns url string
 *
 */

export const loginURL = () => `/auth/login/`;

/**
 * Request Password Reset URL
 *
 * @returns url string
 *
 */

export const resetPasswordURL = () => `/auth/request-reset-password-email/`;

/**
 * Password Reset URL
 *
 * @returns url string
 *
 */

export const newPasswordURL = () => `/auth/set-new-password/`;

/**
 * Refresh JWT URL
 *
 * @returns url string
 *
 */

export const refreshTokenURL = () => `/auth/refresh-token/`;

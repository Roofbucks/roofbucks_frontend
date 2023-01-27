import axios, { AxiosRequestConfig } from "axios";

// Create and axios instance
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

// axios request interceptor
axiosInstance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // Get Access Token from local storage
    const accessToken = localStorage.getItem("roofbucksAccessToken");
    if (accessToken && config.headers) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => error
);

// Log a user out with an expired token
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401 && window.location.pathname !== "/") {
      window.location.assign("/login");
      // Redirect user to login page if not authorized
      // TODO: Add redirect logic
    }
    return error;
  }
);

// API Request Functions
interface ApiRequestProps {
  url: string;
  config?: AxiosRequestConfig;
  data?: unknown;
}

// Axios request functions
export async function getRequest(request: ApiRequestProps) {
  return await axiosInstance.get(request.url, request.config);
}

export async function postRequest(request: ApiRequestProps) {
  return await axiosInstance.post(request.url, request.data, request.config);
}

export async function putRequest(request: ApiRequestProps) {
  return await axiosInstance.put(request.url, request.data, request.config);
}

export async function patchRequest(request: ApiRequestProps) {
  return await axiosInstance.patch(request.url, request.data, request.config);
}

export async function deleteRequest(request: ApiRequestProps) {
  return await axiosInstance.delete(request.url, request.config);
}
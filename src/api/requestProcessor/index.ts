import { refreshTokenService } from "api/services";
import axios, { AxiosRequestConfig } from "axios";

// Create and axios instance
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

// axios request interceptor
axiosInstance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // Get Access Token from local storage
    const accessToken = localStorage.getItem("roofbucksAccess");
    if (accessToken && config.headers) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => error
);

// Refresh access token if token has expired
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error?.response?.status === 401 &&
      !originalRequest._retry &&
      window.location.pathname !== "/"
    ) {
      originalRequest._retry = true;
      refreshToken();
    }
    return error;
  }
);

export const refreshToken = async (): Promise<string> => {
  let token = "";

  refreshTokenService({
    refresh: localStorage.getItem("roofbucksRefresh") ?? "",
  })
    .then((res) => {
      token = res.data.access;
      localStorage.setItem("accessToken", token);
      axios.defaults.headers.common["authorization"] = "Bearer " + token;
      return token;
    })
    .catch((err) => {
      console.log(err);
      localStorage.clear();
      window.location.assign("/");
    });

  return token;
};

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

import axios, { AxiosError } from 'axios';
// @ts-expect-error - react-native-dotenv module without types
import { BACKEND_URL } from '@env';
import { authService } from './services/authService';

const axiosInstance = axios.create({
  baseURL: BACKEND_URL,
});

console.log('API base URL:', BACKEND_URL);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      authService.removeAccessToken();
    }
    return Promise.reject(error);
  }
);

async function get<T>(url: string): Promise<T | null> {
  try {
    const authToken = authService.getAccessToken();
    const headers = authToken ? { Authorization: `Bearer ${authToken}` } : {};
    const response = await axiosInstance.get<{ response: T }>(
      `${BACKEND_URL}${url}`,
      { headers }
    );
    return response.data.response;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error(
      `Error fetching ${url}:`,
      axiosError.response?.data || axiosError.message
    );
    // show toast with error message
    return null;
  }
}

async function post<T, R>(url: string, data: T): Promise<R | null> {
  try {
    const authToken = authService.getAccessToken();
    const headers = authToken ? { Authorization: `Bearer ${authToken}` } : {};
    const response = await axiosInstance.post<{ response: R }>(
      `${BACKEND_URL}${url}`,
      data,
      {
        headers,
      }
    );
    return response.data.response;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error(
      `Error posting to ${url}:`,
      axiosError.response?.data || axiosError.message
    );
    // show toast with error message
    return null;
  }
}

export default {
  get,
  post,
};

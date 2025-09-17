import axios, { AxiosError } from 'axios';
// @ts-expect-error - react-native-dotenv module without types
import { BACKEND_URL } from '@env';

const axiosInstance = axios.create({
  baseURL: BACKEND_URL,
});

async function get<T>(url: string, token?: string): Promise<T | null> {
  try {
    console.log(`${BACKEND_URL}${url}`);
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
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

async function post<T, R>(
  url: string,
  data: T,
  token?: string
): Promise<R | null> {
  try {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
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

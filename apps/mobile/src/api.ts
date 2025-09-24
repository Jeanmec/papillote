import axios, { AxiosError } from 'axios';
// @ts-expect-error - react-native-dotenv module without types
import { BACKEND_URL } from '@env';
import { authService } from './services/authService';
import Toast from 'react-native-toast-message';
import { ZodType } from 'zod';
import { getZodErrorMessages } from '@papillote/validation';

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

async function get<T>(url: string, schema?: ZodType<T>): Promise<T | null> {
  try {
    const authToken = authService.getAccessToken();
    const headers = authToken ? { Authorization: `Bearer ${authToken}` } : {};
    const response = await axiosInstance.get<{ response: T }>(
      `${BACKEND_URL}${url}`,
      { headers }
    );

    if (schema) {
      try {
        schema.parse(response.data.response);
      } catch (validationError) {
        const errorMessages = getZodErrorMessages(
          validationError,
          response.data.response as Record<string, unknown>
        );
        if (errorMessages.length > 0) {
          Toast.show({
            type: 'error',
            text1: 'Validation Error',
            text2: errorMessages[0],
          });
        }
        return null;
      }
    }

    return response.data.response;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error(
      `Error fetching ${url}:`,
      axiosError.response?.data || axiosError.message
    );

    console.log(axiosError.message);
    console.log(axiosError.response?.data);

    Toast.show({
      type: 'error',
      text1: 'An error occurred',
      text2: 'Try again later',
    });
    return null;
  }
}

async function post<T, R>(
  url: string,
  data: T,
  schema?: ZodType<T>
): Promise<R | null> {
  try {
    // Validation avec le schema si fourni
    if (schema) {
      try {
        schema.parse(data);
      } catch (validationError) {
        const errorMessages = getZodErrorMessages(
          validationError,
          data as Record<string, unknown>
        );
        if (errorMessages.length > 0) {
          Toast.show({
            type: 'error',
            text1: 'Validation Error',
            text2: errorMessages[0], // Affiche le premier message d'erreur
          });
        }
        return null;
      }
    }

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

    Toast.show({
      type: 'error',
      text1: 'Network Error',
      text2: 'An error occurred while sending the request',
    });

    return null;
  }
}

export default {
  get,
  post,
};

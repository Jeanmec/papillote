import { setItem, getItem, removeItem } from '../app/utils/mmkv';

const ACCESS_TOKEN_KEY = 'access_token';

export const authService = {
  setAccessToken: (token: string): void => {
    setItem(ACCESS_TOKEN_KEY, token);
  },

  getAccessToken: (): string | null => {
    return getItem(ACCESS_TOKEN_KEY) || null;
  },

  removeAccessToken: (): void => {
    removeItem(ACCESS_TOKEN_KEY);
  },

  hasAccessToken: (): boolean => {
    return !!getItem(ACCESS_TOKEN_KEY);
  },
};

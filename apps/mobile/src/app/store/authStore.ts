import { create } from 'zustand';

interface AuthState {
  accessToken: string | null;
  setAccessToken: (token: string) => void;
  removeAccessToken: () => void;
  hasAccessToken: () => boolean;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  accessToken: null,

  setAccessToken: (token: string) => {
    set({ accessToken: token });
  },

  removeAccessToken: () => {
    set({ accessToken: null });
  },

  hasAccessToken: () => {
    return !!get().accessToken;
  },
}));

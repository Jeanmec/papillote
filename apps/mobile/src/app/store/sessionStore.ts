import { create } from 'zustand';
import { UserProfileDto } from '@papillote/validation';

interface ISession {
  user: UserProfileDto | null;
  accessToken: string | null;
}

interface SessionState {
  session: ISession;
  setUserSession: (user: UserProfileDto) => void;
  setAccessTokenSession: (token: string) => void;
  clearSession: () => void;
  updateAccessToken: (token: string) => void;
}

export const useSessionStore = create<SessionState>((set) => ({
  session: {
    user: null,
    accessToken: null,
  },

  setUserSession: (user: UserProfileDto) => {
    set((state) => ({
      session: {
        ...state.session,
        user,
      },
    }));
  },

  setAccessTokenSession: (token: string) => {
    set((state) => ({
      session: {
        ...state.session,
        accessToken: token,
      },
    }));
  },

  clearSession: () => {
    set({
      session: {
        user: null,
        accessToken: null,
      },
    });
  },

  updateAccessToken: (token) => {
    set((state) => ({
      session: {
        ...state.session,
        accessToken: token,
      },
    }));
  },
}));

export const useSession = () => {
  return useSessionStore((state) => state.session);
};

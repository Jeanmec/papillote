import { useEffect, useCallback } from 'react';
import { checkUserExistence, getProfile } from '~/services/userService';
import { useSessionStore, useSession } from '~/app/store/sessionStore';
import { replace } from '~/app/navigation/RootNavigation';
import LoadingScreen from '~/app/components/LoadingScreen';

export function AuthNavigator() {
  const { setUserSession, clearSession } = useSessionStore();
  const session = useSession();

  const checkAuthStatus = useCallback(async () => {
    try {
      const exists = await checkUserExistence();

      if (exists === null || exists === undefined) {
        replace('Error');
        return;
      }

      if (exists === false) {
        replace('Register');
        return;
      }

      const hasToken = !!session.accessToken;
      if (hasToken) {
        const profile = await getProfile();
        if (profile) {
          setUserSession(profile);
          replace('Main');
          return;
        } else {
          clearSession();
        }
      }
      replace('Login');
    } catch (error) {
      console.error('Error in checkAuthStatus:', error);
      clearSession();
      replace('Error');
    }
  }, [session.accessToken, setUserSession, clearSession]);

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  return <LoadingScreen />;
}

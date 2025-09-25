import {
  useEffect,
  useState,
  useCallback,
  ReactNode,
  createContext,
  useContext,
} from 'react';
import { SafeAreaView } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { authService } from '../../services/authService';
import { checkUserExistence, getProfile } from '../../services/userService';
import { UserProfileDto } from '@papillote/validation';
import Hero from '../components/Hero';
import Register from '../components/sections/Register';
import Login from '../components/sections/Login';
import { classes } from '../styles/classes';

const AuthContext = createContext<UserProfileDto | null>(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

interface AuthLayoutProps {
  children: ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [userExists, setUserExists] = useState<boolean | null>(null);
  const [user, setUser] = useState<UserProfileDto | null>(null);

  const checkAuthStatus = useCallback(async () => {
    try {
      const hasToken = authService.hasAccessToken();

      if (hasToken) {
        const profile = await getProfile();
        if (profile) {
          setUser(profile);
          setIsAuthenticated(true);
          return;
        } else {
          authService.removeAccessToken();
        }
      }

      const mobileId = await DeviceInfo.getUniqueId();
      const exists = await checkUserExistence(mobileId);
      setUserExists(exists);
      setIsAuthenticated(false);
    } catch {
      authService.removeAccessToken();
      setIsAuthenticated(false);
    }
  }, []);

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  const handleAuthSuccess = useCallback(async () => {
    const profile = await getProfile();
    if (profile) {
      setUser(profile);
      setIsAuthenticated(true);
    }
  }, []);

  if (isAuthenticated === null) {
    return null;
  }

  if (!isAuthenticated) {
    return (
      <SafeAreaView style={[classes.container]}>
        <Hero />
        {userExists === true ? (
          <Login onAuthSuccess={handleAuthSuccess} />
        ) : (
          <Register onAuthSuccess={handleAuthSuccess} />
        )}
      </SafeAreaView>
    );
  }

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}

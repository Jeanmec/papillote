import { useEffect, useState, useCallback } from 'react';
import { SafeAreaView } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { authService } from '../../services/authService';
import { checkUserExistence } from '../../services/userService';
import { IntroductionLayout } from '../layouts/IntroductionLayout';
import { Hero } from '../components/Hero';
import SetUserPassword from '../components/sections/SetUserPassword';
import Login from '../components/sections/Login';
import { classes } from '../styles/classes';

interface AuthGuardProps {
  children: React.ReactNode;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [userExists, setUserExists] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuthStatus = useCallback(async () => {
    try {
      setIsLoading(true);
      const hasToken = authService.hasAccessToken();

      if (hasToken) {
        setIsAuthenticated(true);
        setIsLoading(false);
        return;
      }

      const mobileId = await DeviceInfo.getUniqueId();
      const exists = await checkUserExistence(mobileId);
      setUserExists(exists);
      setIsAuthenticated(false);
      setIsLoading(false);
    } catch (error) {
      console.error('Error checking auth status:', error);
      setIsAuthenticated(false);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  const handleAuthSuccess = useCallback(() => {
    setIsAuthenticated(true);
  }, []);

  if (isLoading) {
    return (
      <IntroductionLayout>
        <SafeAreaView style={[classes.container]}>
          <Hero />
        </SafeAreaView>
      </IntroductionLayout>
    );
  }

  if (!isAuthenticated) {
    return (
      <IntroductionLayout>
        <SafeAreaView style={[classes.container]}>
          <Hero />
          {userExists === true ? (
            <Login onAuthSuccess={handleAuthSuccess} />
          ) : (
            <SetUserPassword onAuthSuccess={handleAuthSuccess} />
          )}
        </SafeAreaView>
      </IntroductionLayout>
    );
  }

  return <>{children}</>;
};

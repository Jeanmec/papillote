import { useEffect, useState, useCallback } from 'react';
import { SafeAreaView } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { authService } from '../../services/authService';
import { checkUserExistence } from '../../services/userService';
import { IntroductionLayout } from '../layouts/IntroductionLayout';
import Hero from '../components/Hero';
import Register from '../components/sections/Register';
import Login from '../components/sections/Login';
import { classes } from '../styles/classes';

interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [userExists, setUserExists] = useState<boolean | null>(null);

  const checkAuthStatus = useCallback(async () => {
    try {
      const hasToken = authService.hasAccessToken();

      if (hasToken) {
        setIsAuthenticated(true);
        return;
      }

      const mobileId = await DeviceInfo.getUniqueId();
      const exists = await checkUserExistence(mobileId);
      setUserExists(exists);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Error checking auth status:', error);
      setIsAuthenticated(false);
    }
  }, []);

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  const handleAuthSuccess = useCallback(() => {
    setIsAuthenticated(true);
  }, []);

  if (!isAuthenticated) {
    return (
      <IntroductionLayout>
        <SafeAreaView style={[classes.container]}>
          <Hero />
          {userExists === true ? (
            <Login onAuthSuccess={handleAuthSuccess} />
          ) : (
            <Register onAuthSuccess={handleAuthSuccess} />
          )}
        </SafeAreaView>
      </IntroductionLayout>
    );
  }

  return <>{children}</>;
}

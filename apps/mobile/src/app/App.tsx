import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '~/app/pages/Home';
import Toast from 'react-native-toast-message';
import toastConfig from '~/app/config/toastConfig';
import Login from '~/app/pages/Login';
import Register from '~/app/pages/Register';
import { RootStackParamList } from '~/app/types/navigation';
import { navigationRef } from '~/app/navigation/RootNavigation';
import { AuthNavigator } from '~/app/pages/AuthNavigator';
import Introduction from '~/app/pages/Introduction';
import Error from '~/app/pages/Error';
import ForgotPassword from '~/app/pages/ForgotPassword';
import MainNavigator from '~/app/pages/MainNavigator';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            animation: 'fade',
          }}
          initialRouteName="MainNavigator"
        >
          <Stack.Screen name="MainNavigator" component={MainNavigator} />
          <Stack.Screen name="AuthNavigator" component={AuthNavigator} />
          <Stack.Screen name="Introduction" component={Introduction} />
          <Stack.Screen name="Main" component={Home} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Error" component={Error} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast config={toastConfig} />
    </>
  );
}

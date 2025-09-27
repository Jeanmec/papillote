import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './components/pages/Home';
import Toast from 'react-native-toast-message';
import toastConfig from './config/toastConfig';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import { RootStackParamList } from './types/navigation';
import { navigationRef } from './RootNavigation';
import { AuthNavigator } from './components/pages/AuthNavigator';
import Error from './components/pages/Error';

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
          initialRouteName="AuthNavigator"
        >
          <Stack.Screen name="AuthNavigator" component={AuthNavigator} />
          <Stack.Screen name="Main" component={Home} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Error" component={Error} />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast config={toastConfig} />
    </>
  );
}

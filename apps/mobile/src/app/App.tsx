import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '~/app/pages/Home';
import Toast from 'react-native-toast-message';
import toastConfig from '~/app/config/toastConfig';
import Login from '~/app/pages/Login';
import Register from '~/app/pages/Register';
import { RootStackParamList } from '~/app/types/navigation';
import { navigationRef } from '~/app/RootNavigation';
import { AuthNavigator } from '~/app/pages/AuthNavigator';
import Error from '~/app/pages/Error';

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

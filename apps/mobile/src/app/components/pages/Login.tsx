import { View, Text, TouchableOpacity } from 'react-native';
import Card from '../ui/Card';
import { OtpInput } from 'react-native-otp-entry';
import { secondaryColor } from '../../styles/classes';
import Confetti from '../Confetti';
import { useState } from 'react';
import DeviceInfo from 'react-native-device-info';
import { login, getProfile } from 'src/services/userService';
import { useSessionStore } from '../../store/sessionStore';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const SecureImageSource = require('../../../assets/img/secure.png');

export default function Login() {
  const [triggerConfetti, setTriggerConfetti] = useState(false);
  const [password, setPassword] = useState('');
  const { setAccessTokenSession, setUserSession } = useSessionStore();
  const navigation = useNavigation<NavigationProp>();

  const handleLogin = async () => {
    const mobileId = await DeviceInfo.getUniqueId();
    const loginResponse = await login({
      mobileId,
      password: Number(password),
    });

    if (loginResponse && loginResponse.access_token) {
      setAccessTokenSession(loginResponse.access_token);

      try {
        const profile = await getProfile();
        if (profile) {
          setUserSession(profile);
          setTriggerConfetti(true);
          console.log('Login successful, token and user profile stored');
          navigation.navigate('Main');
        } else {
          console.error('Failed to get user profile after login');
        }
      } catch (error) {
        console.error('Error getting profile after login:', error);
      }
    } else {
      console.error('Login failed or no access token received');
    }
  };
  return (
    <>
      <Confetti trigger={triggerConfetti} />
      <Card
        illustration={SecureImageSource}
        onPress={() => handleLogin()}
        buttonLabel="Login"
      >
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 24,
              textAlign: 'center',
            }}
          >
            Login
          </Text>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <OtpInput
              numberOfDigits={5}
              theme={{
                filledPinCodeContainerStyle: { borderColor: '#e8e8e8' },
                pinCodeContainerStyle: {
                  borderRadius: 15,
                  borderWidth: 3,
                },
                focusedPinCodeContainerStyle: { borderColor: secondaryColor },
              }}
              onTextChange={(text) => setPassword(text)}
            />
            <TouchableOpacity
              onPress={() => navigation.navigate('Register')}
              style={{ marginTop: 20 }}
            >
              <Text
                style={{
                  textAlign: 'center',
                  color: secondaryColor,
                  textDecorationLine: 'underline',
                }}
              >
                Pas encore de compte ? Créer un compte
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Card>
    </>
  );
}

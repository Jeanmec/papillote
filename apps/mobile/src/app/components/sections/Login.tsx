import { View, Text } from 'react-native';
import Card from '../ui/Card';
import { OtpInput } from 'react-native-otp-entry';
import { secondaryColor } from '../../styles/classes';
import Confetti from '../Confetti';
import { useState } from 'react';
import DeviceInfo from 'react-native-device-info';
import { login } from 'src/services/userService';
import { authService } from 'src/services/authService';

interface LoginProps {
  onAuthSuccess?: () => void;
}

export default function Login({ onAuthSuccess }: LoginProps) {
  const [triggerConfetti, setTriggerConfetti] = useState(false);
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const mobileId = await DeviceInfo.getUniqueId();
    const loginResponse = await login({
      mobileId,
      password: Number(password),
    });

    if (loginResponse && loginResponse.access_token) {
      authService.setAccessToken(loginResponse.access_token);
      setTriggerConfetti(true);
      console.log('Login successful and token stored');

      if (onAuthSuccess) {
        onAuthSuccess();
      }
    } else {
      console.error('Login failed or no access token received');
    }
  };
  return (
    <>
      <Confetti trigger={triggerConfetti} />
      <Card
        cardData={{
          image: require('../../img/secure.png'),
        }}
        onPressNext={() => handleLogin()}
        buttonText="Login"
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
          </View>
        </View>
      </Card>
    </>
  );
}

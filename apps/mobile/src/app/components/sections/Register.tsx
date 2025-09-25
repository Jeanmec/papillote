import { View, Text } from 'react-native';
import Card from '../ui/Card';
import { OtpInput } from 'react-native-otp-entry';
import { secondaryColor } from '../../styles/classes';
import Confetti from '../Confetti';
import { useState } from 'react';
import DeviceInfo from 'react-native-device-info';
import { createUser } from 'src/services/userService';
import { useAuthStore } from '../../store/authStore';

interface RegisterProps {
  onAuthSuccess?: () => void;
}

export default function Register({ onAuthSuccess }: RegisterProps) {
  const [triggerConfetti, setTriggerConfetti] = useState(false);
  const [password, setPassword] = useState('');
  const { setAccessToken } = useAuthStore();

  const handleRegister = async () => {
    const mobileId = await DeviceInfo.getUniqueId();
    const userCreation = await createUser({
      mobileId,
      password: Number(password),
    });

    if (userCreation && userCreation.access_token) {
      setAccessToken(userCreation.access_token);
      setTriggerConfetti(true);

      if (onAuthSuccess) {
        onAuthSuccess();
      }
    }
  };

  return (
    <>
      <Confetti trigger={triggerConfetti} />
      <Card
        cardData={{
          image: require('../../img/secure.png'),
        }}
        onPressNext={handleRegister}
        buttonText="Create Account"
      >
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
          }}
        >
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 24,
              textAlign: 'center',
              marginTop: 20,
            }}
          >
            Create Your Account
          </Text>
          <Text
            style={{
              fontSize: 16,
              textAlign: 'center',
              marginTop: 10,
              color: '#666',
            }}
          >
            Your account is linked to your device. Set a 5-digit password to
            secure it.
          </Text>

          <View
            style={{
              flex: 1,
              justifyContent: 'center',
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

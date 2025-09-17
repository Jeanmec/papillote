import { View, Text } from 'react-native';
import Card from '../ui/Card';
import { OtpInput } from 'react-native-otp-entry';
import { secondaryColor } from '../../styles/classes';
import Confetti from '../Confetti';
import { useState } from 'react';
import DeviceInfo from 'react-native-device-info';
import { createUser } from 'src/services/userService';
import { authService } from 'src/services/authService';

interface SetUserPasswordProps {
  onAuthSuccess?: () => void;
}

export default function SetUserPassword({
  onAuthSuccess,
}: SetUserPasswordProps) {
  const [triggerConfetti, setTriggerConfetti] = useState(false);
  const [password, setPassword] = useState('');

  const setUserPassword = async () => {
    const mobileId = await DeviceInfo.getUniqueId();
    const userCreation = await createUser({
      mobileId,
      password: Number(password),
    });

    if (userCreation && userCreation.access_token) {
      authService.setAccessToken(userCreation.access_token);
      setTriggerConfetti(true);
      console.log('User created and token stored successfully');

      if (onAuthSuccess) {
        onAuthSuccess();
      }
    } else {
      console.error('Failed to create user or retrieve access token');
    }
  };

  return (
    <>
      <Confetti trigger={triggerConfetti} />
      <Card
        cardData={{
          image: require('../../img/secure.png'),
        }}
        onPressNext={() => setUserPassword()}
        buttonText="Set password"
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
            Your account is linked to your device. Set a password to secure it.
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

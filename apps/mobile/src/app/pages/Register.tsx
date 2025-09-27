import { View, Text } from 'react-native';
import Card from '~/app/components/ui/Card';
import { OtpInput } from 'react-native-otp-entry';
import { secondaryColor } from '~/app/styles/classes';
import Confetti from '~/app/components/Confetti';
import { useState } from 'react';
import DeviceInfo from 'react-native-device-info';
import { createUser, getProfile } from '~/services/userService';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '~/app/types/navigation';
import { useSessionStore } from '~/app/store/sessionStore';

const SecureImageSource = require('~/assets/img/secure.png');

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function Register() {
  const [triggerConfetti, setTriggerConfetti] = useState(false);
  const [password, setPassword] = useState('');
  const { setAccessTokenSession, setUserSession } = useSessionStore();
  const navigation = useNavigation<NavigationProp>();

  const handleRegister = async () => {
    const mobileId = await DeviceInfo.getUniqueId();
    const userCreation = await createUser({
      mobileId,
      password: Number(password),
    });

    if (userCreation && userCreation.access_token) {
      setAccessTokenSession(userCreation.access_token);

      try {
        const profile = await getProfile();
        if (profile) {
          setUserSession(profile);
          setTriggerConfetti(true);
          console.log('Registration successful, token and user profile stored');
          navigation.navigate('Main');
        } else {
          console.error('Failed to get user profile after registration');
        }
      } catch (error) {
        console.error('Error getting profile after registration:', error);
      }
    }
  };

  return (
    <>
      <Confetti trigger={triggerConfetti} />
      <Card
        illustration={SecureImageSource}
        onPress={handleRegister}
        buttonLabel="Create Account"
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

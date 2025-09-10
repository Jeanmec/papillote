import { View, Text } from 'react-native';
import Card from './ui/Card';
import { OtpInput } from 'react-native-otp-entry';
import { primaryColor, secondaryColor } from '../styles/classes';
import Confetti from './Confetti';
import { use, useState } from 'react';

export default function SetPasswordSection() {
  const [triggerConfetti, setTriggerConfetti] = useState(false);
  return (
    <>
      <Confetti trigger={triggerConfetti} />
      <Card
        cardData={{
          image: require('../img/secure.png'),
        }}
        onPressNext={() => setTriggerConfetti(true)}
        buttonText="Set password"
      >
        <View>
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
            onTextChange={(text) => console.log(text)}
          />
        </View>
      </Card>
    </>
  );
}

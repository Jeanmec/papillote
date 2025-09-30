import { OtpInput } from 'react-native-otp-entry';
import { secondaryColor } from '~/app/styles/classes';

type PasswordInputProps = {
  onchange: (password: string) => void;
};

export default function PasswordInput({ onchange }: PasswordInputProps) {
  return (
    <>
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
        onTextChange={onchange}
      />
    </>
  );
}

import { View, Text, TouchableOpacity } from 'react-native';
import Card from '~/app/components/ui/Card';
import { classes } from '~/app/styles/classes';
import { useState } from 'react';
import { useSessionStore } from '~/app/store/sessionStore';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '~/app/types/navigation';
import PasswordInput from '../components/ui/PasswordInput';
import { resetUser } from '~/services/userService';
import Toast from 'react-native-toast-message';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const SecureImageSource = require('~/assets/img/secure.png');

export default function ForgotPassword() {
  const [password, setPassword] = useState<string | undefined>(undefined);
  const navigation = useNavigation<NavigationProp>();

  const triggerResetUser = async () => {
    const success = await resetUser(Number(password));
    if (success) {
      Toast.show({
        type: 'success',
        text1: 'Password reset successfully',
        text2: 'Please log in with your new password',
      });
      navigation.navigate('Login');
    }
  };

  return (
    <>
      <Card
        illustration={SecureImageSource}
        onPress={() => triggerResetUser()}
        buttonLabel="Reset my account"
      >
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 24,
              textAlign: 'center',
            }}
          >
            Password forgotten?
          </Text>
          <View
            style={{
              display: 'flex',
              alignItems: 'center',
              marginTop: 20,
            }}
          >
            <Text>Resetting your password will reset your account and</Text>
            <Text style={{ ...classes.errorText, fontWeight: 'bold' }}>
              delete all your data.
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <PasswordInput onchange={setPassword} />
            <TouchableOpacity
              onPress={() => navigation.navigate('Login')}
              style={{ marginTop: 20 }}
            >
              <Text
                style={{
                  textAlign: 'center',
                  textDecorationLine: 'underline',
                }}
              >
                I remembered my password
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Card>
    </>
  );
}

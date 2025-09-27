import { View, Text } from 'react-native';
import Card from '../ui/Card';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const ErrorLottieSource = require('../../../assets/lottie/error.json');

export default function Error() {
  const navigation = useNavigation<NavigationProp>();

  const handleRetry = () => {
    navigation.navigate('AuthNavigator');
  };

  return (
    <Card
      illustration={ErrorLottieSource}
      onPress={handleRetry}
      buttonLabel="Retry"
    >
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 24,
            textAlign: 'center',
            marginBottom: 20,
          }}
        >
          Connection Error
        </Text>
        <Text
          style={{
            fontSize: 16,
            textAlign: 'center',
            color: '#666',
            marginBottom: 20,
          }}
        >
          Unable to connect to the server. Please check your internet connection
          and try again.
        </Text>
      </View>
    </Card>
  );
}

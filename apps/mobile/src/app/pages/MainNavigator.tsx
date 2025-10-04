import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { storage } from '~/app/utils/mmkv';
import { RootStackParamList } from '~/app/types/navigation';

export default function MainNavigator() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    const introductionCompleted =
      storage.getBoolean('introduction_completed') ?? false;

    if (introductionCompleted) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'AuthNavigator' as never }],
      });
    } else {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Introduction' as never }],
      });
    }
  }, [navigation]);

  return null;
}

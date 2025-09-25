import UserId from './UserId';
import { Text, View } from 'react-native';

export default function UserIdSection() {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 5,
      }}
    >
      <Text>User ID:</Text>
      <UserId />
    </View>
  );
}

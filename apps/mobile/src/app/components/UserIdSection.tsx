import UserId from './UserId';
import { Text, View } from 'react-native';

export default function UserIdSection() {
  return (
    <>
      <View>
        <Text style={{ fontSize: 16, marginBottom: 10 }}>
          To interact with someone you need to share your User ID
        </Text>
      </View>
      <Text>User ID:</Text>
      <UserId />
    </>
  );
}

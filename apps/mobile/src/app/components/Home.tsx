import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native';
import { classes } from '../styles/classes';

export const Home = () => {
  return (
    <SafeAreaView style={[classes.container]}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 20,
        }}
      >
        <Text
          style={{
            fontSize: 24,
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: 20,
          }}
        >
          Hello word !
        </Text>
      </View>
    </SafeAreaView>
  );
};

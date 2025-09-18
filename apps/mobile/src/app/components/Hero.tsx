import { View, Text, StyleSheet } from 'react-native';

export default function Hero() {
  return (
    <View>
      <Text style={styles.title}>Papillote!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
});

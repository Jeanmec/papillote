import { View, Text, StyleSheet } from 'react-native';

export default function Hero() {
  return (
    <View>
      <Text style={styles.title}>Papillote</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 72,
    fontFamily: 'Huglove',
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
});

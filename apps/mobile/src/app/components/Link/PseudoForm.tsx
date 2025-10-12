import { View, Text, TextInput, StyleSheet } from 'react-native';
import { primaryColor } from '~/app/styles/classes';

interface PseudoFormProps {
  pseudo: string;
  setPseudo: (value: string) => void;
  isPseudoFocused: boolean;
  setIsPseudoFocused: (value: boolean) => void;
}

export default function PseudoForm({
  pseudo,
  setPseudo,
  isPseudoFocused,
  setIsPseudoFocused,
}: PseudoFormProps) {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>Choice a pseudo</Text>
      <TextInput
        style={[styles.input, isPseudoFocused && styles.inputFocused]}
        value={pseudo}
        onChangeText={setPseudo}
        onFocus={() => setIsPseudoFocused(true)}
        onBlur={() => setIsPseudoFocused(false)}
        placeholder="My love, bro, favorite son..."
        maxLength={20}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: '#2d3436',
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  inputFocused: {
    borderColor: primaryColor,
  },
});

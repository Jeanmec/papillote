import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-ico-noto-emojis';
import { primaryColor } from '~/app/styles/classes';

interface IdValidationFormProps {
  generatedId: string;
  setGeneratedId: (value: string) => void;
  isValidId: boolean | null;
  isValidating: boolean;
}

export default function IdValidationForm({
  generatedId,
  setGeneratedId,
  isValidId,
  isValidating,
}: IdValidationFormProps) {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>Profile ID of someone</Text>
      <TextInput
        style={[
          styles.input,
          isValidId === true && { borderColor: '#27ae60' },
          isValidId === false && { borderColor: '#e74c3c' },
        ]}
        value={generatedId}
        onChangeText={setGeneratedId}
        placeholder="Enter the profile ID..."
        autoCapitalize="none"
        autoCorrect={false}
      />
      {(isValidating || isValidId !== null) && (
        <View style={styles.validationContainer}>
          {isValidating ? (
            <>
              <ActivityIndicator size="small" color={primaryColor} />
              <Text style={styles.validationText}>Vérification...</Text>
            </>
          ) : isValidId ? (
            <>
              <Icon name="check-mark" height={16} width={16} />
              <Text style={[styles.validationText, { color: '#27ae60' }]}>
                ID valide !
              </Text>
            </>
          ) : (
            <>
              <Icon name="cross-mark" height={16} width={16} />
              <Text style={[styles.validationText, { color: '#e74c3c' }]}>
                ID introuvable
              </Text>
            </>
          )}
        </View>
      )}
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
  validationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  validationText: {
    marginLeft: 8,
    color: '#636e72',
  },
});

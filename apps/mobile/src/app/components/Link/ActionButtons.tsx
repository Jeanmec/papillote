import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { primaryColor } from '~/app/styles/classes';

enum LinkStep {
  ENTER_ID = 'enter_id',
  ENTER_PSEUDO = 'enter_pseudo',
}

interface ActionButtonsProps {
  step: LinkStep;
  isValidId: boolean | null;
  pseudo: string;
  loading: boolean;
  onClose: () => void;
  onNext: () => void;
}

export default function ActionButtons({
  step,
  isValidId,
  pseudo,
  loading,
  onClose,
  onNext,
}: ActionButtonsProps) {
  const canProceed =
    (step === LinkStep.ENTER_ID && isValidId) ||
    (step === LinkStep.ENTER_PSEUDO && pseudo.trim().length > 0);

  const isButtonDisabled = !canProceed || loading;

  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        style={[styles.button, styles.cancelButton]}
        onPress={onClose}
        disabled={loading}
      >
        <Text style={[styles.buttonText, styles.cancelButtonText]}>
          Annuler
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.button,
          isButtonDisabled
            ? styles.confirmButtonDisabled
            : styles.confirmButton,
        ]}
        onPress={onNext}
        disabled={isButtonDisabled}
      >
        {loading ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Text
            style={[
              styles.buttonText,
              isButtonDisabled
                ? styles.confirmButtonTextDisabled
                : styles.confirmButtonText,
            ]}
          >
            {step === LinkStep.ENTER_ID ? 'Suivant' : 'Envoyer la demande'}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

export { LinkStep };

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 32,
    marginBottom: 8,
  },
  button: {
    flex: 1,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 8,
  },
  cancelButton: {
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#dee2e6',
  },
  confirmButton: {
    backgroundColor: primaryColor,
  },
  confirmButtonDisabled: {
    backgroundColor: '#ddd',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  cancelButtonText: {
    color: '#6c757d',
  },
  confirmButtonText: {
    color: '#fff',
  },
  confirmButtonTextDisabled: {
    color: '#999',
  },
});
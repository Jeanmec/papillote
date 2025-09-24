import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import Icon from 'react-native-ico-noto-emojis';
import { BaseToastProps } from 'react-native-toast-message';

interface CustomToastProps extends BaseToastProps {
  text1?: string;
  text2?: string;
}

const toastConfig = {
  error: ({ text1, text2 }: CustomToastProps) => (
    <>
      <SafeAreaView style={{ width: '100%', alignItems: 'flex-end' }}>
        {text1 && (
          <View style={styles.errorContainer}>
            <Icon name="cross-mark" height={16} width={16} />
            <View style={{ flexDirection: 'column' }}>
              <Text style={styles.toastTitle}>{text1}</Text>
              <Text style={styles.toastDescription}>{text2}</Text>
            </View>
          </View>
        )}
      </SafeAreaView>
    </>
  ),

  success: ({ text1 }: CustomToastProps) => (
    <>
      <SafeAreaView style={{ width: '100%', alignItems: 'flex-end' }}>
        {text1 && (
          <View
            style={[
              styles.errorContainer,
              { backgroundColor: '#ECFDF5', borderColor: '#22C55E' },
            ]}
          >
            <Icon name="check-mark" height={16} width={16} />
            <Text style={[styles.toastTitle, { color: '#22C55E' }]}>
              {text1}
            </Text>
          </View>
        )}
      </SafeAreaView>
    </>
  ),
};

const styles = StyleSheet.create({
  errorContainer: {
    marginHorizontal: 16,
    backgroundColor: '#FEF3F2',
    borderColor: '#D92D20',
    borderWidth: 1,
    borderRadius: 8,
    zIndex: 9999,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    gap: 8,
  },
  toastTitle: {
    color: '#D92D20',
    fontWeight: 'bold',
  },
  toastDescription: {
    color: '#D92D20',
  },
});

export default toastConfig;

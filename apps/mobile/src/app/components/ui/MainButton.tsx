import React, { useState } from 'react';
import {
  Text,
  Pressable,
  StyleSheet,
  ViewStyle,
  ActivityIndicator,
} from 'react-native';
import { primaryColor, secondaryColor } from '~/app/styles/classes';

type ButtonProps = {
  label: string;
  onPress: () => void | Promise<void>;
};

export default function MainButton({ label, onPress }: ButtonProps) {
  const [isPressed, setIsPressed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handlePress = async () => {
    if (isLoading) return;

    try {
      setIsLoading(true);
      await onPress();
    } catch (error) {
      console.error('Button action failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getButtonStyle = (pressed: boolean): ViewStyle => ({
    ...styles.button,
    backgroundColor: pressed && !isLoading ? primaryColor : secondaryColor,
    boxShadow: isPressed ? '2px 2px 0 #090042' : '4px 4px 0 #1f0042',
    transform: isPressed ? [{ translateX: 2 }, { translateY: 2 }] : [],
    opacity: isLoading ? 0.7 : 1,
  });

  return (
    <Pressable
      onPress={handlePress}
      onPressIn={() => !isLoading && setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      disabled={isLoading}
      style={({ pressed }) => getButtonStyle(pressed)}
    >
      <Text style={styles.text}>
        {isLoading ? <ActivityIndicator /> : label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderWidth: 2,
    borderColor: '#422800',
    borderRadius: 30,
    paddingHorizontal: 18,
    minHeight: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: primaryColor,
    fontWeight: '600',
    fontSize: 18,
  },
});

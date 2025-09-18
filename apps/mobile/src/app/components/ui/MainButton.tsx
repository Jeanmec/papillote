import React, { useState } from 'react';
import { Text, Pressable, StyleSheet, ViewStyle } from 'react-native';
import { primaryColor, secondaryColor } from '../../styles/classes';

type ButtonProps = {
  title: string;
  onPress: () => void;
};

export default function MainButton({ title, onPress }: ButtonProps) {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <Pressable
      onPress={onPress}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      style={({ pressed }) => {
        const baseStyle: ViewStyle = {
          ...styles.button,
          backgroundColor: pressed ? primaryColor : secondaryColor,
          boxShadow: isPressed ? '2px 2px 0 #422800' : '4px 4px 0 #422800',
          transform: isPressed ? [{ translateX: 2 }, { translateY: 2 }] : [],
        };

        return baseStyle;
      }}
    >
      <Text style={styles.text}>{title}</Text>
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

import React from 'react';
import { Text } from 'react-native';
import { classes } from 'src/app/styles/classes';

const colors = {
  red: {
    background: '#FFCDD2',
    text: '#B71C1C',
  },
  purple: {
    background: '#f8e1fc',
    text: '#8e4ddf',
  },
  blue: {
    background: '#BBDEFB',
    text: '#0D47A1',
  },
  green: {
    background: '#C8E6C9',
    text: '#1B5E20',
  },
  yellow: {
    background: '#FFF9C4',
    text: '#F57F17',
  },
  orange: {
    background: '#FFE0B2',
    text: '#E65100',
  },
  grey: {
    background: '#E0E0E0',
    text: '#212121',
  },
};

export default function Tag({
  children,
  color,
}: {
  children: React.ReactNode;
  color: keyof typeof colors;
}) {
  return (
    <Text
      style={[
        classes.tag,
        {
          backgroundColor: colors[color].background,
          color: colors[color].text,
        },
      ]}
    >
      {children}
    </Text>
  );
}

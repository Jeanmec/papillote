import React from 'react';
import { Text } from 'react-native';
import Icon from 'react-native-ico-noto-emojis';
import { classes } from '~/app/styles/classes';
import * as Clipboard from '@react-native-clipboard/clipboard';

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
  copy,
}: {
  children: React.ReactNode;
  color: keyof typeof colors;
  copy?: string;
}) {
  const handleCopy = () => {
    if (copy && typeof copy === 'string') {
      Clipboard.default.setString(copy);
    }
  };

  return (
    <Text
      onPress={copy ? handleCopy : undefined}
      style={[
        classes.tag,
        {
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          gap: 2,
          backgroundColor: colors[color].background,
          color: colors[color].text,
        },
      ]}
    >
      {children}
      {copy && <Icon name="spiral-notepad" height={16} width={16} />}
    </Text>
  );
}

import React from 'react';
import { SafeAreaView, View, Image, StyleSheet } from 'react-native';
import LottieView, { AnimationObject } from 'lottie-react-native';

import { classes } from '~/app/styles/classes';
import MainButton from '~/app/components/ui/MainButton';

type CardSource = string | number | object | null;

type CardProps = {
  illustration: CardSource;
  children?: React.ReactNode;
  onPress?: () => void | Promise<void>;
  buttonLabel?: string;
};

export default function Card({
  illustration,
  onPress,
  buttonLabel,
  children,
}: CardProps) {
  const renderIllustration = () => {
    if (!illustration) {
      return null;
    }

    if (typeof illustration === 'object' && illustration !== null) {
      return (
        <LottieView
          source={illustration as AnimationObject}
          style={classes.imgCard}
          autoPlay
          loop
        />
      );
    }

    if (typeof illustration === 'number' || typeof illustration === 'string') {
      const source =
        typeof illustration === 'string' ? { uri: illustration } : illustration;

      return (
        <Image source={source} style={classes.imgCard} resizeMode="contain" />
      );
    }

    return null;
  };

  return (
    <SafeAreaView style={classes.container}>
      {renderIllustration()}

      {children}

      {buttonLabel && onPress && (
        <View style={styles.textSection}>
          <MainButton label={buttonLabel} onPress={onPress} />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  textSection: {
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
    marginBottom: 50,
  },
});

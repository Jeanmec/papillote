import { SafeAreaView, View, Image, StyleSheet } from 'react-native';
import { classes } from '../../styles/classes';
import MainButton from './MainButton';

type CardProps = {
  cardData: {
    image: number;
  };
  children?: React.ReactNode;
  onPressNext?: () => void | Promise<void>;
  buttonText?: string;
};

export default function Card({
  cardData,
  onPressNext,
  buttonText,
  children,
}: CardProps) {
  return (
    <SafeAreaView style={classes.container}>
      <Image source={cardData.image} style={classes.imgCard} />
      {children}
      {buttonText && onPressNext && (
        <View style={styles.textSection}>
          <MainButton label={buttonText} onPress={onPressNext} />
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

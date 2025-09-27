import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import { classes } from '../styles/classes';
import Card from './ui/Card';

type CardSource = string | number | object | null;

type IntroductionCardProps = {
  cardData: {
    illustration: CardSource;
    title: string;
    description: string;
  };
  onPressNext: () => void;
  isLastCard: boolean;
};

export default function IntroductionCard({
  cardData,
  onPressNext,
  isLastCard,
}: IntroductionCardProps) {
  return (
    <SafeAreaView style={classes.container}>
      <Card
        illustration={cardData.illustration}
        onPress={onPressNext}
        buttonLabel={isLastCard ? 'Get Started' : 'Next'}
      >
        <View style={styles.textSection}>
          {cardData.title && <Text style={styles.title}>{cardData.title}</Text>}
          {cardData.description && (
            <Text style={[styles.description]}>{cardData.description}</Text>
          )}
        </View>
      </Card>
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
  title: {
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center',
  },
  description: {
    textAlign: 'center',
    marginTop: 10,
  },
});

import { SafeAreaView, View, Image, Text, StyleSheet } from 'react-native';
import { classes } from '../styles/classes';
import MainButton from './ui/MainButton';
import Card from './ui/Card';

type IntroductionCardProps = {
  cardData: {
    image: number;
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
        cardData={cardData}
        onPressNext={onPressNext}
        buttonText={isLastCard ? 'Get Started' : 'Next'}
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

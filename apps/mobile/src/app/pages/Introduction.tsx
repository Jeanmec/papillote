import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import IntroductionCard from '~/app/components/IntroductionCard';
import { storage } from '~/app/utils/mmkv';
import { replace } from '~/app/navigation/RootNavigation';

const ConnectionCoupleImage = require('~/assets/img/connection-couple.png');
const GiftImage = require('~/assets/img/gift.png');
const PhoneHeartImage = require('~/assets/img/phone-heart.png');

type IntroductionItem = {
  illustration: string | number | object;
  title: string;
  description: string;
};

const introductionData: IntroductionItem[] = [
  {
    illustration: ConnectionCoupleImage,
    title: 'Keep connection with loved ones',
    description: 'Stay connected with your friends and family using our app.',
  },
  {
    illustration: GiftImage,
    title: 'Get a daily gift',
    description: 'Receive a special gift every day to brighten your mood.',
  },
  {
    illustration: PhoneHeartImage,
    title: 'Strengthen your relationship with daily attention',
    description:
      'Show your loved ones how much you care with daily check-ins and thoughtful gestures.',
  },
];

export default function Introduction() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < introductionData.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      storage.set('introduction_completed', true);
      replace('AuthNavigator');
    }
  };

  return (
    <View style={styles.container}>
      <IntroductionCard
        cardData={introductionData[currentIndex]}
        onPressNext={handleNext}
        isLastCard={currentIndex === introductionData.length - 1}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

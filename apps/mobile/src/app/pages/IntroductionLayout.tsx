import { useEffect, useState, ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';
import IntroductionCard from '~/app/components/IntroductionCard';
import { storage } from '~/app/utils/mmkv';

const ConnectionCoupleImage = require('~/app/assets/img/connection-couple.png');
const GiftImage = require('~/app/assets/img/gift.png');
const PhoneHeartImage = require('~/app/assets/img/phone-heart.png');

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

type IntroductionLayoutProps = {
  children: ReactNode;
};

export function IntroductionLayout({ children }: IntroductionLayoutProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showIntro, setShowIntro] = useState<boolean | null>(null);

  const handleNext = () => {
    if (currentIndex < introductionData.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      storage.set('introduction_completed', true);
      setShowIntro(false);
    }
  };

  useEffect(() => {
    setShowIntro(!(storage.getBoolean('introduction_completed') ?? false));
  }, []);

  return (
    <View style={styles.container}>
      <View style={[styles.content, showIntro && styles.contentHidden]}>
        {children}
      </View>

      {showIntro && (
        <View style={styles.introductionOverlay}>
          <IntroductionCard
            cardData={introductionData[currentIndex]}
            onPressNext={handleNext}
            isLastCard={currentIndex === introductionData.length - 1}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  content: {
    flex: 1,
  },
  contentHidden: {
    opacity: 0,
  },
  introductionOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'white',
    zIndex: 1000,
  },
});

import { useEffect, useState } from 'react';
import IntroductionCard from '../IntroductionCard';

import { storage } from '../../utils/mmkv';

type IntroductionItem = {
  image: number;
  title: string;
  description: string;
};

const introductionData: IntroductionItem[] = [
  {
    image: require('../../img/connection-couple.png'),
    title: 'Keep connection with loved ones',
    description: 'Stay connected with your friends and family using our app.',
  },
  {
    image: require('../../img/gift.png'),
    title: 'Get a daily gift',
    description: 'Receive a special gift every day to brighten your mood.',
  },
  {
    image: require('../../img/phone-heart.png'),
    title: 'Strengthen your relationship with daily attention',
    description:
      'Show your loved ones how much you care with daily check-ins and thoughtful gestures.',
  },
];

export function Introduction() {
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
    <>
      {showIntro && (
        <IntroductionCard
          cardData={introductionData[currentIndex]}
          onPressNext={handleNext}
          isLastCard={currentIndex === introductionData.length - 1}
        />
      )}
    </>
  );
}

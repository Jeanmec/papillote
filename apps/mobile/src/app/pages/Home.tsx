import { useState, useRef, useCallback, useMemo } from 'react';
import { View, Animated, SafeAreaView } from 'react-native';
import { TabBar } from '~/app/components/navigation/TabBar';
import { SwipeableView } from '~/app/components/navigation/SwipeableView';
import GiftSection from '~/app/components/sections/GiftSection';
import ProfileSection from '~/app/components/sections/ProfileSection';
import Hero from '../components/Hero';

export default function Home() {
  const [activeTab, setActiveTab] = useState(0);
  const animatedValue = useRef(new Animated.Value(0)).current;

  const handleTabPress = useCallback((index: number) => {
    setActiveTab(index);
  }, []);

  const handleSwipeChange = useCallback((index: number) => {
    setActiveTab(index);
  }, []);

  const sections = useMemo(
    () => [<GiftSection key="gift" />, <ProfileSection key="profile" />],
    []
  );

  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#f8f9fa' }}>
        <Hero />
        <SwipeableView
          activeIndex={activeTab}
          onIndexChange={handleSwipeChange}
          animatedValue={animatedValue}
        >
          {sections}
        </SwipeableView>
      </SafeAreaView>

      <TabBar
        activeTab={activeTab}
        onTabPress={handleTabPress}
        animatedValue={animatedValue}
      />
    </>
  );
}

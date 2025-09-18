import React, { useRef, useState, useEffect, useCallback, memo } from 'react';
import { ScrollView, Dimensions, Animated, View } from 'react-native';

interface SwipeableViewProps {
  children: React.ReactNode[];
  activeIndex: number;
  onIndexChange: (index: number) => void;
  animatedValue: Animated.Value;
}

const { width: screenWidth } = Dimensions.get('window');

export const SwipeableView = memo(
  ({
    children,
    activeIndex,
    onIndexChange,
    animatedValue,
  }: SwipeableViewProps) => {
    const scrollViewRef = useRef<ScrollView>(null);
    const [isUserScrolling, setIsUserScrolling] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(activeIndex);

    useEffect(() => {
      if (scrollViewRef.current && activeIndex > 0) {
        setTimeout(() => {
          scrollViewRef.current?.scrollTo({
            x: activeIndex * screenWidth,
            animated: false,
          });
        }, 0);
      }
    }, []);

    useEffect(() => {
      if (
        !isUserScrolling &&
        activeIndex !== currentIndex &&
        scrollViewRef.current
      ) {
        scrollViewRef.current.scrollTo({
          x: activeIndex * screenWidth,
          animated: true,
        });
        setCurrentIndex(activeIndex);
      }
    }, [activeIndex, isUserScrolling, currentIndex]);

    const handleScroll = useCallback(
      (event: { nativeEvent: { contentOffset: { x: number } } }) => {
        const scrollX = event.nativeEvent.contentOffset.x;

        const normalizedValue = scrollX / screenWidth;
        animatedValue.setValue(normalizedValue);
      },
      [animatedValue]
    );

    const handleMomentumScrollEnd = useCallback(
      (event: { nativeEvent: { contentOffset: { x: number } } }) => {
        const scrollX = event.nativeEvent.contentOffset.x;
        const newIndex = Math.round(scrollX / screenWidth);

        if (newIndex !== currentIndex) {
          setCurrentIndex(newIndex);
          onIndexChange(newIndex);
        }
        setIsUserScrolling(false);
      },
      [currentIndex, onIndexChange]
    );

    const handleScrollBeginDrag = useCallback(() => {
      setIsUserScrolling(true);
    }, []);

    return (
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        onScrollBeginDrag={handleScrollBeginDrag}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        scrollEventThrottle={16}
        style={{ flex: 1 }}
      >
        {children.map((child, index) => (
          <View
            key={index}
            style={{
              width: screenWidth,
              flex: 1,
            }}
          >
            {child}
          </View>
        ))}
      </ScrollView>
    );
  }
);

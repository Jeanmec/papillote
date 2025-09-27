import React, { memo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Dimensions,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-ico-noto-emojis';

interface TabBarProps {
  activeTab: number;
  onTabPress: (index: number) => void;
  animatedValue: Animated.Value;
}

const tabs = [
  { id: 0, label: 'Gift', iconName: 'wrapped-gift' },
  { id: 1, label: 'Profile', iconName: 'bust-in-silhouette' },
];

const { width: screenWidth } = Dimensions.get('window');
const tabWidth = screenWidth / tabs.length;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    height: 80,
    paddingBottom: 20,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#e1e8ed',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  icon: {
    marginBottom: 4,
  },
  label: {
    fontSize: 12,
  },
  activeLabel: {
    fontWeight: 'bold',
    color: '#6c5ce7',
  },
  inactiveLabel: {
    fontWeight: 'normal',
    color: '#636e72',
  },
  indicator: {
    position: 'absolute',
    top: 0,
    height: 3,
    backgroundColor: '#6c5ce7',
    borderRadius: 2,
    width: tabWidth * 0.6,
  },
});

export const TabBar = memo(
  ({ activeTab, onTabPress, animatedValue }: TabBarProps) => {
    return (
      <View style={styles.container}>
        {tabs.map((tab, index) => {
          const isActive = activeTab === index;

          return (
            <TouchableOpacity
              key={tab.id}
              style={styles.tab}
              onPress={() => onTabPress(index)}
              activeOpacity={0.7}
            >
              <Icon
                name={tab.iconName}
                height={24}
                width={24}
                style={[styles.icon, { opacity: isActive ? 1 : 0.6 }]}
              />
              <Text
                style={[
                  styles.label,
                  isActive ? styles.activeLabel : styles.inactiveLabel,
                ]}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
        <Animated.View
          style={[
            styles.indicator,
            {
              transform: [
                {
                  translateX: animatedValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [tabWidth * 0.2, tabWidth + tabWidth * 0.2],
                    extrapolate: 'clamp',
                  }),
                },
              ],
            },
          ]}
        />
      </View>
    );
  }
);

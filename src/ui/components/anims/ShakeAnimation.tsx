import { useRef } from 'react';
import { Animated } from 'react-native';

export const shakeAnim = useRef(new Animated.Value(0)).current;

export const shake = () => {
  Animated.sequence([
    Animated.timing(shakeAnim, { toValue: -10, duration: 50, useNativeDriver: true }),
    Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
    Animated.timing(shakeAnim, { toValue: -10, duration: 50, useNativeDriver: true }),
    Animated.timing(shakeAnim, { toValue: 0, duration: 50, useNativeDriver: true }),
  ]).start();
};

import React, { useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  Modal,
} from 'react-native';
import AppText from './AppText';
import { vw } from '../theme/dimensions';
import { Fonts } from '../theme/fonts';

type Props = {
  visible: boolean;
  text?: string;
};

export default function CustomLoader({
  visible,
  text = 'Please wait...',
}: Props) {
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1.08,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <Animated.View
          style={[styles.card, { transform: [{ scale }] }]}
        >
          <View style={styles.circle}>
            <AppText style={styles.logo}>MMI</AppText>
          </View>

          <AppText style={styles.text}>{text}</AppText>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  card: {
    width: vw(60),
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingVertical: vw(8),
    alignItems: 'center',
  },

  circle: {
    width: vw(20),
    height: vw(20),
    borderRadius: vw(10),
    backgroundColor: '#E5F0FF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  logo: {
    fontSize: vw(4.5),
    fontFamily: Fonts.bold,
    color: '#005ABF',
  },

  text: {
    marginTop: vw(4),
    fontSize: vw(3.6),
    color: '#4A5565',
    fontFamily: Fonts.regular,
  },
});

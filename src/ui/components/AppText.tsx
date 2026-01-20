import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';
import { Fonts } from '../theme/fonts';

export default function AppText(props: TextProps) {
  return (
    <Text
      {...props}
      style={[styles.text, props.style]}
    />
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: Fonts.regular,
    color: '#111111',
  },
});

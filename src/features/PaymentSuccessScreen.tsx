import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import AppText from '../ui/components/AppText';
import { Fonts } from '../ui/theme/fonts';
import { vw, vh } from '../ui/theme/dimensions';
import { CheckCircle } from '../assets/icons';
import { Routes } from '../app/constants/routes';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainStack } from '../app/navigation/types';

type Props = NativeStackScreenProps<
  MainStack,
  Routes.PAYMENT_SUCCESS
>;
export default function PaymentSuccessScreen({
  route,
  navigation,
}: Props) {
  const { amount } = route.params;
  return (
    <View style={styles.container}>
      <View style={styles.center}>
        <View style={{alignItems:'center',justifyContent:'center', backgroundColor: "#DCFCE7", borderRadius: 50, width: vw(25), height: vh(12) }}>
          <CheckCircle width={50} height={50} color="#22C55E" />
        </View>

        <AppText style={styles.title}>Payment Successful ✅</AppText>

        <AppText style={styles.subtitle}>
          {amount} added to your wallet
        </AppText>
      </View>

      <TouchableOpacity style={styles.button} onPress={() => {
        navigation.popToTop();
      }}>
        <AppText style={styles.buttonText}>Back to Home</AppText>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: vw(6),
    justifyContent: 'space-between',
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    marginTop: vh(2),
    fontSize: vw(4.6),
    fontFamily: Fonts.bold,
    color: '#101828',
  },

  subtitle: {
    marginTop: vh(1),
    fontSize: vw(3.6),
    color: '#4A5565',
    fontFamily:Fonts.regular
  },

  button: {
    marginBottom: vh(4),
    height: vh(6.5),
    backgroundColor: '#005ABF',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: vw(4),
    fontFamily: Fonts.regular,
  },
});

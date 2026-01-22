import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Routes } from '../constants/routes';
import OnboardingScreen from '../../features/onboarding/OnboardingScreen';
import SetPasswordScreen from '../../features/set_password/SetPasswordScreen';
import VerifyOtpScreen from '../../features/otp/VerifyOtpScreen';
import SetWalletPinScreen from '../../features/onboarding/SetWalletPinScreen';
import LoginScreen from '../../features/onboarding/LoginScreen';
import RegisterScreen from '../../features/onboarding/RegisterScreen';
import { AuthStackParamList } from './types';
import SetNameScreen from '../../features/onboarding/SetNameScreen';

const Stack = createNativeStackNavigator<AuthStackParamList>();

export default function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={Routes.LOGIN} component={LoginScreen} />
      <Stack.Screen name={Routes.ONBOARDING} component={OnboardingScreen} />
      <Stack.Screen name={Routes.SET_PASSWORD} component={SetPasswordScreen} />
      <Stack.Screen name={Routes.VERIFY_OTP} component={VerifyOtpScreen} />
      <Stack.Screen name={Routes.SET_PIN} component={SetWalletPinScreen} />
      <Stack.Screen name={Routes.CREATE_ACCOUNT} component={RegisterScreen} />
      <Stack.Screen name={Routes.SET_USER_NAME} component={SetNameScreen} />
    </Stack.Navigator>
  );
}

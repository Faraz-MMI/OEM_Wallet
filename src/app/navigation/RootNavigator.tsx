import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './AuthStack';
import TabNavigator from './TabNavigator';
import { useAuthStore } from '../store/authStore';
import StackNavigator from './StackNavigator';

export default function RootNavigator() {
  const hasPassword = useAuthStore(state => state.hasPassword);
  console.log('ROOT NAVIGATOR hasPassword =', hasPassword);

  return (
    <NavigationContainer>
      {hasPassword ? <StackNavigator /> : <AuthStack />}
    </NavigationContainer>
  );
}

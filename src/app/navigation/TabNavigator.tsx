import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Routes } from '../constants/routes';
import DashboardScreen from '../../features/dashboard/DashboardScreen';
import RfidCardScreen from '../../features/rfid/RFIDCardScreen';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name={Routes.DASHBOARD} component={DashboardScreen} />
      <Tab.Screen name={Routes.RFID_CARD} component={RfidCardScreen} />
      <Tab.Screen name={Routes.VEHICLE} component={() => null} />
      <Tab.Screen name={Routes.ALERTS} component={() => null} />
      <Tab.Screen name={Routes.PROFILE} component={() => null} />
    </Tab.Navigator>
  );
}

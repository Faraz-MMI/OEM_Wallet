import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Routes } from '../constants/routes';
import DashboardScreen from '../../features/dashboard/DashboardScreen';
import RfidCardScreen from '../../features/rfid/RFIDCardScreen';
import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FastTagStackNavigator from './FastTagStackNavigator';
import AddMoneyScreen from '../../features/AddMoneyScreen';
import PaymentSuccessScreen from '../../features/PaymentSuccessScreen';
import { MainStack } from './types';
import VehicleStackNavigator from './VehicleStackNavigator';
import VoucherStackNavigator from './VoucherStackNavigator';
import NotificationsScreen from '../../features/notifications/NotificationsScreen';
import ProfileStackNavigator from './ProfileStackNavigator';
import TransactionsScreen from '../../features/transactions/TransactionsScreen';
import TransactionDetailsScreen from '../../features/transactions/TransactionDetailsScreen';
import ChallanStackNavigator from './ChallanStackNavigator';

const Stack = createNativeStackNavigator<MainStack>();

export default function StackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={Routes.DASHBOARD} component={DashboardScreen} />
      <Stack.Screen name={Routes.ADD_MONEY} component={AddMoneyScreen} />
      <Stack.Screen name={Routes.PAYMENT_SUCCESS} component={PaymentSuccessScreen} />
      <Stack.Screen name={Routes.RFID_CARD} component={RfidCardScreen} />
      <Stack.Screen name={Routes.FASTTAG_STACK} component={FastTagStackNavigator} />
      <Stack.Screen name={Routes.VEHICLE_STACK} component={VehicleStackNavigator} />
      <Stack.Screen name={Routes.VOUCHER_STACK} component={VoucherStackNavigator} />
      <Stack.Screen name={Routes.ALERTS} component={NotificationsScreen}/>
      <Stack.Screen name={Routes.PROFILE_STACK} component={ProfileStackNavigator}/>
      <Stack.Screen name={Routes.HOME_VIEW_ALL_TRANSACTIONS} component={TransactionsScreen}/>
      <Stack.Screen name={Routes.TRANSACTION_DETAILS} component={TransactionDetailsScreen}/>
      <Stack.Screen name={Routes.CHALLAN_STACK} component={ChallanStackNavigator} />
    </Stack.Navigator>
  );
}

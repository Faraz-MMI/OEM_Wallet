import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Routes } from '../constants/routes';

import VoucherSuccessScreen from '../../features/voucher/VoucherSuccessScreen';
import VoucherDetailScreen from '../../features/voucher/VoucherDetailScreen';
import BrandsScreen from '../../features/voucher/BrandsScreen';
import BrandVouchersScreen from '../../features/voucher/BrandVouchersScreen';
import CompletePurchaseScreen from '../../features/voucher/CompletePurchaseScreen';

const Stack = createNativeStackNavigator();

export default function VoucherStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={Routes.VOUCHER_HOME}>
      <Stack.Screen
        name={Routes.VOUCHER_HOME}
        component={BrandsScreen}
        options={{ title: 'Vouchers' }}
      />

      <Stack.Screen
        name={Routes.VOUCHER_BY_BRAND}
        component={BrandVouchersScreen}
        options={{ title: 'Vouchers List' }}
      />

      <Stack.Screen
        name={Routes.VOUCHER_DETAILS}
        component={VoucherDetailScreen}
        options={{ title: 'Voucher' }}
      />
      <Stack.Screen
        name={Routes.COMPLETE_VOUCHER_PURCHASE}
        component={CompletePurchaseScreen}
        options={{ title: 'Complete Purchase', headerShown: false }}
      />
      <Stack.Screen
        name={Routes.VOUCHER_PURCHASE_SUCCESS}
        component={VoucherSuccessScreen}
        options={{title:"", headerShown: false }}
      />
    </Stack.Navigator>
  );
}

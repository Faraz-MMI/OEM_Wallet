import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Routes } from '../constants/routes';

import FastTagScreen from '../../features/fasttag/FastTagScreen';
import AddFastTagBalanceScreen from '../../features/fasttag/AddFastTagBalanceScreen';
import ReviewPaymentScreen from '../../features/fasttag/ReviewFastTagPaymentScreen';
import FastTagRechargeSuccessScreen from '../../features/fasttag/FastTagRechargeSuccessScreen';
import FastTagHistoryScreen from '../../features/fasttag/FastTagHistoryScreen';
import FastTagPaymentHistoryScreen from '../../features/fasttag/FastTagPaymentHistoryScreen';
import BuyFastTagScreen from '../../features/fasttag/BuyFastTagScreen';
import BuyNewFastTagScreen from '../../features/fasttag/BuyNewFastTagScreen';
import FastTagPurchaseSuccessScreen from '../../features/fasttag/FastTagPurchaseSuccessScreen';
import SelectFastTagBankScreen from '../../features/fasttag/SelectFastTagBankScreen';
import EnterVehicleNumberScreen from '../../features/fasttag/EnterVehicleNumberScreen';
import FastTagFoundScreen from '../../features/fasttag/FastTagFoundScreen';
import FastTagLinkedSuccessScreen from '../../features/fasttag/FastTagLinkedSuccessScreen';

const Stack = createNativeStackNavigator();

export default function FastTagStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='FastTagHome'>
      <Stack.Screen
        name={Routes.FASTTAG_HOME}
        component={FastTagScreen}
        options={{ title: 'FastTag' }}
      />

      <Stack.Screen
        name={Routes.FASTTAG_ADD_BALANCE}
        component={AddFastTagBalanceScreen}
        options={{ title: 'Add FastTag Balance' }}
      />

      <Stack.Screen
        name={Routes.REVIEW_PAYMENT}
        component={ReviewPaymentScreen}
        options={{ title: 'Review Payment' }}
      />

      <Stack.Screen
        name={Routes.FASTTAG_SUCCESS}
        component={FastTagRechargeSuccessScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name={Routes.FASTTAG_HISTORY}
        component={FastTagHistoryScreen}
        options={{ title: 'FastTag History' }}
      />

      <Stack.Screen
        name={Routes.FASTTAG_PAYMENT_HISTORY}
        component={FastTagPaymentHistoryScreen}
        options={{ title: 'FastTag History' }}
      />
      <Stack.Screen
        name={Routes.FASTTAG_BUY}
        component={BuyFastTagScreen}
        options={{ title: 'FastTag History' }}
      />
      <Stack.Screen
        name={Routes.FASTTAG_BUY_NEW_FASTTAG}
        component={BuyNewFastTagScreen}
        options={{ title: 'Buy New FastTag' }}
      />
      <Stack.Screen
        name={Routes.FASTTAG_PURCHASE_SUCCESS}
        component={FastTagPurchaseSuccessScreen}
      />
      <Stack.Screen
        name={Routes.FASTTAG_SELECT_BANK}
        component={SelectFastTagBankScreen}
        options={{ title: 'Select Bank' }}
      />
      <Stack.Screen
        name={Routes.FASTTAG_ENTER_VEHICLE_NUMBER}
        component={EnterVehicleNumberScreen}
      />
      <Stack.Screen
        name={Routes.FASTTAG_FOUND}
        component={FastTagFoundScreen}
      />
      <Stack.Screen
        name={Routes.FASTTAG_LINK_SUCCESS}
        component={FastTagLinkedSuccessScreen}
      />
    </Stack.Navigator>
  );
}

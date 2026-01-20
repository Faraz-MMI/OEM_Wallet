import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Routes } from '../constants/routes';

import VehicleDashboardScreen from '../../features/vehicle/VehicleDashboardScreen';
import FuelPaymentScreen from '../../features/vehicle/FuelPaymentScreen';
import EVChargingSetupScreen from '../../features/ev_charging/EVCHargingSetupScreen';
import ServiceHistoryScreen from '../../features/vehicle/ServiceHistoryScreen';
import MyEvRfidCardScreen from '../../features/ev_charging/MyEvRfidCardScreen';
import EVChargingScreen from '../../features/ev_charging/EVChargingScreen';
import ChargingSessionCompletedScreen from '../../features/ev_charging/ChargingSessionCompletedScreen';
import ChargingDetailsScreen from '../../features/ev_charging/CharginDetailsScreen';
import EVChargingHistoryScreen from '../../features/ev_charging/EVChargingHistoryScreen';

const Stack = createNativeStackNavigator();

export default function VehicleStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='VehicleHome'>
      <Stack.Screen
        name={Routes.VEHICLE_HOME}
        component={VehicleDashboardScreen}
        options={{ title: 'My Vehicle' }}
      />

      <Stack.Screen
        name={Routes.VEHICLE_FUEL_PAYMENT}
        component={FuelPaymentScreen}
        options={{ title: 'Fuel Payment' }}
      />

      <Stack.Screen
        name={Routes.VEHICLE_EV_CHARGING}
        component={EVChargingSetupScreen}
        options={{ title: 'Fuel Payment' }}
      />
      <Stack.Screen
        name={Routes.VEHICLE_SERVICE_HISTORY}
        component={ServiceHistoryScreen}
        options={{ title: 'Service History' }}
      />
      <Stack.Screen
        name={Routes.MY_EV_RFID_CARD}
        component={MyEvRfidCardScreen}
        options={{ title: 'My EV RFID Card' }}
      />
      <Stack.Screen
        name={Routes.EV_CHARGING_VIEW}
        component={EVChargingScreen}
        options={{ title: 'My EV RFID Card' }}
      />
       <Stack.Screen
        name={Routes.EV_CHARGE_COMPLETED}
        component={ChargingSessionCompletedScreen}
        options={{ title: 'My EV RFID Card' }}
      />
      <Stack.Screen
        name={Routes.EV_CHARGING_DETAILS}
        component={ChargingDetailsScreen}
        options={{ title: 'Charging Details' }}
      />
      <Stack.Screen
        name={Routes.EV_CHARGING_HISTORY}
        component={EVChargingHistoryScreen}
        options={{ title: 'Charging Details' }}
      />
    </Stack.Navigator>
  );
}

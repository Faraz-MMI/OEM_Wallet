import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Routes } from '../constants/routes';
import TrafficChallansScreen from '../../features/challan/TrafficChallanScreen';
import ChallanDetailsScreen from '../../features/challan/ChallanDetailsScreen';
import ConfirmChallanPaymentScreen from '../../features/challan/ConfirmChallanPaymentScreen';
import ChallanPaymentSuccessScreen from '../../features/challan/ChallanPaymentSuccessScreen';

const Stack = createNativeStackNavigator();

export default function ChallanStackNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={Routes.TRAFFIC_CHALLAN}>
            <Stack.Screen
                name={Routes.TRAFFIC_CHALLAN}
                component={TrafficChallansScreen}
                options={{ title: 'Traffic Challans' }}
            />

            <Stack.Screen
                name={Routes.CHALLAN_DETAILS}
                component={ChallanDetailsScreen}
                options={{ title: 'Challan Details' }}
            />

            <Stack.Screen
                name={Routes.CONFIRM_CHALLAN_PAYMENT}
                component={ConfirmChallanPaymentScreen}
                options={{ title: 'Confirm Challan Payment' }}
            />

            <Stack.Screen
                name={Routes.CHALLAN_PAYMENT_SUCCESS}
                component={ChallanPaymentSuccessScreen}
                options={{ title: 'Confirm Challan Payment' }}
            />


        </Stack.Navigator>
    );
}

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ProfileStackParamList } from "./types";
import { Routes } from "../constants/routes";
import ProfileSettingsScreen from "../../features/profile/ProfileSettingsScreen";
import MyProfileScreen from "../../features/profile/MyProfileScreen";
import SecurityPinScreen from "../../features/profile/SecurityPinScreen";
import HelpSupportScreen from "../../features/help/HelpSupportScreen";
import PaymentMethodsScreen from "../../features/profile/PaymentMethodsScreen";

const Stack = createNativeStackNavigator<ProfileStackParamList>();
export default function ProfileStackNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={Routes.PROFILE_SETTINGS}>
            <Stack.Screen
                name={Routes.PROFILE_SETTINGS}
                component={ProfileSettingsScreen}
                options={{ title: "Profile & Settings" }} />
            <Stack.Screen
                name={Routes.PROFILE_EDIT}
                component={MyProfileScreen}
                options={{ title: "My Profile" }} />
            <Stack.Screen
                name={Routes.PROFILE_WALLET_PIN}
                component={SecurityPinScreen}
                options={{ title: "Security & Pin" }} />
            <Stack.Screen
                name={Routes.PROFILE_PAYMENT_METHODS}
                component={PaymentMethodsScreen}
                options={{ title: "Payment Methods" }} />
            <Stack.Screen
                name={Routes.PROFILE_HELP}
                component={HelpSupportScreen}
                options={{ title: "Help & Support" }} />
        </Stack.Navigator>
    )
}

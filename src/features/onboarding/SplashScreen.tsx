import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ScreenContainer from '../../ui/components/ScreenContainer';
import { vw, vh, FONT_SIZE } from '../../ui/theme/dimensions';
import { Fonts } from '../../ui/theme/fonts';
import { COLORS } from '../../app/constants/colors';
import { Routes } from '../../app/constants/routes';
import { ICON_EYE, ICON_EYE_OFF } from '../../assets/icons';
import { useLoginUser } from './hooks/useLoginUser';
import CustomLoader from '../../ui/components/CustomLoader';
import { md5 } from '../../app/services/encryption';
import { useAuthStore } from '../../app/store/authStore';
import { useUserStore } from '../../app/store/userStore';
import { useFetchCustomer } from './hooks/useFetchCustomer';
import ErrorPopup from '../../ui/components/ErrorPopup';

export default function SplashScreen({ navigation }: any) {
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const [secure, setSecure] = useState(true);
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const { login, loading, error } = useLoginUser();
    const { fetchCustomerAsync, data, isLoading, error: fetchCustomerError } = useFetchCustomer();

    const isValid = mobile.length === 10 && password.length > 0;

    useEffect(() => {
        // Simulate a loading period for the splash screen
        const timer = setTimeout(() => {
            onLogin();
            navigation.replace(Routes.LOGIN);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    const onLogin = async () => {
        const result = await login({
            username: mobile,
            md5Password: md5(password),
            grant_type: 'password',
        }).catch(err => {
            console.log('Login error:', err);
        });

        if (result && result.status && result.token) {
            console.log('TOKEN:', result.token);
            console.log('USER:', result.fname, result.lname);
            const response = await fetchCustomerAsync({
                mobile: { countryCode: 91, value: '9998427343' }
            });
            console.log("fetchCustomer wallet screen", response);
            useUserStore.getState().setUser(response);
            useAuthStore.getState().setHasPassword(true);
        } else {
            console.log('Login failed:', result?.message);
            setErrorMessage(result?.message || 'Login failed');
            setShowError(true);
        }
    };

    return (
        <ScreenContainer>
            <View
                style={styles.container}
            >
                <LinearGradient
                    colors={['#DBEAFE', '#BEDBFF']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.card}
                >
                    <View style={styles.cardCircle}>
                        <Text style={styles.cardCircleText}>MMI</Text>
                    </View>
                    <Text style={styles.cardLabel}>MMI OEM Wallet</Text>
                </LinearGradient>

            </View>
            <CustomLoader visible={loading} />
        </ScreenContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: vw(6),
        alignItems: 'center',
        justifyContent: 'center',
    },

    card: {
        width: '100%',
        height: vh(30),
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },

    cardCircle: {
        width: vw(22),
        height: vw(22),
        borderRadius: vw(11),
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
    },

    cardCircleText: {
        color: COLORS.APP_PRIMARY,
        fontSize: vw(4),
        fontFamily: Fonts.semiBold,
    },

    cardLabel: {
        marginTop: vh(2),
        color: COLORS.APP_PRIMARY,
        fontSize: FONT_SIZE.FONT_16,
    },
});
import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Animated,
} from 'react-native';
import { vw, vh } from '../../ui/theme/dimensions';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Routes } from '../../app/constants/routes';

const OTP_LENGTH = 6;
const BRAND_BLUE = '#005ABF';

type Props = NativeStackScreenProps<any>;

export default function VerifyOtpScreen({navigation}:Props) {
    // ✅ Hooks FIRST (never conditional)
    const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(''));
    const [timer, setTimer] = useState(29);

    const inputs = useRef<Array<TextInput | null>>([]);
    const shakeAnim = useRef(new Animated.Value(0)).current;

    /* ---------------- TIMER ---------------- */
    useEffect(() => {
        if (timer === 0) return;

        const interval = setInterval(() => {
            setTimer(prev => prev - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [timer]);

    /* ---------------- AUTO FOCUS ---------------- */
    useEffect(() => {
        inputs.current[0]?.focus();
    }, []);

    /* ---------------- SHAKE ---------------- */
    const shake = () => {
        Animated.sequence([
            Animated.timing(shakeAnim, {
                toValue: 10,
                duration: 60,
                useNativeDriver: true,
            }),
            Animated.timing(shakeAnim, {
                toValue: -10,
                duration: 60,
                useNativeDriver: true,
            }),
            Animated.timing(shakeAnim, {
                toValue: 6,
                duration: 60,
                useNativeDriver: true,
            }),
            Animated.timing(shakeAnim, {
                toValue: 0,
                duration: 60,
                useNativeDriver: true,
            }),
        ]).start();
    };

    /* ---------------- INPUT HANDLERS ---------------- */
    const handleChange = (value: string, index: number) => {
        if (!/^\d?$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < OTP_LENGTH - 1) {
            inputs.current[index + 1]?.focus();
        }
    };

    const handleKeyPress = (e: any, index: number) => {
        if (e.nativeEvent.key === 'Backspace' && otp[index] === '' && index > 0) {
            inputs.current[index - 1]?.focus();
        }
    };

    const isOtpComplete = otp.every(digit => digit !== '');

    const verifyOtp = () => {
        const enteredOtp = otp.join('');

        if (enteredOtp !== '123456') {
            shake();
            setOtp(Array(OTP_LENGTH).fill(''));
            inputs.current[0]?.focus();
            return;
        }

        navigation.navigate(Routes.SET_PASSWORD)
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Verify OTP</Text>

            <Text style={styles.subtitle}>
                OTP has been sent to +91 98xxxxxx45
            </Text>

            <Animated.View
                style={[
                    styles.otpRow,
                    { transform: [{ translateX: shakeAnim }] },
                ]}
            >
                {otp.map((digit, index) => (
                    <TextInput
                        key={index} // ✅ FIXED
                        ref={(ref: TextInput | null): void => {
                            inputs.current[index] = ref;
                        }}
                        style={styles.otpBox}
                        value={digit}
                        keyboardType="number-pad"
                        maxLength={1}
                        onChangeText={v => handleChange(v, index)}
                        onKeyPress={e => handleKeyPress(e, index)}
                    />
                ))}
            </Animated.View>

            <TouchableOpacity
                style={[
                    styles.button,
                    !isOtpComplete && styles.buttonDisabled,
                ]}
                disabled={!isOtpComplete}
                onPress={verifyOtp}
            >
                <Text style={styles.buttonText}>Verify</Text>
            </TouchableOpacity>

            <Text style={styles.resendText}>
                {timer > 0 ? `Resend OTP in ${timer}s` : 'Resend OTP'}
            </Text>
        </View>
    );
}

/* ---------------- STYLES ---------------- */
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: vw(6),
        paddingTop: vh(8),
        alignItems: 'center',
    },

    title: {
        fontSize: vw(5),
        fontWeight: '600',
        color: '#111111',
    },

    subtitle: {
        marginTop: vh(1),
        fontSize: vw(3.4),
        color: '#6B7280',
        textAlign: 'center',
    },

    otpRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: vh(4),
        width: '100%',
    },

    otpBox: {
        width: vw(11),
        height: vw(13),
        borderRadius: 8,
        backgroundColor: '#F3F4F6',
        textAlign: 'center',
        fontSize: vw(4.5),
        color: '#111111',
    },

    button: {
        marginTop: vh(4),
        width: '100%',
        height: vh(6.5),
        backgroundColor: BRAND_BLUE,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
    },

    buttonDisabled: {
        backgroundColor: '#9BBBE3',
    },

    buttonText: {
        color: '#FFFFFF',
        fontSize: vw(3.8),
        fontWeight: '500',
    },

    resendText: {
        marginTop: vh(2),
        fontSize: vw(3.2),
        color: '#6B7280',
    },
});

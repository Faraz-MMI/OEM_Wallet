import React, { useRef, useState } from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    TextInput,
} from 'react-native';
import AppText from '../../ui/components/AppText';
import { vw, vh } from '../../ui/theme/dimensions';
import { Fonts } from '../../ui/theme/fonts';
import { COLORS } from '../../app/constants/colors';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Routes } from '../../app/constants/routes';
import { useAuthStore } from '../../app/store/authStore';
import { useFetchCustomer } from './hooks/useFetchCustomer';
import { useUserStore } from '../../app/store/userStore';
import CustomLoader from '../../ui/components/CustomLoader';
import { md5 } from '../../app/services/encryption';
import { useSetMpin } from './hooks/useSetMpin';
import ScreenContainer from '../../ui/components/ScreenContainer';
type Props = NativeStackScreenProps<any>;
export default function SetWalletPinScreen({ navigation }: Props) {
    const { setMobile, hasPassword, setHasPassword } = useAuthStore();
    const { fetchCustomerAsync, data, isLoading, error } = useFetchCustomer();
    const [pin, setPin] = useState('');
    const inputRef = useRef<TextInput>(null);
    const { setMpin, loading, error: setMpinError } = useSetMpin();

    const onChangePin = (value: string) => {
        if (/^\d*$/.test(value) && value.length <= 4) {
            setPin(value);
        }
    };

    const isValid = pin.length === 4;

    const onConfirmPin = async () => {
        const success = await setMpin({
            mPin: md5(pin),
            confPin: md5(pin),
        });

        if (success) {
            console.log('MPIN set successfully');
        }

        const response = await fetchCustomerAsync({
            mobile: { countryCode: 91, value: '9998427343' }
        });
        console.log("fetchCustomer wallet screen", response);
        useUserStore.getState().setUser(response);
        useAuthStore.getState().setHasPassword(true);
    }

    return (
        <ScreenContainer>
            <View style={styles.container}>

                <AppText style={styles.title}>Set Wallet PIN</AppText>
                <AppText style={styles.subtitle}>
                    This PIN will be used for payments
                </AppText>


                <TouchableOpacity
                    activeOpacity={1}
                    style={styles.pinRow}
                    onPress={() => {
                        setTimeout(() => {
                            inputRef.current?.focus();
                        }, 100);
                    }}
                >
                    {[0, 1, 2, 3].map(i => (
                        <View key={i} style={styles.pinBox}>
                            <AppText style={styles.pinDot}>
                                {pin[i] ? '•' : ''}
                            </AppText>
                        </View>
                    ))}
                </TouchableOpacity>


                <View style={styles.inputWrapper}>
                    <TextInput
                        ref={inputRef}
                        value={pin}
                        onChangeText={onChangePin}
                        keyboardType="number-pad"
                        maxLength={4}
                        autoFocus={false}
                        caretHidden
                        showSoftInputOnFocus={true}
                        style={styles.realHiddenInput}
                    />
                </View>



                <TouchableOpacity
                    disabled={!isValid}
                    style={[
                        styles.cta,
                        !isValid && styles.ctaDisabled,
                    ]}
                    onPress={onConfirmPin}
                >
                    <AppText style={styles.ctaText}>
                        Confirm PIN
                    </AppText>
                </TouchableOpacity>

            </View>
            <CustomLoader visible={isLoading || loading} />
        </ScreenContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: vw(6),
        paddingTop: vh(6),
    },

    title: {
        fontSize: vw(6),
        fontFamily: Fonts.bold,
        color: '#0F172A',
    },

    subtitle: {
        marginTop: vh(1),
        fontSize: vw(3.6),
        color: '#64748B',
    },

    pinRow: {
        marginTop: vh(6),
        flexDirection: 'row',
        justifyContent: 'center',
        zIndex: 1
    },

    pinBox: {
        width: vw(12),
        height: vw(12),
        borderRadius: 12,
        backgroundColor: '#F3F4F6',
        marginHorizontal: vw(2),
        justifyContent: 'center',
        alignItems: 'center',
    },

    pinDot: {
        fontSize: vw(6),
        fontFamily: Fonts.bold,
    },

    hiddenInput: {
        position: 'absolute',
        width: 1,
        height: 1,
        left: -100,
        top: -100,
    },

    cta: {
        marginTop: vh(6),
        height: vh(7),
        backgroundColor: COLORS.BUTTON_SELECTED,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
    },

    ctaDisabled: {
        opacity: 0.5,
    },

    ctaText: {
        color: '#FFFFFF',
        fontSize: vw(4),
        fontFamily: Fonts.semiBold,
    },
    inputWrapper: {
        position: 'absolute',
        width: '100%',
        height: '100%',
    },

    realHiddenInput: {
        width: '100%',
        // height: '100%',
        opacity: 0.01,  // NOT 0
        zIndex:1
    },

});

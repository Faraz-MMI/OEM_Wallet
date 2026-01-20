import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import AppText from '../../ui/components/AppText';
import { Fonts } from '../../ui/theme/fonts';
import { vw, vh } from '../../ui/theme/dimensions';
import WalletPinModal from '../../ui/components/WalletPinModal';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FastTagStackParamList } from '../../app/navigation/types';
import { Routes } from '../../app/constants/routes';
import ScreenContainer from '../../ui/components/ScreenContainer';
import CustomTopBar from '../../ui/components/CustomTopBar';

type Props = {
    onConfirm: () => void;
};

export default function ReviewPaymentScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<FastTagStackParamList>>();
    const [showPin, setShowPin] = useState(false);
    const [loading, setLoading] = useState(false);
    return (
        <ScreenContainer>
            <CustomTopBar title='Review Payment' onBack={()=>navigation.goBack()}/>
            <View style={styles.container}>
                
                <View style={styles.card}>
                    <InfoRow label="Vehicle Number" value="MH12AB1234" />

                    <InfoRow label="CA Number" value="**** 3024" />

                    <View style={styles.divider} />

                    <InfoRow
                        label="Amount"
                        value="₹ 500.00"
                        valueStyle={styles.amount}
                    />

                    <InfoRow
                        label="Payment Source"
                        value="IDFC FastTag"
                    />
                </View>

                
                <TouchableOpacity style={styles.cta} onPress={() => setShowPin(true)}>
                    <AppText style={styles.ctaText}>Confirm & Pay</AppText>
                </TouchableOpacity>

                
                <AppText style={styles.hint}>
                    You will be asked to enter your 4-digit PIN
                </AppText>
                <WalletPinModal
                    visible={showPin}
                    loading={loading}
                    onClose={() => setShowPin(false)}
                    onSubmit={(pin) => {
                        setLoading(true);
                        setTimeout(() => {
                            setLoading(false);
                            setShowPin(false);
                            // navigate to success
                            navigation.navigate(Routes.FASTTAG_SUCCESS);

                        }, 1500);
                    }}
                />
            </View>
        </ScreenContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: vw(5),
    },

    /* Card */
    card: {
        marginTop: vh(3),
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: vw(5),
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },

    row: {
        marginBottom: vh(2),
    },

    label: {
        fontSize: vw(3.2),
        color: '#6B7280',
    },

    value: {
        marginTop: vh(0.4),
        fontSize: vw(3.8),
        fontFamily: Fonts.semiBold,
        color: '#111111',
    },

    amount: {
        fontSize: vw(4.4),
        fontFamily: Fonts.bold,
        color: '#005ABF',
    },

    divider: {
        height: 1,
        backgroundColor: '#F3F4F6',
        marginVertical: vh(2),
    },

    /* CTA */
    cta: {
        marginTop: vh(5),
        height: vh(6.8),
        backgroundColor: '#005ABF',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },

    ctaText: {
        color: '#FFFFFF',
        fontSize: vw(4),
        fontFamily: Fonts.semiBold,
    },

    /* Hint */
    hint: {
        marginTop: vh(2),
        fontSize: vw(3.2),
        color: '#6B7280',
        textAlign: 'center',
    },
});

function InfoRow({
    label,
    value,
    valueStyle,
}: {
    label: string;
    value: string;
    valueStyle?: any;
}) {
    return (
        <View style={styles.row}>
            <AppText style={styles.label}>{label}</AppText>
            <AppText style={[styles.value, valueStyle]}>
                {value}
            </AppText>
        </View>
    );
}

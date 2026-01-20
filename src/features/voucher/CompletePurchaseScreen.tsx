import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AppText from '../../ui/components/AppText';
import { vw, vh } from '../../ui/theme/dimensions';
import { Fonts } from '../../ui/theme/fonts';
import { COLORS } from '../../app/constants/colors';
import ScreenContainer from '../../ui/components/ScreenContainer';
import CustomTopBar from '../../ui/components/CustomTopBar';
import WalletPinModal from '../../ui/components/WalletPinModal';
import { Routes } from '../../app/constants/routes';
import { VoucherStackParamList } from '../../app/navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

export default function CompletePurchaseScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<VoucherStackParamList>>();
    const [showPin, setShowPin] = useState(false);
    const [loading, setLoading] = useState(false);
    return (
        <ScreenContainer>
            <CustomTopBar title='Complete Purchase' onBack={() => { }} />
            <View style={styles.container}>

                {/* Voucher Card */}
                <LinearGradient
                    colors={['#9333EA', '#6B21A8']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.voucherCard}
                >
                    <View style={styles.headerRow}>
                        <View style={styles.iconCircle}>
                            <AppText style={styles.icon}>🏷️</AppText>
                        </View>

                        <View style={{ flex: 1 }}>
                            <AppText style={styles.voucherTitle}>Cafe Latte</AppText>
                            <AppText style={styles.voucherBrand}>Cafe Coffee Day</AppText>
                        </View>
                    </View>

                    <View style={styles.benefitBox}>
                        <AppText style={styles.benefitLabel}>Benefit</AppText>
                        <AppText style={styles.benefitValue}>10% off</AppText>
                    </View>
                </LinearGradient>

                <View style={styles.amountContainer}>
                    <View style={styles.amountRow}>
                        <AppText style={styles.amountLabel}>Purchase Amount</AppText>
                        <AppText style={styles.amountValue}>₹50</AppText>
                    </View>

                    <View style={styles.divider} />

                    <AppText style={styles.infoText}>
                        You are purchasing a voucher with the benefit:{" "}
                        <AppText style={styles.infoHighlight}>10% off</AppText>
                    </AppText>
                </View>

                {/* Payment Method */}
                <View style={styles.paymentCard}>
                    <AppText style={styles.paymentTitle}>💳 Payment Method</AppText>
                    <AppText style={styles.paymentSub}>
                        Amount will be deducted from your wallet balance
                    </AppText>
                </View>

                {/* Bottom CTA */}
                <View style={styles.bottomArea}>
                    <TouchableOpacity style={styles.payButton} onPress={() => {
                        setShowPin(true);
                    }}>
                        <AppText style={styles.payText}>Pay</AppText>
                        <AppText style={styles.payAmount}>₹50</AppText>
                    </TouchableOpacity>

                    <AppText style={styles.pinHint}>
                        You will be prompted for your 4-digit PIN
                    </AppText>
                </View>
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
                            navigation.navigate(Routes.VOUCHER_PURCHASE_SUCCESS);
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
        paddingTop: vh(2),
    },

    voucherCard: {
        borderRadius: 20,
        padding: vw(5),
        marginBottom: vh(3),
    },

    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: vh(2),
    },

    iconCircle: {
        width: vw(12),
        height: vw(12),
        borderRadius: vw(6),
        backgroundColor: 'rgba(255,255,255,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: vw(3),
    },

    icon: {
        fontSize: vw(5),
    },

    voucherTitle: {
        fontSize: vw(4.5),
        fontFamily: Fonts.bold,
        color: '#FFFFFF',
    },

    voucherBrand: {
        marginTop: vh(0.5),
        fontSize: vw(3.4),
        color: '#E9D5FF',
    },

    benefitBox: {
        backgroundColor: 'rgba(255,255,255,0.15)',
        borderRadius: 14,
        padding: vw(4),
    },

    benefitLabel: {
        fontSize: vw(3.2),
        color: '#E9D5FF',
    },

    benefitValue: {
        marginTop: vh(0.5),
        fontSize: vw(4),
        fontFamily: Fonts.bold,
        color: '#FFFFFF',
    },

    amountRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: vh(1.5),
    },

    amountLabel: {
        fontSize: vw(3.8),
        color: '#4B5563',
    },

    amountValue: {
        fontSize: vw(4.5),
        fontFamily: Fonts.bold,
        color: COLORS.APP_PRIMARY,
    },

    divider: {
        height: 1,
        backgroundColor: '#E5E7EB',
        marginVertical: vh(1.5),
    },

    infoText: {
        fontSize: vw(3.3),
        color: '#4B5563',
        marginBottom: vh(2),
    },

    infoHighlight: {
        fontFamily: Fonts.semiBold,
        color: '#111827',
    },

    paymentCard: {
        borderWidth: 1,
        borderColor: '#BFDBFE',
        backgroundColor: '#EFF6FF',
        borderRadius: 14,
        padding: vw(4),
    },

    paymentTitle: {
        fontSize: vw(3.6),
        fontFamily: Fonts.semiBold,
        color: '#1D4ED8',
    },

    paymentSub: {
        marginTop: vh(0.5),
        fontSize: vw(3.2),
        color: '#1D4ED8',
    },

    bottomArea: {
        position: 'absolute',
        left: vw(5),
        right: vw(5),
        bottom: vh(3),
    },

    payButton: {
        height: vh(7),
        backgroundColor: COLORS.APP_PRIMARY,
        borderRadius: 14,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },

    payText: {
        fontSize: vw(4),
        fontFamily: Fonts.semiBold,
        color: '#FFFFFF',
        marginRight: vw(2),
    },

    payAmount: {
        fontSize: vw(4),
        fontFamily: Fonts.bold,
        color: '#FFFFFF',
    },

    pinHint: {
        marginTop: vh(1),
        fontSize: vw(3),
        color: '#6B7280',
        textAlign: 'center',
    },
    amountContainer: {
        backgroundColor: "#F9FAFB",
        padding: vw(4),
        borderRadius: 14,
        marginBottom: vh(2)
    }
});

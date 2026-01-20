import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import AppText from '../../ui/components/AppText';
import { Fonts } from '../../ui/theme/fonts';
import { vw, vh, FONT_SIZE } from '../../ui/theme/dimensions';
import { CheckCircle } from '../../assets/icons';
import { FastTagStackParamList, MainStack } from '../../app/navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { Routes } from '../../app/constants/routes';
import ScreenContainer from '../../ui/components/ScreenContainer';

export default function FastTagRechargeSuccessScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<MainStack>>();
    function InfoRow({
        label,
        value,
    }: {
        label: string;
        value: string;
    }) {
        return (
            <View style={styles.row}>
                <AppText style={styles.label}>{label}</AppText>
                <AppText style={styles.value}>{value}</AppText>
            </View>
        );
    }

    return (
        <ScreenContainer>
            <View style={styles.container}>
                <View style={styles.center}>
                    <CheckCircle width={64} height={64} color="#22C55E" />

                    <AppText style={styles.title}>
                        FastTag Recharge 
                    </AppText>
                    <AppText style={[styles.title,{marginTop:0}]}>
                        Successful ✅
                    </AppText>

                    <View style={styles.card}>
                        <InfoRow label="Transaction ID" value="FTG202512190012" />
                        <InfoRow label="Biller" value="IDFC FastTag" />
                        <InfoRow label="Amount" value="₹ 500.00" />

                        <View style={styles.divider} />

                        <AppText style={styles.balanceLabel}>
                            Updated FastTag Balance
                        </AppText>
                        <AppText style={styles.balanceAmount}>₹ 980.00</AppText>
                    </View>
                </View>

                
                <TouchableOpacity
                    style={styles.secondaryBtn}
                    onPress={() => { navigation.navigate(Routes.FASTTAG_STACK, { screen: Routes.FASTTAG_PAYMENT_HISTORY }) }}
                >
                    <AppText style={styles.secondaryText}>View History</AppText>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.primaryBtn}
                    onPress={() => {
                        navigation.reset({
                            index: 0,
                            routes: [{ name: Routes.DASHBOARD }],
                        })
                    }}
                >
                    <AppText style={styles.primaryText}>Back to Home</AppText>
                </TouchableOpacity>
            </View>
        </ScreenContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: vw(5),
        paddingBottom: vh(4),
    },

    center: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    title: {
        marginTop: vh(2),
        fontSize: FONT_SIZE.FONT_24,
        fontFamily: Fonts.bold,
        textAlign: 'center',
    },

    /* Card */
    card: {
        marginTop: vh(3),
        width: '100%',
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: vw(5),
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },

    row: {
        flexDirection:'row',
        justifyContent:'space-between',
        marginBottom: vh(1.8),
    },

    label: {
        fontSize: FONT_SIZE.FONT_14,
        lineHeight:20,
        color: '#6B7280',
    },

    value: {
        marginTop: vh(0.4),
        fontSize: vw(3.6),
        fontFamily: Fonts.medium,
        color: '#111111',
    },

    divider: {
        height: 1,
        backgroundColor: '#F3F4F6',
        marginVertical: vh(2),
    },

    balanceLabel: {
        fontSize: vw(3.2),
        color: '#6B7280',
    },

    balanceAmount: {
        marginTop: vh(0.6),
        fontSize: FONT_SIZE.FONT_24,
        fontFamily: Fonts.bold,
        color: '#16A34A',
    },

    /* Buttons */
    secondaryBtn: {
        height: vh(6.5),
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: vh(2),
    },

    secondaryText: {
        fontSize: FONT_SIZE.FONT_14,
        fontFamily: Fonts.regular,
        color: '#0A0A0A',
    },

    primaryBtn: {
        height: vh(6.5),
        borderRadius: 12,
        backgroundColor: '#005ABF',
        justifyContent: 'center',
        alignItems: 'center',
    },

    primaryText: {
        color: '#FFFFFF',
        fontSize: FONT_SIZE.FONT_14,
        fontFamily: Fonts.regular,
    },
});

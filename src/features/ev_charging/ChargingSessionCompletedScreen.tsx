import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import ScreenContainer from '../../ui/components/ScreenContainer';
import { vw, vh, FONT_SIZE } from '../../ui/theme/dimensions';
import { Fonts } from '../../ui/theme/fonts';
import { COLORS } from '../../app/constants/colors';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Routes } from '../../app/constants/routes';

type Props = NativeStackScreenProps<any>;
export default function ChargingSessionCompletedScreen({ navigation }: Props) {
    return (
        <ScreenContainer>
            <View style={styles.container}>

                {/* Success Icon */}
                <View style={styles.iconWrap}>
                    <Text style={styles.icon}>⚡</Text>
                </View>

                {/* Title */}
                <Text style={styles.title}>
                    Charging Session{'\n'}Completed ⚡
                </Text>

                <Text style={styles.subtitle}>
                    Your EV charging payment was successful
                </Text>

                {/* Summary Card */}
                <View style={styles.card}>

                    <Text style={styles.amountLabel}>Total Amount Paid</Text>
                    <Text style={styles.amount}>- ₹303.28</Text>

                    {/* Charging Station */}
                    <View style={styles.stationRow}>
                        <View style={styles.stationIcon}>
                            <Text style={styles.stationIconText}>⚡</Text>
                        </View>
                        <View>
                            <Text style={styles.stationLabel}>Charging Station</Text>
                            <Text style={styles.stationName}>
                                Statiq Bhopal Dhabha Station
                            </Text>
                        </View>
                    </View>

                    {/* Stats */}
                    <View style={styles.statsRow}>
                        <View style={styles.statBox}>
                            <Text style={styles.statLabel}>Energy Consumed</Text>
                            <Text style={styles.statValue}>7.5 kWh</Text>
                        </View>

                        <View style={styles.statBox}>
                            <Text style={styles.statLabel}>Duration</Text>
                            <Text style={styles.statValue}>00:07:22</Text>
                        </View>
                    </View>

                    {/* Transaction ID */}
                    <View style={styles.txnBox}>
                        <Text style={styles.txnText}>
                            Transaction ID: <Text style={styles.txnBold}>EVC202512300001</Text>
                        </Text>
                    </View>

                </View>

                {/* CTA */}
                <TouchableOpacity style={styles.primaryBtn} onPress={() => {
                    navigation.navigate(Routes.EV_CHARGING_DETAILS);
                }}>
                    <Text style={styles.primaryBtnText}>
                        View Charging Details
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.secondaryBtn} onPress={() => {
                    navigation.goBack();
                }}>
                    <Text style={styles.secondaryBtnText}>
                        Back to EV Charging
                    </Text>
                </TouchableOpacity>

            </View>
        </ScreenContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: vw(6),
        paddingTop: vh(6),
        backgroundColor: '#F0FDF4',
    },

    iconWrap: {
        width: vw(20),
        height: vw(20),
        borderRadius: vw(10),
        backgroundColor: '#22C55E',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: vh(3),
    },

    icon: {
        fontSize: 32,
        color: '#FFFFFF',
    },

    title: {
        fontSize: FONT_SIZE.FONT_20,
        fontFamily: Fonts.semiBold,
        textAlign: 'center',
        color: '#0F172A',
    },

    subtitle: {
        marginTop: vh(1),
        fontSize: FONT_SIZE.FONT_14,
        color: '#475569',
        textAlign: 'center',
        marginBottom: vh(4),
    },

    card: {
        width: '100%',
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: vw(5),
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 10,
        elevation: 4,
    },

    amountLabel: {
        fontSize: FONT_SIZE.FONT_14,
        color: '#64748B',
        textAlign: 'center',
    },

    amount: {
        marginTop: vh(1),
        fontSize: FONT_SIZE.FONT_28,
        fontFamily: Fonts.bold,
        color: '#EF4444',
        textAlign: 'center',
    },

    stationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ECFDF3',
        borderRadius: 14,
        padding: vw(4),
        marginTop: vh(3),
    },

    stationIcon: {
        width: vw(10),
        height: vw(10),
        borderRadius: vw(5),
        backgroundColor: '#22C55E',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: vw(3),
    },

    stationIconText: {
        color: '#FFFFFF',
        fontSize: 18,
    },

    stationLabel: {
        fontSize: FONT_SIZE.FONT_12,
        color: '#065F46',
    },

    stationName: {
        marginTop: 2,
        fontSize: FONT_SIZE.FONT_14,
        fontFamily: Fonts.medium,
        color: '#064E3B',
    },

    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: vh(3),
    },

    statBox: {
        width: '48%',
        backgroundColor: '#F8FAFC',
        borderRadius: 12,
        paddingVertical: vh(2),
        alignItems: 'center',
    },

    statLabel: {
        fontSize: FONT_SIZE.FONT_12,
        color: '#64748B',
    },

    statValue: {
        marginTop: vh(0.8),
        fontSize: FONT_SIZE.FONT_14,
        fontFamily: Fonts.semiBold,
        color: '#0F172A',
    },

    txnBox: {
        marginTop: vh(3),
        backgroundColor: '#EFF6FF',
        borderRadius: 10,
        padding: vw(3),
        borderWidth: 1,
        borderColor: '#BFDBFE',
    },

    txnText: {
        fontSize: FONT_SIZE.FONT_12,
        color: '#1D4ED8',
        textAlign: 'center',
    },

    txnBold: {
        fontFamily: Fonts.semiBold,
    },

    primaryBtn: {
        marginTop: vh(4),
        width: '100%',
        height: vh(6.8),
        backgroundColor: COLORS.APP_PRIMARY,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
    },

    primaryBtnText: {
        color: '#FFFFFF',
        fontSize: FONT_SIZE.FONT_16,
        fontFamily: Fonts.medium,
    },

    secondaryBtn: {
        marginTop: vh(2),
        width: '100%',
        height: vh(6.8),
        backgroundColor: '#F1F5F9',
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
    },

    secondaryBtnText: {
        fontSize: FONT_SIZE.FONT_16,
        color: '#334155',
        fontFamily: Fonts.medium,
    },
});

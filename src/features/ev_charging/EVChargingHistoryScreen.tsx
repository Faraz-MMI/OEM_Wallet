import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import AppText from '../../ui/components/AppText';
import { vw, vh } from '../../ui/theme/dimensions';
import { Fonts } from '../../ui/theme/fonts';
import { COLORS } from '../../app/constants/colors';
import { ICON_ELECTRIC } from '../../assets/icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import ScreenContainer from '../../ui/components/ScreenContainer';
import CustomTopBar from '../../ui/components/CustomTopBar';
import { Routes } from '../../app/constants/routes';

type Props = NativeStackScreenProps<any>;
export default function EVChargingHistoryScreen({ navigation }: Props) {
    return (
        <ScreenContainer>
            <CustomTopBar title='EV Charging History' onBack={() => navigation.goBack()} />
            <ScrollView
                style={styles.container}
                contentContainerStyle={{ paddingBottom: vh(6) }}
                showsVerticalScrollIndicator={false}
            >
                {/* Summary Card */}
                <View style={styles.summaryCard}>
                    <View style={styles.summaryHeader}>
                        <View style={styles.summaryIcon}>
                            <ICON_ELECTRIC width={18} height={18} color="#FFFFFF" />
                        </View>
                        <View>
                            <AppText style={styles.summaryLabel}>
                                Total EV Charging Sessions
                            </AppText>
                            <AppText style={styles.summaryCount}>1</AppText>
                        </View>
                    </View>

                    <View style={styles.summaryStats}>
                        <View style={styles.statBox}>
                            <AppText style={styles.statLabel}>Total Energy</AppText>
                            <AppText style={styles.statValue}>7.5</AppText>
                            <AppText style={styles.statUnit}>kWh</AppText>
                        </View>

                        <View style={styles.statBox}>
                            <AppText style={styles.statLabel}>Total Spent</AppText>
                            <AppText style={styles.statValue}>₹385.00</AppText>
                        </View>
                    </View>
                </View>

                {/* Recent Sessions */}
                <View style={styles.sectionHeader}>
                    <AppText style={styles.sectionTitle}>Recent Sessions</AppText>
                    <AppText style={styles.sectionCount}>1 transactions</AppText>
                </View>

                {/* Session Item */}
                <TouchableOpacity style={styles.sessionCard} onPress={() => {
                    navigation.navigate(Routes.EV_CHARGING_DETAILS);
                }}>
                    <View style={styles.sessionLeft}>
                        <View style={styles.sessionIcon}>
                            <ICON_ELECTRIC width={16} height={16} color="#16A34A" />
                        </View>

                        <View>
                            <AppText style={styles.sessionTitle}>
                                EV Charging Payment
                            </AppText>
                            <AppText style={styles.sessionSub}>
                                Tata Power EZ Charge
                            </AppText>
                            <AppText style={styles.sessionTime}>
                                16 Dec, 12:00 PM
                            </AppText>
                        </View>
                    </View>

                    <View style={styles.sessionRight}>
                        <AppText style={styles.sessionAmount}>- ₹385</AppText>
                        <AppText style={styles.sessionMode}>via RFID Card</AppText>
                    </View>
                </TouchableOpacity>
            </ScrollView>
        </ScreenContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9FAFB',
        paddingHorizontal: vw(5),
    },

    /* Summary */
    summaryCard: {
        marginTop: vh(2),
        backgroundColor: '#16A34A',
        borderRadius: 20,
        padding: vw(5),
    },

    summaryHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    summaryIcon: {
        width: vw(10),
        height: vw(10),
        borderRadius: vw(5),
        backgroundColor: 'rgba(255,255,255,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: vw(3),
    },

    summaryLabel: {
        color: '#D1FAE5',
        fontSize: vw(3.2),
        fontFamily: Fonts.regular,
    },

    summaryCount: {
        marginTop: vh(0.5),
        fontSize: vw(6),
        fontFamily: Fonts.bold,
        color: '#FFFFFF',
    },

    summaryStats: {
        flexDirection: 'row',
        marginTop: vh(3),
        gap: vw(3),
    },

    statBox: {
        flex: 1,
        backgroundColor: 'rgba(255,255,255,0.15)',
        borderRadius: 14,
        padding: vw(4),
    },

    statLabel: {
        fontSize: vw(3),
        color: '#ECFDF5',
    },

    statValue: {
        marginTop: vh(0.6),
        fontSize: vw(4.6),
        fontFamily: Fonts.bold,
        color: '#FFFFFF',
    },

    statUnit: {
        fontSize: vw(3),
        color: '#ECFDF5',
    },

    /* Section */
    sectionHeader: {
        marginTop: vh(4),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    sectionTitle: {
        fontSize: vw(4.2),
        fontFamily: Fonts.semiBold,
        color: '#111827',
    },

    sectionCount: {
        fontSize: vw(3.2),
        color: '#6B7280',
    },

    /* Session Item */
    sessionCard: {
        marginTop: vh(2),
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: vw(4),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    sessionLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },

    sessionIcon: {
        width: vw(9),
        height: vw(9),
        borderRadius: vw(4.5),
        backgroundColor: '#DCFCE7',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: vw(3),
    },

    sessionTitle: {
        fontSize: vw(3.6),
        fontFamily: Fonts.semiBold,
        color: '#111827',
    },

    sessionSub: {
        marginTop: vh(0.3),
        fontSize: vw(3.2),
        color: '#6B7280',
    },

    sessionTime: {
        marginTop: vh(0.3),
        fontSize: vw(3),
        color: '#9CA3AF',
    },

    sessionRight: {
        alignItems: 'flex-end',
    },

    sessionAmount: {
        fontSize: vw(3.6),
        fontFamily: Fonts.semiBold,
        color: '#DC2626',
    },

    sessionMode: {
        marginTop: vh(0.3),
        fontSize: vw(3),
        color: '#6B7280',
    },
});

import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import ScreenContainer from '../../ui/components/ScreenContainer';
import { vw, vh, FONT_SIZE } from '../../ui/theme/dimensions';
import { Fonts } from '../../ui/theme/fonts';
import { COLORS } from '../../app/constants/colors';
import LinearGradient from 'react-native-linear-gradient';
import CustomTopBar from '../../ui/components/CustomTopBar';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { VehicleStackParamList } from '../../app/navigation/types';
import { Routes } from '../../app/constants/routes';
import RequestRfidConfirmModal from './RequestRfidConfirmModal';
import RequestRfidSuccessModal from './RequestRfidSuccessModal';

export default function MyEvRfidCardScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<VehicleStackParamList>>();
    const [showConfirm, setShowConfirm] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);


    return (
        <ScreenContainer>
            <CustomTopBar title='My EV RFID Card' onBack={() => { }} />
            <ScrollView>
                <View style={styles.container}>

                    {/* Success Banner */}
                    <View style={styles.successBox}>
                        <Text style={styles.successIcon}>✅</Text>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.successTitle}>Registration Successful!</Text>
                            <Text style={styles.successSub}>
                                Your RFID card is now linked to Statiq EV charging network
                            </Text>
                        </View>
                    </View>

                    {/* Section Title */}
                    <Text style={styles.sectionTitle}>Active RFID Card</Text>

                    {/* RFID Card */}
                    <LinearGradient
                        colors={['#1C1C1C', '#000000']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.rfidCard}
                    >
                        <View style={styles.cardTopRow}>
                            <Text style={styles.cardIcon}>💳</Text>
                            <Text style={styles.evIcon}>⚡</Text>
                        </View>

                        <Text style={styles.cardLabel}>RFID Wallet Card</Text>
                        <Text style={styles.cardNumber}>**** 5621</Text>

                        <View style={styles.cardFooter}>
                            <View style={styles.statusRow}>
                                <View style={styles.greenDot} />
                                <Text style={styles.statusText}>Linked to EV Charging</Text>
                            </View>

                            <View style={styles.brandBadge}>
                                <Text style={styles.brandText}>STATIQ</Text>
                            </View>
                        </View>
                    </LinearGradient>

                    {/* Info Box */}
                    <View style={styles.infoBox}>
                        <Text style={styles.infoText}>
                            💡 Tap this card on any Statiq charging station to start charging your EV
                        </Text>
                    </View>

                    {/* Charging Stats */}
                    <View style={styles.statsCard}>
                        <Text style={styles.statsTitle}>Charging Stats</Text>

                        <View style={styles.statsRow}>
                            <StatItem label="Total Sessions" value="1" color="#2563EB" />
                            <Divider />
                            <StatItem label="kWh Used" value="7.5" color="#16A34A" />
                            <Divider />
                            <StatItem label="Total Spent" value="₹385.00" color="#9333EA" />
                        </View>
                    </View>

                    {/* Quick Actions */}
                    <View style={styles.actionsCard}>
                        <Text style={styles.statsTitle}>Quick Actions</Text>

                        <TouchableOpacity style={styles.primaryAction}
                            onPress={() => {
                                navigation.navigate(Routes.EV_CHARGING_VIEW);
                            }}>
                            <Text style={styles.primaryActionText}>⚡ Start Charging</Text>
                            <Text style={styles.arrow}>›</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.secondaryAction} onPress={()=>{
                            navigation.navigate(Routes.EV_CHARGING_HISTORY)
                        }}>
                            <Text style={styles.secondaryText}>⏱ View Charging History</Text>
                            <Text style={styles.arrow}>›</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Lost Card */}
                    <View style={styles.dangerCard}>
                        <Text style={styles.dangerTitle}>❗ Lost / Damaged RFID Card?</Text>
                        <Text style={styles.dangerSub}>
                            Request a replacement card. Your old card will be deactivated immediately.
                        </Text>

                        <TouchableOpacity style={styles.outlineBtn} onPress={()=>{setShowConfirm(true)}}>
                            <Text style={styles.outlineText}>Request New RFID Card</Text>
                        </TouchableOpacity>

                        <Text style={styles.dangerNote}>
                            Delivery in 7–10 business days • ₹100 replacement fee
                        </Text>
                    </View>

                    {/* Footer */}
                    <Text style={styles.footer}>
                        Need help? Contact Statiq support at{' '}
                        <Text style={styles.link}>support@statiq.in</Text>
                    </Text>

                </View>
            </ScrollView>

            const [showConfirm, setShowConfirm] = useState(false);

            <RequestRfidConfirmModal
                visible={showConfirm}
                onCancel={() => setShowConfirm(false)}
                onConfirm={() => {
                    setShowConfirm(false);
                    setTimeout(() => {
                        setShowSuccess(true);
                    }, 200);

                    // call request RFID API here
                }}
            />


            <RequestRfidSuccessModal
                visible={showSuccess}
                onClose={() => setShowSuccess(false)}
            />


        </ScreenContainer>
    );
}

function StatItem({ label, value, color }: any) {
    return (
        <View style={styles.statItem}>
            <Text style={[styles.statValue, { color }]}>{value}</Text>
            <Text style={styles.statLabel}>{label}</Text>
        </View>
    );
}

function Divider() {
    return <View style={styles.verticalDivider} />;
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: vw(5),
        paddingTop: vh(2),
        paddingBottom: vh(4),
        backgroundColor: '#FFFFFF',
    },

    successBox: {
        flexDirection: 'row',
        backgroundColor: '#ECFDF3',
        borderColor: '#86EFAC',
        borderWidth: 1,
        borderRadius: 12,
        padding: vw(4),
        marginBottom: vh(3),
    },

    successIcon: { fontSize: 20, marginRight: vw(3) },
    successTitle: {
        fontFamily: Fonts.semiBold,
        color: '#166534',
        fontSize: FONT_SIZE.FONT_14,
    },
    successSub: {
        marginTop: 4,
        fontSize: FONT_SIZE.FONT_14,
        color: '#166534',
    },

    sectionTitle: {
        fontSize: FONT_SIZE.FONT_16,
        fontFamily: Fonts.semiBold,
        marginBottom: vh(2),
        color: '#0F172A',
    },

    rfidCard: {
        borderRadius: 20,
        padding: vw(5),
        marginBottom: vh(2),
    },

    cardTopRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    cardIcon: { fontSize: 22, color: '#FFFFFF' },
    evIcon: { fontSize: 22, color: '#22C55E' },

    cardLabel: {
        marginTop: vh(3),
        color: '#9CA3AF',
        fontSize: FONT_SIZE.FONT_14,
    },

    cardNumber: {
        marginTop: 4,
        fontSize: FONT_SIZE.FONT_24,
        fontFamily: Fonts.bold,
        color: '#FFFFFF',
        letterSpacing: 2,
    },

    cardFooter: {
        marginTop: vh(3),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    statusRow: { flexDirection: 'row', alignItems: 'center' },
    greenDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#22C55E',
        marginRight: 6,
    },
    statusText: { color: '#D1FAE5', fontSize: FONT_SIZE.FONT_12 },

    brandBadge: {
        backgroundColor: '#262626',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 10,
    },
    brandText: { color: '#FFFFFF', fontSize: 12 },

    infoBox: {
        backgroundColor: '#EFF6FF',
        borderRadius: 12,
        padding: vw(4),
        marginBottom: vh(3),
    },

    infoText: {
        color: '#1D4ED8',
        fontSize: FONT_SIZE.FONT_14,
    },

    statsCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: vw(4),
        marginBottom: vh(3),
        elevation: 2,
    },

    statsTitle: {
        fontFamily: Fonts.semiBold,
        fontSize: FONT_SIZE.FONT_16,
        marginBottom: vh(2),
    },

    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    statItem: { alignItems: 'center', flex: 1 },
    statValue: {
        fontSize: FONT_SIZE.FONT_18,
        fontFamily: Fonts.bold,
    },
    statLabel: {
        marginTop: 4,
        fontSize: FONT_SIZE.FONT_12,
        color: '#64748B',
    },

    verticalDivider: {
        width: 1,
        backgroundColor: '#E5E7EB',
    },

    actionsCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: vw(4),
        marginBottom: vh(3),
    },

    primaryAction: {
        backgroundColor: COLORS.APP_PRIMARY,
        borderRadius: 12,
        padding: vw(4),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: vh(1.5),
    },

    primaryActionText: {
        color: '#FFFFFF',
        fontFamily: Fonts.medium,
        fontSize: FONT_SIZE.FONT_16,
    },

    secondaryAction: {
        backgroundColor: '#F8FAFC',
        borderRadius: 12,
        padding: vw(4),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    secondaryText: {
        fontSize: FONT_SIZE.FONT_14,
        color: '#0F172A',
    },

    arrow: { fontSize: 20, color: '#64748B' },

    dangerCard: {
        backgroundColor: '#FEF2F2',
        borderRadius: 16,
        padding: vw(4),
        borderWidth: 1,
        borderColor: '#FECACA',
        marginBottom: vh(3),
    },

    dangerTitle: {
        fontFamily: Fonts.semiBold,
        color: '#991B1B',
        fontSize: FONT_SIZE.FONT_14,
    },

    dangerSub: {
        marginTop: 4,
        color: '#7F1D1D',
        fontSize: FONT_SIZE.FONT_14,
    },

    outlineBtn: {
        marginTop: vh(2),
        borderWidth: 1,
        borderColor: '#F87171',
        borderRadius: 10,
        paddingVertical: 10,
        alignItems: 'center',
    },

    outlineText: {
        color: '#DC2626',
        fontFamily: Fonts.medium,
    },

    dangerNote: {
        marginTop: vh(1),
        fontSize: FONT_SIZE.FONT_12,
        color: '#7F1D1D',
        textAlign: 'center',
    },

    footer: {
        textAlign: 'center',
        fontSize: FONT_SIZE.FONT_12,
        color: '#64748B',
    },

    link: {
        color: COLORS.APP_PRIMARY,
        fontFamily: Fonts.medium,
    },
});

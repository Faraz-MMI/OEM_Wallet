import React from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import AppText from '../../ui/components/AppText';
import { vw, vh } from '../../ui/theme/dimensions';
import { Fonts } from '../../ui/theme/fonts';
import { COLORS } from '../../app/constants/colors';
import { ICON_ELECTRIC, ICON_DOWNLOAD, ICON_SHARE } from '../../assets/icons';
import ScreenContainer from '../../ui/components/ScreenContainer';
import CustomTopBar from '../../ui/components/CustomTopBar';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<any>;
export default function ChargingDetailsScreen({ navigation }: Props) {
    return (
        <ScreenContainer>
            <CustomTopBar title='Charging Details' onBack={()=>navigation.goBack()}/>
            <ScrollView
                style={styles.container}
                contentContainerStyle={{ paddingBottom: vh(6) }}
                showsVerticalScrollIndicator={false}
            >
                {/* Status */}
                <View style={styles.statusWrap}>
                    <View style={styles.statusBadge}>
                        <View style={styles.statusDot} />
                        <AppText style={styles.statusText}>Completed</AppText>
                    </View>
                </View>

                {/* Session Summary */}
                <Card>
                    <View style={styles.headerRow}>
                        <View style={styles.iconCircle}>
                            <ICON_ELECTRIC width={18} height={18} color="#16A34A" />
                        </View>
                        <AppText style={styles.cardTitle}>
                            Charging{'\n'}Session Summary
                        </AppText>
                    </View>

                    <Row label="Total Duration" value="0:07:22" />
                    <Row label="Start Date" value="2025-12-30" />
                    <Row label="Start Time" value="11:21:33" />
                    <Row label="Stop Time" value="11:28:55" />
                    <Row label="Start SOC" value="49%" valueColor="#16A34A" />
                    <Row label="Stop SOC" value="63%" valueColor="#16A34A" />
                    <Row label="Energy Consumed" value="7.5 kWh" valueColor="#2563EB" />
                    <Row label="Cost per Unit" value="₹7.5 / kWh" />
                </Card>

                {/* Pricing Breakdown */}
                <Card>
                    <AppText style={styles.sectionTitle}>Pricing Breakdown</AppText>

                    <Row label="Charging Cost" value="₹251.18" />
                    <Row label="SGST" value="₹0.00" />
                    <Row label="IGST" value="₹46.26" />

                    <View style={styles.totalRow}>
                        <AppText style={styles.totalLabel}>Total Cost</AppText>
                        <AppText style={styles.totalValue}>₹303.28</AppText>
                    </View>

                    <View style={styles.actionRow}>
                        <TouchableOpacity style={styles.secondaryBtn}>
                            <ICON_DOWNLOAD width={18} height={18} color="#111827" />
                            <AppText style={styles.secondaryText}>Download</AppText>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.primaryBtn}>
                            <ICON_SHARE width={18} height={18} color="#FFFFFF" />
                            <AppText style={styles.primaryText}>Share</AppText>
                        </TouchableOpacity>
                    </View>
                </Card>

                {/* Charger Details */}
                <Card>
                    <AppText style={styles.sectionTitle}>Charger Details</AppText>

                    <Row label="Station Name" value="Statiq Bhopal Dhabha Station" />
                    <Row label="Access Type" value="Public" />
                    <Row label="Connector Type" value="CCS-2" />
                    <Row label="Connector ID" value="1" />
                </Card>

                {/* Footer */}
                <View style={styles.footer}>
                    <AppText style={styles.authRef}>
                        Auth Reference: <AppText style={styles.authStrong}>STQ202512301122</AppText>
                    </AppText>

                    <View style={styles.paymentInfo}>
                        <AppText style={styles.paymentText}>
                            💳 Paid via RFID Wallet Card (**** 5621)
                        </AppText>
                    </View>
                </View>
            </ScrollView>
        </ScreenContainer>
    );
}

function Card({ children }: { children: React.ReactNode }) {
    return <View style={styles.card}>{children}</View>;
}

function Row({
    label,
    value,
    valueColor,
}: {
    label: string;
    value: string;
    valueColor?: string;
}) {
    return (
        <View style={styles.row}>
            <AppText style={styles.rowLabel}>{label}</AppText>
            <AppText style={[styles.rowValue, valueColor && { color: valueColor }]}>
                {value}
            </AppText>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9FAFB',
        paddingHorizontal: vw(5),
    },

    statusWrap: {
        alignItems: 'center',
        marginVertical: vh(2),
    },

    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ECFDF3',
        borderRadius: 999,
        paddingHorizontal: vw(4),
        paddingVertical: vh(1),
    },

    statusDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#16A34A',
        marginRight: vw(2),
    },

    statusText: {
        color: '#16A34A',
        fontFamily: Fonts.semiBold,
        fontSize: vw(3.2),
    },

    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: vw(5),
        marginBottom: vh(2.5),
    },

    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: vh(2),
    },

    iconCircle: {
        width: vw(10),
        height: vw(10),
        borderRadius: vw(5),
        backgroundColor: '#DCFCE7',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: vw(3),
    },

    cardTitle: {
        fontSize: vw(4),
        fontFamily: Fonts.semiBold,
        color: '#111827',
    },

    sectionTitle: {
        fontSize: vw(4),
        fontFamily: Fonts.semiBold,
        marginBottom: vh(1.5),
    },

    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: vh(1.2),
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },

    rowLabel: {
        fontSize: vw(3.3),
        color: '#6B7280',
    },

    rowValue: {
        fontSize: vw(3.4),
        fontFamily: Fonts.semiBold,
        color: '#111827',
    },

    totalRow: {
        marginTop: vh(1.5),
        padding: vw(4),
        backgroundColor: '#F1F5F9',
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    totalLabel: {
        fontSize: vw(3.6),
        fontFamily: Fonts.semiBold,
    },

    totalValue: {
        fontSize: vw(4),
        fontFamily: Fonts.bold,
        color: '#2563EB',
    },

    actionRow: {
        flexDirection: 'row',
        marginTop: vh(2),
        gap: vw(3),
    },

    secondaryBtn: {
        flex: 1,
        height: vh(6),
        borderRadius: 12,
        backgroundColor: '#F3F4F6',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: vw(2),
    },

    secondaryText: {
        fontFamily: Fonts.semiBold,
    },

    primaryBtn: {
        flex: 1,
        height: vh(6),
        borderRadius: 12,
        backgroundColor: COLORS.APP_PRIMARY,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: vw(2),
    },

    primaryText: {
        color: '#FFFFFF',
        fontFamily: Fonts.semiBold,
    },

    footer: {
        alignItems: 'center',
        marginTop: vh(2),
    },

    authRef: {
        fontSize: vw(3.1),
        color: '#6B7280',
    },

    authStrong: {
        fontFamily: Fonts.semiBold,
        color: '#111827',
    },

    paymentInfo: {
        marginTop: vh(1.5),
        padding: vw(3),
        backgroundColor: '#EFF6FF',
        borderRadius: 10,
    },

    paymentText: {
        fontSize: vw(3.2),
        color: '#1D4ED8',
    },
});

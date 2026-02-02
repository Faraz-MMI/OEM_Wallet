import React from 'react';
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
import CustomTopBar from '../../ui/components/CustomTopBar';
import { Routes } from '../../app/constants/routes';
import { BBPS_LOG } from '../../assets/icons';

export default function FastTagFoundScreen({ navigation }: any) {
    return (
        <ScreenContainer>
            <CustomTopBar title="FastTag Found" onBack={() => navigation.goBack()} icon={<BBPS_LOG width={vw(20)} height={vw(20)} />} canShowIcon />
            <ScrollView>
                <View style={styles.container}>

                    {/* SUCCESS BANNER */}
                    <View style={styles.successBanner}>
                        <Text style={styles.successIcon}>✔</Text>
                        <View>
                            <Text style={styles.successTitle}>
                                FastTag Details Retrieved
                            </Text>
                            <Text style={styles.successSub}>
                                From IDFC First Bank
                            </Text>
                        </View>
                    </View>

                    {/* FASTTAG CARD */}
                    <View style={styles.fastTagCard}>
                        <Text style={styles.cardLabel}>FastTag</Text>
                        <Text style={styles.bankName}>IDFC First Bank</Text>

                        <View style={styles.vehicleBox}>
                            <Text style={styles.vehicleLabel}>Vehicle Number</Text>
                            <Text style={styles.vehicleValue}>DL 20 FRZ 0899</Text>
                        </View>
                    </View>

                    {/* FASTTAG INFORMATION */}
                    <View style={styles.infoCard}>
                        <Text style={styles.infoTitle}>FastTag Information</Text>

                        <InfoRow label="Tag ID" value="XXXX7821" />
                        <InfoRow label="Vehicle Number" value="DL 20 FRZ 0899" />
                        <InfoRow
                            label="Status"
                            value="ACTIVE"
                            valueStyle={styles.activeBadge}
                        />
                        <InfoRow label="Issuer" value="IDFC First Bank" />
                    </View>

                    {/* WHAT YOU CAN DO */}
                    <View style={styles.todoBox}>
                        <Text style={styles.todoTitle}>
                            ✅ What you can do after linking
                        </Text>
                        <Text style={styles.todoText}>
                            • Recharge and view FastTag balance
                        </Text>
                        <Text style={styles.todoText}>
                            • Track toll transactions
                        </Text>
                        <Text style={styles.todoText}>
                            • Manage FastTag anytime from your account
                        </Text>
                    </View>

                    {/* CTA */}
                    <TouchableOpacity style={styles.primaryButton} onPress={() => {
                        navigation.navigate(Routes.FASTTAG_LINK_SUCCESS);
                    }}>
                        <Text style={styles.primaryButtonText}>
                            Add FastTag to Account
                        </Text>
                    </TouchableOpacity>

                    {/* IMPORTANT INFO */}
                    <View style={styles.warningBox}>
                        <Text style={styles.warningTitle}>
                            ⚠ Important Information
                        </Text>
                        <Text style={styles.warningText}>
                            • Balance and transactions are managed by IDFC First Bank
                        </Text>
                        <Text style={styles.warningText}>
                            • This is a link-only feature (not a wallet transfer)
                        </Text>
                        <Text style={styles.warningText}>
                            • Recharges will be sent to your issuing bank
                        </Text>
                    </View>

                    {/* FOOTER */}
                    <View style={styles.footer}>
                        <Text style={styles.footerText}>
                            Don&apos;t have a FastTag yet?
                        </Text>
                        <TouchableOpacity>
                            <Text style={styles.footerLink}>
                                Buy New FastTag →
                            </Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </ScrollView>
        </ScreenContainer>
    );
}

/* ----------------- SMALL COMPONENT ----------------- */

const InfoRow = ({
    label,
    value,
    valueStyle,
}: {
    label: string;
    value: string;
    valueStyle?: any;
}) => (
    <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={[styles.infoValue, valueStyle]}>
            {value}
        </Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: vw(5),
    },

    /* SUCCESS */
    successBanner: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ECFDF3',
        borderRadius: 12,
        padding: vw(4),
        borderWidth: 1,
        borderColor: '#BBF7D0',
        marginBottom: vh(3),
    },

    successIcon: {
        fontSize: 22,
        color: '#16A34A',
        marginRight: vw(3),
    },

    successTitle: {
        fontSize: FONT_SIZE.FONT_14,
        fontFamily: Fonts.semiBold,
        color: '#065F46',
    },

    successSub: {
        fontSize: FONT_SIZE.FONT_12,
        color: '#047857',
    },

    /* FASTTAG CARD */
    fastTagCard: {
        backgroundColor: '#1D4ED8',
        borderRadius: 18,
        padding: vw(5),
        marginBottom: vh(3),
    },

    cardLabel: {
        color: '#DBEAFE',
        fontSize: FONT_SIZE.FONT_12,
    },

    bankName: {
        color: '#FFFFFF',
        fontSize: FONT_SIZE.FONT_18,
        fontFamily: Fonts.semiBold,
        marginTop: vh(0.5),
    },

    vehicleBox: {
        marginTop: vh(2),
        backgroundColor: 'rgba(255,255,255,0.15)',
        borderRadius: 12,
        padding: vw(4),
    },

    vehicleLabel: {
        color: '#DBEAFE',
        fontSize: FONT_SIZE.FONT_12,
    },

    vehicleValue: {
        color: '#FFFFFF',
        fontSize: FONT_SIZE.FONT_18,
        fontFamily: Fonts.semiBold,
        marginTop: 4,
    },

    /* INFO */
    infoCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: vw(4),
        marginBottom: vh(3),
    },

    infoTitle: {
        fontSize: FONT_SIZE.FONT_16,
        fontFamily: Fonts.semiBold,
        marginBottom: vh(2),
    },

    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: vh(1),
    },

    infoLabel: {
        color: '#6B7280',
        fontSize: FONT_SIZE.FONT_14,
    },

    infoValue: {
        color: '#111827',
        fontSize: FONT_SIZE.FONT_14,
        fontFamily: Fonts.semiBold,
    },

    activeBadge: {
        color: '#16A34A',
        backgroundColor: '#DCFCE7',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 20,
        fontSize: FONT_SIZE.FONT_12,
    },

    /* TODO */
    todoBox: {
        backgroundColor: '#EFF6FF',
        borderRadius: 12,
        padding: vw(4),
        marginBottom: vh(3),
    },

    todoTitle: {
        fontSize: FONT_SIZE.FONT_14,
        fontFamily: Fonts.semiBold,
        color: '#1D4ED8',
        marginBottom: vh(1),
    },

    todoText: {
        fontSize: FONT_SIZE.FONT_14,
        color: '#1E3A8A',
        lineHeight: 18,
    },

    /* CTA */
    primaryButton: {
        height: vh(6.8),
        borderRadius: 14,
        backgroundColor: COLORS.APP_PRIMARY,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: vh(3),
    },

    primaryButtonText: {
        color: '#FFFFFF',
        fontSize: FONT_SIZE.FONT_16,
        fontFamily: Fonts.semiBold,
    },

    /* WARNING */
    warningBox: {
        backgroundColor: '#FFF7ED',
        borderRadius: 12,
        padding: vw(4),
        borderWidth: 1,
        borderColor: '#FED7AA',
        marginBottom: vh(3),
    },

    warningTitle: {
        fontSize: FONT_SIZE.FONT_14,
        fontFamily: Fonts.semiBold,
        color: '#C2410C',
        marginBottom: vh(1),
    },

    warningText: {
        fontSize: FONT_SIZE.FONT_14,
        color: '#9A3412',
        lineHeight: 18,
    },

    /* FOOTER */
    footer: {
        alignItems: 'center',
        marginTop: vh(2),
    },

    footerText: {
        fontSize: FONT_SIZE.FONT_14,
        color: '#6B7280',
    },

    footerLink: {
        marginTop: 6,
        fontSize: FONT_SIZE.FONT_14,
        color: COLORS.APP_PRIMARY,
        fontFamily: Fonts.semiBold,
    },
});

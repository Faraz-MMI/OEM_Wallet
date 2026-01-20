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
import { MainStack } from '../../app/navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import CustomTopBar from '../../ui/components/CustomTopBar';
import { Routes } from '../../app/constants/routes';

export default function EVChargingSetupScreen() {
    const [accepted, setAccepted] = useState(false);
    const navigation = useNavigation<NativeStackNavigationProp<MainStack>>();

    return (
        <ScreenContainer>
            <CustomTopBar title='EV Charging Setup' onBack={() => navigation.goBack()} />
            <ScrollView>
                <View style={styles.container}>

                    {/* Header Icon */}
                    <View style={styles.iconWrapper}>
                        <Text style={styles.icon}>⚡</Text>
                    </View>

                    {/* Title */}
                    <Text style={styles.title}>Welcome to Statiq</Text>
                    <Text style={styles.subtitle}>
                        EV charging made simple using your RFID wallet
                    </Text>

                    {/* Registration Details */}
                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>Registration Details</Text>

                        <InfoRow label="Name" value="Faraz" />
                        <InfoRow label="Mobile" value="+91 98xxxxxx45" />
                        <InfoRow label="Email" value="faraz@email.com" />
                    </View>

                    {/* Benefits */}
                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>What you get</Text>

                        <Benefit text="RFID Card Integration"
                            sub="Use your existing RFID wallet card for charging" />

                        <Benefit text="Tap & Charge"
                            sub="Simply tap your card to start charging" />

                        <Benefit text="Auto Payment"
                            sub="Charges deducted from your wallet automatically" />

                        <Benefit text="Pan-India Network"
                            sub="Access 5000+ charging stations across India" />
                    </View>

                    {/* Consent */}
                    <TouchableOpacity
                        style={styles.checkboxRow}
                        activeOpacity={0.8}
                        onPress={() => setAccepted(!accepted)}
                    >
                        <View style={[styles.checkbox, accepted && styles.checkboxChecked]}>
                            {accepted && <Text style={styles.check}>✓</Text>}
                        </View>

                        <Text style={styles.consentText}>
                            I accept the <Text style={styles.link}>Privacy Policy</Text> and{' '}
                            <Text style={styles.link}>Terms of Service</Text> for Statiq EV
                            charging services
                        </Text>
                    </TouchableOpacity>

                    {/* CTA */}
                    <TouchableOpacity
                        disabled={!accepted}
                        style={[
                            styles.cta,
                            !accepted && styles.ctaDisabled,
                        ]}
                        onPress={() => {
                            navigation.navigate(Routes.VEHICLE_STACK, { screen: Routes.MY_EV_RFID_CARD });
                        }}
                    >
                        <Text
                            style={[
                                styles.ctaText,
                                !accepted && styles.ctaTextDisabled,
                            ]}
                        >
                            Register for EV Charging
                        </Text>
                    </TouchableOpacity>

                    {/* Footer */}
                    <Text style={styles.footer}>
                        Your RFID wallet card will be linked to Statiq network
                    </Text>

                </View>
            </ScrollView>
        </ScreenContainer>
    );
}

function InfoRow({ label, value }: { label: string; value: string }) {
    return (
        <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>{label}</Text>
            <Text style={styles.infoValue}>{value}</Text>
        </View>
    );
}

function Benefit({ text, sub }: { text: string; sub: string }) {
    return (
        <View style={styles.benefitRow}>
            <Text style={styles.checkIcon}>✓</Text>
            <View>
                <Text style={styles.benefitTitle}>{text}</Text>
                <Text style={styles.benefitSub}>{sub}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: vw(5),
        paddingTop: vh(3),
    },

    iconWrapper: {
        width: 64,
        height: 64,
        borderRadius: 16,
        backgroundColor: '#16A34A',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },

    icon: {
        fontSize: 32,
        color: '#FFFFFF',
    },

    title: {
        marginTop: vh(3),
        fontSize: FONT_SIZE.FONT_24,
        fontFamily: Fonts.bold,
        color: '#101828',
        textAlign: 'center',
    },

    subtitle: {
        marginTop: vh(1),
        fontSize: FONT_SIZE.FONT_14,
        color: '#64748B',
        textAlign: 'center',
    },

    card: {
        marginTop: vh(3),
        backgroundColor: '#F5F7FA',
        borderRadius: 16,
        padding: vw(4),
    },

    cardTitle: {
        fontSize: FONT_SIZE.FONT_14,
        fontFamily: Fonts.semiBold,
        color: '#334155',
        marginBottom: vh(2),
    },

    infoRow: {
        marginBottom: vh(1.5),
    },

    infoLabel: {
        fontSize: FONT_SIZE.FONT_12,
        color: '#64748B',
    },

    infoValue: {
        marginTop: 4,
        fontSize: FONT_SIZE.FONT_14,
        fontFamily: Fonts.semiBold,
        color: '#0F172A',
    },

    benefitRow: {
        flexDirection: 'row',
        marginBottom: vh(2),
    },

    checkIcon: {
        fontSize: 18,
        color: '#16A34A',
        marginRight: vw(3),
        marginTop: 2,
    },

    benefitTitle: {
        fontSize: FONT_SIZE.FONT_14,
        fontFamily: Fonts.semiBold,
        color: '#0F172A',
    },

    benefitSub: {
        marginTop: 2,
        fontSize: FONT_SIZE.FONT_12,
        color: '#64748B',
    },

    checkboxRow: {
        flexDirection: 'row',
        marginTop: vh(3),
        alignItems: 'flex-start',
    },

    checkbox: {
        width: 20,
        height: 20,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#CBD5E1',
        marginRight: vw(3),
        alignItems: 'center',
        justifyContent: 'center',
    },

    checkboxChecked: {
        backgroundColor: COLORS.APP_PRIMARY,
        borderColor: COLORS.APP_PRIMARY,
    },

    check: {
        color: '#FFFFFF',
        fontSize: 12,
    },

    consentText: {
        flex: 1,
        fontSize: FONT_SIZE.FONT_12,
        color: '#475569',
    },

    link: {
        color: COLORS.APP_PRIMARY,
        fontFamily: Fonts.semiBold,
    },

    cta: {
        marginTop: vh(4),
        height: 56,
        borderRadius: 14,
        backgroundColor: COLORS.APP_PRIMARY,
        justifyContent: 'center',
        alignItems: 'center',
    },

    ctaDisabled: {
        backgroundColor: '#E5E7EB',
    },

    ctaText: {
        color: '#FFFFFF',
        fontSize: FONT_SIZE.FONT_16,
        fontFamily: Fonts.semiBold,
    },

    ctaTextDisabled: {
        color: '#9CA3AF',
    },

    footer: {
        marginTop: vh(2),
        fontSize: FONT_SIZE.FONT_12,
        color: '#64748B',
        textAlign: 'center',
    },
});

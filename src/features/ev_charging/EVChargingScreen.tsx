import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    ScrollView,
} from 'react-native';
import ScreenContainer from '../../ui/components/ScreenContainer';
import { vw, vh, FONT_SIZE } from '../../ui/theme/dimensions';
import { Fonts } from '../../ui/theme/fonts';
import { COLORS } from '../../app/constants/colors';
import CustomTopBar from '../../ui/components/CustomTopBar';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { VehicleStackParamList } from '../../app/navigation/types';
import WalletPinModal from '../../ui/components/WalletPinModal';
import { Routes } from '../../app/constants/routes';

const sessions = [
    { id: '1', date: '12 Dec', duration: '45 min', amount: '₹ 220' },
    { id: '2', date: '05 Dec', duration: '38 min', amount: '₹ 190' },
    { id: '3', date: '28 Nov', duration: '52 min', amount: '₹ 260' },
];

export default function EVChargingScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<VehicleStackParamList>>()
    const [showPin, setShowPin] = useState(false);
    const [loading, setLoading] = useState(false);
    return (
        <ScreenContainer>
            <CustomTopBar title='EV Charging (RFID)' onBack={() => navigation.goBack()} />
            <ScrollView>
                <View style={styles.container}>

                    {/* Header Card */}
                    <View style={styles.headerCard}>
                        <View style={styles.headerIcon}>
                            <Text style={styles.headerIconText}>⚡</Text>
                        </View>
                        <View>
                            <Text style={styles.headerTitle}>RFID Tap & Charge</Text>
                            <Text style={styles.headerSub}>Quick and Easy</Text>
                        </View>
                    </View>

                    {/* How it works */}
                    <Text style={styles.sectionTitle}>How it works:</Text>

                    <Step number="1" text="Arrive at station • Plug in" />
                    <Step number="2" text="Tap RFID on CMS" />
                    <Step number="3" text="Charging starts • Hold funds blocked" />
                    <Step number="4" text="On completion, blocked amount captured" />

                    {/* Start Charging Button */}
                    <TouchableOpacity style={styles.primaryButton} onPress={() => { setShowPin(true) }}>
                        <Text style={styles.primaryButtonText}>⚡ Start Charging</Text>
                    </TouchableOpacity>

                    {/* Info Box */}
                    <View style={styles.infoBox}>
                        <Text style={styles.infoText}>
                            💡 Cloud checks wallet balance and auto top-up if below threshold
                        </Text>
                    </View>

                    {/* Charging Sessions */}
                    <Text style={styles.sectionTitle}>Charging Sessions</Text>

                    <View style={styles.sessionCard}>
                        {sessions.map(item => (
                            <View key={item.id} style={styles.sessionRow}>
                                <View>
                                    <Text style={styles.sessionDate}>{item.date}</Text>
                                    <Text style={styles.sessionDuration}>{item.duration}</Text>
                                </View>
                                <Text style={styles.sessionAmount}>{item.amount}</Text>
                            </View>
                        ))}
                    </View>

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
                            navigation.navigate(Routes.EV_CHARGE_COMPLETED);

                        }, 1500);
                    }}
                />
            </ScrollView>
        </ScreenContainer>
    );
}

function Step({ number, text }: { number: string; text: string }) {
    return (
        <View style={styles.stepRow}>
            <View style={styles.stepCircle}>
                <Text style={styles.stepNumber}>{number}</Text>
            </View>
            <Text style={styles.stepText}>{text}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: vw(5),
        paddingTop: vh(2),
        backgroundColor: '#FFFFFF',
        flex: 1,
    },

    /* Header */
    headerCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ECFDF3',
        borderRadius: 14,
        padding: vw(4),
        marginBottom: vh(3),
    },

    headerIcon: {
        width: vw(12),
        height: vw(12),
        borderRadius: vw(6),
        backgroundColor: '#22C55E',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: vw(4),
    },

    headerIconText: {
        fontSize: 22,
        color: '#FFFFFF',
    },

    headerTitle: {
        fontSize: FONT_SIZE.FONT_16,
        fontFamily: Fonts.semiBold,
        color: '#064E3B',
    },

    headerSub: {
        marginTop: 2,
        fontSize: FONT_SIZE.FONT_14,
        color: '#065F46',
    },

    /* Sections */
    sectionTitle: {
        marginTop: vh(2),
        marginBottom: vh(1),
        fontSize: FONT_SIZE.FONT_16,
        fontFamily: Fonts.semiBold,
        color: '#0F172A',
    },

    /* Steps */
    stepRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: vh(1.6),
    },

    stepCircle: {
        width: vw(8),
        height: vw(8),
        borderRadius: vw(4),
        backgroundColor: '#2563EB',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: vw(3),
    },

    stepNumber: {
        color: '#FFFFFF',
        fontFamily: Fonts.semiBold,
        fontSize: FONT_SIZE.FONT_14,
    },

    stepText: {
        fontSize: FONT_SIZE.FONT_14,
        color: '#334155',
        flex: 1,
    },

    /* Button */
    primaryButton: {
        marginTop: vh(3),
        backgroundColor: '#16A34A',
        height: vh(6.8),
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
    },

    primaryButtonText: {
        color: '#FFFFFF',
        fontSize: FONT_SIZE.FONT_16,
        fontFamily: Fonts.medium,
    },

    /* Info Box */
    infoBox: {
        marginTop: vh(2),
        backgroundColor: '#EFF6FF',
        borderRadius: 12,
        padding: vw(4),
        borderWidth: 1,
        borderColor: '#BFDBFE',
    },

    infoText: {
        fontSize: FONT_SIZE.FONT_14,
        color: '#1D4ED8',
    },

    /* Sessions */
    sessionCard: {
        marginTop: vh(2),
        backgroundColor: '#FFFFFF',
        borderRadius: 14,
        elevation: 2,
    },

    sessionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: vw(4),
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
    },

    sessionDate: {
        fontSize: FONT_SIZE.FONT_14,
        fontFamily: Fonts.medium,
        color: '#0F172A',
    },

    sessionDuration: {
        marginTop: 2,
        fontSize: FONT_SIZE.FONT_12,
        color: '#64748B',
    },

    sessionAmount: {
        fontSize: FONT_SIZE.FONT_14,
        fontFamily: Fonts.semiBold,
        color: '#16A34A',
    },
});


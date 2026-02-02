import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { vw, vh, FONT_SIZE } from '../../ui/theme/dimensions';
import { Fonts } from '../../ui/theme/fonts';
import { COLORS } from '../../app/constants/colors';
import ScreenContainer from '../../ui/components/ScreenContainer';
import { FastTagStackParamList, MainStack } from '../../app/navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { Routes } from '../../app/constants/routes';
import { BBPS_SHORT_LOGO, ICON_ATM_CARD, ICON_CARD } from '../../assets/icons';

export default function FastTagPurchaseSuccessScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<MainStack>>();
    return (
        <ScreenContainer>
            <View style={styles.container}>

                {/* Success Icon */}
                <View style={styles.successIcon}>
                    <BBPS_SHORT_LOGO />
                </View>

                {/* Title */}
                <Text style={styles.title}>
                    FastTag Purchase Successful
                </Text>

                <Text style={styles.subtitle}>
                    Your FastTag order has been placed
                </Text>

                {/* Card */}
                <View style={styles.card}>

                    {/* Blue FastTag Card */}
                    <LinearGradient
                        colors={['#2563EB', '#1E40AF']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.fastTagCard}
                    >
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <View>
                                <Text style={styles.cardLabel}>Purchased FastTag</Text>
                                <Text style={styles.bankName}>ICICI Bank</Text>
                            </View>
                            <View style={styles.atmCard}>
                                <ICON_CARD width={vw(6)} height={vw(6)} color={COLORS.WHITE}/>
                            </View>
                        </View>
                        <View style={styles.vehicleBox}>
                            <Text style={styles.vehicleLabel}>Vehicle Number</Text>
                            <Text style={styles.vehicleNumber}>DL 20 FRZ 0899</Text>
                        </View>
                    </LinearGradient>

                    {/* Details */}
                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Tag ID</Text>
                        <Text style={styles.detailValue}>XXXX2913</Text>
                    </View>

                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Status</Text>
                        <View style={styles.statusPill}>
                            <Text style={styles.statusText}>Active</Text>
                        </View>
                    </View>
                </View>

                {/* Info Box */}
                <View style={styles.infoBox}>
                    <Text style={styles.infoText}>
                        📦 Your FastTag will be delivered to your registered address
                        within 7–10 business days. Once activated, you can manage and
                        recharge it from your account.
                    </Text>
                </View>

                {/* CTA */}
                <TouchableOpacity style={styles.primaryBtn} onPress={() => {
                    navigation.reset({
                        index: 0,
                        routes: [
                            {
                                name: Routes.DASHBOARD, // parent route
                                state: {
                                    index: 0,
                                    routes: [{
                                        name: Routes.FASTTAG_STACK,
                                        state: {
                                            index: 0,
                                            routes: [{ name: Routes.FASTTAG_HOME }],
                                        },
                                    }],
                                },
                            },
                        ],
                    });
                }}>
                    <Text style={styles.primaryText}>View All FastTags</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.secondaryBtn} onPress={() => {
                    navigation.reset({
                        index: 0,
                        routes: [
                            {
                                name: Routes.DASHBOARD, // parent route
                                state: {
                                    index: 0,
                                    routes: [{
                                        name: Routes.FASTTAG_STACK,
                                    }],
                                },
                            },
                        ],
                    });
                }}>
                    <Text style={styles.secondaryText}>Go to Home</Text>
                </TouchableOpacity>

            </View>
        </ScreenContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: vw(5),
        paddingTop: vh(6),
    },

    successIcon: {
        width: vw(18),
        height: vw(18),
        borderRadius: vw(9),
        // backgroundColor: '#16A34A',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: vh(3),
    },

    check: {
        color: '#FFFFFF',
        fontSize: vw(8),
        fontWeight: '700',
    },

    title: {
        fontSize: FONT_SIZE.FONT_24,
        fontFamily: Fonts.bold,
        color: '#0F172A',
        textAlign: 'center',
    },

    subtitle: {
        marginTop: vh(1),
        fontSize: FONT_SIZE.FONT_14,
        color: '#475569',
        textAlign: 'center',
    },

    card: {
        width: '100%',
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: vw(4),
        marginTop: vh(4),
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 6,
    },

    fastTagCard: {
        borderRadius: 16,
        padding: vw(4),
    },

    cardLabel: {
        fontSize: FONT_SIZE.FONT_12,
        color: '#DBEAFE',
    },

    bankName: {
        marginTop: vh(0.5),
        fontSize: FONT_SIZE.FONT_16,
        fontFamily: Fonts.semiBold,
        color: '#FFFFFF',
    },

    vehicleBox: {
        marginTop: vh(2),
        backgroundColor: 'rgba(255,255,255,0.15)',
        borderRadius: 12,
        padding: vw(3),
    },

    vehicleLabel: {
        fontSize: FONT_SIZE.FONT_12,
        color: '#DBEAFE',
    },

    vehicleNumber: {
        marginTop: vh(0.4),
        fontSize: FONT_SIZE.FONT_18,
        fontFamily: Fonts.bold,
        color: '#FFFFFF',
    },

    detailRow: {
        marginTop: vh(2),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    detailLabel: {
        fontSize: FONT_SIZE.FONT_14,
        color: '#475569',
    },

    detailValue: {
        fontSize: FONT_SIZE.FONT_14,
        fontFamily: Fonts.semiBold,
        color: '#0F172A',
    },

    statusPill: {
        backgroundColor: '#DCFCE7',
        paddingHorizontal: vw(3),
        paddingVertical: vh(0.5),
        borderRadius: 20,
    },

    statusText: {
        color: '#16A34A',
        fontSize: FONT_SIZE.FONT_12,
        fontFamily: Fonts.semiBold,
    },

    infoBox: {
        marginTop: vh(3),
        backgroundColor: '#EFF6FF',
        borderRadius: 14,
        padding: vw(4),
        borderWidth: 1,
        borderColor: '#BFDBFE',
    },

    infoText: {
        fontSize: FONT_SIZE.FONT_14,
        color: '#1D4ED8',
        textAlign: 'center',
    },

    primaryBtn: {
        marginTop: vh(4),
        width: '100%',
        height: vh(7),
        backgroundColor: COLORS.APP_PRIMARY,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },

    primaryText: {
        color: '#FFFFFF',
        fontSize: FONT_SIZE.FONT_16,
        fontFamily: Fonts.semiBold,
    },

    secondaryBtn: {
        marginTop: vh(2),
        width: '100%',
        height: vh(7),
        backgroundColor: '#F3F4F6',
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },

    secondaryText: {
        fontSize: FONT_SIZE.FONT_16,
        color: '#111827',
        fontFamily: Fonts.medium,
    },
    atmCard: {
        width: vw(10),
        height: vw(10),
        borderRadius: vw(5),
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        marginRight: vw(4),
        alignItems: 'center',
        justifyContent: 'center'
    }
});

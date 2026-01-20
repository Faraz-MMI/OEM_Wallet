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
import { Routes } from '../../app/constants/routes';

export default function FastTagLinkedSuccessScreen({ navigation }: any) {
    return (
        <ScreenContainer>
            <ScrollView>
                <View style={styles.container}>

                    {/* SUCCESS ICON */}
                    <View style={styles.successIconWrap}>
                        <Text style={styles.successIcon}>✓</Text>
                    </View>

                    {/* TITLE */}
                    <Text style={styles.title}>
                        FastTag Linked Successfully ✅
                    </Text>

                    <Text style={styles.subtitle}>
                        Your FastTag has been added to your account
                    </Text>

                    {/* CARD */}
                    <View style={styles.mainCard}>

                        {/* FASTTAG CARD */}
                        <View style={styles.fastTagCard}>
                            <Text style={styles.cardLabel}>Linked FastTag</Text>
                            <Text style={styles.bankName}>IDFC First Bank</Text>

                            <View style={styles.vehicleBox}>
                                <Text style={styles.vehicleLabel}>Vehicle Number</Text>
                                <Text style={styles.vehicleValue}>MH12AB1234</Text>
                            </View>
                        </View>

                        {/* INFO */}
                        <View style={styles.infoRow}>
                            <Text style={styles.infoLabel}>Tag ID</Text>
                            <Text style={styles.infoValue}>XXXX7821</Text>
                        </View>

                        <View style={styles.infoRow}>
                            <Text style={styles.infoLabel}>Status</Text>
                            <View style={styles.statusBadge}>
                                <Text style={styles.statusText}>Active</Text>
                            </View>
                        </View>

                    </View>

                    {/* INFO NOTE */}
                    <View style={styles.infoBox}>
                        <Text style={styles.infoText}>
                            💡 You can now view and recharge this FastTag anytime from your account.
                            Balance and transaction details are managed by the issuing bank.
                        </Text>
                    </View>

                    {/* PRIMARY CTA */}
                    <TouchableOpacity style={styles.primaryButton} onPress={() => {
                        navigation.navigate(Routes.FASTTAG_HOME);
                    }}>
                        <Text style={styles.primaryButtonText}>
                            View All FastTags
                        </Text>
                    </TouchableOpacity>

                    {/* SECONDARY CTA */}
                    <TouchableOpacity style={styles.secondaryButton} onPress={() => {
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
                        <Text style={styles.secondaryButtonText}>
                            Go to Home
                        </Text>
                    </TouchableOpacity>

                </View>
            </ScrollView>
        </ScreenContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: vw(6),
        alignItems: 'center',
    },

    /* SUCCESS ICON */
    successIconWrap: {
        width: vw(20),
        height: vw(20),
        borderRadius: vw(10),
        backgroundColor: '#16A34A',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: vh(6),
    },

    successIcon: {
        fontSize: 36,
        color: '#FFFFFF',
        fontFamily: Fonts.bold,
    },

    /* TITLE */
    title: {
        marginTop: vh(3),
        fontSize: FONT_SIZE.FONT_20,
        fontFamily: Fonts.bold,
        color: '#101828',
        textAlign: 'center',
    },

    subtitle: {
        marginTop: vh(1),
        fontSize: FONT_SIZE.FONT_14,
        color: '#667085',
        textAlign: 'center',
    },

    /* MAIN CARD */
    mainCard: {
        marginTop: vh(4),
        width: '100%',
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: vw(4),
    },

    /* FASTTAG CARD */
    fastTagCard: {
        backgroundColor: '#1D4ED8',
        borderRadius: 16,
        padding: vw(4),
        marginBottom: vh(2),
    },

    cardLabel: {
        color: '#DBEAFE',
        fontSize: FONT_SIZE.FONT_12,
    },

    bankName: {
        color: '#FFFFFF',
        fontSize: FONT_SIZE.FONT_18,
        fontFamily: Fonts.semiBold,
        marginTop: 4,
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

    /* INFO ROW */
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: vh(1.2),
    },

    infoLabel: {
        fontSize: FONT_SIZE.FONT_14,
        color: '#667085',
    },

    infoValue: {
        fontSize: FONT_SIZE.FONT_14,
        fontFamily: Fonts.semiBold,
        color: '#101828',
    },

    statusBadge: {
        backgroundColor: '#DCFCE7',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 20,
    },

    statusText: {
        fontSize: FONT_SIZE.FONT_12,
        fontFamily: Fonts.semiBold,
        color: '#16A34A',
    },

    /* INFO NOTE */
    infoBox: {
        marginTop: vh(3),
        width: '100%',
        backgroundColor: '#EFF6FF',
        borderRadius: 12,
        padding: vw(4),
        borderWidth: 1,
        borderColor: '#BFDBFE',
    },

    infoText: {
        fontSize: FONT_SIZE.FONT_14,
        color: '#1D4ED8',
        lineHeight: 18,
    },

    /* BUTTONS */
    primaryButton: {
        marginTop: vh(4),
        width: '100%',
        height: vh(6.8),
        backgroundColor: COLORS.APP_PRIMARY,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
    },

    primaryButtonText: {
        color: '#FFFFFF',
        fontSize: FONT_SIZE.FONT_16,
        fontFamily: Fonts.semiBold,
    },

    secondaryButton: {
        marginTop: vh(2),
        width: '100%',
        height: vh(6.8),
        backgroundColor: '#F3F4F6',
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
    },

    secondaryButtonText: {
        color: '#344054',
        fontSize: FONT_SIZE.FONT_14,
        fontFamily: Fonts.semiBold,
    },
});

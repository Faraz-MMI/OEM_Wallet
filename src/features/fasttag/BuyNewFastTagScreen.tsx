import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import { vw, vh, FONT_SIZE } from '../../ui/theme/dimensions';
import { Fonts } from '../../ui/theme/fonts';
import { COLORS } from '../../app/constants/colors';
import ScreenContainer from '../../ui/components/ScreenContainer';
import CustomTopBar from '../../ui/components/CustomTopBar';
import { FastTagStackParamList } from '../../app/navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { Routes } from '../../app/constants/routes';

export default function BuyNewFastTagScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<FastTagStackParamList>>();
    return (
        <ScreenContainer>
            <CustomTopBar title="Buy New FastTag" />
            <ScrollView
                style={styles.container}
                contentContainerStyle={{ paddingBottom: vh(4) }}
                showsVerticalScrollIndicator={false}
            >
                {/* Info Banner */}
                <View style={styles.infoBanner}>
                    <Text style={styles.infoTitle}>Apply for New FastTag</Text>
                    <Text style={styles.infoSubtitle}>
                        Get a new FastTag delivered to your address
                    </Text>
                </View>

                {/* Vehicle Number */}
                <Field
                    label="Vehicle Registration Number *"
                    placeholder="MH12AB1234"
                />

                {/* RC Number */}
                <Field
                    label="RC Number *"
                    placeholder="MH12AB123456789"
                    helper="Registration Certificate number from your vehicle documents"
                />

                {/* Address */}
                <Field
                    label="Delivery Address *"
                    placeholder="Enter complete delivery address"
                    multiline
                    height={vh(10)}
                />

                {/* PIN Code */}
                <Field label="PIN Code *" placeholder="400001" keyboardType="number-pad" />

                {/* Cost Card */}
                <View style={styles.costCard}>
                    <View style={styles.costRow}>
                        <Text style={styles.costTitle}>FastTag Cost</Text>
                        <Text style={styles.costAmount}>₹500</Text>
                    </View>

                    <Text style={styles.costSub}>
                        One-time fee + refundable security
                    </Text>

                    <Text style={styles.costItem}>• ₹100 - Issuance & delivery charges</Text>
                    <Text style={styles.costItem}>• ₹400 - Refundable security deposit</Text>
                </View>

                {/* Important Info */}
                <View style={styles.warningCard}>
                    <Text style={styles.warningTitle}>Important Information</Text>
                    <Text style={styles.warningItem}>
                        • FastTag will be delivered within 7–10 working days
                    </Text>
                    <Text style={styles.warningItem}>
                        • You’ll receive tracking details via SMS
                    </Text>
                    <Text style={styles.warningItem}>
                        • Installation instructions will be included
                    </Text>
                    <Text style={styles.warningItem}>
                        • Activation will be done automatically
                    </Text>
                </View>

                {/* CTA */}
                <TouchableOpacity style={styles.button} onPress={()=>{
                    navigation.navigate(Routes.FASTTAG_PURCHASE_SUCCESS)
                }}>
                    <Text style={styles.buttonText}>Proceed to Payment</Text>
                </TouchableOpacity>

                <Text style={styles.amountText}>
                    Amount: ₹500 (including security deposit)
                </Text>
            </ScrollView>
        </ScreenContainer>
    );
}

function Field({
    label,
    placeholder,
    helper,
    multiline,
    height,
    keyboardType,
}: any) {
    return (
        <View style={{ marginBottom: vh(2.5) }}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                placeholder={placeholder}
                placeholderTextColor="#9CA3AF"
                multiline={multiline}
                keyboardType={keyboardType}
                style={[
                    styles.input,
                    multiline && { height: height, textAlignVertical: 'top' },
                ]}
            />
            {helper && <Text style={styles.helper}>{helper}</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.WHITE,
        paddingHorizontal: vw(5),
    },

    /* Banner */
    infoBanner: {
        backgroundColor: '#EEF4FF',
        borderRadius: 12,
        padding: vw(4),
        marginTop: vh(2),
        marginBottom: vh(3),
        borderWidth: 1,
        borderColor: '#C7DCFF',
    },

    infoTitle: {
        fontSize: FONT_SIZE.FONT_14,
        fontFamily: Fonts.semiBold,
        color: COLORS.APP_PRIMARY,
    },

    infoSubtitle: {
        marginTop: vh(0.6),
        fontSize: FONT_SIZE.FONT_12,
        color: '#3B82F6',
    },

    /* Inputs */
    label: {
        fontSize: FONT_SIZE.FONT_14,
        fontFamily: Fonts.medium,
        color: '#111827',
        marginBottom: vh(0.8),
    },

    input: {
        height: 56,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 12,
        paddingHorizontal: 16,
        backgroundColor: '#FFFFFF',
        fontSize: FONT_SIZE.FONT_16,
        fontFamily: Fonts.regular,
        color: '#111827',
    },

    helper: {
        marginTop: vh(0.6),
        fontSize: FONT_SIZE.FONT_12,
        color: '#6B7280',
    },

    /* Cost Card */
    costCard: {
        backgroundColor: '#F6F0FF',
        borderRadius: 14,
        padding: vw(4),
        marginVertical: vh(3),
    },

    costRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    costTitle: {
        fontSize: FONT_SIZE.FONT_14,
        fontFamily: Fonts.semiBold,
        color: '#6D28D9',
    },

    costAmount: {
        fontSize: FONT_SIZE.FONT_18,
        fontFamily: Fonts.bold,
        color: '#6D28D9',
    },

    costSub: {
        marginTop: vh(0.8),
        fontSize: FONT_SIZE.FONT_12,
        color: '#6D28D9',
    },

    costItem: {
        marginTop: vh(0.6),
        fontSize: FONT_SIZE.FONT_12,
        color: '#6D28D9',
    },

    /* Warning */
    warningCard: {
        backgroundColor: '#FFF7ED',
        borderRadius: 14,
        padding: vw(4),
        borderWidth: 1,
        borderColor: '#FED7AA',
    },

    warningTitle: {
        fontSize: FONT_SIZE.FONT_14,
        fontFamily: Fonts.semiBold,
        color: '#B45309',
        marginBottom: vh(1),
    },

    warningItem: {
        fontSize: FONT_SIZE.FONT_12,
        color: '#B45309',
        marginBottom: vh(0.6),
    },

    /* CTA */
    button: {
        marginTop: vh(4),
        height: vh(7),
        backgroundColor: COLORS.APP_PRIMARY,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },

    buttonText: {
        color: '#FFFFFF',
        fontSize: FONT_SIZE.FONT_16,
        fontFamily: Fonts.semiBold,
    },

    amountText: {
        marginTop: vh(1),
        fontSize: FONT_SIZE.FONT_12,
        color: '#6B7280',
        textAlign: 'center',
    },
});

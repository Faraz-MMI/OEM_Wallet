import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import ScreenContainer from '../../ui/components/ScreenContainer';
import { vw, vh, FONT_SIZE } from '../../ui/theme/dimensions';
import { Fonts } from '../../ui/theme/fonts';
import { COLORS } from '../../app/constants/colors';
import CustomTopBar from '../../ui/components/CustomTopBar';
import { FastTagStackParamList } from '../../app/navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { Routes } from '../../app/constants/routes';
import { BBPS_LOG } from '../../assets/icons';

export default function EnterVehicleNumberScreen() {
    const [vehicleNo, setVehicleNo] = useState('');

    const isValid = vehicleNo.length >= 8;
    const navigation = useNavigation<NativeStackNavigationProp<FastTagStackParamList>>();

    return (
        <ScreenContainer>
            <CustomTopBar title="Enter Vehicle Number" subTitle='IDFC Bank'
                onBack={() => navigation.goBack()} icon={<BBPS_LOG width={vw(20)} height={vw(20)} />} canShowIcon />
            <View style={styles.container}>

                {/* INFO CARD */}
                <View style={styles.infoCard}>
                    <Text style={styles.infoTitle}>
                        ℹ️ Fetch Your FastTag Details
                    </Text>
                    <Text style={styles.infoText}>
                        Enter your vehicle number to fetch FastTag details from
                        IDFC First Bank
                    </Text>
                </View>

                {/* INPUT LABEL */}
                <Text style={styles.label}>Vehicle Registration Number</Text>

                {/* INPUT */}
                <TextInput
                    value={vehicleNo}
                    onChangeText={setVehicleNo}
                    placeholder="DL 20 FRZ 0899"
                    autoCapitalize="characters"
                    style={styles.input}
                />

                <Text style={styles.helperText}>
                    Enter vehicle number without spaces (e.g., DL 20 FRZ 0899)
                </Text>

                {/* EXAMPLES */}
                <View style={styles.examplesBox}>
                    <Text style={styles.examplesTitle}>Examples:</Text>

                    <View style={styles.examplesRow}>
                        <View style={styles.chip}>
                            <Text style={styles.chipText}>DL 20 FRZ 0899</Text>
                        </View>
                        <View style={styles.chip}>
                            <Text style={styles.chipText}>DL01CD5678</Text>
                        </View>
                        <View style={styles.chip}>
                            <Text style={styles.chipText}>KA05EF9012</Text>
                        </View>
                    </View>
                </View>

                {/* IMPORTANT NOTES */}
                <View style={styles.warningBox}>
                    <Text style={styles.warningTitle}>📋 Important Notes</Text>

                    <Text style={styles.warningText}>
                        • Vehicle must have an active FastTag from IDFC First Bank
                    </Text>
                    <Text style={styles.warningText}>
                        • Your FastTag will be linked for recharge and viewing
                    </Text>
                    <Text style={styles.warningText}>
                        • Balance and transactions remain with the issuing bank
                    </Text>
                </View>

                {/* CTA */}
                <TouchableOpacity
                    disabled={!isValid}
                    style={[
                        styles.button,
                        !isValid && styles.buttonDisabled,
                    ]}
                    onPress={() => {
                        navigation.navigate(Routes.FASTTAG_FOUND)
                    }}
                >
                    <Text style={styles.buttonText}>
                        Fetch FastTag Details
                    </Text>
                </TouchableOpacity>

            </View>
        </ScreenContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: vw(5),
    },

    infoCard: {
        backgroundColor: '#EFF6FF',
        borderRadius: 12,
        padding: vw(4),
        borderWidth: 1,
        borderColor: '#BFDBFE',
        marginBottom: vh(3),
    },

    infoTitle: {
        fontSize: FONT_SIZE.FONT_14,
        fontFamily: Fonts.semiBold,
        color: '#1D4ED8',
    },

    infoText: {
        marginTop: vh(0.6),
        fontSize: FONT_SIZE.FONT_14,
        color: '#1E3A8A',
        lineHeight: 18,
    },

    label: {
        fontSize: FONT_SIZE.FONT_14,
        fontFamily: Fonts.semiBold,
        color: '#111827',
        marginBottom: vh(1),
    },

    input: {
        height: 56,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        paddingHorizontal: 16,
        fontSize: FONT_SIZE.FONT_16,
        fontFamily: Fonts.regular,
        backgroundColor: '#FFFFFF',
    },

    helperText: {
        marginTop: vh(0.8),
        fontSize: FONT_SIZE.FONT_12,
        color: '#6B7280',
    },

    examplesBox: {
        marginTop: vh(3),
    },

    examplesTitle: {
        fontSize: FONT_SIZE.FONT_14,
        fontFamily: Fonts.semiBold,
        color: '#374151',
        marginBottom: vh(1),
    },

    examplesRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: vw(2),
    },

    chip: {
        paddingHorizontal: vw(3),
        paddingVertical: vh(0.8),
        borderRadius: 20,
        backgroundColor: '#F9FAFB',
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },

    chipText: {
        fontSize: FONT_SIZE.FONT_12,
        color: '#374151',
    },

    warningBox: {
        marginTop: vh(3),
        backgroundColor: '#FFF7ED',
        borderRadius: 12,
        padding: vw(4),
        borderWidth: 1,
        borderColor: '#FED7AA',
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

    button: {
        marginTop: 'auto',
        height: vh(6.8),
        borderRadius: 14,
        backgroundColor: COLORS.APP_PRIMARY,
        justifyContent: 'center',
        alignItems: 'center',
    },

    buttonDisabled: {
        backgroundColor: '#9BBBE3',
    },

    buttonText: {
        color: '#FFFFFF',
        fontSize: FONT_SIZE.FONT_16,
        fontFamily: Fonts.semiBold,
    },
});

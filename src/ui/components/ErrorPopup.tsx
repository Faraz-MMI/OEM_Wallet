import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Modal,
    TouchableOpacity,
} from 'react-native';
import { Fonts } from '../../ui/theme/fonts';
import { COLORS } from '../../app/constants/colors';

type Props = {
    visible: boolean;
    title: string;
    message: string;
    primaryText?: string;
    secondaryText?: string;
    onPrimary: () => void;
    onSecondary?: () => void;
    canShowPrimary?: boolean;
    isError?: boolean;
};

export default function ErrorPopup({
    visible,
    title,
    message,
    primaryText = 'OK',
    secondaryText,
    onPrimary,
    onSecondary,
    canShowPrimary = false,
    isError = true,
}: Props) {
    return (
        <Modal visible={visible} transparent animationType="fade">
            <View style={styles.overlay}>
                <View style={styles.container}>
                    {isError ?
                        <View style={styles.iconWrapper}>
                            <Text style={styles.icon}>!</Text>
                        </View>
                        : <View style={styles.iconWrapper}>

                            <Text style={styles.icon}>✓</Text>
                        </View>}

                    {/* Title */}
                    <Text style={styles.title}>{title}</Text>

                    {/* Message */}
                    <Text style={styles.message}>{message}</Text>

                    {/* Buttons */}
                    <View style={styles.actions}>
                        {secondaryText && (
                            <TouchableOpacity
                                style={styles.primaryBtn}
                                onPress={onSecondary}
                            >
                                <Text style={styles.primaryText}>
                                    {secondaryText}
                                </Text>
                            </TouchableOpacity>
                        )}

                        {canShowPrimary && <TouchableOpacity
                            style={styles.primaryBtn}
                            onPress={onPrimary}
                        >
                            <Text style={styles.primaryText}>
                                {primaryText}
                            </Text>
                        </TouchableOpacity>}
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.55)',
        justifyContent: 'center',
        alignItems: 'center',
    },

    container: {
        width: '85%',
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 24,
        alignItems: 'center',
    },

    iconWrapper: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: '#FEE2E2',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },

    icon: {
        fontSize: 32,
        fontWeight: '800',
        color: '#DC2626',
    },

    title: {
        fontSize: 18,
        fontFamily: Fonts.bold,
        color: '#101828',
        marginTop: 8,
        textAlign: 'center',
    },

    message: {
        marginTop: 8,
        fontSize: 14,
        color: '#475467',
        textAlign: 'center',
        lineHeight: 20,
    },

    actions: {
        marginTop: 20,
        width: '100%',
    },

    primaryBtn: {
        height: 48,
        backgroundColor: COLORS.APP_PRIMARY,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },

    primaryText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontFamily: Fonts.bold,
    },

    secondaryBtn: {
        height: 48,
        backgroundColor: '#F2F4F7',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },

    secondaryText: {
        fontSize: 16,
        fontFamily: Fonts.medium,
        color: '#101828',
    },
});

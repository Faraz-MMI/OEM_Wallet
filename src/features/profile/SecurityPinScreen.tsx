import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    TextInput,
} from 'react-native';
import AppText from '../../ui/components/AppText';
import { vw, vh } from '../../ui/theme/dimensions';
import { Fonts } from '../../ui/theme/fonts';
import ScreenContainer from '../../ui/components/ScreenContainer';
import CustomTopBar from '../../ui/components/CustomTopBar';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ProfileStackParamList } from '../../app/navigation/types';

export default function SecurityPinScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<ProfileStackParamList>>();
    const [activeTab, setActiveTab] = useState<'pin' | 'password'>('pin');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const hasMinLength = password.length >= 8;
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[^A-Za-z0-9]/.test(password);

    const isValid =
        hasMinLength && hasNumber && hasSpecial && password === confirmPassword;


    return (
        <ScreenContainer>
            <CustomTopBar title='Security & Pin' onBack={() => navigation.goBack()} />
            <View style={styles.container}>
                
                <View style={styles.tabs}>
                    <TabButton
                        label="Change PIN"
                        active={activeTab === 'pin'}
                        onPress={() => setActiveTab('pin')}
                    />
                    <TabButton
                        label="Change Password"
                        active={activeTab === 'password'}
                        onPress={() => setActiveTab('password')}
                    />
                </View>

                {activeTab === 'pin' && (
                    <>
                        <PinField label="Current PIN" />
                        <PinField label="New PIN" />
                        <PinField label="Confirm New PIN" />

                        
                        <View style={styles.tipBox}>
                            <AppText style={styles.tipIcon}>🔒</AppText>
                            <AppText style={styles.tipText}>
                                Choose a PIN that is easy to remember but hard for others to
                                guess. Avoid using birthdates or sequential numbers.
                            </AppText>
                        </View>

                        
                        <TouchableOpacity style={styles.cta}>
                            <AppText style={styles.ctaText}>Update PIN</AppText>
                        </TouchableOpacity>
                    </>
                )}
                {activeTab === 'password' && (
                    <>
                        
                        <View style={styles.field}>
                            <AppText style={styles.label}>New Password</AppText>
                            <View style={styles.inputWrap}>
                                <TextInput
                                    value={password}
                                    onChangeText={setPassword}
                                    placeholder="Enter new password"
                                    secureTextEntry={!showPassword}
                                    style={styles.input}
                                />
                                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                                    <AppText style={styles.eye}>👁</AppText>
                                </TouchableOpacity>
                            </View>
                        </View>

                        
                        <View style={styles.field}>
                            <AppText style={styles.label}>Confirm New Password</AppText>
                            <View style={styles.inputWrap}>
                                <TextInput
                                    value={confirmPassword}
                                    onChangeText={setConfirmPassword}
                                    placeholder="Re-enter new password"
                                    secureTextEntry={!showConfirm}
                                    style={styles.input}
                                />
                                <TouchableOpacity onPress={() => setShowConfirm(!showConfirm)}>
                                    <AppText style={styles.eye}>👁</AppText>
                                </TouchableOpacity>
                            </View>
                        </View>

                        
                        <View style={styles.rules}>
                            <Rule ok={hasMinLength} text="Password must be at least 8 characters" />
                            <Rule ok={hasNumber} text="Include 1 number" />
                            <Rule ok={hasSpecial} text="Include 1 special character" />
                        </View>

                        
                        <TouchableOpacity
                            disabled={!isValid}
                            style={[styles.cta, !isValid && styles.ctaDisabled]}
                        >
                            <AppText style={styles.ctaText}>Update Password</AppText>
                        </TouchableOpacity>
                    </>
                )}

            </View>
        </ScreenContainer>
    );
}

function Rule({ ok, text }: { ok: boolean; text: string }) {
    return (
        <View style={styles.ruleRow}>
            <AppText style={[styles.ruleIcon, ok && styles.ruleOk]}>
                {ok ? '✓' : '✕'}
            </AppText>
            <AppText style={styles.ruleText}>{text}</AppText>
        </View>
    );
}


function TabButton({
    label,
    active,
    onPress,
}: {
    label: string;
    active: boolean;
    onPress: () => void;
}) {
    return (
        <TouchableOpacity
            style={[styles.tab, active && styles.tabActive]}
            onPress={onPress}
        >
            <AppText
                style={[
                    styles.tabText,
                    active && styles.tabTextActive,
                ]}
            >
                {label}
            </AppText>
        </TouchableOpacity>
    );
}

function PinField({ label }: { label: string }) {
    return (
        <View style={styles.pinSection}>
            <AppText style={styles.pinLabel}>{label}</AppText>

            <View style={styles.pinRow}>
                {[0, 1, 2, 3].map(i => (
                    <View key={i} style={styles.pinBox} />
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: vw(5),
    },

    /* Tabs */
    tabs: {
        flexDirection: 'row',
        backgroundColor: '#F3F4F6',
        borderRadius: 12,
        marginTop: vh(2),
        padding: 4,
    },

    tab: {
        flex: 1,
        height: vh(5.5),
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },

    tabActive: {
        backgroundColor: '#005ABF',
    },

    tabText: {
        fontSize: vw(3.6),
        color: '#374151',
    },

    tabTextActive: {
        color: '#FFFFFF',
        fontFamily: Fonts.semiBold,
    },

    /* PIN fields */
    pinSection: {
        marginTop: vh(3),
    },

    pinLabel: {
        fontSize: vw(3.4),
        color: '#374151',
        marginBottom: vh(1.2),
    },

    pinRow: {
        flexDirection: 'row',
    },

    pinBox: {
        width: vw(10),
        height: vw(10),
        borderRadius: 10,
        backgroundColor: '#F3F4F6',
        marginRight: vw(2),
    },

    /* Tip */
    tipBox: {
        marginTop: vh(4),
        backgroundColor: '#FFF7ED',
        borderRadius: 14,
        padding: vw(4),
        flexDirection: 'row',
        gap: vw(2),
    },

    tipIcon: {
        fontSize: vw(4),
    },

    tipText: {
        flex: 1,
        fontSize: vw(3.2),
        color: '#EA580C',
    },

    /* CTA */
    cta: {
        marginTop: vh(4),
        height: vh(7),
        backgroundColor: '#8CB4E8',
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
    },

    ctaText: {
        fontSize: vw(4),
        color: '#FFFFFF',
        fontFamily: Fonts.semiBold,
    },
    field: {
        marginTop: vh(3),
    },

    label: {
        fontSize: vw(3.4),
        color: '#374151',
        marginBottom: vh(1),
    },

    inputWrap: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F3F4F6',
        borderRadius: 12,
        paddingHorizontal: vw(4),
        height: vh(6.5),
    },

    input: {
        flex: 1,
        fontSize: vw(3.6),
        fontFamily: Fonts.regular,
    },

    eye: {
        fontSize: vw(4),
        color: '#6B7280',
    },

    rules: {
        marginTop: vh(3),
    },

    ruleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: vh(1),
    },

    ruleIcon: {
        width: vw(5),
        fontSize: vw(3.4),
        color: '#9CA3AF',
    },

    ruleOk: {
        color: '#16A34A',
    },

    ruleText: {
        fontSize: vw(3.2),
        color: '#6B7280',
    },

    ctaDisabled: {
        backgroundColor: '#8CB4E8',
        opacity: 0.6,
    },

});

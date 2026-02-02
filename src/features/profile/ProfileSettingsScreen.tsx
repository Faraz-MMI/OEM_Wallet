import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Image,
} from 'react-native';
import AppText from '../../ui/components/AppText';
import { vw, vh } from '../../ui/theme/dimensions';
import { Fonts } from '../../ui/theme/fonts';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStack, ProfileStackParamList } from '../../app/navigation/types';
import { Routes } from '../../app/constants/routes';
import CustomTopBar from '../../ui/components/CustomTopBar';
import ScreenContainer from '../../ui/components/ScreenContainer';
import { ICON_BOTTOM_ANGLE_ARROW, ICON_RIGHT_ANGLE_ARROW } from '../../assets/icons';
import { OEM_LIST } from '../../app/constants/brands';
import { useUserStore } from '../../app/store/userStore';

export default function ProfileSettingsScreen() {
    const { profile, entityId, setBrand, selectedBrand, userProfile } = useUserStore();
    const [brandingOpen, setBrandingOpen] = useState(false);
    const [selectedOEM, setSelectedOEM] = useState('mmi');
    const navigation = useNavigation<NativeStackNavigationProp<MainStack>>();

    console.log(profile);


    const account =
        profile != null && profile.accounts != null && profile.accounts.length > 0 ? profile.accounts[0] : null;


    function MenuItem({ icon, title, subtitle, onPress }: {
        icon: string;
        title: string;
        subtitle: string;
        onPress?: () => void;
    }) {
        return (
            <TouchableOpacity style={styles.menuItem} onPress={onPress}>
                <View style={styles.menuIcon}>
                    <AppText style={styles.menuEmoji}>{icon}</AppText>
                </View>

                <View style={{ flex: 1 }}>
                    <AppText style={styles.menuTitle}>{title}</AppText>
                    <AppText style={styles.menuSub}>{subtitle}</AppText>
                </View>

                <AppText style={styles.chevron}>›</AppText>
            </TouchableOpacity>
        );
    }

    const getInitials = (firstName?: string, lastName?: string): string => {
        if (!firstName && !lastName) return '';

        const first = firstName?.trim().charAt(0) ?? '';
        const last = lastName?.trim().charAt(0) ?? '';

        return (first + last).toUpperCase();
    };


    return (
        <ScreenContainer>
            <CustomTopBar title='Profile & Settings' onBack={() => navigation.goBack()} />
            <ScrollView
                style={styles.container}
                contentContainerStyle={{ paddingBottom: vh(4) }}
                showsVerticalScrollIndicator={false}
            >

                <View style={styles.profileCard}>
                    <View style={styles.avatar}>
                        <AppText style={styles.avatarText}>{getInitials(userProfile?.fname, userProfile?.lname)}</AppText>
                    </View>

                    <View>
                        <AppText style={styles.name}>{userProfile ? `${userProfile?.fname} ${userProfile?.lname}` : ''}</AppText>
                        <AppText style={styles.phone}>91 {userProfile ? `${userProfile?.mobile}` : ''}</AppText>
                        <AppText style={styles.kyc}>KYC: Full</AppText>
                    </View>
                </View>


                <MenuItem
                    icon="👤"
                    title="My Profile"
                    subtitle="View & edit personal details"
                    onPress={() => { navigation.navigate(Routes.PROFILE_STACK, { screen: Routes.PROFILE_EDIT }); }}
                />


                <TouchableOpacity
                    style={styles.menuItem}
                    onPress={() => setBrandingOpen(!brandingOpen)}
                >
                    <View style={styles.menuIcon}>
                        <AppText style={styles.menuEmoji}>🎨</AppText>
                    </View>

                    <View style={{ flex: 1 }}>
                        <AppText style={styles.menuTitle}>Wallet Branding</AppText>
                        <AppText style={styles.menuSub}>
                            Currently: {selectedBrand?.name || 'MMI OEM Wallet'}
                        </AppText>
                    </View>

                    <AppText style={styles.chevron}>
                        {brandingOpen ? <ICON_BOTTOM_ANGLE_ARROW style={{}} /> : <ICON_RIGHT_ANGLE_ARROW />}
                    </AppText>
                </TouchableOpacity>


                {brandingOpen && (
                    <View style={styles.oemBox}>
                        <AppText style={styles.oemTitle}>
                            Choose OEM Brand
                        </AppText>

                        {OEM_LIST.map(item => {
                            const selected = item.id === selectedBrand.id;
                            return (
                                <TouchableOpacity
                                    key={item.id}
                                    style={[
                                        styles.oemCard,
                                        selected && styles.oemSelected,
                                    ]}
                                    onPress={() => {
                                        setSelectedOEM(item.id);
                                        setBrand(item);
                                    }}
                                >
                                    <View style={styles.oemIcon}>
                                        <Image source={item.icon} style={{ width: vw(12), height: vw(12), borderRadius: vw(1) }} resizeMode='center' />
                                    </View>

                                    <View style={{ flex: 1 }}>
                                        <AppText style={styles.oemName}>
                                            {item.name}
                                        </AppText>
                                        <AppText style={styles.oemVehicle}>
                                            {item.vehicle}
                                        </AppText>
                                    </View>

                                    {selected && (
                                        <View style={styles.check}>
                                            <AppText style={styles.checkText}>✓</AppText>
                                        </View>
                                    )}
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                )}


                <MenuItem
                    icon="💳"
                    title="Payment Methods"
                    subtitle="Manage cards & UPI"
                    onPress={() => { navigation.navigate(Routes.PROFILE_STACK, { screen: Routes.PROFILE_PAYMENT_METHODS }); }}
                />

                <MenuItem
                    icon="🔒"
                    title="Security & PIN"
                    subtitle="Change password & PIN"
                    onPress={() => { navigation.navigate(Routes.PROFILE_STACK, { screen: Routes.PROFILE_WALLET_PIN }); }}
                />

                <MenuItem
                    icon="🚗"
                    title="My Vehicles"
                    subtitle="1 vehicle registered"
                    onPress={() => { navigation.navigate(Routes.VEHICLE_STACK, { screen: Routes.VEHICLE_HOME }); }}
                />

                <MenuItem
                    icon="❓"
                    title="Help & Support"
                    subtitle="FAQs & contact us"
                    onPress={() => { navigation.navigate(Routes.PROFILE_STACK, { screen: Routes.PROFILE_HELP }); }}
                />


                <TouchableOpacity style={styles.logout}>
                    <AppText style={styles.logoutText}>⎋ Logout</AppText>
                </TouchableOpacity>


                <View style={styles.footer}>
                    <AppText style={styles.version}>Version 1.0.0</AppText>
                    <AppText style={styles.copy}>
                        © 2026 MMI OEM Wallet
                    </AppText>
                </View>
            </ScrollView>
        </ScreenContainer>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: vw(5),
    },

    /* Profile */
    profileCard: {
        marginTop: vh(3),
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        padding: vw(4),
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },

    avatar: {
        width: vw(14),
        height: vw(14),
        borderRadius: vw(7),
        backgroundColor: '#005ABF',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: vw(4),
    },

    avatarText: {
        fontSize: vw(6),
        color: '#FFFFFF',
        fontFamily: Fonts.bold,
    },

    name: {
        fontSize: vw(4.2),
        fontFamily: Fonts.semiBold,
    },

    phone: {
        marginTop: vh(0.4),
        fontSize: vw(3.4),
        color: '#6B7280',
    },

    kyc: {
        marginTop: vh(0.4),
        fontSize: vw(3.2),
        color: '#16A34A',
    },

    /* Menu */
    menuItem: {
        marginTop: vh(2),
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: vw(4),
        borderWidth: 1,
        borderColor: '#F3F4F6',
    },

    menuIcon: {
        width: vw(11),
        height: vw(11),
        borderRadius: vw(5.5),
        backgroundColor: '#F3F4F6',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: vw(3),
    },

    menuEmoji: {
        fontSize: vw(5),
    },

    menuTitle: {
        fontSize: vw(3.8),
        fontFamily: Fonts.semiBold,
    },

    menuSub: {
        marginTop: vh(0.4),
        fontSize: vw(3.2),
        color: '#6B7280',
    },

    chevron: {
        fontSize: vw(6),
        color: '#9CA3AF',
    },

    /* Logout */
    logout: {
        marginTop: vh(4),
        backgroundColor: '#FEF2F2',
        paddingVertical: vh(2),
        borderRadius: 14,
        alignItems: 'center',
    },

    logoutText: {
        fontSize: vw(3.8),
        color: '#DC2626',
        fontFamily: Fonts.semiBold,
    },

    /* Footer */
    footer: {
        marginTop: vh(4),
        alignItems: 'center',
    },

    version: {
        fontSize: vw(3),
        color: '#6B7280',
    },

    copy: {
        marginTop: vh(0.4),
        fontSize: vw(2.8),
        color: '#9CA3AF',
    },
    /* OEM */
    oemBox: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: vw(4),
        borderWidth: 1,
        borderColor: '#E5EDFF',
        marginTop: vh(1),
    },

    oemTitle: {
        fontSize: vw(3.6),
        fontFamily: Fonts.semiBold,
        marginBottom: vh(2),
    },

    oemCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: vw(3),
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        marginBottom: vh(1.5),
    },

    oemSelected: {
        borderColor: '#4F46E5',
        backgroundColor: '#EEF2FF',
    },

    oemIcon: {
        width: vw(10),
        height: vw(10),
        // borderRadius: vw(5),
        // backgroundColor: '#F3F4F6',
        marginRight: vw(3),
        justifyContent: 'center',
        alignItems: 'center'
    },

    oemName: {
        fontSize: vw(3.6),
        fontFamily: Fonts.semiBold,
    },

    oemVehicle: {
        marginTop: vh(0.3),
        fontSize: vw(3.2),
        color: '#6B7280',
    },

    check: {
        width: vw(6),
        height: vw(6),
        borderRadius: vw(3),
        backgroundColor: '#4F46E5',
        justifyContent: 'center',
        alignItems: 'center',
    },

    checkText: {
        color: '#FFFFFF',
        fontSize: vw(3.2),
        fontFamily: Fonts.bold,
    },
});

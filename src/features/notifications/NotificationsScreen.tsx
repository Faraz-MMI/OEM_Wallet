import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import AppText from '../../ui/components/AppText';
import { vw, vh } from '../../ui/theme/dimensions';
import { Fonts } from '../../ui/theme/fonts';
import ScreenContainer from '../../ui/components/ScreenContainer';
import CustomTopBar from '../../ui/components/CustomTopBar';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStack } from '../../app/navigation/types';

export default function NotificationsScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<MainStack>>();
    function NotificationCard({
        icon,
        title,
        description,
        date,
        unread = false,
    }: {
        icon: string;
        title: string;
        description: string;
        date: string;
        unread?: boolean;
    }) {
        return (

            <View
                style={[
                    styles.card,
                    unread && styles.unreadBorder,
                ]}
            >
                <View style={styles.row}>
                    <View style={styles.iconWrap}>
                        <AppText style={styles.icon}>{icon}</AppText>
                    </View>

                    <View style={{ flex: 1 }}>
                        <AppText style={styles.cardTitle}>{title}</AppText>
                        <AppText style={styles.cardDesc}>{description}</AppText>
                        <AppText style={styles.cardDate}>{date}</AppText>
                    </View>

                    {unread && <View style={styles.dot} />}
                </View>
            </View>

        );
    }

    function OfferCard({
        icon,
        title,
        description,
    }: {
        icon: string;
        title: string;
        description: string;
    }) {
        return (
            <View style={styles.offerCard}>
                <View style={styles.iconWrap}>
                    <AppText style={styles.icon}>{icon}</AppText>
                </View>

                <View>
                    <AppText style={styles.cardTitle}>{title}</AppText>
                    <AppText style={styles.cardDesc}>{description}</AppText>
                </View>
            </View>
        );
    }

    return (
        <ScreenContainer>
            <CustomTopBar title='Notifications' onBack={() => navigation.goBack()} />
            <ScrollView
                style={styles.container}
                contentContainerStyle={{ paddingBottom: vh(4) }}
                showsVerticalScrollIndicator={false}
            >
                
                <AppText style={styles.sectionTitle}>Recent</AppText>

                <NotificationCard
                    icon="💳"
                    title="Payment Successful"
                    description="FastTag recharge of ₹500 completed"
                    date="05 Dec"
                    unread
                />

                <NotificationCard
                    icon="🎁"
                    title="Cashback Received"
                    description="₹50 cashback added to your wallet"
                    date="03 Dec"
                    unread
                />

                <NotificationCard
                    icon="🚗"
                    title="Service Reminder"
                    description="Your Generic Vehicle is due for service in 200 km"
                    date="01 Dec"
                />

                
                <AppText style={styles.sectionTitle}>Recommended Offers</AppText>

                <OfferCard
                    icon="🔧"
                    title="Free Car Check • Service Center"
                    description="Valid for next 30 days"
                />

                <OfferCard
                    icon="🚗"
                    title="20% off • Car Wash"
                    description="Use code: WASH20"
                />

                <OfferCard
                    icon="⛽"
                    title="Fuel Cashback"
                    description="Get 2% cashback on fuel"
                />
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

    sectionTitle: {
        marginTop: vh(3),
        marginBottom: vh(1.5),
        fontSize: vw(4),
        fontFamily: Fonts.semiBold,
        color: '#374151',
    },

    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: vw(4),
        marginBottom: vh(1.6),
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },

    unreadBorder: {
        borderColor: '#BFDBFE',
    },

    row: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: vw(3),
    },

    iconWrap: {
        width: vw(11),
        height: vw(11),
        borderRadius: vw(5.5),
        backgroundColor: '#F3F4F6',
        justifyContent: 'center',
        alignItems: 'center',
    },

    icon: {
        fontSize: vw(5),
    },

    cardTitle: {
        fontSize: vw(3.8),
        fontFamily: Fonts.semiBold,
    },

    cardDesc: {
        marginTop: vh(0.4),
        fontSize: vw(3.4),
        color: '#6B7280',
    },

    cardDate: {
        marginTop: vh(0.6),
        fontSize: vw(3),
        color: '#9CA3AF',
    },

    dot: {
        width: vw(2),
        height: vw(2),
        borderRadius: vw(1),
        backgroundColor: '#2563EB',
        marginTop: vh(0.8),
    },

    /* Offers */
    offerCard: {
        backgroundColor: '#F0F7FF',
        borderRadius: 16,
        padding: vw(4),
        marginBottom: vh(1.6),
        flexDirection: 'row',
        gap: vw(3),
    },
});

import React from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AppText from '../../ui/components/AppText';
import { vw, vh } from '../../ui/theme/dimensions';
import { Fonts } from '../../ui/theme/fonts';
import { COLORS } from '../../app/constants/colors';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { VoucherStackParamList } from '../../app/navigation/types';
import { Routes } from '../../app/constants/routes';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import ScreenContainer from '../../ui/components/ScreenContainer';
import CustomTopBar from '../../ui/components/CustomTopBar';
import { ICON_CALENDAR, ICON_TAG } from '../../assets/icons';

type VoucherRouteProp = RouteProp<VoucherStackParamList, typeof Routes.VOUCHER_DETAILS>;
export default function VoucherDetailScreen() {
    const route = useRoute<VoucherRouteProp>();
    const { voucherId } = route.params;
    const navigation = useNavigation<NativeStackNavigationProp<VoucherStackParamList>>();
    return (
        <ScreenContainer>
            <CustomTopBar title='Voucher Details' onBack={() => { navigation.goBack() }} />
            <View style={styles.container}>

                {/* Gradient Voucher Card */}
                <LinearGradient
                    colors={['#9810FA', '#6E11B0']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.voucherCard}
                >
                    {/* Icon */}
                    <View style={styles.iconCircle}>
                        <ICON_TAG color={"#FFFFFF"} />
                    </View>

                    {/* Price */}
                    <View style={styles.priceWrap}>
                        <AppText style={styles.priceLabel}>Price</AppText>
                        <AppText style={styles.price}>₹50</AppText>
                    </View>

                    {/* Text */}
                    <AppText style={styles.title}>Cafe Latte</AppText>
                    <AppText style={styles.discount}>10% off</AppText>
                    <AppText style={styles.brand}>Cafe Coffee Day</AppText>
                </LinearGradient>

                {/* Description */}
                <View style={styles.sectionCard}>
                    <View style={styles.sectionHeader}>
                        <AppText style={styles.sectionIcon}>ℹ️</AppText>
                        <AppText style={styles.sectionTitle}>Description</AppText>
                    </View>
                    <AppText style={styles.sectionText}>
                        Enjoy a refreshing cafe latte at any Cafe Coffee Day outlet
                    </AppText>
                </View>

                {/* Validity */}
                <View style={styles.sectionCard}>
                    <View style={styles.sectionHeader}>
                        {/* <AppText style={styles.sectionIcon}>📅</AppText> */}
                        <ICON_CALENDAR color={"#4A5565"} width={20} height={24} style={{marginRight: vw(2)}}/>
                        <AppText style={styles.sectionTitle}>Validity</AppText>
                    </View>
                    <AppText style={styles.sectionText}>
                        Valid for 30 days from purchase date
                    </AppText>
                </View>

                {/* Terms */}
                <View style={styles.sectionCard}>
                    <AppText style={styles.sectionTitle}>Terms & Conditions</AppText>

                    {[
                        'Valid at all Cafe Coffee Day outlets',
                        'Cannot be clubbed with other offers',
                        'Valid for 30 days from purchase',
                        'Non-refundable and non-transferable',
                    ].map((item, index) => (
                        <View key={index} style={styles.bulletRow}>
                            <View style={styles.bullet} />
                            <AppText style={styles.bulletText}>{item}</AppText>
                        </View>
                    ))}
                </View>
                <TouchableOpacity style={styles.primaryBtn} onPress={() => {
                    navigation.navigate(Routes.COMPLETE_VOUCHER_PURCHASE);
                 }}>
                    <AppText style={styles.primaryText}>Buy Voucher for ₹50</AppText>
                </TouchableOpacity>

            </View>
        </ScreenContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: vw(5),
        paddingTop: vh(2),
    },

    voucherCard: {
        borderRadius: 20,
        padding: vw(5),
        marginBottom: vh(3),
    },

    iconCircle: {
        width: vw(12),
        height: vw(12),
        borderRadius: vw(6),
        backgroundColor: 'rgba(255,255,255,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: vh(2),
    },

    icon: {
        fontSize: vw(5),
    },

    priceWrap: {
        position: 'absolute',
        top: vw(5),
        right: vw(5),
        alignItems: 'flex-end',
    },

    priceLabel: {
        fontSize: vw(3),
        color: '#E9D5FF',
    },

    price: {
        fontSize: vw(5),
        fontFamily: Fonts.bold,
        color: '#FFFFFF',
    },

    title: {
        fontSize: vw(5),
        fontFamily: Fonts.bold,
        color: '#FFFFFF',
        marginTop: vh(1),
    },

    discount: {
        marginTop: vh(0.5),
        fontSize: vw(3.6),
        color: '#E9D5FF',
    },

    brand: {
        marginTop: vh(0.5),
        fontSize: vw(3.4),
        color: '#E9D5FF',
    },

    sectionCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: vw(4),
        marginBottom: vh(2),
        shadowColor: '#000',
        shadowOpacity: 0.04,
        shadowRadius: 6,
        elevation: 2,
    },

    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: vh(1),
    },

    sectionIcon: {
        marginRight: vw(2),
        fontSize: vw(4),
    },

    sectionTitle: {
        fontSize: vw(4),
        fontFamily: Fonts.semiBold,
        color: '#111827',
    },

    sectionText: {
        fontSize: vw(3.4),
        color: '#4B5563',
        lineHeight: vh(2.4),
    },

    bulletRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginTop: vh(1),
    },

    bullet: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#9333EA',
        marginTop: vh(0.8),
        marginRight: vw(2),
    },

    bulletText: {
        flex: 1,
        fontSize: vw(3.3),
        color: '#4B5563',
        lineHeight: vh(2.4),
    },
    primaryBtn: {
        marginTop: vh(4),
        height: vh(6.8),
        backgroundColor: '#005ABF',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },

    primaryText: {
        color: COLORS.WHITE,
        fontSize: vw(4),
        fontFamily: Fonts.regular,
    },
});


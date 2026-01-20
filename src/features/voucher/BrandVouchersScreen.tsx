import React from 'react';
import {
    View,
    StyleSheet,
    FlatList,
    TouchableOpacity,
} from 'react-native';
import AppText from '../../ui/components/AppText';
import { vw, vh } from '../../ui/theme/dimensions';
import { Fonts } from '../../ui/theme/fonts';
import { COLORS } from '../../app/constants/colors';
import { ICON_TAG } from '../../assets/icons';
import ScreenContainer from '../../ui/components/ScreenContainer';
import CustomTopBar from '../../ui/components/CustomTopBar';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { VoucherStackParamList } from '../../app/navigation/types';
import { Routes } from '../../app/constants/routes';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type Voucher = {
    id: string;
    title: string;
    discount: string;
    description: string;
    price: number;
};

const VOUCHERS: Voucher[] = [
    {
        id: '1',
        title: 'Cafe Latte',
        discount: '10% off',
        description: 'Enjoy a refreshing cafe latte at',
        price: 50,
    },
    {
        id: '2',
        title: 'Dining Voucher',
        discount: '₹100 off',
        description: 'Valid on food and beverages',
        price: 100,
    },
    {
        id: '3',
        title: 'Coffee + Snack Combo',
        discount: '15% off',
        description: 'Get any coffee with your choice',
        price: 150,
    },
];

type VoucherRouteProp = RouteProp<VoucherStackParamList, typeof Routes.VOUCHER_BY_BRAND>;
export default function BrandVouchersScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<VoucherStackParamList>>();
    const route = useRoute<VoucherRouteProp>();
    const { brand } = route.params;

    const renderItem = ({ item }: { item: Voucher }) => (
        <View style={styles.card}>
            {/* Left icon */}
            <View style={styles.iconWrap}>
                <ICON_TAG width={vw(6)} height={vw(6)} color="#9810FA" />
            </View>

            {/* Middle content */}
            <View style={styles.content}>
                <AppText style={styles.title}>{item.title}</AppText>
                <AppText style={styles.discount}>{item.discount}</AppText>
                <AppText style={styles.description}>{item.description}</AppText>
            </View>

            {/* Right action */}
            <View style={styles.action}>
                <AppText style={styles.price}>₹{item.price}</AppText>
                <TouchableOpacity onPress={()=>{
                    navigation.navigate(Routes.VOUCHER_DETAILS, { voucherId: item.id });
                }}>
                    <AppText style={styles.buyNow}>Buy Now</AppText>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <ScreenContainer>
            <CustomTopBar title={brand.BrandName} subTitle='Available Vouchers' onBack={()=>navigation.goBack()}/>
            <View style={styles.container}>
                <FlatList
                    data={VOUCHERS}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                    contentContainerStyle={{ paddingTop: vh(2) }}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </ScreenContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9FAFB',
        paddingHorizontal: vw(5),
    },

    card: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: vw(4),
        marginBottom: vh(2),

        alignItems: 'center',
    },

    iconWrap: {
        width: vw(12),
        height: vw(12),
        borderRadius: vw(6),
        backgroundColor: '#F3E8FF',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: vw(3),
    },

    icon: {
        fontSize: vw(5),
    },

    content: {
        flex: 1,
    },

    title: {
        fontSize: vw(3.8),
        fontFamily: Fonts.semiBold,
        color: '#111827',
    },

    discount: {
        marginTop: vh(0.4),
        fontSize: vw(3.2),
        fontFamily: Fonts.medium,
        color: '#6B7280',
    },

    description: {
        marginTop: vh(0.3),
        fontSize: vw(3.1),
        color: '#9CA3AF',
    },

    action: {
        alignItems: 'flex-end',
        // justifyContent: 'space-evenly',
        height: '100%',
    },

    price: {
        fontSize: vw(4),
        fontFamily: Fonts.semiBold,
        color: COLORS.APP_PRIMARY,
    },

    buyNow: {
        marginTop: vh(1),
        fontSize: vw(3.2),
        fontFamily: Fonts.medium,
        color: '#6B7280',
    },
});

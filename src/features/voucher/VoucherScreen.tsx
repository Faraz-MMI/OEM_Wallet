import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import AppText from '../../ui/components/AppText';
import { vw, vh } from '../../ui/theme/dimensions';
import { Fonts } from '../../ui/theme/fonts';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { VoucherStackParamList } from '../../app/navigation/types';
import { Routes } from '../../app/constants/routes';
import ScreenContainer from '../../ui/components/ScreenContainer';
import CustomTopBar from '../../ui/components/CustomTopBar';

type Category = {
  id: string;
  label: string;
  icon: string;
};

type Voucher = {
  id: string;
  title: string;
  offer: string;
  price: number;
  icon: string;
};

const CATEGORIES: Category[] = [
  { id: 'food', label: 'Food', icon: '🍔' },
  { id: 'travel', label: 'Travel', icon: '✈️' },
  { id: 'service', label: 'Services', icon: '🛠️' },
];

const VOUCHERS: Voucher[] = [
  {
    id: '1',
    title: 'Cafe Latte',
    offer: '10% off',
    price: 50,
    icon: '☕',
  },
  {
    id: '2',
    title: 'Car Wash',
    offer: '20% off',
    price: 150,
    icon: '🚗',
  },
  {
    id: '3',
    title: 'Restaurant Dining',
    offer: '15% off',
    price: 100,
    icon: '🍽️',
  },
  {
    id: '4',
    title: 'Fuel Discount',
    offer: '₹5 per liter',
    price: 200,
    icon: '⛽',
  },
  {
    id: '5',
    title: 'Hotel Stay',
    offer: '25% off',
    price: 500,
    icon: '🏨',
  },
];

export default function VouchersScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<VoucherStackParamList>>();
  const [selected, setSelected] = useState('food');

  function VoucherCard({ item }: { item: any }) {
    return (
      <TouchableOpacity activeOpacity={0.85} style={styles.card} onPress={() => {
        navigation.navigate(Routes.VOUCHER_DETAILS, { voucherId: item.id });
      }}>
        <View style={styles.iconWrap}>
          <AppText style={styles.voucherIcon}>{item.icon}</AppText>
        </View>

        <View style={{ flex: 1, marginLeft: vw(4) }}>
          <AppText style={styles.cardTitle}>{item.title}</AppText>
          <AppText style={styles.offer}>{item.offer}</AppText>
          <AppText style={styles.buy}>Buy voucher</AppText>
        </View>

        <AppText style={styles.price}>₹{item.price}</AppText>
      </TouchableOpacity>
    );
  }


  return (
    <ScreenContainer>
      <CustomTopBar title='Vouchers' onBack={()=>navigation.goBack()}/>
      <View style={styles.container}>
        
        <AppText style={styles.sectionTitle}>Categories</AppText>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingVertical: vh(1.5) }}
        >
          {CATEGORIES.map(cat => (
            <TouchableOpacity
              key={cat.id}
              style={[
                styles.categoryChip,
                selected === cat.id && styles.categoryActive,
              ]}
              onPress={() => setSelected(cat.id)}
            >
              <AppText style={styles.categoryIcon}>{cat.icon}</AppText>
              <AppText style={styles.categoryText}>{cat.label}</AppText>
            </TouchableOpacity>
          ))}
        </ScrollView>

        
        <AppText style={styles.sectionTitle}>Available Offers</AppText>

        <FlatList
          data={VOUCHERS}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: vh(4) }}
          renderItem={({ item }) => <VoucherCard item={item} />}
        />
      </View>
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
    marginTop: vh(2),
    fontSize: vw(4),
    fontFamily: Fonts.semiBold,
  },

  /* Categories */
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 20,
    paddingHorizontal: vw(4),
    paddingVertical: vh(1),
    marginRight: vw(3),
    backgroundColor: '#FFFFFF',
  },

  categoryActive: {
    borderColor: '#005ABF',
    backgroundColor: '#E5F0FF',
  },

  categoryIcon: {
    fontSize: vw(4),
    marginRight: vw(2),
  },

  categoryText: {
    fontSize: vw(3.4),
    fontFamily: Fonts.medium,
  },

  /* Cards */
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: vw(4),
    marginTop: vh(2),
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },

  iconWrap: {
    width: vw(14),
    height: vw(14),
    borderRadius: 14,
    backgroundColor: '#F3E8FF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  voucherIcon: {
    fontSize: vw(6),
  },

  cardTitle: {
    fontSize: vw(3.8),
    fontFamily: Fonts.semiBold,
  },

  offer: {
    marginTop: vh(0.4),
    fontSize: vw(3.4),
    color: '#9333EA',
  },

  buy: {
    marginTop: vh(0.6),
    fontSize: vw(3.2),
    color: '#6B7280',
  },

  price: {
    fontSize: vw(4),
    fontFamily: Fonts.semiBold,
    color: '#005ABF',
  },
});


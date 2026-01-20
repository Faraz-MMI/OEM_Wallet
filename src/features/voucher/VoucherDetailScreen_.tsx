import React, { use, useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import AppText from '../../ui/components/AppText';
import { vw, vh, FONT_SIZE } from '../../ui/theme/dimensions';
import { Fonts } from '../../ui/theme/fonts';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { VoucherStackParamList } from '../../app/navigation/types';
import { Routes } from '../../app/constants/routes';
import WalletPinModal from '../../ui/components/WalletPinModal';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import ScreenContainer from '../../ui/components/ScreenContainer';
import CustomTopBar from '../../ui/components/CustomTopBar';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS } from '../../app/constants/colors';

type VoucherRouteProp = RouteProp<VoucherStackParamList, typeof Routes.VOUCHER_DETAILS>;
export default function VoucherDetailScreen_() {
  const route = useRoute<VoucherRouteProp>();
  const { voucherId } = route.params;
  const navigation = useNavigation<NativeStackNavigationProp<VoucherStackParamList>>();
  const [showPin, setShowPin] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <ScreenContainer>
      <CustomTopBar title='Voucher' onBack={() => navigation.goBack()} />
      <View style={styles.container}>
        
        <LinearGradient colors={['#FEF3C6', '#FFEDD4']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }} style={styles.voucherCard}>
          <View style={styles.iconWrap}>
            <AppText style={styles.iconEmoji}>☕</AppText>
          </View>

          <AppText style={styles.voucherTitle}>Cafe Latte</AppText>
          <AppText style={styles.voucherOffer}>10% off</AppText>

          <View style={styles.validCard}>
            <AppText style={styles.validLabel}>Valid at</AppText>
            <AppText style={styles.validText}>
              All participating cafes
            </AppText>
            <AppText style={styles.validSub}>
              Valid till 31 Dec 2025
            </AppText>
          </View>
        </LinearGradient>

        
        <View style={styles.priceRow}>
          <AppText style={styles.priceLabel}>Voucher Price</AppText>
          <AppText style={styles.priceValue}>₹50</AppText>
        </View>

        
        <View style={styles.paymentRow}>
          <AppText style={styles.paymentText}>
            💳 Pay using Wallet Balance / UPI
          </AppText>
        </View>

        
        <TouchableOpacity style={styles.buyBtn} onPress={() => {
          setShowPin(true)
        }}>
          <AppText style={styles.buyText}>Buy Voucher</AppText>
        </TouchableOpacity>

        
        <AppText style={styles.hint}>
          You will be prompted for a 4-digit PIN to authenticate
        </AppText>
        <WalletPinModal
          visible={showPin}
          loading={loading}
          onClose={() => setShowPin(false)}
          onSubmit={(pin) => {
            setLoading(true);
            setTimeout(() => {
              setLoading(false);
              setShowPin(false);
              // navigate to success
              navigation.navigate(Routes.VOUCHER_PURCHASE_SUCCESS);
            }, 1500);
          }}
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

  /* Voucher Card */
  voucherCard: {
    marginTop: vh(3),
    backgroundColor: '#FFF4CC',
    borderRadius: 20,
    padding: vw(6),
    alignItems: 'center',
  },

  iconWrap: {
    width: vw(18),
    height: vw(18),
    borderRadius: vw(9),
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: vh(2),
  },

  iconEmoji: {
    fontSize: vw(7),
  },

  voucherTitle: {
    fontSize: FONT_SIZE.FONT_24,
    color:"#101828",
    fontFamily: Fonts.bold,
  },

  voucherOffer: {
    marginTop: vh(0.8),
    fontSize: FONT_SIZE.FONT_18,
    color: '#CA3500',
    fontFamily: Fonts.bold,
  },

  validCard: {
    marginTop: vh(3),
    width: '100%',
    backgroundColor: '#FFFFFFB2',
    borderRadius: 16,
    padding: vw(4),
  },

  validLabel: {
    fontSize: FONT_SIZE.FONT_14,
    color: '#4A5565',
    fontFamily:Fonts.regular
  },

  validText: {
    marginTop: vh(0.4),
    fontSize: FONT_SIZE.FONT_16,
    color:"#0A0A0A",
    fontFamily: Fonts.regular,
  },

  validSub: {
    marginTop: vh(0.4),
    fontSize: FONT_SIZE.FONT_12,
    color: '#6A7282',
  },

  /* Price */
  priceRow: {
    marginTop: vh(4),
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F9FAFB',
    padding: vw(4),
    borderRadius: 12,
    alignItems:'center'
  },

  priceLabel: {
    fontSize: FONT_SIZE.FONT_16,
    color: '#4A5565',
    fontFamily:Fonts.regular
  },

  priceValue: {
    fontSize: FONT_SIZE.FONT_24,
    fontFamily: Fonts.bold,
    color: '#005ABF',
  },

  /* Payment */
  paymentRow: {
    marginTop: vh(3),
    backgroundColor: '#EFF6FF',
    borderRadius: 12,
    padding: vw(4),
    borderWidth: 1,
    borderColor: '#BEDBFF',
  },

  paymentText: {
    fontSize: FONT_SIZE.FONT_14,
    color: '#1D4ED8',
    fontFamily:Fonts.regular
  },

  /* CTA */
  buyBtn: {
    marginTop: vh(4),
    height: vh(7),
    backgroundColor: COLORS.BUTTON_SELECTED,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buyText: {
    fontSize: FONT_SIZE.FONT_14,
    fontFamily: Fonts.regular,
    color: '#FFFFFF',
  },

  /* Hint */
  hint: {
    marginTop: vh(2),
    fontSize: FONT_SIZE.FONT_12,
    color: '#6A7282',
    textAlign: 'center',
    fontFamily:Fonts.regular
  },
});

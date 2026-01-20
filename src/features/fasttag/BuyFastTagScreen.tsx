import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import AppText from '../../ui/components/AppText';
import { vw, vh } from '../../ui/theme/dimensions';
import { Fonts } from '../../ui/theme/fonts';
import { COLORS } from '../../app/constants/colors';
import ScreenContainer from '../../ui/components/ScreenContainer';
import CustomTopBar from '../../ui/components/CustomTopBar';
import { Routes } from '../../app/constants/routes';
import { FastTagStackParamList } from '../../app/navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

const BANKS = [
  'IDFC First Bank',
  'ICICI Bank',
  'HDFC Bank',
  'SBI',
  'Paytm Payments Bank',
  'Kotak Mahindra Bank',
  'Yes Bank',
];

export default function BuyFastTagScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<FastTagStackParamList>>();
  return (
    <ScreenContainer>
      <CustomTopBar title='Buy New FastTag'/>
      <View style={styles.container}>

        {/* Header Text */}
        <AppText style={styles.title}>
          Choose a bank to issue your FastTag
        </AppText>
        <AppText style={styles.subtitle}>
          Select from popular banks and payment providers
        </AppText>

        {/* Bank List */}
        <FlatList
          data={BANKS}
          keyExtractor={item => item}
          contentContainerStyle={{ paddingTop: vh(2) }}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.bankCard} onPress={()=>{
              navigation.navigate(Routes.FASTTAG_BUY_NEW_FASTTAG)
            }}>
              <View style={styles.bankIcon}>
                <AppText style={styles.bankIconText}>🏦</AppText>
              </View>

              <View style={{ flex: 1 }}>
                <AppText style={styles.bankName}>{item}</AppText>
                <AppText style={styles.bankSub}>FastTag Issuer</AppText>
              </View>

              <AppText style={styles.chevron}>›</AppText>
            </TouchableOpacity>
          )}
        />

        {/* What's Included */}
        <View style={styles.infoBox}>
          <AppText style={styles.infoTitle}>📦 What's included</AppText>

          <AppText style={styles.infoItem}>• New FastTag with security deposit</AppText>
          <AppText style={styles.infoItem}>• Home delivery within 7–10 days</AppText>
          <AppText style={styles.infoItem}>• Installation guide included</AppText>
          <AppText style={styles.infoItem}>• Auto-activation on first use</AppText>
        </View>

      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: vw(5),
    paddingTop: vh(3),
  },

  title: {
    fontSize: vw(4.8),
    fontFamily: Fonts.bold,
    color: '#111827',
  },

  subtitle: {
    marginTop: vh(0.8),
    fontSize: vw(3.4),
    color: '#6B7280',
    fontFamily: Fonts.regular,
  },

  bankCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: vw(4),
    marginBottom: vh(1.6),
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },

  bankIcon: {
    width: vw(12),
    height: vw(12),
    borderRadius: vw(6),
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: vw(3),
  },

  bankIconText: {
    fontSize: vw(5),
  },

  bankName: {
    fontSize: vw(3.8),
    fontFamily: Fonts.semiBold,
    color: '#111827',
  },

  bankSub: {
    marginTop: vh(0.3),
    fontSize: vw(3.2),
    color: '#6B7280',
  },

  chevron: {
    fontSize: vw(6),
    color: '#9CA3AF',
  },

  infoBox: {
    marginTop: vh(2),
    backgroundColor: '#F9F5FF',
    borderRadius: 16,
    padding: vw(4),
    borderWidth: 1,
    borderColor: '#E9D5FF',
  },

  infoTitle: {
    fontSize: vw(3.6),
    fontFamily: Fonts.semiBold,
    color: '#7C3AED',
    marginBottom: vh(1),
  },

  infoItem: {
    fontSize: vw(3.2),
    color: '#6B21A8',
    marginBottom: vh(0.6),
  },
});

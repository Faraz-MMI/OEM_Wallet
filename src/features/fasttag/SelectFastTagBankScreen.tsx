import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
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

const BANKS = [
  'IDFC First Bank',
  'Axis Bank',
  'ICICI Bank',
  'HDFC Bank',
  'SBI',
  'Paytm Payments Bank',
  'Kotak Mahindra Bank',
  'Yes Bank',
];

export default function SelectFastTagBankScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<FastTagStackParamList>>();
  return (
    <ScreenContainer>
      <CustomTopBar title='Add Existing FastTag' icon={<BBPS_LOG width={vw(20)} height={vw(20)} />} canShowIcon />
      <View style={styles.container}>

        {/* HEADER */}
        <Text style={styles.title}>Select your FastTag issuing bank</Text>
        <Text style={styles.subtitle}>
          Select from popular banks and payment providers
        </Text>

        {/* BANK LIST */}
        <FlatList
          data={BANKS}
          keyExtractor={(item) => item}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: vh(3) }}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.bankCard} onPress={() => {
              navigation.navigate(Routes.FASTTAG_ENTER_VEHICLE_NUMBER)
            }}>
              <View style={styles.iconCircle}>
                <Text style={styles.bankIcon}>🏦</Text>
              </View>

              <View style={{ flex: 1 }}>
                <Text style={styles.bankName}>{item}</Text>
                <Text style={styles.bankSub}>FastTag Issuer</Text>
              </View>

              <Text style={styles.chevron}>›</Text>
            </TouchableOpacity>
          )}
        />

        {/* INFO BOX */}
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>💡 How it works</Text>
          <Text style={styles.infoText}>
            Enter your vehicle number to fetch your existing FastTag details.
            Once linked, you can view and recharge your FastTag anytime from
            this account.
          </Text>
        </View>

      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: vw(5),
    flex: 1,
  },

  title: {
    fontSize: FONT_SIZE.FONT_18,
    fontFamily: Fonts.bold,
    color: '#0F172A',
  },

  subtitle: {
    marginTop: vh(0.8),
    fontSize: FONT_SIZE.FONT_14,
    color: '#64748B',
    fontFamily: Fonts.regular,
  },

  bankCard: {
    marginTop: vh(2),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: vw(4),
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },

  iconCircle: {
    width: vw(10),
    height: vw(10),
    borderRadius: vw(5),
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: vw(4),
  },

  bankIcon: {
    fontSize: FONT_SIZE.FONT_18,
  },

  bankName: {
    fontSize: FONT_SIZE.FONT_16,
    fontFamily: Fonts.semiBold,
    color: '#0F172A',
  },

  bankSub: {
    marginTop: vh(0.3),
    fontSize: FONT_SIZE.FONT_12,
    color: '#64748B',
  },

  chevron: {
    fontSize: FONT_SIZE.FONT_24,
    color: '#94A3B8',
  },

  infoBox: {
    marginTop: vh(3),
    backgroundColor: '#EFF6FF',
    borderRadius: 12,
    padding: vw(4),
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },

  infoTitle: {
    fontSize: FONT_SIZE.FONT_14,
    fontFamily: Fonts.semiBold,
    color: '#1D4ED8',
  },

  infoText: {
    marginTop: vh(0.8),
    fontSize: FONT_SIZE.FONT_14,
    color: '#1E3A8A',
    lineHeight: 18,
  },
});

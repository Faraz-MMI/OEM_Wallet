import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import AppText from '../../ui/components/AppText';
import { Fonts } from '../../ui/theme/fonts';
import { vw, vh } from '../../ui/theme/dimensions';
import { FastTagStackParamList } from '../../app/navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { Routes } from '../../app/constants/routes';
import ScreenContainer from '../../ui/components/ScreenContainer';
import CustomTopBar from '../../ui/components/CustomTopBar';
import { COLORS } from '../../app/constants/colors';

export default function AddFastTagBalanceScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<FastTagStackParamList>>();
  const quickAmounts = [500, 1000, 2000];
  const [selectedAmount, setSelectedAmount] = useState<number | null>(500);
  const [customAmount, setCustomAmount] = useState('500');

  const amount = selectedAmount ?? Number(customAmount);
  const isValid = amount > 0;

  const onSelectAmount = (val: number) => {
    setSelectedAmount(val);
    setCustomAmount(String(val));
  };

  return (
    <ScreenContainer>
      <CustomTopBar title='Add FastTag Balance' onBack={() => navigation.goBack()} />
      <View style={styles.container}>
        <AppText style={styles.label}>Select Amount</AppText>

        <View style={styles.amountRow}>
          {quickAmounts.map(val => (
            <TouchableOpacity
              key={val}
              style={[
                styles.amountChip,
                selectedAmount === val && styles.amountChipActive,
              ]}
              onPress={() => onSelectAmount(val)}
            >
              <AppText
                style={[
                  styles.amountText,
                  selectedAmount === val && styles.amountTextActive,
                ]}
              >
                ₹ {val}
              </AppText>
            </TouchableOpacity>
          ))}
        </View>

        <AppText style={[styles.label,{marginTop:vh(4)}]}>Custom Amount</AppText>

        <View style={styles.inputBox}>
          <TextInput
            value={customAmount}
            onChangeText={text => {
              setSelectedAmount(null);
              setCustomAmount(text.replace(/[^0-9]/g, ''));
            }}
            keyboardType="numeric"
            placeholder="500"
            placeholderTextColor="#717182"
            style={styles.input}
          />
        </View>

        <TouchableOpacity
          disabled={!isValid}
          style={[
            styles.cta,
            { backgroundColor: COLORS.BUTTON_SELECTED, opacity: isValid ? 1 : 0.5 },
          ]}
          onPress={() => { navigation.navigate(Routes.REVIEW_PAYMENT) }}
        >
          <AppText style={styles.ctaText}>Proceed to Pay</AppText>
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
  },

  label: {
    marginTop: vh(3),
    fontSize: vw(3.6),
    color: '#6B7280',
    fontFamily: Fonts.regular
  },

  /* Amount Chips */
  amountRow: {
    flexDirection: 'row',
    marginTop: vh(1.5),
  },

  amountChip: {
    // paddingVertical: vh(1.2),
    // paddingHorizontal: vw(4),
    width: vw(28),
    height: vh(7),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginRight: vw(3),
  },

  amountChipActive: {
    backgroundColor: '#005ABF',
    borderColor: '#005ABF',
  },

  amountText: {
    fontSize: vw(4.1),
    fontFamily: Fonts.medium,
    color: '#111111',
  },

  amountTextActive: {
    color: '#FFFFFF',
  },

  /* Input */
  inputBox: {
    marginTop: vh(1.5),
    height: vh(6.5),
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingHorizontal: vw(4),
    justifyContent: 'center',
  },

  input: {
    fontSize: vw(5),
    fontFamily: Fonts.bold,
    color: '#111111',
  },

  /* CTA */
  cta: {
    marginTop: vh(8),
    height: vh(6.8),
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  ctaText: {
    color: COLORS.WHITE,
    fontSize: vw(3.6),
    fontFamily: Fonts.regular,
  },
});

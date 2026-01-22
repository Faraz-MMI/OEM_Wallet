import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import ScreenContainer from '../../ui/components/ScreenContainer';
import { COLORS } from '../../app/constants/colors';
import { Fonts } from '../../ui/theme/fonts';

export default function ChallanPaymentSuccessScreen({ navigation }: any) {
  return (
    <ScreenContainer>
      {/* ===== Success Icon ===== */}
      <View style={styles.iconWrap}>
        <View style={styles.successIcon}>
          <Text style={styles.check}>✓</Text>
        </View>
      </View>

      {/* ===== Title ===== */}
      <Text style={styles.title}>
        Challan Paid Successfully <Text style={styles.tick}>✅</Text>
      </Text>

      <Text style={styles.subtitle}>
        Your traffic challan has been cleared
      </Text>

      {/* ===== Summary Card ===== */}
      <View style={styles.card}>
        <Text style={styles.amountLabel}>Amount Paid</Text>
        <Text style={styles.amount}>₹1,000</Text>
        <Text style={styles.paymentSource}>Paid via FastTag Wallet</Text>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Offence */}
        <View style={styles.row}>
          <Text style={styles.label}>Offence</Text>
          <Text style={styles.value}>Overspeeding</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Challan ID</Text>
          <Text style={styles.value}>CHLN202412001</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Vehicle</Text>
          <Text style={styles.value}>MH12AB1234</Text>
        </View>

        {/* Transaction ID */}
        <View style={styles.txnBox}>
          <Text style={styles.txnLabel}>Transaction ID</Text>
          <Text style={styles.txnValue}>TXN1768573257832</Text>
        </View>

        {/* Download */}
        <TouchableOpacity style={styles.downloadBtn}>
          <Text style={styles.downloadText}>⬇ Download Receipt</Text>
        </TouchableOpacity>
      </View>

      {/* ===== Actions ===== */}
      <TouchableOpacity
        style={styles.primaryBtn}
        onPress={() => navigation.navigate('FastTag')}
      >
        <Text style={styles.primaryText}>Back to FastTag</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.secondaryBtn}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.secondaryText}>Go to Home</Text>
      </TouchableOpacity>
    </ScreenContainer>
  );
}


const styles = StyleSheet.create({
  iconWrap: {
    marginTop: 32,
    alignItems: 'center',
  },

  successIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#16A34A',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },

  check: {
    color: '#FFFFFF',
    fontSize: 36,
    fontWeight: '700',
  },

  title: {
    marginTop: 20,
    fontSize: 22,
    fontFamily: Fonts.bold,
    color: '#101828',
    textAlign: 'center',
  },

  tick: {
    fontSize: 20,
  },

  subtitle: {
    marginTop: 6,
    fontSize: 14,
    color: '#475467',
    textAlign: 'center',
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginTop: 24,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 6,
  },

  amountLabel: {
    textAlign: 'center',
    color: '#475467',
  },

  amount: {
    textAlign: 'center',
    fontSize: 28,
    fontFamily: Fonts.bold,
    color: '#16A34A',
    marginTop: 4,
  },

  paymentSource: {
    textAlign: 'center',
    color: '#667085',
    marginTop: 4,
  },

  divider: {
    height: 1,
    backgroundColor: '#E4E7EC',
    marginVertical: 16,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 6,
  },

  label: {
    color: '#667085',
  },

  value: {
    color: '#101828',
    fontFamily: Fonts.medium,
  },

  txnBox: {
    backgroundColor: '#EFF8FF',
    borderRadius: 12,
    padding: 12,
    marginTop: 16,
  },

  txnLabel: {
    fontSize: 12,
    color: '#175CD3',
    textAlign: 'center',
  },

  txnValue: {
    marginTop: 4,
    fontFamily: Fonts.bold,
    color: '#175CD3',
    textAlign: 'center',
  },

  downloadBtn: {
    marginTop: 16,
    height: 44,
    backgroundColor: '#F2F4F7',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  downloadText: {
    color: '#344054',
    fontFamily: Fonts.medium,
  },

  primaryBtn: {
    marginTop: 24,
    height: 52,
    backgroundColor: COLORS.APP_PRIMARY,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },

  primaryText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: Fonts.bold,
  },

  secondaryBtn: {
    marginTop: 12,
    height: 52,
    backgroundColor: '#F2F4F7',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },

  secondaryText: {
    color: '#101828',
    fontSize: 16,
    fontFamily: Fonts.medium,
  },
});

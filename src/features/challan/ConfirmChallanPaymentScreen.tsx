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

type Props = {
  walletBalance: number;
};

const CHALLAN_AMOUNT = 1000;

export default function ConfirmChallanPaymentScreen() {
  const hasSufficientBalance = 1001 >= CHALLAN_AMOUNT;

  return (
    <ScreenContainer>
      {/* ===== Challan Summary ===== */}
      <Text style={styles.sectionTitle}>Challan Summary</Text>

      <View style={styles.summaryCard}>
        <Text style={styles.challanType}>Traffic Challan</Text>
        <Text style={styles.challanTitle}>Overspeeding</Text>
        <Text style={styles.challanLocation}>BKC Flyover, Mumbai</Text>

        <View style={styles.divider} />

        <Text style={styles.challanIdLabel}>Challan ID</Text>
        <Text style={styles.challanId}>CHLN202412001</Text>
      </View>

      {/* ===== Payment Details ===== */}
      <Text style={styles.sectionTitle}>Payment Details</Text>

      <View style={styles.paymentCard}>
        <Row label="Vehicle" value="MH12AB1234" />
        <Row label="Challan Amount" value="₹1,000" />
        <Row label="Payment Source" value="FastTag Wallet" highlight />

        <View style={styles.divider} />

        <Row label="Total Amount" value="₹1,000" strong />
      </View>

      {/* ===== Balance Status ===== */}
      {hasSufficientBalance ? (
        <View style={styles.successBox}>
          <Text style={styles.successTitle}>Sufficient Balance</Text>
          <Text style={styles.successText}>
            Current FastTag Balance: ₹ 1,001
          </Text>
        </View>
      ) : (
        <View style={styles.errorBox}>
          <Text style={styles.errorTitle}>Insufficient Balance</Text>
          <Text style={styles.errorText}>
            Current FastTag Balance: ₹1,001
          </Text>

          <TouchableOpacity>
            <Text style={styles.rechargeText}>Recharge FastTag</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* ===== Important Info ===== */}
      <View style={styles.infoBox}>
        <Text style={styles.infoText}>• Payment confirmation will be sent to your registered mobile</Text>
        <Text style={styles.infoText}>• Challan will be marked as paid within 24 hours</Text>
        <Text style={styles.infoText}>• Keep the transaction receipt for your records</Text>
      </View>

      {/* ===== CTA ===== */}
      <TouchableOpacity
        disabled={!hasSufficientBalance}
        style={[
          styles.payButton,
          !hasSufficientBalance && styles.payButtonDisabled,
        ]}
      >
        <Text style={styles.payButtonText}>Proceed to Pay</Text>
      </TouchableOpacity>

      <Text style={styles.pinHint}>
        You will be prompted for your 4-digit PIN
      </Text>
    </ScreenContainer>
  );
}

/* ========================= */
/* ===== Reusable Row ===== */
/* ========================= */

function Row({
  label,
  value,
  strong,
  highlight,
}: {
  label: string;
  value: string;
  strong?: boolean;
  highlight?: boolean;
}) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text
        style={[
          styles.rowValue,
          strong && styles.rowValueStrong,
          highlight && styles.rowValueHighlight,
        ]}
      >
        {value}
      </Text>
    </View>
  );
}

/* ========================= */
/* ===== Styles ===== */
/* ========================= */

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 18,
    fontFamily: Fonts.bold,
    marginVertical: 12,
    color: '#101828',
  },

  summaryCard: {
    backgroundColor: '#FFECEC',
    borderRadius: 16,
    padding: 16,
  },

  challanType: {
    color: '#D92D20',
    fontFamily: Fonts.medium,
  },

  challanTitle: {
    fontSize: 20,
    fontFamily: Fonts.bold,
    color: '#D92D20',
  },

  challanLocation: {
    color: '#7A271A',
    marginTop: 4,
  },

  challanIdLabel: {
    marginTop: 8,
    color: '#7A271A',
  },

  challanId: {
    fontFamily: Fonts.bold,
    color: '#7A271A',
  },

  paymentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginTop: 8,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 6,
  },

  rowLabel: {
    color: '#475467',
  },

  rowValue: {
    color: '#101828',
    fontFamily: Fonts.medium,
  },

  rowValueStrong: {
    fontSize: 18,
    color: COLORS.APP_PRIMARY,
  },

  rowValueHighlight: {
    color: COLORS.APP_PRIMARY,
  },

  divider: {
    height: 1,
    backgroundColor: '#E4E7EC',
    marginVertical: 12,
  },

  successBox: {
    backgroundColor: '#ECFDF3',
    borderRadius: 12,
    padding: 12,
    marginTop: 16,
  },

  successTitle: {
    color: '#027A48',
    fontFamily: Fonts.bold,
  },

  successText: {
    color: '#027A48',
    marginTop: 4,
  },

  errorBox: {
    backgroundColor: '#FEF3F2',
    borderRadius: 12,
    padding: 12,
    marginTop: 16,
  },

  errorTitle: {
    color: '#B42318',
    fontFamily: Fonts.bold,
  },

  errorText: {
    color: '#B42318',
    marginTop: 4,
  },

  rechargeText: {
    color: COLORS.APP_PRIMARY,
    marginTop: 8,
    fontFamily: Fonts.bold,
  },

  infoBox: {
    backgroundColor: '#EFF8FF',
    borderRadius: 12,
    padding: 12,
    marginTop: 16,
  },

  infoText: {
    color: '#175CD3',
    marginBottom: 4,
  },

  payButton: {
    marginTop: 24,
    height: 52,
    backgroundColor: COLORS.APP_PRIMARY,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },

  payButtonDisabled: {
    backgroundColor: '#9BBBE3',
  },

  payButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: Fonts.bold,
  },

  pinHint: {
    marginTop: 8,
    textAlign: 'center',
    color: '#667085',
  },
});

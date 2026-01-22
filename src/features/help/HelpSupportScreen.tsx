import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AppText from '../../ui/components/AppText';
import { vw, vh } from '../../ui/theme/dimensions';
import { Fonts } from '../../ui/theme/fonts';
import ScreenContainer from '../../ui/components/ScreenContainer';
import CustomTopBar from '../../ui/components/CustomTopBar';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ICON_BOTTOM_ANGLE_ARROW } from '../../assets/icons';

const FAQS = [
  { q: 'How do I add money to my wallet?', tag: 'Wallet usage', instructions: 'Go to Home > Add Money, select your preferred payment method (UPI, Card, Net Banking), enter the amount, and complete the payment. Money will be credited instantly.' },
  { q: 'What is the minimum wallet balance required?', tag: 'Wallet usage', instructions: 'There is no minimum balance requirement. You can maintain any balance in your wallet and add money whenever needed.' },
  { q: 'How do I recharge my FastTag?', tag: 'Fastag recharge', instructions: 'Navigate to FastTag section from home, click "Recharge", enter the amount (minimum ₹100), and confirm payment. The FastTag will be recharged immediately.' },
  { q: 'Can I get a refund for unused FastTag balance?', tag: 'Fastag recharge', instructions: 'Yes, you can request a FastTag refund. Go to FastTag > Refund, enter the amount you want to refund (will be credited to wallet), and submit your request.' },
  { q: 'How do I purchase vouchers?', tag: 'Voucher purchases', instructions: 'Go to Vouchers section, browse available offers, select the voucher you want, enter the amount or quantity, and complete the purchase using your wallet balance.' },
  { q: 'Where can I view my purchased vouchers?', tag: 'Voucher purchases', instructions: 'All your purchased vouchers are available in Vouchers > My Vouchers section. You can view details, redemption codes, and validity dates there.' },
  { q: 'What should I do if my payment fails?', tag: 'Payment failures', instructions: 'If a payment fails, the amount will be automatically refunded to your original payment source within 5-7 business days. Check your transaction history for status updates.' },
  { q: 'Why was my transaction declined?', tag: 'Payment failures', instructions: 'Transactions can be declined due to insufficient balance, bank issues, or technical errors. Please check your wallet balance and try again. Contact support if the issue persists.' },
];
type Props = NativeStackScreenProps<any>;
export default function HelpSupportScreen({ navigation }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <ScreenContainer>
      <CustomTopBar title='Help & Support' onBack={() => navigation.goBack()} />

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

        <LinearGradient
          colors={['#2563EB', '#005ABF']}
          style={styles.hero}
        >
          <AppText style={styles.heroTitle}>Need Help?</AppText>
          <AppText style={styles.heroSub}>
            Our support team is here for you
          </AppText>

          <AppText style={styles.heroDesc}>
            Our support team is available to help with wallet, payment, and
            account-related queries.
          </AppText>

          <View style={styles.heroActions}>
            <ActionBtn label="Email" />
            <ActionBtn label="Call" />
          </View>
        </LinearGradient>


        <View style={styles.card}>
          <AppText style={styles.cardTitle}>Contact Support</AppText>

          <InfoRow label="Email" value="frz.support@walletapp.com" color="#2563EB" />
          <InfoRow label="Phone" value="+91 9940368464" color="#16A34A" />
        </View>


        <AppText style={styles.sectionTitle}>Frequently Asked Questions</AppText>

        <View style={styles.chipsRow}>
          <Chip label="Wallet usage" />
          <Chip label="Fastag recharge" />
          <Chip label="Vouchers" />
        </View>

        {FAQS.map((item, index) => (
          <FAQItem
            key={index}
            item={item}
            open={openIndex === index}
            onPress={() =>
              setOpenIndex(openIndex === index ? null : index)
            }
          />
        ))}


        <View style={styles.footer}>
          <AppText style={styles.footerText}>
            🕒 Our customer support team is available Monday to Saturday,
            9 AM - 6 PM IST. We typically respond within 24 hours.
          </AppText>
        </View>

        <View style={{ height: vh(4) }} />
      </ScrollView>
    </ScreenContainer>
  );
}

function ActionBtn({ label }: { label: string }) {
  return (
    <TouchableOpacity style={styles.actionBtn}>
      <AppText style={styles.actionText}>{label}</AppText>
    </TouchableOpacity>
  );
}

function InfoRow({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color: string;
}) {
  return (
    <View style={styles.infoRow}>
      <AppText style={styles.infoLabel}>{label}</AppText>
      <AppText style={[styles.infoValue, { color }]}>{value}</AppText>
    </View>
  );
}

function Chip({ label }: { label: string }) {
  return (
    <View style={styles.chip}>
      <AppText style={styles.chipText}>{label}</AppText>
    </View>
  );
}

function FAQItem({
  item,
  open,
  onPress,
}: {
  item: { q: string; tag: string, instructions: string };
  open: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity style={styles.faqItem} onPress={onPress}>
      <View style={styles.faqHeader}>
        <AppText style={styles.faqQ}>{item.q}</AppText>
        {/* <AppText>{open ? '▲' : '▼'}</AppText> */}
        {open ? <ICON_BOTTOM_ANGLE_ARROW style={{ transform: [{ scaleY: -1 }] }} /> : <ICON_BOTTOM_ANGLE_ARROW />}
      </View>
      <AppText style={styles.faqTag}>{item.tag}</AppText>
      {open && (
        <AppText style={{ marginTop: vh(1.5), color: '#374151' }}>
          {item.instructions}
        </AppText>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: vw(5),
  },

  hero: {
    borderRadius: 20,
    padding: vw(5),
    marginTop: vh(2),
  },

  heroTitle: {
    fontSize: vw(4.8),
    fontFamily: Fonts.semiBold,
    color: '#FFFFFF',
  },

  heroSub: {
    marginTop: vh(0.5),
    color: '#DDE9FF',
  },

  heroDesc: {
    marginTop: vh(1.2),
    color: '#E5EEFF',
    fontSize: vw(3.2),
  },

  heroActions: {
    flexDirection: 'row',
    marginTop: vh(2),
  },

  actionBtn: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingVertical: vh(1.2),
    borderRadius: 10,
    marginRight: vw(2),
    alignItems: 'center',
  },

  actionText: {
    color: '#FFFFFF',
    fontFamily: Fonts.medium,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: vw(5),
    marginTop: vh(3),
    elevation: 2,
  },

  cardTitle: {
    fontSize: vw(4.2),
    fontFamily: Fonts.semiBold,
    marginBottom: vh(2),
  },

  infoRow: {
    marginBottom: vh(1.5),
  },

  infoLabel: {
    color: '#6B7280',
    fontSize: vw(3.2),
  },

  infoValue: {
    fontSize: vw(3.6),
    fontFamily: Fonts.medium,
  },

  sectionTitle: {
    marginTop: vh(4),
    fontSize: vw(4.4),
    fontFamily: Fonts.semiBold,
  },

  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: vh(2),
  },

  chip: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 20,
    paddingHorizontal: vw(4),
    paddingVertical: vh(0.8),
    marginRight: vw(2),
    marginBottom: vh(1),
  },

  chipText: {
    fontSize: vw(3.2),
  },

  faqItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: vw(4),
    marginTop: vh(1.5),
  },

  faqHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  faqQ: {
    fontSize: vw(3.6),
    fontFamily: Fonts.medium,
    flex: 1,
  },

  faqTag: {
    marginTop: vh(0.5),
    color: '#6B7280',
    fontSize: vw(3),
  },

  footer: {
    backgroundColor: '#FEF3C7',
    borderRadius: 12,
    padding: vw(4),
    marginTop: vh(4),
  },

  footerText: {
    fontSize: vw(3.2),
    color: '#92400E',
  },
});

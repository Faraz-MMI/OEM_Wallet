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

const FAQS = [
  { q: 'How do I add money to my wallet?', tag: 'Wallet usage' },
  { q: 'What is the minimum wallet balance required?', tag: 'Wallet usage' },
  { q: 'How do I recharge my FastTag?', tag: 'Fastag recharge' },
  { q: 'Can I get a refund for unused FastTag balance?', tag: 'Fastag recharge' },
  { q: 'How do I purchase vouchers?', tag: 'Voucher purchases' },
  { q: 'Where can I view my purchased vouchers?', tag: 'Voucher purchases' },
  { q: 'What should I do if my payment fails?', tag: 'Payment failures' },
  { q: 'Why was my transaction declined?', tag: 'Payment failures' },
];
type Props=NativeStackScreenProps<any>;
export default function HelpSupportScreen({navigation}:Props) {
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

          <InfoRow label="Email" value="support@walletapp.com" color="#2563EB" />
          <InfoRow label="Phone" value="+91 XXXXXXXXXX" color="#16A34A" />
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
  item: { q: string; tag: string };
  open: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity style={styles.faqItem} onPress={onPress}>
      <View style={styles.faqHeader}>
        <AppText style={styles.faqQ}>{item.q}</AppText>
        <AppText>{open ? '▲' : '▼'}</AppText>
      </View>
      <AppText style={styles.faqTag}>{item.tag}</AppText>
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

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import ScreenContainer from '../../ui/components/ScreenContainer';
import { vw, vh, FONT_SIZE } from '../../ui/theme/dimensions';
import { Fonts } from '../../ui/theme/fonts';
import { COLORS } from '../../app/constants/colors';
import CustomTopBar from '../../ui/components/CustomTopBar';
import { MainStack } from '../../app/navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { Routes } from '../../app/constants/routes';
import { CheckCircle, ICON_EXCLAM_CIRCLE } from '../../assets/icons';

export default function TrafficChallansScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<MainStack>>();
  return (
    <ScreenContainer>
      <CustomTopBar title="Traffic Challans" onBack={() => { navigation.goBack(); }} />
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >

        {/* SUMMARY */}
        <View style={styles.summaryRow}>
          <View style={[styles.summaryCard, styles.outstandingCard]}>
            <Text style={styles.summaryLabelRed}>Total Outstanding</Text>
            <Text style={styles.summaryAmountRed}>₹1,500</Text>
          </View>

          <View style={[styles.summaryCard, styles.unpaidCard]}>
            <Text style={styles.summaryLabelOrange}>Unpaid Challans</Text>
            <Text style={styles.summaryCount}>2</Text>
          </View>
        </View>

        {/* VEHICLE */}
        <View style={styles.vehicleInfo}>
          <Text style={styles.vehicleText}>
            🚗 Showing challans for:{' '}
            <Text style={styles.vehicleNumber}>MH12AB1234</Text>
          </Text>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: vh(3) }}>
          <ICON_EXCLAM_CIRCLE width={vw(6)} height={vw(6)} style={{ marginRight: vw(2), marginTop: vh(3) }} />
          <Text style={styles.sectionTitle}> Unpaid Challans</Text>
        </View>

        <ChallanCard
          title="Overspeeding"
          location="BKC Flyover, Mumbai"
          date="14 Dec 2024"
          amount="₹1,000"
          status="UNPAID"
          onPress={() => { navigation.navigate(Routes.CHALLAN_STACK, { screen: Routes.CHALLAN_DETAILS, params: { status: "UNPAID" } }); }}
        />

        <ChallanCard
          title="Signal Jump"
          location="Andheri East"
          date="10 Dec 2024"
          amount="₹500"
          status="UNPAID"
        />

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <CheckCircle width={vw(6)} height={vw(6)} style={{ marginRight: vw(2), marginTop: vh(3) }} />
          <Text style={[styles.sectionTitle, { marginTop: vh(3) }]}>
            Paid Challans
          </Text>
        </View>


        <ChallanCard
          title="Parking Violation"
          location="Worli Sea Face"
          date="28 Nov 2024"
          amount="₹200"
          status="PAID"
          onPress={() => { navigation.navigate(Routes.CHALLAN_STACK, { screen: Routes.CHALLAN_DETAILS, params: { status: "PAID" } }); }}
        />

        <ChallanCard
          title="Wrong Lane Driving"
          location="Mumbai–Pune Expressway"
          date="15 Nov 2024"
          amount="₹300"
          status="PAID"
        />

      </ScrollView>
    </ScreenContainer>
  );
}

type ChallanProps = {
  title: string;
  location: string;
  date: string;
  amount: string;
  status: 'PAID' | 'UNPAID';
  onPress?: () => void;
};

const ChallanCard = ({
  title,
  location,
  date,
  amount,
  status,
  onPress
}: ChallanProps) => {
  const isPaid = status === 'PAID';

  return (
    <TouchableOpacity
      style={[
        styles.challanCard,
        isPaid ? styles.paidBorder : styles.unpaidBorder,
      ]}
      onPress={onPress}
    >
      <View style={styles.challanHeader}>
        <Text style={styles.challanTitle}>{title}</Text>

        <View
          style={[
            styles.statusChip,
            isPaid ? styles.paidChip : styles.unpaidChip,
          ]}
        >
          <Text
            style={[
              styles.statusText,
              isPaid ? styles.paidText : styles.unpaidText,
            ]}
          >
            {isPaid ? 'Paid' : 'Unpaid'}
          </Text>
        </View>
      </View>

      <Text style={styles.location}>{location}</Text>

      <View style={styles.footer}>
        <Text style={styles.date}>{date}</Text>
        <Text
          style={[
            styles.amount,
            isPaid ? styles.amountPaid : styles.amountUnpaid,
          ]}
        >
          {amount}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: vw(5),
    paddingBottom: vh(4),
  },

  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  summaryCard: {
    width: '48%',
    padding: vw(4),
    borderRadius: 14,
  },

  outstandingCard: {
    backgroundColor: '#FFEAEA',
    borderWidth: 1,
    borderColor: '#FFB4B4',
  },

  unpaidCard: {
    backgroundColor: '#FFF2DD',
    borderWidth: 1,
    borderColor: '#FFD6A5',
  },

  summaryLabelRed: {
    fontSize: FONT_SIZE.FONT_14,
    color: '#E11D48',
    fontFamily: Fonts.medium,
  },

  summaryAmountRed: {
    marginTop: vh(1),
    fontSize: FONT_SIZE.FONT_24,
    fontFamily: Fonts.bold,
    color: '#E11D48',
  },

  summaryLabelOrange: {
    fontSize: FONT_SIZE.FONT_14,
    color: '#EA580C',
    fontFamily: Fonts.medium,
  },

  summaryCount: {
    marginTop: vh(1),
    fontSize: FONT_SIZE.FONT_24,
    fontFamily: Fonts.bold,
    color: '#EA580C',
  },

  vehicleInfo: {
    marginTop: vh(2),
    backgroundColor: '#EEF4FF',
    padding: vw(4),
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#C7D7FE',
  },

  vehicleText: {
    fontSize: FONT_SIZE.FONT_14,
    color: '#1E40AF',
  },

  vehicleNumber: {
    fontFamily: Fonts.bold,
  },

  sectionTitle: {
    marginTop: vh(3),
    fontSize: FONT_SIZE.FONT_18,
    fontFamily: Fonts.bold,
    color: '#111827',
  },

  challanCard: {
    marginTop: vh(2),
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: vw(4),
  },

  unpaidBorder: {
    borderLeftWidth: 4,
    borderLeftColor: '#EF4444',
  },

  paidBorder: {
    borderLeftWidth: 4,
    borderLeftColor: '#22C55E',
  },

  challanHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  challanTitle: {
    fontSize: FONT_SIZE.FONT_16,
    fontFamily: Fonts.bold,
    color: '#111827',
  },

  statusChip: {
    paddingHorizontal: vw(3),
    paddingVertical: vh(0.4),
    borderRadius: 999,
  },

  unpaidChip: {
    backgroundColor: '#FEE2E2',
  },

  paidChip: {
    backgroundColor: '#DCFCE7',
  },

  statusText: {
    fontSize: FONT_SIZE.FONT_12,
    fontFamily: Fonts.medium,
  },

  unpaidText: {
    color: '#EF4444',
  },

  paidText: {
    color: '#22C55E',
  },

  location: {
    marginTop: vh(0.8),
    fontSize: FONT_SIZE.FONT_14,
    color: '#6B7280',
  },

  footer: {
    marginTop: vh(1.5),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  date: {
    fontSize: FONT_SIZE.FONT_14,
    color: '#9CA3AF',
  },

  amount: {
    fontSize: FONT_SIZE.FONT_16,
    fontFamily: Fonts.bold,
  },

  amountUnpaid: {
    color: '#EF4444',
  },

  amountPaid: {
    color: '#6B7280',
  },
});

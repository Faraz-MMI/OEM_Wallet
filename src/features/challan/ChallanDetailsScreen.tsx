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
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { ChallanStackParamList, MainStack } from '../../app/navigation/types';
import { Routes } from '../../app/constants/routes';
import CustomTopBar from '../../ui/components/CustomTopBar';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type ChallanDetailsRouteProp = RouteProp<ChallanStackParamList, typeof Routes.CHALLAN_DETAILS>;
export default function ChallanDetailsScreen() {
  const route = useRoute<ChallanDetailsRouteProp>();
  const { status } = route.params;
  const navigation = useNavigation<NativeStackNavigationProp<MainStack>>();

  return (
    <ScreenContainer>
      <CustomTopBar title="Challan Details" onBack={() => { navigation.goBack(); }} />
      <View style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
        >
          {/* STATUS */}
          {status === 'UNPAID' ? (
            <View style={styles.unpaidBanner}>
              <View style={styles.unpaidIcon}>
                <Text style={styles.iconText}>📄</Text>
              </View>
              <View>
                <Text style={styles.unpaidTitle}>Status: Unpaid</Text>
                <Text style={styles.unpaidSubtitle}>
                  Payment required to clear challan
                </Text>
              </View>
            </View>
          ) : <View style={[styles.unpaidBanner, { borderColor: '#B9F8CF', backgroundColor: '#F0FDF4', }]}>
            <View style={[styles.unpaidIcon,{backgroundColor:'#DCFCE7'}]}>
              <Text style={styles.iconText}>📄</Text>
            </View>
            <View>
              <Text style={[styles.unpaidTitle, { color: '#0D542B' }]}>Status: Paid</Text>
              <Text style={[styles.unpaidSubtitle, { color: '#008236' }]}>
                This challan has been cleared
              </Text>
            </View>
          </View>}

          {/* AMOUNT CARD */}
          <View style={styles.amountCard}>
            <Text style={styles.amountLabel}>Challan Amount</Text>
            <Text style={styles.amountValue}>₹1,000</Text>

            <View style={styles.offenceChip}>
              <Text style={styles.offenceChipText}>Overspeeding</Text>
            </View>
          </View>

          {/* CHALLAN INFO */}
          <View style={styles.infoCard}>
            <Text style={styles.cardTitle}>Challan Information</Text>

            <InfoRow label="Challan ID" value="CHLN202412001" />
            <InfoRow label="Vehicle Number" value="MH12AB1234" />
            <InfoRow label="Location" value="BKC Flyover, Mumbai" />
            <InfoRow label="Date" value="14 Dec 2024" />
            <InfoRow label="Authority" value="Mumbai Traffic Police" />
          </View>

          {/* OFFENCE DETAILS */}
          <View style={styles.infoCard}>
            <Text style={styles.cardTitle}>Offence Details</Text>
            <Text style={styles.description}>
              Vehicle was detected exceeding the speed limit on the specified
              road. As per Motor Vehicle Act, overspeeding poses a significant
              safety risk and is subject to penalty.
            </Text>
          </View>

          {/* PAYMENT INFO */}
          {status === 'UNPAID' && (
            <View style={styles.paymentInfo}>
              <Text style={styles.paymentTitle}>💳 Payment via FastTag</Text>
              <Text style={styles.paymentSubtitle}>
                Amount will be deducted from your FastTag wallet balance
              </Text>
            </View>
          )}
        </ScrollView>

        {/* PAY BUTTON */}
        {status === 'UNPAID' && (
          <View style={styles.bottomBar}>
            <TouchableOpacity style={styles.payButton} onPress={()=>{navigation.navigate(Routes.CHALLAN_STACK,{screen:Routes.CONFIRM_CHALLAN_PAYMENT});}}>
              <Text style={styles.payButtonText}>
                Pay ₹1,000 via FastTag
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ScreenContainer>
  );
}

const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.infoRow}>
    <Text style={styles.infoLabel}>{label}</Text>
    <Text style={styles.infoValue}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: vw(5),
    paddingBottom: vh(14),
  },

  /* UNPAID BANNER */
  unpaidBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF2F2',
    padding: vw(4),
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#FFC9C9',
    marginBottom: vh(3),
  },

  unpaidIcon: {
    width: vw(10),
    height: vw(10),
    borderRadius: vw(5),
    backgroundColor: '#FFE2E2',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: vw(3),
  },

  iconText: {
    color: '#FFFFFF',
    fontSize: vw(5),
  },

  unpaidTitle: {
    fontSize: FONT_SIZE.FONT_16,
    fontFamily: Fonts.bold,
    color: '#991B1B',
  },

  unpaidSubtitle: {
    marginTop: vh(0.4),
    fontSize: FONT_SIZE.FONT_14,
    fontFamily: Fonts.regular,
    color: '#991B1B',
  },

  /* AMOUNT CARD */
  amountCard: {
    backgroundColor: '#7C1FD8',
    borderRadius: 20,
    padding: vw(5),
    marginBottom: vh(3),
  },

  amountLabel: {
    fontSize: FONT_SIZE.FONT_14,
    fontFamily: Fonts.regular,
    color: '#E9D5FF',
  },

  amountValue: {
    marginTop: vh(1),
    fontSize: FONT_SIZE.FONT_30,
    fontFamily: Fonts.bold,
    color: '#FFFFFF',
  },

  offenceChip: {
    marginTop: vh(2),
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingVertical: vh(0.8),
    paddingHorizontal: vw(4),
    borderRadius: 999,
    alignSelf: 'flex-start',
  },

  offenceChipText: {
    fontSize: FONT_SIZE.FONT_14,
    fontFamily: Fonts.medium,
    color: '#FFFFFF',
  },

  /* INFO CARD */
  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: vw(5),
    marginBottom: vh(2.5),
  },

  cardTitle: {
    fontSize: FONT_SIZE.FONT_18,
    fontFamily: Fonts.bold,
    color: '#111827',
    marginBottom: vh(2),
  },

  infoRow: {
    marginBottom: vh(1.5),
  },

  infoLabel: {
    fontSize: FONT_SIZE.FONT_14,
    fontFamily: Fonts.regular,
    color: '#6B7280',
  },

  infoValue: {
    marginTop: vh(0.4),
    fontSize: FONT_SIZE.FONT_16,
    fontFamily: Fonts.medium,
    color: '#111827',
  },

  description: {
    fontSize: FONT_SIZE.FONT_14,
    fontFamily: Fonts.regular,
    color: '#374151',
    lineHeight: 22,
  },

  /* PAYMENT INFO */
  paymentInfo: {
    backgroundColor: '#EFF6FF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#BFDBFE',
    padding: vw(4),
    marginBottom: vh(3),
  },

  paymentTitle: {
    fontSize: FONT_SIZE.FONT_14,
    fontFamily: Fonts.medium,
    color: '#1D4ED8',
  },

  paymentSubtitle: {
    marginTop: vh(0.6),
    fontSize: FONT_SIZE.FONT_14,
    fontFamily: Fonts.regular,
    color: '#1D4ED8',
  },

  /* BOTTOM BAR */
  bottomBar: {
    padding: vw(5),
    backgroundColor: '#FFFFFF',
  },

  payButton: {
    height: vh(6.8),
    backgroundColor: COLORS.APP_PRIMARY,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },

  payButtonText: {
    color: '#FFFFFF',
    fontSize: FONT_SIZE.FONT_16,
    fontFamily: Fonts.bold,
  },
});

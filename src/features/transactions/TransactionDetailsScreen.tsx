import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import AppText from '../../ui/components/AppText';
import { vw, vh } from '../../ui/theme/dimensions';
import { Fonts } from '../../ui/theme/fonts';
import { CheckCircle } from '../../assets/icons';
import ScreenContainer from '../../ui/components/ScreenContainer';
import CustomTopBar from '../../ui/components/CustomTopBar';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<any>;
export default function TransactionDetailsScreen({ navigation }: Props) {
  return (
    <ScreenContainer>
      <CustomTopBar title='Transaction Details' onBack={()=>navigation.goBack()}/>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: vh(4) }}
        showsVerticalScrollIndicator={false}
      >
        
        <View style={styles.summaryCard}>
          <View style={styles.successIcon}>
            <CheckCircle width={26} height={26} color="#16A34A" />
          </View>

          <AppText style={styles.title}>
            Fuel Payment · Shell
          </AppText>

          <AppText style={styles.subtitle}>
            via FastTag
          </AppText>

          <AppText style={styles.amount}>
            - ₹650
          </AppText>
        </View>

        
        <View style={styles.infoCard}>
          <AppText style={styles.sectionTitle}>
            Transaction Information
          </AppText>

          <InfoRow label="Transaction ID" value="FTG202512220001" />
          <InfoRow label="Date" value="22 Dec 2024" />
          <InfoRow label="Time" value="10:30 AM" />
          <InfoRow
            label="Location"
            value="Shell Fuel Station, NH48"
          />
          <InfoRow label="Source" value="FastTag Wallet" />
          <InfoRow
            label="Receiver ID"
            value="SHELL_FUEL_10291"
          />
          <InfoRow
            label="Merchant ID"
            value="SHELL_IN_00921"
          />
          <InfoRow
            label="Status"
            value="Success"
            valueStyle={{ color: '#16A34A' }}
          />
        </View>

        
        <TouchableOpacity style={styles.primaryBtn}>
          <AppText style={styles.primaryText}>
            Download Receipt
          </AppText>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryBtn}>
          <AppText style={styles.secondaryText}>
            Share Transaction
          </AppText>
        </TouchableOpacity>
      </ScrollView>
    </ScreenContainer>
  );
}

function InfoRow({
  label,
  value,
  valueStyle,
}: {
  label: string;
  value: string;
  valueStyle?: any;
}) {
  return (
    <View style={styles.row}>
      <AppText style={styles.label}>{label}</AppText>
      <AppText style={[styles.value, valueStyle]}>
        {value}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: vw(5),
  },

  /* Summary */
  summaryCard: {
    marginTop: vh(3),
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingVertical: vh(4),
    paddingHorizontal: vw(5),
    alignItems: 'center',
    elevation: 2,
  },

  successIcon: {
    width: vw(14),
    height: vw(14),
    borderRadius: vw(7),
    backgroundColor: '#E7F8EF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: vh(2),
  },

  title: {
    fontSize: vw(4.2),
    fontFamily: Fonts.semiBold,
  },

  subtitle: {
    fontSize: vw(3.2),
    color: '#6B7280',
    marginTop: vh(0.6),
  },

  amount: {
    marginTop: vh(2),
    fontSize: vw(6),
    fontFamily: Fonts.bold,
    color: '#DC2626',
  },

  /* Info */
  infoCard: {
    marginTop: vh(3),
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: vw(5),
    elevation: 2,
  },

  sectionTitle: {
    fontSize: vw(4),
    fontFamily: Fonts.semiBold,
    marginBottom: vh(2),
  },

  row: {
    paddingVertical: vh(1.4),
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },

  label: {
    fontSize: vw(3.2),
    color: '#6B7280',
  },

  value: {
    marginTop: vh(0.4),
    fontSize: vw(3.8),
    fontFamily: Fonts.medium,
    color: '#111111',
  },

  /* Buttons */
  primaryBtn: {
    marginTop: vh(4),
    height: vh(6.8),
    backgroundColor: '#1E5EFF',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },

  primaryText: {
    color: '#FFFFFF',
    fontSize: vw(4),
    fontFamily: Fonts.semiBold,
  },

  secondaryBtn: {
    marginTop: vh(2),
    height: vh(6.8),
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
  },

  secondaryText: {
    fontSize: vw(4),
    fontFamily: Fonts.medium,
    color: '#111827',
  },
});

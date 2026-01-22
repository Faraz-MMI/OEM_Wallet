import React, { JSX } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AppText from '../../ui/components/AppText';
import { vw, vh } from '../../ui/theme/dimensions';
import { Fonts } from '../../ui/theme/fonts';

import { ICON_CALENDAR, ICON_VEHICLE, ICON_LOCATION_PIN, ICON_ELECTRIC } from '../../assets/icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStack, VehicleStackParamList } from '../../app/navigation/types';
import { Routes } from '../../app/constants/routes';
import ScreenContainer from '../../ui/components/ScreenContainer';
import CustomTopBar from '../../ui/components/CustomTopBar';
import { useUserStore } from '../../app/store/userStore';

export default function VehicleDashboardScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<MainStack>>();
  const { profile, entityId, selectedBrand } = useUserStore();
  const account =
    profile != null && profile.accounts != null && profile.accounts.length > 0 ? profile.accounts[0] : null;

  function OptionItem({
    icon,
    title,
    subtitle,
    bg,
    onPress
  }: {
    icon: JSX.Element;
    title: string;
    subtitle: string;
    bg: string;
    onPress?: () => void;
  }) {
    return (
      <TouchableOpacity activeOpacity={0.8} style={styles.optionCard} onPress={onPress}>
        <View style={[styles.optionIcon, { backgroundColor: bg }]}>
          {icon}
        </View>

        <View style={{ marginLeft: vw(4) }}>
          <AppText style={styles.optionTitle}>{title}</AppText>
          <AppText style={styles.optionSubtitle}>{subtitle}</AppText>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <ScreenContainer>
      <CustomTopBar title='My Vehicle' onBack={() => navigation.goBack()} />
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: vh(4) }}
        showsVerticalScrollIndicator={false}
      >

        <LinearGradient
          colors={[selectedBrand.color, selectedBrand.color]} //{['#0A5FD8', '#0047A5']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.vehicleCard}
        >

          <View style={styles.vehicleHeader}>
            <View style={styles.vehicleIcon}>
              <ICON_VEHICLE width={22} height={22} color="#ffffff" />
            </View>

            <View>
              <AppText style={styles.vehicleName}>{selectedBrand.vehicle}</AppText>
              <AppText style={styles.vehicleNumber}>DL 20 FRZ 0899</AppText>
            </View>
          </View>


          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <AppText style={styles.statLabel}>Fuel Type</AppText>
              <AppText style={styles.statValue}>Petrol</AppText>
            </View>

            <View style={styles.statBox}>
              <AppText style={styles.statLabel}>Year</AppText>
              <AppText style={styles.statValue}>2026</AppText>
            </View>
          </View>


          <View style={styles.serviceBox}>
            <ICON_CALENDAR width={18} height={18} color="#FFFFFF" />
            <View style={{ marginLeft: vw(3) }}>
              <AppText style={styles.serviceLabel}>Next Service</AppText>
              <AppText style={styles.serviceValue}>
                20 Aug • 1,999 kms
              </AppText>
            </View>
          </View>
        </LinearGradient>


        <OptionItem
          icon={<ICON_CALENDAR width={22} height={22} color="#2563EB" />}
          title="Service History"
          subtitle="View all service records"
          bg="#E5F0FF"
          onPress={() => {
            navigation.navigate(Routes.VEHICLE_STACK, { screen: Routes.VEHICLE_SERVICE_HISTORY });
          }}
        />

        <OptionItem
          icon={<ICON_LOCATION_PIN width={22} height={22} color="#16A34A" />}
          title="Trip Planner"
          subtitle="Plan your journey"
          bg="#DCFCE7"
        />

        <OptionItem
          icon={<ICON_ELECTRIC width={22} height={22} color="#9333EA" />}
          title="Pitstop Offers"
          subtitle="Exclusive vouchers on your route"
          bg="#F3E8FF"
          onPress={() => {
            navigation.navigate(Routes.VOUCHER_STACK, { screen: Routes.VOUCHER_HOME });
          }}
        />

        <OptionItem
          icon={<ICON_ELECTRIC width={22} height={22} color="#22C55E" />}
          title="EV Charging"
          subtitle="Find and pay for charging"
          bg="#DCFCE7"
          onPress={() => {
            navigation.navigate(Routes.VEHICLE_STACK, { screen: Routes.VEHICLE_EV_CHARGING });
          }}
        />

        <OptionItem
          icon={<ICON_ELECTRIC width={22} height={22} color="#F97316" />}
          title="Fuel Payment"
          subtitle="Pay for fuel via IVI"
          bg="#FFEDD5"
          onPress={() => {
            navigation.navigate(Routes.VEHICLE_STACK, { screen: Routes.VEHICLE_FUEL_PAYMENT });
          }}
        />
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: vw(5),
  },

  /* Vehicle Card */
  vehicleCard: {
    marginTop: vh(2),
    borderRadius: 20,
    padding: vw(5),
  },

  vehicleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  vehicleIcon: {
    width: vw(11),
    height: vw(11),
    borderRadius: vw(5.5),
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: vw(3),
    opacity: 0.2
  },

  vehicleName: {
    fontSize: vw(4.4),
    fontFamily: Fonts.semiBold,
    color: '#FFFFFF',
  },

  vehicleNumber: {
    marginTop: vh(0.4),
    fontSize: vw(3.4),
    color: '#E5EEFF',
  },

  statsRow: {
    flexDirection: 'row',
    marginTop: vh(3),
  },

  statBox: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 14,
    padding: vw(4),
    marginRight: vw(3),
  },

  statLabel: {
    fontSize: vw(3),
    color: '#DDE9FF',
  },

  statValue: {
    marginTop: vh(0.6),
    fontSize: vw(3.8),
    fontFamily: Fonts.semiBold,
    color: '#FFFFFF',
  },

  serviceBox: {
    marginTop: vh(3),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.18)',
    borderRadius: 14,
    padding: vw(4),
  },

  serviceLabel: {
    fontSize: vw(3),
    color: '#E5EEFF',
  },

  serviceValue: {
    marginTop: vh(0.4),
    fontSize: vw(3.6),
    fontFamily: Fonts.semiBold,
    color: '#FFFFFF',
  },

  /* Options */
  optionCard: {
    marginTop: vh(2.5),
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: vw(4),
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 1,
  },

  optionIcon: {
    width: vw(11),
    height: vw(11),
    borderRadius: vw(5.5),
    justifyContent: 'center',
    alignItems: 'center',
  },

  optionTitle: {
    fontSize: vw(3.8),
    fontFamily: Fonts.semiBold,
  },

  optionSubtitle: {
    marginTop: vh(0.4),
    fontSize: vw(3.2),
    color: '#6B7280',
  },
});


import React, { JSX, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { vw, vh, FONT_SIZE } from '../../ui/theme/dimensions';
import { ICON_ATM_CARD, ICON_VOUCHER, ICON_VEHICLE, ICON_BELL, ICON_USER } from '../../assets/icons';
import AppText from '../../ui/components/AppText';
import { Fonts } from '../../ui/theme/fonts';
import TransactionItem from '../../ui/components/TransactionItem';
import { useNavigation } from '@react-navigation/native';
import { Routes } from '../../app/constants/routes';
import { MainStack } from '../../app/navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useWallet } from './hooks/useWallet';
import { useFetchCustomer } from '../onboarding/hooks/useFetchCustomer';
import { useFetchTransactions } from '../transactions/hooks/useFetchTransactions';
import { usePrimaryCard, useUserProfile } from '../../app/store/selectors';
import { useUserStore } from '../../app/store/userStore';
import { startPaytmTransaction } from '../../app/services/paytm.service';
import TopBarBranding from '../../ui/components/TopBarBranding';

type NavigationProp = NativeStackNavigationProp<MainStack>;
export default function DashboardScreen() {
  const navigation = useNavigation<NavigationProp>();
  
  const { profile, entityId, selectedBrand } = useUserStore();
  const account =
    profile != null && profile.accounts != null && profile.accounts.length > 0 ? profile.accounts[0] : null;

  const { balance } = useWallet(entityId ?? "");
  const { fetchTransactions, data: fetchedTransactions } = useFetchTransactions();

  const walletDetails = balance != null && balance.result != null && balance.result.wallets.length > 0 ? balance.result.wallets[0] : null;


  useEffect(() => {
    fetchTransactions({
      mobile: { countryCode: 91, value: '9258809888' },
      kit: '20003255',
      entityId: '630863194610000193240825',
    });
  }, [profile]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar
        backgroundColor="transparent"
        translucent
      />
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: vh(4) }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={{
            flexDirection: 'row', alignItems: 'center', flexShrink: 1,
            maxWidth: '75%',
          }}>
            <TopBarBranding brand={selectedBrand} />
            <View style={{ flexShrink: 1, }}>
              <AppText style={styles.welcome}>Welcome back</AppText>
              <AppText style={styles.userName} numberOfLines={2}>{`${profile?.firstName} ${profile?.lastName}`}</AppText>
            </View>
          </View>

          <View style={styles.headerIcons}>
            <View style={styles.iconCircle}>
              <TouchableOpacity onPress={() => navigation.navigate(Routes.ALERTS)}>
                <ICON_BELL />
              </TouchableOpacity>
            </View>
            <View style={styles.iconCircle}>
              <TouchableOpacity onPress={() => navigation.navigate(Routes.PROFILE_STACK,
                { screen: Routes.PROFILE_SETTINGS })}>
                <ICON_USER />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <LinearGradient
          colors={[selectedBrand.color, selectedBrand.color]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.card}
        >
          <TouchableOpacity style={{}} onPress={() =>
            navigation.navigate(Routes.RFID_CARD)
          }>
            <AppText style={styles.cardTitle}>RFID Wallet Card</AppText>
            <AppText style={styles.cardNumber}>{account?.card?.cardNumber.replace(/(.{4})/g, '$1 ').trim()}</AppText>
            <View style={{ flexDirection: 'row' }}>
              <AppText style={styles.cardVehicle}>
                Vehicle: {" "}
              </AppText>
              <AppText style={styles.cardVehicle}>
                {selectedBrand.vehicle}{" •"}
              </AppText>
            </View>

            <AppText style={styles.cardVehicle}>
              MH12AB1234
            </AppText>
          </TouchableOpacity>
        </LinearGradient>

        <View style={styles.balanceRow}>
          <View>
            <AppText style={styles.balanceLabel}>Wallet Balance</AppText>
            <AppText style={styles.balanceAmount}>₹ {walletDetails != null ? walletDetails.accountBalance : "-"}</AppText>
          </View>

          <TouchableOpacity style={styles.addMoneyBtn} onPress={() => navigation.navigate(Routes.ADD_MONEY)}>
            <AppText style={styles.addMoneyText}>Add Money</AppText>
          </TouchableOpacity>
        </View>

        <View style={styles.quickActions}>
          <QuickAction label="FastTag"
            icon={<ICON_ATM_CARD color={"#005ABF"} />}
            color='#DBEAFE' onPress={() => {
              navigation.navigate(Routes.FASTTAG_STACK, {
                screen: Routes.FASTTAG_HOME,
              });
            }} />
          <QuickAction label="Vouchers" icon={<ICON_VOUCHER color={'#9810FA'} />} color='#F3E8FF' onPress={() => {
            navigation.navigate(Routes.VOUCHER_STACK, {
              screen: Routes.VOUCHER_HOME,
            });
          }} />
          <QuickAction label="Vehicle" icon={<ICON_VEHICLE color={"#00A63E"} />} color='#DCFCE7' onPress={() => {
            navigation.navigate(Routes.VEHICLE_STACK, {
              screen: Routes.VEHICLE_HOME,
            });
          }} />
        </View>

        <AppText style={styles.sectionTitle}>Your Vouchers</AppText>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <VoucherCard
            title="Cafe Coffee Day"
            subtitle="10% off • Cafe"
            expirty="Valid till 31 Dec"
            bg="#FFF3CC"
            icon={<ICON_VOUCHER />}
          />
          <VoucherCard
            title="Starbucks"
            subtitle="Free Coffee"
            expirty='1 time use'
            bg="#DFFBE8"
            icon={<ICON_VOUCHER />}
          />
        </ScrollView>

        <View style={styles.txHeader}>
          <AppText style={styles.sectionTitle}>Recent Transactions</AppText>
          <TouchableOpacity onPress={() => {
            navigation.navigate(Routes.HOME_VIEW_ALL_TRANSACTIONS)
          }}><AppText style={styles.viewAll}>View All</AppText></TouchableOpacity>
        </View>

        {fetchedTransactions?.map((item) => {
          return <TransactionItem
            title="Fuel Payment • Shell"
            time="Today, 10:30 AM"
            amount={item.transactionAmount}
          />
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

type QuickActionProps = {
  label: string;
  icon?: JSX.Element;
  color?: string;
  onPress: () => void;
};

function QuickAction({ label, icon, color, onPress }: QuickActionProps) {
  return (
    <TouchableOpacity style={styles.quickAction} onPress={onPress}>
      <View style={[styles.quickIcon, { backgroundColor: color ? color : '#E5F0FF' }]}>
        {icon}
      </View>
      <AppText style={styles.quickLabel}>{label}</AppText>
    </TouchableOpacity>
  );
}

function VoucherCard({
  title,
  subtitle,
  expirty,
  bg,
  icon
}: {
  title: string;
  subtitle: string;
  expirty: string;
  bg: string;
  icon?: JSX.Element;
}) {
  return (
    <View style={[styles.voucherCard, { backgroundColor: bg }]}>
      <View style={styles.voucherIcon}>
        {icon}
      </View>
      <AppText style={styles.voucherTitle}>{title}</AppText>
      <AppText style={styles.voucherSub}>{subtitle}</AppText>
      <AppText style={styles.voucherExpirty}>{expirty}</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: vw(3),
  },

  /* Header */
  header: {
    // flex:1,
    marginTop: vh(2),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  welcome: {
    fontSize: vw(3.2),
    color: '#6A7282',
  },

  userName: {
    fontSize: vw(5),
    flexWrap: 'wrap',
    fontFamily: Fonts.bold,
    color: '#0A0A0A',
    flexShrink: 1
  },

  headerIcons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    flexShrink: 0
  },

  iconCircle: {
    width: vw(9),
    height: vw(9),
    borderRadius: vw(4.5),
    backgroundColor: '#F3F4F6',
    marginLeft: vw(1.5),
    alignItems: 'center',
    justifyContent: 'center'
  },


  card: {
    marginTop: vh(3),
    backgroundColor: '#0B5ED7',
    borderRadius: 20,
    padding: vw(5),
  },

  cardTitle: {
    color: '#DDE9FF',
    fontSize: vw(3.5),
  },

  cardNumber: {
    color: '#FFFFFF',
    fontSize: vw(6),
    marginVertical: vh(1.5),
    marginTop: vh(3),
    fontFamily: Fonts.bold,
  },

  cardVehicle: {
    color: '#E5EEFF',
    fontSize: vw(3.5),
    marginVertical: vh(0.2),
  },

 
  balanceRow: {
    marginTop: vh(3),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  balanceLabel: {
    color: '#4A5565',
    fontSize: vw(3.5),
  },

  balanceAmount: {
    fontSize: vw(6),
    fontFamily: Fonts.bold,
    color: '#16A34A',
  },

  addMoneyBtn: {
    backgroundColor: '#005ABF',
    paddingHorizontal: vw(5),
    paddingVertical: vh(1.4),
    borderRadius: 12,
  },

  addMoneyText: {
    color: '#FFFFFF',
    fontSize: vw(3.6),
  },

  quickActions: {
    marginTop: vh(4),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  quickAction: {
    width: vw(26),
    height: vw(30),
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },

  quickIcon: {
    width: vw(12),
    height: vw(12),
    borderRadius: vw(6),
    backgroundColor: '#E5F0FF',
    marginBottom: vh(1),
    alignItems: 'center',
    justifyContent: 'center',
  },

  quickLabel: {
    fontSize: vw(3.4),
  },

  /* Vouchers */
  sectionTitle: {
    marginTop: vh(4),
    fontSize: vw(4.2),
  },

  voucherCard: {
    width: vw(55),
    borderRadius: 16,
    padding: vw(4),
    marginRight: vw(3),
    marginTop: vh(2),
  },

  voucherIcon: {
    width: vw(9),
    height: vw(9),
    borderRadius: vw(4.5),
    backgroundColor: '#FFFFFF',
    marginBottom: vh(1),
    alignItems: 'center',
    justifyContent: 'center',
  },

  voucherTitle: {
    fontSize: FONT_SIZE.FONT_14,
    fontFamily: Fonts.bold,
    color:"#101828"
  },

  voucherSub: {
    fontSize: FONT_SIZE.FONT_16,
    color: '#1E2939',
    marginTop: vh(0.5),
  },
  voucherExpirty: {
    fontSize: FONT_SIZE.FONT_12,
    color: '#4A5565',
    marginTop: vh(0.5),
  },

  /* Transactions */
  txHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  viewAll: {
    marginTop: vh(4),
    color: '#005ABF',
    fontSize: vw(3.4),
  },

  txItem: {
    marginTop: vh(2),
    paddingVertical: vh(1.5),
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

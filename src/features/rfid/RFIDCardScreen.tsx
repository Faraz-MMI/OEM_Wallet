import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { vw, vh, FONT_SIZE } from '../../ui/theme/dimensions';
import TransactionItem from '../../ui/components/TransactionItem';
import ActionButton from '../../ui/components/ActionButton';
import AppText from '../../ui/components/AppText';
import { ICON_ATM_CARD, ICON_BACK, ICON_LOCK, ICON_VEHICLE } from '../../assets/icons';
import { Fonts } from '../../ui/theme/fonts';
import ScreenContainer from '../../ui/components/ScreenContainer';
import CustomTopBar from '../../ui/components/CustomTopBar';
import { useUserStore } from '../../app/store/userStore';

export default function RfidCardScreen({ navigation }: any) {
  const { profile, entityId, selectedBrand } = useUserStore();
  const account =
    profile != null && profile.accounts != null && profile.accounts.length > 0 ? profile.accounts[0] : null;

  return (
    <ScreenContainer>
      <CustomTopBar title='RFID Card' onBack={() => { navigation.goBack() }} />
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.content}>


          <View style={[styles.card,{backgroundColor: selectedBrand.color,}]}>
            <AppText style={styles.cardTitle}>RFID Wallet Card</AppText>
            <AppText style={styles.cardName}>{account?.card?.nameOnCard}</AppText>

            <View style={styles.cardFooter}>
              <View>
                <AppText style={styles.cardMeta}>Vehicle</AppText>
                <AppText style={styles.cardVehicle}>
                  {selectedBrand.vehicle} •
                </AppText>
                <AppText style={styles.cardVehicle}>
                  DL 20 FRZ 0899
                </AppText>
                <AppText style={[styles.cardMeta, { marginTop: vh(2),marginBottom:-8 }]}>Card Number</AppText>
                <View style={{ width: '100%', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
                  <AppText style={styles.cardNumber}>{account?.card?.cardNumber.replace(/(.{4})/g, '$1 ').trim()}</AppText>
                  <View style={{flexDirection:'row'}}>
                    <View style={{ width: 32, height: 24, backgroundColor: '#FFFFFF', alignSelf: 'baseline', opacity: 0.3, borderRadius: 2 }} />
                    <View style={{ width: 32, height: 24, backgroundColor: '#FFFFFF', alignSelf: 'baseline', opacity: 0.5, borderRadius: 2,marginHorizontal:5 }} />
                  </View>
                </View>

              </View>


            </View>
          </View>
          <View style={{ backgroundColor: '#FFFFFF', borderRadius: 12, marginTop: vh(2) }}>

            <View style={styles.actions}>
              <ActionButton label="Lock Card" color='#FFE2E2' icon={<ICON_LOCK />} />
              <ActionButton label="Rename" color='#DBEAFE' icon={<ICON_ATM_CARD />} />
              <ActionButton label="Statement" color='#DBEAFE' icon={<ICON_VEHICLE />} />
            </View>
          </View>


          <AppText style={styles.sectionTitle}>Recent Card Transactions</AppText>
          <View style={{ backgroundColor: '#FFFFFF', borderRadius: 12, marginTop: vh(2), padding: vw(2) }}>
            <TransactionItem
              title="Charging - EV Station"
              time="12 Dec"
              amount="-₹220"
            />
            <TransactionItem
              title="Toll - Highway"
              time="03 Dec"
              amount="-₹80"
            />
            <TransactionItem
              title="Fuel - Shell"
              time="28 Nov"
              amount="-₹650"
            />
          </View>

        </ScrollView>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },

  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: vw(4),
    paddingVertical: vh(2),
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',

  },

  backArrow: {
    fontSize: vw(6),
  },

  title: {
    fontSize: vw(5),
    marginHorizontal: vw(4),
    fontFamily: Fonts.bold,
  },

  content: {
    paddingHorizontal: vw(4),
    paddingBottom: vh(4),
  },

  card: {
    // backgroundColor: '#0B5ED7',
    borderRadius: 16,
    padding: vw(5),
    marginTop: vh(2),
  },

  cardTitle: {
    color: '#FFFFFF',
    fontSize: FONT_SIZE.FONT_14,
    fontFamily: Fonts.regular,
    opacity:0.6
  },

  cardNumber: {
    color: '#FFFFFF',
    fontSize: FONT_SIZE.FONT_18,
    fontFamily: Fonts.regular,
    marginVertical: vh(1.5),
  },

  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: vh(4)
  },

  cardName: {
    color: '#FFFFFF',
    fontSize: FONT_SIZE.FONT_20,
    fontFamily: Fonts.bold,
    marginTop: vh(4)
  },

  cardMeta: {
    color: '#FFFFFF',
    opacity: 0.75,
    fontSize: FONT_SIZE.FONT_12,
  },
  cardVehicle: {
    color: '#FFFFFF',
    fontSize: FONT_SIZE.FONT_14,
  },

  cardExpiry: {
    color: '#E0E7FF',
    fontSize: vw(3),
    textAlign: 'right',
  },

  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: vh(3),
  },

  actionItem: {
    alignItems: 'center',
    flex: 1,
  },

  actionIcon: {
    width: vw(10),
    height: vw(10),
    borderRadius: vw(5),
    backgroundColor: '#F3F4F6',
    marginBottom: vh(0.5),
  },

  actionText: {
    fontSize: vw(3),
  },

  sectionTitle: {
    fontSize: vw(5.2),
    fontFamily: Fonts.bold,
    marginBottom: vh(1.5),
    marginTop: vh(2),
  },

  txRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: vh(1.5),
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },

  txTitle: {
    fontSize: vw(3.6),
  },

  txDate: {
    fontSize: vw(3),
    color: '#6B7280',
  },

  txAmount: {
    fontSize: vw(3.6),
    color: '#DC2626',
  },
});


import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ScreenContainer from '../../ui/components/ScreenContainer';
import { vw, vh, FONT_SIZE } from '../../ui/theme/dimensions';
import { Fonts } from '../../ui/theme/fonts';
import { COLORS } from '../../app/constants/colors';
import { useNavigation } from '@react-navigation/native';
import { FastTagStackParamList, MainStack } from '../../app/navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import CustomTopBar from '../../ui/components/CustomTopBar';
import { Routes } from '../../app/constants/routes';
import AppText from '../../ui/components/AppText';
import { ICON_ATM_CARD, ICON_NOTES, ICON_PLUS, ICON_TIMER } from '../../assets/icons';

export default function FastTagScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<FastTagStackParamList>>();
  return (
    <ScreenContainer>
      <CustomTopBar title='FastTag' onBack={()=>navigation.goBack()}/>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >

        {/* MAIN FASTTAG SUMMARY */}
        <View style={styles.summaryCard}>
          <Text style={styles.label}>Vehicle Number</Text>
          <Text style={styles.value}>DL 20 FRZ 0899</Text>

          <Text style={[styles.label, { marginTop: vh(2) }]}>Tag ID</Text>
          <Text style={styles.value}>**** **** 7821</Text>

          <Text style={[styles.label, { marginTop: vh(2) }]}>
            Current FastTag Balance
          </Text>
          <Text style={styles.balance}>₹ 480.00</Text>
        </View>

        {/* ACTIONS */}
        <TouchableOpacity style={styles.primaryBtn} onPress={() => { navigation.navigate(Routes.FASTTAG_ADD_BALANCE) }}>
          <Text style={styles.primaryText}>Add Balance</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryBtn} onPress={() => { navigation.navigate(Routes.FASTTAG_HISTORY) }}>
           <ICON_TIMER width={18} height={18} color="#0A0A0A" />
           <AppText style={[styles.secondaryText,{marginHorizontal: vw(2)}]}>View History</AppText>
         </TouchableOpacity>
        

        <TouchableOpacity style={styles.secondaryBtn} onPress={() => {  }}>
           <ICON_NOTES width={18} height={18} color="#0A0A0A" />
           <AppText style={[styles.secondaryText,{marginHorizontal: vw(2)}]}>Traffic Challans</AppText>
         </TouchableOpacity>

        {/* TIP */}
        <View style={styles.tipBox}>
          <Text style={styles.tipText}>
            💡 Keep a minimum balance of ₹500 for seamless toll payments
          </Text>
        </View>

        {/* LINKED FASTTAGS */}
        <Text style={styles.sectionTitle}>Linked FastTags</Text>

        <FastTagCard
          bank="IDFC First Bank"
          vehicle="DL 20 FRZ 0899"
          tagId="XXXX7821"
          status="Active"
          showRecharge
        />

        <FastTagCard
          bank="ICICI Bank"
          vehicle="DL 20 FRZ 0899"
          tagId="XXXX2913"
          status="Order Placed"
        />

        {/* MANAGE FASTTAGS */}
        <Text style={styles.sectionTitle}>Manage FastTags</Text>

        <ManageCard
          title="Add Existing FastTag"
          subtitle="Link your FastTag from any bank"
          color="#EFF6FF"
          icon={<ICON_PLUS color={COLORS.APP_PRIMARY} />}
          onPress={() => navigation.navigate(Routes.FASTTAG_SELECT_BANK)}
        />

        <ManageCard
          title="Buy New FastTag"
          subtitle="Get a new FastTag delivered to you"
          color="#FAF5FF"
          icon={<ICON_ATM_CARD color={COLORS.APP_PRIMARY} />}
          onPress={() => navigation.navigate(Routes.FASTTAG_BUY)}
        />

      </ScrollView>
    </ScreenContainer>
  );
}

function ActionButton({ title, icon }: { title: string, icon?: React.ReactNode }) {
  return (
    <TouchableOpacity style={styles.secondaryBtn}>
      <Text style={styles.secondaryText}>{title}</Text>
    </TouchableOpacity>
  );
}

function FastTagCard({
  bank,
  vehicle,
  tagId,
  status,
  showRecharge,
}: any) {
  const isActive = status === 'Active';

  return (
    <View style={styles.fastTagWrapper}>
      <LinearGradient
        colors={['#2563EB', '#1E40AF']}
        style={styles.fastTagCard}
      >
        <Text style={styles.cardSmall}>FastTag</Text>
        <Text style={styles.cardBank}>{bank}</Text>

        <View style={styles.vehicleBox}>
          <Text style={styles.vehicleLabel}>Vehicle Number</Text>
          <Text style={styles.vehicleText}>{vehicle}</Text>
        </View>
      </LinearGradient>

      <View style={styles.fastTagInfo}>
        <InfoRow label="Tag ID" value={tagId} />
        <View style={styles.statusRow}>
          <Text style={styles.infoLabel}>Status</Text>
          <View
            style={[
              styles.statusPill,
              { backgroundColor: isActive ? '#DCFCE7' : '#E0E7FF' },
            ]}
          >
            <Text
              style={[
                styles.statusText,
                { color: isActive ? '#16A34A' : '#2563EB' },
              ]}
            >
              {status}
            </Text>
          </View>
        </View>

        {showRecharge && (
          <TouchableOpacity style={styles.rechargeBtn}>
            <Text style={styles.rechargeText}>Recharge</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

function ManageCard({ title, subtitle,color,icon,onPress }: any) {
  return (
    <TouchableOpacity style={styles.manageCard} onPress={onPress}>
      <View style={[styles.manageIcon,{backgroundColor:color}]}>
        {icon}
      </View>
      <View>
        <Text style={styles.manageTitle}>{title}</Text>
        <Text style={styles.manageSub}>{subtitle}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: vw(5),
    paddingBottom: vh(4),
  },

  summaryCard: {
    backgroundColor: '#EFF6FF',
    borderRadius: 16,
    padding: vw(5),
  },

  label: {
    fontSize: FONT_SIZE.FONT_14,
    color: '#475569',
  },

  value: {
    marginTop: vh(0.4),
    fontSize: FONT_SIZE.FONT_16,
    fontFamily: Fonts.semiBold,
  },

  balance: {
    marginTop: vh(1),
    fontSize: FONT_SIZE.FONT_14,
    fontFamily: Fonts.bold,
    color: COLORS.APP_PRIMARY,
  },

  primaryBtn: {
    marginTop: vh(3),
    height: vh(7),
    backgroundColor: COLORS.APP_PRIMARY,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },

  primaryText: {
    color: '#FFFFFF',
    fontSize: FONT_SIZE.FONT_16,
    fontFamily: Fonts.semiBold,
  },

  secondaryBtn: {
    flexDirection: 'row',
    marginTop: vh(2),
    height: vh(6.5),
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  secondaryText: {
    fontSize: FONT_SIZE.FONT_14,
    color: '#111827',
    fontFamily: Fonts.regular,
    
  },

  tipBox: {
    marginTop: vh(3),
    backgroundColor: '#FEF9C3',
    borderRadius: 12,
    padding: vw(4),
  },

  tipText: {
    color: '#92400E',
    fontSize: FONT_SIZE.FONT_14,
  },

  sectionTitle: {
    marginTop: vh(4),
    fontSize: FONT_SIZE.FONT_16,
    fontFamily: Fonts.bold,
    color: '#0F172A',
  },

  fastTagWrapper: {
    marginTop: vh(2),
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },

  fastTagCard: {
    padding: vw(4),
  },

  cardSmall: {
    color: '#DBEAFE',
    fontSize: FONT_SIZE.FONT_12,
  },

  cardBank: {
    marginTop: vh(0.5),
    color: '#FFFFFF',
    fontSize: FONT_SIZE.FONT_16,
    fontFamily: Fonts.semiBold,
  },

  vehicleBox: {
    marginTop: vh(2),
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 12,
    padding: vw(3),
  },

  vehicleLabel: {
    color: '#DBEAFE',
    fontSize: FONT_SIZE.FONT_12,
  },

  vehicleText: {
    marginTop: vh(0.3),
    color: '#FFFFFF',
    fontSize: FONT_SIZE.FONT_16,
    fontFamily: Fonts.bold,
  },

  fastTagInfo: {
    padding: vw(4),
  },

  infoLabel: {
    fontSize: FONT_SIZE.FONT_14,
    color: '#475569',
  },

  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: vh(2),
  },

  statusPill: {
    paddingHorizontal: vw(3),
    paddingVertical: vh(0.5),
    borderRadius: 20,
  },

  statusText: {
    fontSize: FONT_SIZE.FONT_12,
    fontFamily: Fonts.semiBold,
  },

  rechargeBtn: {
    marginTop: vh(2),
    height: vh(6),
    backgroundColor: COLORS.APP_PRIMARY,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  rechargeText: {
    color: '#FFFFFF',
    fontFamily: Fonts.semiBold,
  },

  manageCard: {
    marginTop: vh(2),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: vw(4),
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },

  manageIcon: {
    width: vw(10),
    height: vw(10),
    borderRadius: vw(4),
    backgroundColor: '#EFF6FF',
    marginRight: vw(4),
    alignItems:'center',
    justifyContent:'center'
  },

  manageTitle: {
    fontSize: FONT_SIZE.FONT_14,
    fontFamily: Fonts.semiBold,
  },

  manageSub: {
    marginTop: vh(0.4),
    fontSize: FONT_SIZE.FONT_12,
    color: '#64748B',
  },
});

function InfoRow({ label, value }: any) {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={{ fontFamily: Fonts.semiBold }}>{value}</Text>
    </View>
  );
}

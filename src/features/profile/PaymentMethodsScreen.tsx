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
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ProfileStackParamList } from '../../app/navigation/types';
import ScreenContainer from '../../ui/components/ScreenContainer';
import CustomTopBar from '../../ui/components/CustomTopBar';

export default function PaymentMethodsScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<ProfileStackParamList>>();
  return (
    <ScreenContainer>
      <CustomTopBar title='Payment Methods' onBack={() => navigation.goBack()} />
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: vh(4) }}
        showsVerticalScrollIndicator={false}
      >
        
        <AppText style={styles.sectionTitle}>Saved Cards</AppText>

        <CardItem
          brand="Visa"
          number="**** **** **** 4532"
          expiry="12/25"
          color="#DBEAFE"
        />

        <CardItem
          brand="Mastercard"
          number="**** **** **** 8901"
          expiry="08/26"
          color="#FFE4CC"
        />

        <AddButton label="Add New Card" />

        
        <AppText style={styles.sectionTitle}>UPI</AppText>

        <UpiItem upi="faraz@paytm" />
        <UpiItem upi="faraz@okicici" />

        <AddButton label="Add UPI ID" />

        
        <View style={styles.infoBox}>
          <AppText style={styles.infoText}>
            💡 Your payment information is encrypted and securely stored.
            You can manage or remove payment methods anytime.
          </AppText>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

function CardItem({
  brand,
  number,
  expiry,
  color,
}: {
  brand: string;
  number: string;
  expiry: string;
  color: string;
}) {
  return (
    <View style={styles.itemCard}>
      <View style={[styles.iconWrap, { backgroundColor: color }]}>
        <AppText style={styles.iconEmoji}>💳</AppText>
      </View>

      <View style={{ flex: 1 }}>
        <AppText style={styles.itemTitle}>{brand}</AppText>
        <AppText style={styles.itemSub}>{number}</AppText>
        <AppText style={styles.itemHint}>Expires: {expiry}</AppText>
      </View>

      <TouchableOpacity>
        <AppText style={styles.delete}>🗑️</AppText>
      </TouchableOpacity>
    </View>
  );
}

function UpiItem({ upi }: { upi: string }) {
  return (
    <View style={styles.itemCard}>
      <View style={[styles.iconWrap, { backgroundColor: '#EDE9FE' }]}>
        <AppText style={styles.iconEmoji}>🔷</AppText>
      </View>

      <View style={{ flex: 1 }}>
        <AppText style={styles.itemTitle}>{upi}</AppText>
        <AppText style={styles.itemHint}>UPI ID</AppText>
      </View>

      <TouchableOpacity>
        <AppText style={styles.delete}>🗑️</AppText>
      </TouchableOpacity>
    </View>
  );
}

function AddButton({ label }: { label: string }) {
  return (
    <TouchableOpacity style={styles.addBtn}>
      <AppText style={styles.addText}>＋ {label}</AppText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: vw(5),
  },

  sectionTitle: {
    marginTop: vh(3),
    marginBottom: vh(1.5),
    fontSize: vw(4),
    fontFamily: Fonts.semiBold,
  },

  itemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: vw(4),
    borderWidth: 1,
    borderColor: '#F3F4F6',
    marginBottom: vh(1.6),
  },

  iconWrap: {
    width: vw(11),
    height: vw(11),
    borderRadius: vw(5.5),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: vw(3),
  },

  iconEmoji: {
    fontSize: vw(5),
  },

  itemTitle: {
    fontSize: vw(3.8),
    fontFamily: Fonts.semiBold,
  },

  itemSub: {
    marginTop: vh(0.4),
    fontSize: vw(3.4),
    color: '#374151',
  },

  itemHint: {
    marginTop: vh(0.4),
    fontSize: vw(3.2),
    color: '#9CA3AF',
  },

  delete: {
    fontSize: vw(4.2),
    color: '#EF4444',
  },

  addBtn: {
    marginTop: vh(1),
    marginBottom: vh(2),
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 14,
    height: vh(6.5),
    justifyContent: 'center',
    alignItems: 'center',
  },

  addText: {
    fontSize: vw(3.8),
    color: '#374151',
    fontFamily: Fonts.semiBold,
  },

  infoBox: {
    marginTop: vh(3),
    backgroundColor: '#EFF6FF',
    borderRadius: 14,
    padding: vw(4),
  },

  infoText: {
    fontSize: vw(3.2),
    color: '#1D4ED8',
    textAlign: 'center',
  },
});


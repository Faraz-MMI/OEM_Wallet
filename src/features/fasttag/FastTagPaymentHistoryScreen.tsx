import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import AppText from '../../ui/components/AppText';
import { Fonts } from '../../ui/theme/fonts';
import { vw, vh, FONT_SIZE } from '../../ui/theme/dimensions';
import ScreenContainer from '../../ui/components/ScreenContainer';
import CustomTopBar from '../../ui/components/CustomTopBar';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type HistoryItem = {
  id: string;
  type: 'credit' | 'debit';
  title: string;
  subtitle: string;
  date: string;
  amount: number;
};

const DATA: HistoryItem[] = [
  {
    id: '1',
    type: 'credit',
    title: 'Recharge',
    subtitle: 'IDFC FastTag',
    date: '19 Dec',
    amount: 500,
  },
  {
    id: '2',
    type: 'debit',
    title: 'Toll Debit',
    subtitle: 'NH48 • Mumbai-Pune Expressway',
    date: '17 Dec',
    amount: 80,
  },
  {
    id: '3',
    type: 'debit',
    title: 'Toll Debit',
    subtitle: 'NH8 • Delhi-Jaipur Highway',
    date: '15 Dec',
    amount: 120,
  },
  {
    id: '4',
    type: 'credit',
    title: 'Recharge',
    subtitle: 'IDFC FastTag',
    date: '10 Dec',
    amount: 1000,
  },
  {
    id: '5',
    type: 'debit',
    title: 'Toll Debit',
    subtitle: 'NH44 • Bangalore-Chennai',
    date: '08 Dec',
    amount: 60,
  },
];

function HistoryCard({ item }: { item: any }) {
  const isCredit = item.type === 'credit';

  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <View style={{ flex: 1 }}>
          <View style={styles.titleRow}>
            <AppText style={styles.title}>{item.title}</AppText>

            {isCredit && (
              <View style={styles.badge}>
                <AppText style={styles.badgeText}>Success</AppText>
              </View>
            )}
          </View>

          <AppText style={styles.subtitle}>
            {item.subtitle}
          </AppText>
          <AppText style={styles.date}>{item.date}</AppText>
        </View>

        <AppText
          style={[
            styles.amount,
            isCredit && styles.amountCredit,
          ]}
        >
          {isCredit ? '+₹ ' : '₹ '}
          {item.amount}
        </AppText>
      </View>
    </View>
  );
}

type Props = NativeStackScreenProps<any>;
export default function FastTagHistoryScreen({navigation}:Props) {
  return (
    <ScreenContainer>
      <CustomTopBar title='FastTag History' onBack={()=>navigation.goBack()}/>
      <View style={styles.container}>
        <FlatList
          data={DATA}
          keyExtractor={item => item.id}
          contentContainerStyle={{ paddingBottom: vh(4) }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => <HistoryCard item={item} />}
        />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    paddingHorizontal: vw(5),
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: vw(4),
    marginTop: vh(2),
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: vw(2),
  },

  title: {
    fontSize: FONT_SIZE.FONT_16,
    fontFamily: Fonts.regular,
  },

  badge: {
    backgroundColor: '#DCFCE7',
    paddingHorizontal: vw(2),
    paddingVertical: vh(0.3),
    borderRadius: 6,
  },

  badgeText: {
    fontSize: FONT_SIZE.FONT_12,
    fontFamily: Fonts.regular,
    color: '#008236',
  },

  subtitle: {
    marginTop: vh(0.6),
    fontSize: FONT_SIZE.FONT_14,
    color: '#6B7280',
  },

  date: {
    marginTop: vh(0.4),
    fontSize: FONT_SIZE.FONT_12,
    color: '#9CA3AF',
  },

  amount: {
    fontSize: FONT_SIZE.FONT_18,
    fontFamily: Fonts.semiBold,
    color: '#111111',
  },

  amountCredit: {
    color: '#16A34A',
  },
});


import React, { useState, useMemo } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import AppText from '../../ui/components/AppText';
import { Fonts } from '../../ui/theme/fonts';
import { vw, vh } from '../../ui/theme/dimensions';
import { ICON_RIGHT_ANGLE_ARROW, ICON_SEARCH } from '../../assets/icons';
import ScreenContainer from '../../ui/components/ScreenContainer';
import CustomTopBar from '../../ui/components/CustomTopBar';
import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type Txn = {
  id: string;
  title: string;
  subtitle?: string;
  time: string;
  amount: number;
};

const DATA: Txn[] = [
  {
    id: '1',
    title: 'Fuel Payment · Shell',
    subtitle: 'via FastTag',
    time: 'Today, 10:30 AM',
    amount: -650,
  },
  {
    id: '2',
    title: 'FastTag Recharge',
    time: 'Today, 09:15 AM',
    amount: -500,
  },
  {
    id: '3',
    title: 'Toll Payment',
    subtitle: 'Mumbai-Pune Expressway',
    time: 'Yesterday, 16:45 PM',
    amount: -145,
  },
];

type Props = NativeStackScreenProps<any>;
export default function FastTagHistoryScreen({navigation}:Props) {
  const [query, setQuery] = useState('');

  const filteredData = useMemo(() => {
    if (!query) return DATA;
    return DATA.filter(item =>
      item.title.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  return (
    <ScreenContainer>
      <CustomTopBar title='FastTag History' onBack={()=>navigation.goBack()}/>
      <View style={styles.container}>
        <View style={styles.searchBox}>
          <ICON_SEARCH width={18} height={18} color="#9CA3AF" />
          <TextInput
            placeholder="Search transactions..."
            placeholderTextColor="#9CA3AF"
            style={styles.searchInput}
            value={query}
            onChangeText={setQuery}
          />
        </View>

        <View style={styles.listCard}>
          <FlatList
            data={filteredData}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <TransactionItem item={item} />}
            ItemSeparatorComponent={() => <View style={styles.divider} />}
          />
        </View>
      </View>
    </ScreenContainer>
  );
}

function TransactionItem({ item }: { item: any }) {
  const isDebit = item.amount < 0;

  return (
    <TouchableOpacity style={styles.txRow} activeOpacity={0.7}>
      <View style={{ flex: 1 }}>
        <AppText style={styles.txTitle}>{item.title}</AppText>

        {item.subtitle && (
          <AppText style={styles.txSub}>{item.subtitle}</AppText>
        )}

        <AppText style={styles.txTime}>{item.time}</AppText>
      </View>

      <View style={styles.right}>
        <AppText
          style={[
            styles.txAmount,
            isDebit && styles.debit,
          ]}
        >
          ₹{Math.abs(item.amount)}
        </AppText>

        <ICON_RIGHT_ANGLE_ARROW width={16} height={16} color="#9CA3AF" />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: vw(5),
  },

  /* Search */
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingHorizontal: vw(4),
    height: vh(6),
    marginTop: vh(2),
  },

  searchInput: {
    flex: 1,
    marginLeft: vw(2),
    fontSize: vw(3.6),
    fontFamily: Fonts.regular,
    color: '#111111',
  },

  /* List */
  listCard: {
    marginTop: vh(3),
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    overflow: 'hidden',
  },

  divider: {
    height: 1,
    backgroundColor: '#F3F4F6',
  },

  txRow: {
    flexDirection: 'row',
    paddingVertical: vh(2),
    paddingHorizontal: vw(4),
    alignItems:'center'
  },

  txTitle: {
    fontSize: vw(3.8),
    fontFamily: Fonts.medium,
  },

  txSub: {
    marginTop: vh(0.4),
    fontSize: vw(3.2),
    color: '#6B7280',
  },

  txTime: {
    marginTop: vh(0.4),
    fontSize: vw(3.2),
    color: '#9CA3AF',
  },

  right: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection:'row'
  },

  txAmount: {
    fontSize: vw(3.8),
    fontFamily: Fonts.semiBold,
    color: '#111111',
    marginRight:5
    // marginBottom: vh(0.4),
  },

  debit: {
    color: '#EF4444',
  },
});

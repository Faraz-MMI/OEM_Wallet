import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import AppText from '../../ui/components/AppText';
import { vw, vh } from '../../ui/theme/dimensions';
import { Fonts } from '../../ui/theme/fonts';
import { Routes } from '../../app/constants/routes';
import { MainStack } from '../../app/navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import ScreenContainer from '../../ui/components/ScreenContainer';
import CustomTopBar from '../../ui/components/CustomTopBar';
import { useFetchTransactions } from './hooks/useFetchTransactions';

const FILTERS = ['All', 'FastTag', 'Fuel', 'Vouchers'];
const TRANSACTIONS = [
  {
    id: "1",
    title: 'Fuel Payment • Shell',
    subtitle: 'via FastTag',
    time: 'Today, 10:30 AM',
    amount: '- ₹650',
  },
  {
    id: "2",
    title: 'FastTag Recharge',
    subtitle: '',
    time: 'Today, 09:15 AM',
    amount: '- ₹500',
  },
  {
    id: "3",
    title: 'Toll Payment',
    subtitle: 'Mumbai-Pune Expressway',
    time: 'Yesterday, 16:45 PM',
    amount: '- ₹145',
  },
  {
    id: "4",
    title: 'Amazon Voucher',
    subtitle: '₹500 Gift Card',
    time: '20 Dec, 14:20 PM',
    amount: '- ₹500',
  },
  {
    id: "5",
    title: 'Wallet Recharge',
    subtitle: '',
    time: '19 Dec, 11:30 AM',
    amount: '+ ₹1,000',
  },
  {
    id: "6",
    title: 'Cashback Received',
    subtitle: 'FastTag Recharge Offer',
    time: '18 Dec, 09:00 AM',
    amount: '+ ₹50',
  },
  {
    id: "7",
    title: 'Fuel Payment • IOCL',
    subtitle: '',
    time: '17 Dec, 15:30 PM',
    amount: '- ₹720',
  },
  {
    id: "8",
    title: 'EV Charging Payment',
    subtitle: 'Tata Power EZ Charge',
    time: '16 Dec, 12:00 PM',
    amount: '- ₹385',
  },
];

export default function TransactionsScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<MainStack>>();
  const [activeFilter, setActiveFilter] = useState('All');
  const [search, setSearch] = useState('');
  const { fetchTransactions, data: fetchedTransactions } = useFetchTransactions();

  const _fetchedTransactions = [
    {
      "accountCurrencyCode": "356",
      "accountCurrencyCodeName": "INR",
      "accountNo": "17664775182310015",
      "baseConvertedAmount": "0.0",
      "baseConversionRate": "0.0",
      "extTxnId": "0f7029b2-84d7-4930-b3f3-fe1497ba9efa",
      "intTxnId": "0f7029b2-84d7-4930-b3f3-fe1497ba9efa",
      "time": "2025-12-23T13:41:59.784",
      "amount": "100.0",
      "txRef": "0f7029b2-84d7-4930-b3f3-fe1497ba9efa",
      "transactionAmount": "159.00",
      "transactionStatus": "SUCCESS",
      "preBalance": "0.0",
      "postBalance": "100.0",
      "transactionType": "LOAD",
      "txnOrigin": "web",
      "externalTransactionId": "0f7029b2-84d7-4930-b3f3-fe1497ba9efa",
      "retrievalReferenceNo": "7626004835668",
      "retrivalReferenceNo": "7626004835668",
      "authCode": "176998",
      "convertedAmount": 0.0,
      "kitNo": "280000033",
      "transactionCurrencyCode": "356",
      "exchangeRate": 0.0,
      "markupServiceTax": 0.0,
      "markupRate": 0.0,
      "markUpAmount": 0.0,
      "markUpServiceTaxAmount": 0.0,
      "txnFees": 50.0,
      "serviceTax": 9.0,
      "crDr": "C",
      "prepaidWallet": {
        "walletName": "TATAWALLFN",
        "walletType": "WALLFNTATA"
      },
      "nationalServiceTax": 0.0,
      "regionalServiceTax": 0.0,
      "specialRegionalServiceTax": 0.0,
      "integratedServiceTax": 0.0,
      "transactionCurrencyCodeName": "INR",
      "forwardingInstitutionId": "uatshrdppfwpfl4oi4l|CORPORATE",
      "additionalDescription": {
        "prepaid": {
          "fee": "50.0",
          "feeType": "Registration Fee"
        }
      }
    }
  ];

  useEffect(() => {
    // sample fetch; adjust payload as needed
    fetchTransactions({
      mobile: { countryCode: 91, value: '9258809888' },
      kit: '20003255',
      entityId: '630863194610000193240825',
      fromDate: '01-09-2025',
      toDate: '17-10-2025',
    });
  }, []);

  return (
    <ScreenContainer>
      <CustomTopBar title='All Transactions' onBack={() => navigation.goBack()} />
      <View style={styles.container}>
        
        <View style={styles.searchBox}>
          <TextInput
            placeholder="Search transactions..."
            placeholderTextColor="#9CA3AF"
            style={styles.searchInput}
            value={search}
            onChangeText={setSearch}
          />
        </View>

        
        <View style={styles.filters}>
          {FILTERS.map(item => (
            <FilterChip
              key={item}
              label={item}
              active={activeFilter === item}
              onPress={() => setActiveFilter(item)}
            />
          ))}
        </View>

        
        <View style={styles.listCard}>
          {_fetchedTransactions != null &&
            <FlatList
              data={_fetchedTransactions}
              keyExtractor={(_, i) => i.toString()}
              ItemSeparatorComponent={() => <View style={styles.divider} />}
              renderItem={({ item }) => <TransactionItem item={item} onPress={(id) => {
                navigation.navigate(Routes.TRANSACTION_DETAILS, { transactionId: id })
              }} />}
              showsVerticalScrollIndicator={false}
            />
          }
        </View>
      </View>
    </ScreenContainer>
  );
}

function FilterChip({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.chip,
        active && styles.chipActive,
      ]}
    >
      <AppText
        style={[
          styles.chipText,
          active && styles.chipTextActive,
        ]}
      >
        {label}
      </AppText>
    </TouchableOpacity>
  );
}

function TransactionItem({ item, onPress }: { item: any, onPress: (transactionId: string) => void }) {
  const isCredit = item.crDr == "C";

  return (
    <TouchableOpacity style={styles.txRow} onPress={() => onPress(item.transaction)}>
      <View style={{ flex: 1 }}>
        <AppText style={styles.txTitle}>{item?.title ?? "Payment"}</AppText>
        <AppText style={styles.txSub}>{item.transactionType}</AppText>
        <AppText style={styles.txTime}>{item.time}</AppText>
      </View>

      <View style={styles.amountWrap}>
        <AppText
          style={[
            styles.amount,
            { color: isCredit ? '#16A34A' : '#DC2626' },
          ]}
        >
          {item.transactionAmount}
        </AppText>
        <AppText style={styles.chevron}>›</AppText>
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
    backgroundColor: '#F3F4F6',
    borderRadius: 14,
    paddingHorizontal: vw(4),
    height: vh(6),
    justifyContent: 'center',
    marginTop: vh(2),
  },

  searchInput: {
    fontSize: vw(3.6),
    fontFamily: Fonts.regular,
  },

  /* Filters */
  filters: {
    flexDirection: 'row',
    marginTop: vh(2),
  },

  chip: {
    paddingHorizontal: vw(4),
    paddingVertical: vh(1),
    backgroundColor: '#F3F4F6',
    borderRadius: 20,
    marginRight: vw(2),
  },

  chipActive: {
    backgroundColor: '#005ABF',
  },

  chipText: {
    fontSize: vw(3.2),
    color: '#374151',
  },

  chipTextActive: {
    color: '#FFFFFF',
    fontFamily: Fonts.medium,
  },

  /* List */
  listCard: {
    marginTop: vh(3),
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: vw(3),
    elevation: 2,
  },

  divider: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginVertical: vh(1),
  },

  txRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: vh(1),
  },

  txTitle: {
    fontSize: vw(3.6),
    fontFamily: Fonts.medium,
  },

  txSub: {
    fontSize: vw(3.2),
    color: '#6B7280',
    marginTop: vh(0.2),
  },

  txTime: {
    fontSize: vw(3),
    color: '#9CA3AF',
    marginTop: vh(0.2),
  },

  amountWrap: {
    alignItems: 'flex-end',
  },

  amount: {
    fontSize: vw(3.6),
    fontFamily: Fonts.semiBold,
  },

  chevron: {
    fontSize: vw(5),
    color: '#9CA3AF',
  },
});

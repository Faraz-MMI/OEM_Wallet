import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AppText from '../ui/components/AppText';
import { vh, vw } from '../ui/theme/dimensions';
import { Fonts } from '../ui/theme/fonts';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStack } from '../app/navigation/types';
import { Routes } from '../app/constants/routes';
import CustomTopBar from '../ui/components/CustomTopBar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { startPaytmTransaction } from '../app/services/paytm.service';
import CustomLoader from '../ui/components/CustomLoader';
import ErrorPopup from '../ui/components/ErrorPopup';
import { useCreatePaytmOrder } from '../core/hooks/useCreatePaytmOrder';
import { useUserStore } from '../app/store/userStore';
import { useCheckTransactionStatus } from '../core/hooks/useCheckTransactionStatus';

type NavigationProp = NativeStackNavigationProp<MainStack>;
export default function AddMoneyScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { userProfile } = useUserStore();
  const { createPaytmOrder, loading: paytmOrderLoading, error } = useCreatePaytmOrder();
  const { checkStatus, loading: checkStatusLoading, error: checkStatusError } = useCheckTransactionStatus();
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [isError, setIsError] = useState(false);

  const quickAmounts = [500, 1000, 2000, 5000];
  const isValid = Number(amount) > 0;

  const onProceedToPay = async () => {
    const response = await createPaytmOrder({
      txnAmount: amount,
      firstName: userProfile?.fname || "",
      lastName: userProfile?.lname || "",
      mobile: userProfile?.mobile || "",
      userName: "OEM_" + userProfile?.mobile,
      website: "mapmyindia.com"
    });

    if (response?.status && response?.result?.order_id) {
      startPayment(response?.result?.order_id, response?.result?.body.txnToken)
    }

  }

  const startPayment = async (orderId: string, transactionId: string) => {
    startPaytmTransaction({ orderId: orderId, txnToken: transactionId, amount: Number(amount) }).then((result) => {
      if (result.success) {
        checkPaymentStatus(orderId);
      } else {
        console.log("Payment failed:", result.message);

        if (result.message && result.message.includes("onBackPressedCancelTransaction")) {
          setPopupMessage("Payment cancelled by user");
        } else {
          setPopupMessage(result.message || 'Payment failed');
        }
        setIsError(true);
        setShowPopup(true);
      }
    });
  }

  const checkPaymentStatus = async (orderId: string) => {
    const response = await checkStatus({
      order_id: orderId,
    });

    if (!response) {
      setPopupMessage(error || 'Payment failed');
      setIsError(true);
      setShowPopup(true);
      console.log(error);
      return;
    }

    const status =
      response.result.body.resultInfo.resultStatus;

    console.log('TXN STATUS:', status);

    navigation.navigate(Routes.PAYMENT_SUCCESS, { amount: Number(amount) });
  }

  return (

    <SafeAreaView style={styles.container}>
      <CustomTopBar title='Add Money' onBack={() => navigation.goBack()} />

      <View style={{ paddingHorizontal: vw(5), }}>
        <View style={styles.amountBox}>
          <AppText style={styles.currency}>₹</AppText>
          <TextInput
            value={amount}
            onChangeText={setAmount}
            placeholder="0.00"
            keyboardType="numeric"
            style={styles.amountInput}
            placeholderTextColor="#9CA3AF"
          />
        </View>

        <AppText style={styles.quickTitle}>Quick Amounts</AppText>

        <View style={styles.quickRow}>
          {quickAmounts.map(val => (
            <TouchableOpacity
              key={val}
              style={styles.quickChip}
              onPress={() => setAmount(String(val))}
            >
              <AppText style={styles.quickText}>₹{val}</AppText>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          disabled={!isValid}
          style={[
            styles.payButton,
            { backgroundColor: isValid ? '#005ABF' : '#9DBCF2' },
          ]}
          onPress={onProceedToPay}
        >
          <AppText style={styles.payText}>Proceed to Pay</AppText>
        </TouchableOpacity>

        <AppText style={styles.helper}>
          Payment via UPI / Debit / Credit Card
        </AppText>
        <ErrorPopup
          title={!isError ? 'Payment Successful' : 'Payment Error'}
          visible={showPopup}
          message={popupMessage}
          onPrimary={() => setShowPopup(false)}
          isError={isError}
          canShowPrimary={true}
        />
        <CustomLoader visible={loading || paytmOrderLoading || checkStatusLoading} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  /* Header */
  header: {
    height: vh(7),
    justifyContent: 'center',
  },

  headerTitle: {
    fontSize: vw(4.4),
    fontFamily: Fonts.semiBold,
  },

  /* Amount */
  amountBox: {
    marginTop: vh(3),
    height: vh(7),
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: vw(4),
  },

  currency: {
    fontSize: vw(5),
    fontFamily: Fonts.medium,
    marginRight: vw(1),
  },

  amountInput: {
    flex: 1,
    fontSize: vw(5),
    fontFamily: Fonts.medium,
    color: '#111111',
  },

  /* Quick Amounts */
  quickTitle: {
    marginTop: vh(3),
    fontSize: vw(3.4),
    color: '#6B7280',
  },

  quickRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: vh(1.5),
  },

  quickChip: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: vw(4),
    paddingVertical: vh(1),
    borderRadius: 8,
    marginRight: vw(2),
    marginBottom: vh(1.5),
  },

  quickText: {
    fontSize: vw(3.4),
    fontFamily: Fonts.medium,
  },

  /* CTA */
  payButton: {
    marginTop: vh(5),
    height: vh(6.5),
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  payText: {
    color: '#FFFFFF',
    fontSize: vw(4),
    fontFamily: Fonts.semiBold,
  },

  /* Helper */
  helper: {
    marginTop: vh(2),
    fontSize: vw(3.2),
    color: '#6B7280',
    textAlign: 'center',
  },
});

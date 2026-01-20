import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import AppText from '../../ui/components/AppText';
import { vw, vh } from '../../ui/theme/dimensions';
import { Fonts } from '../../ui/theme/fonts';
import ScreenContainer from '../../ui/components/ScreenContainer';
import CustomTopBar from '../../ui/components/CustomTopBar';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { VehicleStackParamList } from '../../app/navigation/types';
import WalletPinModal from '../../ui/components/WalletPinModal';
import { Routes } from '../../app/constants/routes';

export default function FuelPaymentScreen({ }) {
  const navigation = useNavigation<NativeStackNavigationProp<VehicleStackParamList>>();
  const [amount, setAmount] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [loading, setLoading] = useState(false);


  function Step({ text }: { text: string }) {
    return (
      <View style={styles.stepRow}>
        <AppText style={styles.stepBullet}>•</AppText>
        <AppText style={styles.stepText}>{text}</AppText>
      </View>
    );
  }


  return (
    <ScreenContainer>
      <CustomTopBar title='Fuel Payment' onBack={() => navigation.goBack()} />

      <View style={styles.container}>

        <View style={styles.locationCard}>
          <AppText style={styles.locationLabel}>Detected Location</AppText>
          <AppText style={styles.locationName}>Shell Petrol Pump</AppText>
          <AppText style={styles.locationSub}>
            MG Road, Bangalore
          </AppText>
        </View>


        <AppText style={styles.inputLabel}>
          Enter Amount after filling petrol
        </AppText>

        <View style={styles.amountBox}>
          <AppText style={styles.currency}>₹</AppText>
          <TextInput
            value={amount}
            onChangeText={setAmount}
            keyboardType="number-pad"
            placeholder="0.00"
            placeholderTextColor="#9CA3AF"
            style={styles.amountInput}
          />
        </View>


        <TouchableOpacity
          style={[
            styles.payBtn,
            !amount && styles.payDisabled,
          ]}
          disabled={!amount}
          onPress={() => {
            setShowPin(true)
          }}
        >
          <AppText style={styles.payText}>
            Tap to Pay (PIN required)
          </AppText>
        </TouchableOpacity>


        <View style={styles.infoBox}>
          <AppText style={styles.infoText}>
            💡 If balance low → UPI top-up flow triggers automatically
          </AppText>
        </View>


        <AppText style={styles.sectionTitle}>
          How IVI Payment works:
        </AppText>

        <View style={styles.steps}>
          <Step text="IVI detects location → shows Pay button at pump" />
          <Step text="Fill fuel and enter the amount" />
          <Step text="Tap to pay with your 4-digit PIN" />
          <Step text="Payment is instant and secure" />
        </View>

        <WalletPinModal
          visible={showPin}
          loading={loading}
          onClose={() => setShowPin(false)}
          onSubmit={(pin) => {
            setLoading(true);
            setTimeout(() => {
              setLoading(false);
              setShowPin(false);
              // navigate to success
              // navigation.navigate(Routes.VOUCHER_PURCHASE_SUCCESS);
            }, 1500);
          }}
        />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: vw(5),
  },

  /* Location */
  locationCard: {
    marginTop: vh(3),
    backgroundColor: '#FFF5F0',
    borderRadius: 16,
    padding: vw(5),
  },

  locationLabel: {
    fontSize: vw(3.2),
    color: '#6B7280',
  },

  locationName: {
    marginTop: vh(0.5),
    fontSize: vw(4.2),
    fontFamily: Fonts.semiBold,
  },

  locationSub: {
    marginTop: vh(0.4),
    fontSize: vw(3.4),
    color: '#6B7280',
  },

  /* Amount */
  inputLabel: {
    marginTop: vh(4),
    fontSize: vw(3.4),
    color: '#374151',
  },

  amountBox: {
    marginTop: vh(1.5),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingHorizontal: vw(4),
    height: vh(7),
  },

  currency: {
    fontSize: vw(5),
    color: '#6B7280',
    marginRight: vw(2),
  },

  amountInput: {
    flex: 1,
    fontSize: vw(5),
    fontFamily: Fonts.semiBold,
    color: '#111827',
  },

  /* CTA */
  payBtn: {
    marginTop: vh(4),
    height: vh(7),
    borderRadius: 12,
    backgroundColor: '#FDBA74',
    justifyContent: 'center',
    alignItems: 'center',
  },

  payDisabled: {
    opacity: 0.6,
  },

  payText: {
    fontSize: vw(3.8),
    fontFamily: Fonts.semiBold,
    color: '#FFFFFF',
  },

  /* Info */
  infoBox: {
    marginTop: vh(3),
    backgroundColor: '#FFFBEA',
    borderRadius: 12,
    padding: vw(4),
    borderWidth: 1,
    borderColor: '#FCD34D',
  },

  infoText: {
    fontSize: vw(3.2),
    color: '#92400E',
  },

  /* Steps */
  sectionTitle: {
    marginTop: vh(4),
    fontSize: vw(4),
    fontFamily: Fonts.semiBold,
  },

  steps: {
    marginTop: vh(2),
  },

  stepRow: {
    flexDirection: 'row',
    marginBottom: vh(1.5),
  },

  stepBullet: {
    fontSize: vw(4),
    marginRight: vw(2),
  },

  stepText: {
    flex: 1,
    fontSize: vw(3.4),
    color: '#374151',
  },
});

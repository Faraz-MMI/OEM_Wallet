import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ScreenContainer from '../../ui/components/ScreenContainer';
import { vw, vh, FONT_SIZE } from '../../ui/theme/dimensions';
import { Fonts } from '../../ui/theme/fonts';
import { COLORS } from '../../app/constants/colors';
import { Routes } from '../../app/constants/routes';

export default function RegisterScreen({ navigation }: any) {
  const [mobile, setMobile] = useState('');

  const isValid = mobile.length === 10;

  const onContinue = () => {
    navigation.navigate(Routes.SET_USER_NAME, {
      mobile,
    });
  };

  return (
    <ScreenContainer>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.container}
      >

        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.logoText}>MMI</Text>
          <Text style={styles.title}>MMI OEM Wallet</Text>
          <Text style={styles.subtitle}>
            Your vehicle. Your wallet. One app.
          </Text>
        </View>

        {/* CARD */}
        <LinearGradient
          colors={['#DBEAFE', '#BEDBFF']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.card}
        >
          <View style={styles.cardCircle}>
            <Text style={styles.cardCircleText}>MMI</Text>
          </View>
          <Text style={styles.cardLabel}>MMI OEM Wallet</Text>
        </LinearGradient>

        {/* INSTRUCTION */}
        <Text style={styles.instruction}>
          Enter your mobile number to continue
        </Text>

        {/* MOBILE INPUT */}
        <View style={styles.inputRow}>
          <View style={styles.countryCode}>
            <Image
              source={require('../../assets/icons/india.png')}
              style={styles.flag}
            />
            <Text style={styles.countryText}>+91</Text>
          </View>

          <TextInput
            placeholder="Enter mobile number"
            keyboardType="number-pad"
            maxLength={10}
            value={mobile}
            onChangeText={setMobile}
            style={styles.input}
          />
        </View>

        {/* CONTINUE BUTTON */}
        <TouchableOpacity
          style={[styles.button, !isValid && styles.buttonDisabled]}
          disabled={!isValid}
          onPress={onContinue}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>

      </KeyboardAvoidingView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: vw(6),
  },

  header: {
    alignItems: 'center',
    marginTop: vh(6),
  },

  logoText: {
    color: COLORS.APP_PRIMARY,
    fontSize: FONT_SIZE.FONT_16,
    fontFamily: Fonts.bold,
    marginBottom: vh(1),
  },

  title: {
    fontSize: FONT_SIZE.FONT_28,
    fontFamily: Fonts.bold,
    color: '#101828',
  },

  subtitle: {
    marginTop: vh(1),
    fontSize: FONT_SIZE.FONT_16,
    color: '#4A5565',
    textAlign: 'center',
    fontFamily: Fonts.regular,
  },

  card: {
    marginTop: vh(4),
    width: '100%',
    height: vh(22),
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  cardCircle: {
    width: vw(22),
    height: vw(22),
    borderRadius: vw(11),
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  cardCircleText: {
    color: COLORS.APP_PRIMARY,
    fontSize: vw(4),
    fontFamily: Fonts.semiBold,
  },

  cardLabel: {
    marginTop: vh(2),
    color: COLORS.APP_PRIMARY,
    fontSize: FONT_SIZE.FONT_16,
  },

  instruction: {
    marginTop: vh(5),
    fontSize: FONT_SIZE.FONT_16,
    color: '#364153',
    fontFamily: Fonts.regular,
    textAlign: 'center',
  },

  inputRow: {
    marginTop: vh(2),
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    overflow: 'hidden',
  },

  countryCode: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: vw(3),
    backgroundColor: '#F3F4F6',
    borderRightWidth: 1,
    borderRightColor: '#E5E7EB',
  },

  flag: {
    width: vw(5),
    height: vw(5),
    marginRight: vw(2),
  },

  countryText: {
    fontSize: FONT_SIZE.FONT_16,
    fontFamily: Fonts.semiBold,
    color: '#364153',
  },

  input: {
    flex: 1,
    height: 56,
    paddingHorizontal: 16,
    fontSize: FONT_SIZE.FONT_16,
    backgroundColor: '#FFFFFF',
    fontFamily: Fonts.regular,
  },

  button: {
    marginTop: vh(4),
    height: vh(6.8),
    backgroundColor: COLORS.APP_PRIMARY,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonDisabled: {
    backgroundColor: '#9BBBE3',
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: FONT_SIZE.FONT_16,
    fontFamily: Fonts.semiBold,
  },
});

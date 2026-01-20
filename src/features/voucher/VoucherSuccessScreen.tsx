import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Clipboard,
  ScrollView,
} from 'react-native';
import AppText from '../../ui/components/AppText';
import { vw, vh, FONT_SIZE } from '../../ui/theme/dimensions';
import { Fonts } from '../../ui/theme/fonts';
import { useNavigation } from '@react-navigation/native';
import { MainStack } from '../../app/navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Routes } from '../../app/constants/routes';
import { ICON_COPY, ICON_SUCCESS_CIRCLE } from '../../assets/icons';
import ScreenContainer from '../../ui/components/ScreenContainer';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS } from '../../app/constants/colors';

export default function VoucherSuccessScreen() {
  const voucherCode = 'CCDUBSHGK';
  const navigation = useNavigation<NativeStackNavigationProp<MainStack>>();

  return (
    <ScreenContainer>
      <ScrollView>
        <LinearGradient colors={["#F0FDF4", "#FFFFFF"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.container}>
          <View style={styles.successIcon}>
            <ICON_SUCCESS_CIRCLE width={96} height={96} />
          </View>
          
          <AppText style={styles.title}>
            Voucher Purchased ✅
          </AppText>
          <AppText style={styles.subtitle}>
            Your voucher is ready to use!
          </AppText>

          
          <View style={styles.card}>
            <AppText style={styles.voucherTitle}>
              Cafe Coffee Day
            </AppText>
            <AppText style={styles.voucherSub}>
              ₹500 Voucher
            </AppText>

            
            <View style={styles.codeCard}>
              <AppText style={styles.codeLabel}>
                Voucher Code
              </AppText>

              <View style={styles.codeRow}>
                <AppText style={styles.codeValue}>
                  {voucherCode}
                </AppText>

                <TouchableOpacity
                  style={{ backgroundColor: COLORS.WHITE, borderRadius: 10, padding: 8 }}
                  onPress={() => Clipboard.setString(voucherCode)}
                >
                  <ICON_COPY />
                </TouchableOpacity>
              </View>
            </View>

            
            <View style={styles.valueCard}>
              <AppText style={styles.valueLabel}>
                Voucher Value
              </AppText>
              <AppText style={styles.valueAmount}>
                ₹50
              </AppText>
            </View>

            
            <AppText style={styles.voucherId}>
              Voucher ID: VCH1766473768710
            </AppText>
          </View>

          
          <View style={styles.info}>
            <AppText style={styles.infoText}>
              💡 You can view this voucher anytime from your
              transaction history
            </AppText>
          </View>

          {/* <TouchableOpacity
            style={styles.primaryBtn}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <AppText style={styles.primaryText}>
              View Voucher Details
            </AppText>
          </TouchableOpacity> */}

          <TouchableOpacity
            style={styles.secondaryBtn}
            onPress={() => {
              navigation.reset({
                index: 0,
                routes: [{ name: Routes.DASHBOARD }],
              })
            }}
          >
            <AppText style={styles.secondaryText}>
              Back to Home
            </AppText>
          </TouchableOpacity>
        </LinearGradient>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0FDF4',
    paddingHorizontal: vw(5),
    alignItems: 'center',
  },

  successIcon: {
    marginTop: vh(5),
    alignItems: 'center',
  },

  check: {
    fontSize: vw(10),
    color: '#FFFFFF',
    fontFamily: Fonts.bold,
  },

  title: {
    fontSize: FONT_SIZE.FONT_24,
    fontFamily: Fonts.bold,
    color: "#101828"
  },

  subtitle: {
    marginTop: vh(1),
    fontSize: FONT_SIZE.FONT_14,
    color: '#4A5565',
    fontFamily: Fonts.regular
  },

  /* Card */
  card: {
    marginTop: vh(4),
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: vw(5),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },

  voucherTitle: {
    fontSize: FONT_SIZE.FONT_20,
    fontFamily: Fonts.bold,
    color: "#101828"
  },

  voucherSub: {
    marginTop: vh(0.6),
    fontSize: FONT_SIZE.FONT_14,
    fontFamily: Fonts.regular,
    color: '#4A5565',
  },

  codeCard: {
    marginTop: vh(2),
    width: '100%',
    backgroundColor: '#F4F6FA',
    borderRadius: 14,
    padding: vw(3),
  },

  codeLabel: {
    fontSize: FONT_SIZE.FONT_12,
    color: '#4A5565',
    fontFamily: Fonts.regular,
    textAlign: 'center',
  },

  codeRow: {
    marginTop: vh(1),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: vw(2),
  },

  codeValue: {
    fontSize: FONT_SIZE.FONT_24,
    fontFamily: Fonts.bold,
    color: "#101828",
    letterSpacing: 1.2,
  },

  copy: {
    fontSize: vw(4.4),
  },

  valueCard: {
    marginTop: vh(2.5),
    width: '100%',
    backgroundColor: '#EFF6FF',
    borderRadius: 14,
    padding: vw(4),
    alignItems: 'center',
  },

  valueLabel: {
    fontSize: FONT_SIZE.FONT_14,
    color: '#4A5565',
    fontFamily: Fonts.regular
  },

  valueAmount: {
    marginTop: vh(0.6),
    fontSize: FONT_SIZE.FONT_30,
    fontFamily: Fonts.bold,
    color: COLORS.APP_PRIMARY,
  },

  voucherId: {
    marginTop: vh(2),
    fontSize: FONT_SIZE.FONT_12,
    color: '#6A7282',
  },

  info: {
    marginTop: vh(3),
    backgroundColor: '#EFF6FF',
    borderColor: "#BEDBFF",
    borderWidth: 1,
    borderRadius: 12,
    padding: vw(4),
  },

  infoText: {
    fontSize: FONT_SIZE.FONT_12,
    color: '#193CB8',
    fontFamily: Fonts.regular,
    textAlign: 'center',
  },

  /* Buttons */
  primaryBtn: {
    marginTop: vh(3),
    width: '100%',
    height: vh(7),
    backgroundColor: '#005ABF',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },

  primaryText: {
    color: '#FFFFFF',
    fontSize: FONT_SIZE.FONT_14,
    fontFamily: Fonts.semiBold,
  },

  secondaryBtn: {
    marginTop: vh(2),
    width: '100%',
    height: vh(6.5),
    backgroundColor: '#F3F4F6',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth: 1,
    borderColor: '#E5E7EB',
    alignSelf:'flex-end'
  },

  secondaryText: {
    fontSize: FONT_SIZE.FONT_16,
    fontFamily:Fonts.regular,
    color: '#364153',
  },
});

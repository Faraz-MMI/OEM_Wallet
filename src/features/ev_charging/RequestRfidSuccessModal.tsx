import React from 'react';
import {
  View,
  StyleSheet,
  Modal,
  TouchableOpacity,
} from 'react-native';
import AppText from '../../ui/components/AppText';
import { Fonts } from '../../ui/theme/fonts';
import { vw, vh } from '../../ui/theme/dimensions';
import { COLORS } from '../../app/constants/colors';
import { CheckCircle } from '../../assets/icons';

type Props = {
  visible: boolean;
  onClose: () => void;
};

export default function RequestRfidSuccessModal({
  visible,
  onClose,
}: Props) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
    >
      <View style={styles.overlay}>
        <View style={styles.card}>

          {/* Success Icon */}
          <View style={styles.iconWrap}>
            <CheckCircle width={26} height={26} color="#16A34A" />
          </View>

          {/* Title */}
          <AppText style={styles.title}>
            Request Registered ✅
          </AppText>

          {/* Message */}
          <AppText style={styles.message}>
            Your request for a replacement RFID card has been
            successfully registered.
            {'\n\n'}
            Your current RFID card has been deactivated and a
            new card will be delivered within 7–10 business days.
          </AppText>

          {/* Fee */}
          <AppText style={styles.feeText}>
            Replacement fee: ₹100
          </AppText>

          {/* CTA */}
          <TouchableOpacity
            style={styles.primaryBtn}
            onPress={onClose}
          >
            <AppText style={styles.primaryText}>
              Got it
            </AppText>
          </TouchableOpacity>

        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.55)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  card: {
    width: vw(85),
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingVertical: vh(3),
    paddingHorizontal: vw(6),
    alignItems: 'center',
  },

  iconWrap: {
    width: vw(14),
    height: vw(14),
    borderRadius: vw(7),
    backgroundColor: '#DCFCE7',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: vh(2),
  },

  title: {
    fontSize: vw(4.2),
    fontFamily: Fonts.semiBold,
    color: '#111827',
    textAlign: 'center',
  },

  message: {
    marginTop: vh(1.4),
    fontSize: vw(3.2),
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: vh(2.6),
  },

  feeText: {
    marginTop: vh(1.6),
    fontSize: vw(3.1),
    color: '#6B7280',
    fontFamily: Fonts.regular,
  },

  primaryBtn: {
    marginTop: vh(3),
    width: '100%',
    height: vh(6.4),
    backgroundColor: COLORS.APP_PRIMARY,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },

  primaryText: {
    color: '#FFFFFF',
    fontSize: vw(3.8),
    fontFamily: Fonts.semiBold,
  },
});

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
import { CheckCircle } from '../../assets/icons'; // use same icon system as wallet pin

type Props = {
  visible: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

export default function RequestRfidConfirmModal({
  visible,
  onCancel,
  onConfirm,
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

          {/* Icon */}
          <View style={styles.iconWrap}>
            <CheckCircle width={26} height={26} color="#16A34A" />
          </View>

          {/* Title */}
          <AppText style={styles.title}>
            Request New RFID Card
          </AppText>

          {/* Message */}
          <AppText style={styles.message}>
            Are you sure you want to request a new RFID card?
            {'\n'}
            Your old card will be deactivated immediately.
          </AppText>

          {/* Actions */}
          <View style={styles.actionsRow}>
            <TouchableOpacity
              style={styles.cancelBtn}
              onPress={onCancel}
            >
              <AppText style={styles.cancelText}>
                Cancel
              </AppText>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.confirmBtn}
              onPress={onConfirm}
            >
              <AppText style={styles.confirmText}>
                Confirm
              </AppText>
            </TouchableOpacity>
          </View>

        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
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
    marginTop: vh(1.2),
    fontSize: vw(3.2),
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: vh(2.6),
  },

  actionsRow: {
    flexDirection: 'row',
    marginTop: vh(3),
    width: '100%',
    justifyContent: 'space-between',
  },

  cancelBtn: {
    width: '48%',
    height: vh(6),
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  cancelText: {
    fontSize: vw(3.6),
    color: '#111827',
    fontFamily: Fonts.medium,
  },

  confirmBtn: {
    width: '48%',
    height: vh(6),
    backgroundColor: COLORS.APP_PRIMARY,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  confirmText: {
    fontSize: vw(3.6),
    color: '#FFFFFF',
    fontFamily: Fonts.medium,
  },
});

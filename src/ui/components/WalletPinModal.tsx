import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Keyboard,
} from 'react-native';
import AppText from '../../ui/components/AppText';
import { Fonts } from '../../ui/theme/fonts';
import { vw, vh } from '../../ui/theme/dimensions';
import { ICON_CLOSE, ICON_LOCK } from '../../assets/icons';

type Props = {
  visible: boolean;
  onClose: () => void;
  onSubmit: (pin: string) => void;
  loading?: boolean;
};

export default function WalletPinModal({
  visible,
  onClose,
  onSubmit,
  loading = false,
}: Props) {
  const [pin, setPin] = useState('');
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (visible) {
      setPin('');
      setTimeout(() => {
        inputRef.current?.focus();
      }, 250);
    } else {
      Keyboard.dismiss();
    }
  }, [visible]);

  const onChangePin = (value: string) => {
    if (/^\d*$/.test(value) && value.length <= 4) {
      setPin(value);
    }
  };

  const handleSubmit = () => {
    if (pin.length === 4 && !loading) {
      onSubmit(pin);
    }
  };

  if (!visible) return null;

  return (
    <Modal
      visible
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.card}>
          
          <TouchableOpacity style={styles.close} onPress={onClose}>
            <ICON_CLOSE width={18} height={18} color="#6B7280" />
          </TouchableOpacity>

          
          <View style={styles.iconWrap}>
            <ICON_LOCK width={28} height={28} color="#005ABF" />
          </View>

          
          <AppText style={styles.title}>Enter Wallet PIN</AppText>
          <AppText style={styles.subtitle}>
            Enter your 4-digit PIN to authenticate
          </AppText>

          
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => inputRef.current?.focus()}
            style={styles.pinRow}
          >
            {[0, 1, 2, 3].map(i => (
              <View
                key={i}
                style={[
                  styles.pinBox,
                  pin.length > i && styles.pinBoxActive,
                ]}
              >
                {pin.length > i && <View style={styles.dot} />}
              </View>
            ))}
          </TouchableOpacity>

          
          <TextInput
            ref={inputRef}
            value={pin}
            onChangeText={onChangePin}
            keyboardType="number-pad"
            maxLength={4}
            style={styles.hiddenInput}
            autoFocus={false}
          />

          
          <TouchableOpacity
            style={[
              styles.confirmBtn,
              pin.length !== 4 && styles.confirmDisabled,
            ]}
            disabled={pin.length !== 4 || loading}
            onPress={handleSubmit}
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <AppText style={styles.confirmText}>Confirm</AppText>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  card: {
    width: vw(85),
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: vw(6),
    alignItems: 'center',
  },

  close: {
    position: 'absolute',
    top: vh(2),
    right: vw(4),
  },

  iconWrap: {
    width: vw(14),
    height: vw(14),
    borderRadius: vw(7),
    backgroundColor: '#E5F0FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: vh(2),
  },

  title: {
    fontSize: vw(4.2),
    fontFamily: Fonts.semiBold,
  },

  subtitle: {
    marginTop: vh(0.8),
    fontSize: vw(3.2),
    color: '#6B7280',
    textAlign: 'center',
  },

  pinRow: {
    flexDirection: 'row',
    marginTop: vh(3),
  },

  pinBox: {
    width: vw(10),
    height: vw(10),
    borderRadius: 10,
    backgroundColor: '#F3F4F6',
    marginHorizontal: vw(1.5),
    justifyContent: 'center',
    alignItems: 'center',
  },

  pinBoxActive: {
    borderWidth: 1.5,
    borderColor: '#005ABF',
  },

  dot: {
    width: vw(2.5),
    height: vw(2.5),
    borderRadius: vw(1.25),
    backgroundColor: '#111827',
  },

  hiddenInput: {
    position: 'absolute',
    opacity: 0,
    width: 1,
    height: 1,
  },

  confirmBtn: {
    marginTop: vh(4),
    height: vh(6.5),
    width: '100%',
    backgroundColor: '#005ABF',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  confirmDisabled: {
    backgroundColor: '#9DBCF2',
  },

  confirmText: {
    color: '#FFFFFF',
    fontSize: vw(4),
    fontFamily: Fonts.semiBold,
  },
});

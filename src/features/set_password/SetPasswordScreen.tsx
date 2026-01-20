import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import AppText from '../../ui/components/AppText';
import { vw, vh } from '../../ui/theme/dimensions';
import { Fonts } from '../../ui/theme/fonts';
import { COLORS } from '../../app/constants/colors';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Routes } from '../../app/constants/routes';
type Props = NativeStackScreenProps<any>;

export default function SetPasswordScreen({ navigation }: Props) {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const hasMin = password.length >= 8;
  const hasNumber = /\d/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);
  const isValid = hasMin && hasNumber && hasSpecial && password === confirm;

  const onSave = () => {
    navigation.navigate(Routes.SET_PIN)
  };

  return (
    <View style={styles.container}>
      
      <AppText style={styles.title}>Set Your Password</AppText>
      <AppText style={styles.subtitle}>
        Create a strong password to secure{'\n'}your account
      </AppText>

      
      <View style={styles.field}>
        <AppText style={styles.label}>Create Password</AppText>
        <View style={styles.inputWrap}>
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Enter password"
            secureTextEntry={!showPass}
            style={styles.input}
          />
          <TouchableOpacity onPress={() => setShowPass(!showPass)}>
            <Image source={require('../../assets/icons/icon_eye.png')} style={{}} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.field}>
        <AppText style={styles.label}>Confirm Password</AppText>
        <View style={styles.inputWrap}>
          <TextInput
            value={confirm}
            onChangeText={setConfirm}
            placeholder="Re-enter password"
            secureTextEntry={!showConfirm}
            style={styles.input}
          />
          <TouchableOpacity
            onPress={() => setShowConfirm(!showConfirm)}
          >
            <Image source={require('../../assets/icons/icon_eye.png')} style={{}} />
          </TouchableOpacity>
        </View>
      </View>

      
      <View style={styles.rules}>
        <AppText style={styles.rulesTitle}>
          Password must contain:
        </AppText>

        <Rule ok={hasMin} text="Minimum 8 characters" />
        <Rule ok={hasNumber} text="At least 1 number" />
        <Rule ok={hasSpecial} text="At least 1 special character" />
      </View>

      <TouchableOpacity
        // disabled={!isValid}
        style={[
          styles.cta,
          // !isValid && styles.ctaDisabled,
        ]}
        onPress={onSave}
      >
        <AppText style={styles.ctaText}>
          Save & Continue
        </AppText>
      </TouchableOpacity>

      
      <AppText style={styles.footer}>
        You can reset your password later from Settings
      </AppText>
    </View>
  );
}

function Rule({ ok, text }: { ok: boolean; text: string }) {
  return (
    <View style={styles.ruleRow}>
      <AppText
        style={[
          styles.ruleIcon,
          ok && styles.ruleOk,
        ]}
      >
        {ok ? '✓' : '✕'}
      </AppText>
      <AppText style={styles.ruleText}>{text}</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: vw(6),
    paddingTop: vh(6),
  },

  title: {
    fontSize: vw(6),
    fontFamily: Fonts.bold,
    color: '#0F172A',
  },

  subtitle: {
    marginTop: vh(1.2),
    fontSize: vw(3.6),
    color: '#64748B',
    lineHeight: vw(5),
  },

  field: {
    marginTop: vh(4),
  },

  label: {
    fontSize: vw(3.4),
    color: '#374151',
    marginBottom: vh(1),
  },

  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingHorizontal: vw(4),
    height: vh(6.5),
  },

  input: {
    flex: 1,
    fontSize: vw(3.6),
    fontFamily: Fonts.regular,
  },

  eye: {
    fontSize: vw(4),
    color: '#6B7280',
  },

  rules: {
    marginTop: vh(4),
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: vw(4),
  },

  rulesTitle: {
    fontSize: vw(3.4),
    fontFamily: Fonts.medium,
    marginBottom: vh(1.5),
  },

  ruleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: vh(1),
  },

  ruleIcon: {
    width: vw(5),
    fontSize: vw(3.4),
    color: '#9CA3AF',
  },

  ruleOk: {
    color: '#16A34A',
  },

  ruleText: {
    fontSize: vw(3.2),
    color: '#475569',
  },

  cta: {
    marginTop: vh(6),
    height: vh(7),
    backgroundColor: COLORS.BUTTON_SELECTED,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },

  ctaDisabled: {
    opacity: 0.5,
  },

  ctaText: {
    color: '#FFFFFF',
    fontSize: vw(4),
    fontFamily: Fonts.semiBold,
  },

  footer: {
    marginTop: vh(3),
    fontSize: vw(3.2),
    color: '#94A3B8',
    textAlign: 'center',
  },
});



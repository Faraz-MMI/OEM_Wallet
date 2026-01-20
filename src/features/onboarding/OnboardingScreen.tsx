import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { vw, vh } from '../../ui/theme/dimensions';
import { useAuthStore } from '../../app/store/authStore';
import { Routes } from '../../app/constants/routes';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { STRINGS } from '../../app/constants/strings';
import { useFetchCustomer } from './hooks/useFetchCustomer';
import { useUserStore } from '../../app/store/userStore';

type Props = NativeStackScreenProps<any>;

export default function OnboardingScreen({ navigation }: Props) {
  const { setMobile, hasPassword, setHasPassword } = useAuthStore();
  const { fetchCustomerAsync, data, isLoading, error } = useFetchCustomer();

  const [mobile, setMobileInput] = useState('');
  const [password, setPassword] = useState('');

  const onContinue = async () => {
    setMobile(mobile);

    if (!hasPassword) {
      navigation.navigate(Routes.VERIFY_OTP);
    } else {
      const response = await fetchCustomerAsync({
        mobile: { countryCode: 91, value: '9998427343' }
      });

      useUserStore.getState().setUser(response);
      navigation.replace(Routes.DASHBOARD);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      
      <Text style={styles.title}>{STRINGS.APP_NAME}</Text>

      
      <Text style={styles.subtitle}>
        {STRINGS.APP_TAGLINE}
      </Text>

      
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Image
          source={require('../../assets/mapples_logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      <View style={{ flex: 1, width: '100%', justifyContent: 'flex-end', marginBottom: vh(6), alignItems: 'center' }}>
        
        <Text style={styles.helper}>
          {STRINGS.ONBOARDING_HELPER}
        </Text>

        
        <TextInput
          style={styles.input}
          placeholder={STRINGS.MOBILE_PLACEHOLDER}
          keyboardType="phone-pad"
          maxLength={10}
          value={mobile}
          onChangeText={setMobileInput}
        />

        
        {hasPassword && (
          <TextInput
            style={styles.input}
            placeholder={STRINGS.PASSWORD_PLACEHOLDER}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        )}

        
        <TouchableOpacity
          style={[
            styles.button,
            mobile.length < 10 && styles.buttonDisabled,
          ]}
          disabled={mobile.length < 10}
          onPress={onContinue}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: vw(6),
    alignItems: 'center',
  },

  title: {
    marginTop: vh(8),
    fontSize: vw(5),
    fontWeight: '500',
    color: '#111111',
  },

  subtitle: {
    marginTop: vh(0.8),
    fontSize: vw(3.2),
    color: '#6B7280',
  },

  logo: {
    width: vw(45),
    height: vw(45),
    marginTop: vh(4),
    justifyContent: 'center'
  },

  helper: {
    marginTop: vh(4),
    fontSize: vw(3.2),
    color: '#6B7280',
  },

  input: {
    width: '100%',
    height: vh(6.5),
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingHorizontal: vw(4),
    marginTop: vh(2),
    fontSize: vw(3.8),
  },

  button: {
    width: '100%',
    height: vh(6.5),
    backgroundColor: '#0057D8',
    borderRadius: 16,
    marginTop: vh(3),
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonDisabled: {
    backgroundColor: '#9DBCF2',
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: vw(3.8),
    fontWeight: '500',
  },
});


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
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ScreenContainer from '../../ui/components/ScreenContainer';
import { vw, vh, FONT_SIZE } from '../../ui/theme/dimensions';
import { Fonts } from '../../ui/theme/fonts';
import { COLORS } from '../../app/constants/colors';
import { Routes } from '../../app/constants/routes';
import { ICON_EYE, ICON_EYE_OFF } from '../../assets/icons';
import { useLoginUser } from './hooks/useLoginUser';
import CustomLoader from '../../ui/components/CustomLoader';
import { md5 } from '../../app/services/encryption';
import { useAuthStore } from '../../app/store/authStore';
import { useUserStore } from '../../app/store/userStore';
import { useFetchCustomer } from './hooks/useFetchCustomer';

export default function LoginScreen({ navigation }: any) {
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [secure, setSecure] = useState(true);
  const { login, loading, error } = useLoginUser();
  const { fetchCustomerAsync, data, isLoading, error: fetchCustomerError } = useFetchCustomer();

  const isValid = mobile.length === 10 && password.length > 0;

  const onLogin = async () => {
    const result = await login({
      username: mobile,
      md5Password: md5(password),
      grant_type: 'password',
    });

    if (result) {
      console.log('TOKEN:', result.token);
      console.log('USER:', result.fname, result.lname);
       const response = await fetchCustomerAsync({
                  mobile: { countryCode: 91, value: '9998427343' }
              });
        console.log("fetchCustomer wallet screen", response);
        useUserStore.getState().setUser(response);
        useAuthStore.getState().setHasPassword(true);
    }
  };

  const onLogin_ = () => {
    navigation.replace(Routes.DASHBOARD);
  };

  return (
    <ScreenContainer>
        <ScrollView>
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

        {/* PASSWORD */}
        <View style={styles.passwordRow}>
          <TextInput
            placeholder="Password"
            secureTextEntry={secure}
            value={password}
            onChangeText={setPassword}
            style={styles.passwordInput}
          />
          <TouchableOpacity onPress={() => setSecure(!secure)}>
            {secure ? <ICON_EYE/> : <ICON_EYE_OFF/>}
          </TouchableOpacity>
        </View>

        {/* FORGOT */}
        <TouchableOpacity
          style={styles.forgotWrap}
        //   onPress={() => navigation.navigate(Routes.FORGOT_PASSWORD)}
        >
          <Text style={styles.forgot}>Forgot password?</Text>
        </TouchableOpacity>

        {/* LOGIN BUTTON */}
        <TouchableOpacity
          style={[styles.button, !isValid && styles.buttonDisabled]}
          disabled={!isValid}
          onPress={onLogin}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        {/* CREATE ACCOUNT */}
        <TouchableOpacity
          onPress={() => navigation.navigate(Routes.CREATE_ACCOUNT)}
        >
          <Text style={styles.createAccount}>Create new account</Text>
        </TouchableOpacity>

      </KeyboardAvoidingView>
      </ScrollView>
      <CustomLoader visible={loading} />
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

  inputRow: {
    marginTop: vh(4),
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
  },

  input: {
    flex: 1,
    height: 56,
    paddingHorizontal: 16,
    fontSize: FONT_SIZE.FONT_16,
    backgroundColor: '#FFFFFF',
  },

  passwordRow: {
    marginTop: vh(2),
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
  },

  passwordInput: {
    flex: 1,
    fontSize: FONT_SIZE.FONT_16,
  },

  forgotWrap: {
    alignSelf: 'flex-end',
    marginTop: vh(1.5),
  },

  forgot: {
    color: COLORS.APP_PRIMARY,
    fontSize: FONT_SIZE.FONT_14,
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

  createAccount: {
    marginTop: vh(3),
    color: COLORS.APP_PRIMARY,
    fontSize: FONT_SIZE.FONT_14,
    textAlign: 'center',
  },

  demo: {
    marginTop: vh(6),
    fontSize: FONT_SIZE.FONT_12,
    color: '#9CA3AF',
    textAlign: 'center',
  },
});



// import React, { useState } from 'react';
// import {
//     View,
//     Text,
//     StyleSheet,
//     TextInput,
//     TouchableOpacity,
//     Image,
//     KeyboardAvoidingView,
//     Platform,
// } from 'react-native';
// import { vw, vh, FONT_SIZE } from '../../ui/theme/dimensions';
// import LinearGradient from 'react-native-linear-gradient';
// import { Fonts } from '../../ui/theme/fonts';
// import ScreenContainer from '../../ui/components/ScreenContainer';
// import { useAuthStore } from '../../app/store/authStore';
// import { useFetchCustomer } from './hooks/useFetchCustomer';
// import { Routes } from '../../app/constants/routes';
// import { COLORS } from '../../app/constants/colors';
// import { NativeStackScreenProps } from '@react-navigation/native-stack';
// import { useUserStore } from '../../app/store/userStore';

// type Props = NativeStackScreenProps<any>;

// export default function LoginScreen({ navigation }: Props) {
//     const { setMobile, hasPassword, setHasPassword } = useAuthStore();
//     const { fetchCustomerAsync, data, isLoading, error } = useFetchCustomer();
//     const [mobile, setMobileInput] = useState('');

//     const onContinue = async () => {
//         setMobile(mobile);

//         if (!hasPassword) {
//             navigation.navigate(Routes.VERIFY_OTP);
//         } else {
//             const response = await fetchCustomerAsync({
//                 mobile: { countryCode: 91, value: '9998427343' }
//             });

//             useUserStore.getState().setUser(response);
//             navigation.replace(Routes.DASHBOARD);
//         }
//     };

//     return (
//         <ScreenContainer>
//             <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.container}>
//                 <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//                     <Text style={styles.logoText}>MMI</Text>
//                     <Text style={styles.title}>MMI OEM Wallet</Text>
//                     <Text style={styles.subtitle}>
//                         Your vehicle. Your wallet. One app.
//                     </Text>
//                 </View>
//                 <View style={{ flex: 2 }}>
//                     <LinearGradient
//                         colors={['#DBEAFE', '#BEDBFF']}
//                         start={{ x: 0, y: 0 }}
//                         end={{ x: 1, y: 1 }}
//                         style={styles.card}
//                     >
//                         <View style={styles.cardCircle}>
//                             <Text style={styles.cardCircleText}>MMI</Text>
//                         </View>

//                         <Text style={styles.cardLabel}>MMI OEM Wallet</Text>
//                     </LinearGradient>
//                 </View>

                
//                 <Text style={styles.instruction}>
//                     Enter your mobile number to continue
//                 </Text>

                
//                 <View style={styles.inputRow}>
//                     <View style={styles.countryCode}>
//                         <Image
//                             source={require('../../assets/icons/india.png')}
//                             style={styles.flag}
//                         />
//                         <Text style={styles.countryText}>+91</Text>
//                     </View>

//                     <TextInput
//                         placeholder="Enter mobile number"
//                         keyboardType="number-pad"
//                         maxLength={10}
//                         value={mobile}
//                         onChangeText={setMobileInput}
//                         style={styles.input}
//                     />
//                 </View>

                
//                 <TouchableOpacity
//                     style={[
//                         styles.button,
//                         mobile.length < 10 && styles.buttonDisabled,
//                     ]}
//                     disabled={mobile.length < 10}
//                     onPress={onContinue}
//                 >
//                     <Text style={styles.buttonText}>Continue</Text>
//                 </TouchableOpacity>
//             </KeyboardAvoidingView>
//         </ScreenContainer>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#FFFFFF',
//         alignItems: 'center',
//         paddingHorizontal: vw(6),
//         paddingTop: vh(8),
//     },

//     logoText: {
//         color: COLORS.APP_PRIMARY,
//         fontSize: FONT_SIZE.FONT_16,
//         marginBottom: vh(2),
//         fontFamily: Fonts.bold
//     },

//     title: {
//         fontSize: FONT_SIZE.FONT_28,
//         fontWeight: '700',
//         color: '#101828',
//         fontFamily: Fonts.bold
//     },

//     subtitle: {
//         marginTop: vh(1),
//         fontSize: FONT_SIZE.FONT_16,
//         fontFamily: Fonts.regular,
//         color: '#4A5565',
//         textAlign: 'center',
//     },

//     card: {
//         marginTop: vh(4),
//         width: vw(80),
//         height: vh(25),
//         borderRadius: 20,
//         backgroundColor: '#DDEBFF',
//         justifyContent: 'center',
//         alignItems: 'center',
//     },

//     cardCircle: {
//         width: vw(22),
//         height: vw(22),
//         borderRadius: vw(11),
//         backgroundColor: '#FFFFFF',
//         justifyContent: 'center',
//         alignItems: 'center',
//     },

//     cardCircleText: {
//         color: COLORS.APP_PRIMARY,
//         fontSize: vw(4),
//         fontWeight: '600',
//     },

//     cardLabel: {
//         marginTop: vh(2),
//         color: COLORS.APP_PRIMARY,
//         fontSize: FONT_SIZE.FONT_16,
//         fontFamily: Fonts.regular
//     },

//     instruction: {
//         marginTop: vh(5),
//         fontSize: FONT_SIZE.FONT_16,
//         color: '#364153',
//         fontFamily: Fonts.regular
//     },

//     inputRow: {
//         marginTop: vh(2),
//         width: '100%',
//         flexDirection: 'row',
//         borderWidth: 1,
//         borderColor: '#E5E7EB',
//         borderRadius: 12,
//         overflow: 'hidden',
//     },

//     countryCode: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         paddingHorizontal: vw(3),
//         borderRightWidth: 1,
//         borderRightColor: '#E5E7EB',
//         backgroundColor: '#E5E7EB',
//     },

//     flag: {
//         width: vw(5),
//         height: vw(5),
//         marginRight: vw(2),
//     },

//     countryText: {
//         fontSize: FONT_SIZE.FONT_16,
//         fontFamily: Fonts.bold,
//         color: '#364153',
//     },

//     input: {
//         // flex: 1,
//         // paddingHorizontal: vw(4),
//         // fontSize: vw(3.8),
//         // color: '#111827',
//         width: '100%',
//         height: 56,
//         paddingHorizontal: 16,
//         // borderRadius: 12,
//         backgroundColor: COLORS.WHITE,
//         fontSize: FONT_SIZE.FONT_16,
//         fontFamily: Fonts.regular,
//         color: '#111111',
//     },

//     button: {
//         marginTop: vh(4),
//         width: '100%',
//         height: vh(6.8),
//         backgroundColor: COLORS.APP_PRIMARY,
//         borderRadius: 14,
//         justifyContent: 'center',
//         alignItems: 'center',
//         marginBottom: 24
//     },

//     buttonDisabled: {
//         backgroundColor: '#9BBBE3',
//     },

//     buttonText: {
//         color: '#FFFFFF',
//         fontSize: vw(4),
//         fontWeight: '500',
//     },
// });

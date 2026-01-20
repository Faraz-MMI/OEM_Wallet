import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import AppText from '../../ui/components/AppText';
import { vw, vh } from '../../ui/theme/dimensions';
import { Fonts } from '../../ui/theme/fonts';
import ScreenContainer from '../../ui/components/ScreenContainer';
import CustomTopBar from '../../ui/components/CustomTopBar';
import { useNavigation } from '@react-navigation/native';
import { ProfileStackParamList } from '../../app/navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useUserStore } from '../../app/store/userStore';

export default function MyProfileScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<ProfileStackParamList>>();
  const { profile, entityId, setBrand, selectedBrand } = useUserStore();
  const account =
    profile != null && profile.accounts != null && profile.accounts.length > 0 ? profile.accounts[0] : null;

  function Section({
    title,
    children,
  }: {
    title: string;
    children: React.ReactNode;
  }) {
    return (
      <View style={styles.section}>
        <AppText style={styles.sectionTitle}>{title}</AppText>
        {children}
      </View>
    );
  }

  function Field({
    label,
    value,
    disabled = false,
  }: {
    label: string;
    value: string;
    disabled?: boolean;
  }) {
    return (
      <View style={styles.fieldWrap}>
        <AppText style={styles.label}>{label}</AppText>
        <TextInput
          value={value}
          editable={!disabled}
          placeholder={label}
          placeholderTextColor="#9CA3AF"
          style={[
            styles.input,
            disabled && styles.inputDisabled,
          ]}
        />
      </View>
    );
  }

  function MultilineField({
    label,
    value,
  }: {
    label: string;
    value: string;
  }) {
    return (
      <View style={styles.fieldWrap}>
        <AppText style={styles.label}>{label}</AppText>
        <TextInput
          value={value}
          multiline
          numberOfLines={3}
          placeholder={label}
          placeholderTextColor="#9CA3AF"
          style={[styles.input, styles.multiline]}
        />
      </View>
    );
  }

  const getInitials = (firstName?: string, lastName?: string): string => {
    if (!firstName && !lastName) return '';

    const first = firstName?.trim().charAt(0) ?? '';
    const last = lastName?.trim().charAt(0) ?? '';

    return (first + last).toUpperCase();
  };

  return (
    <ScreenContainer>
      <CustomTopBar title='My Profile' onBack={() => navigation.goBack()} />
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: vh(4) }}
        showsVerticalScrollIndicator={false}
      >

        <View style={styles.avatarCard}>
          <View style={styles.avatar}>
            <AppText style={styles.avatarText}>{getInitials(profile.firstName,profile.lastName)}</AppText>

            <TouchableOpacity style={styles.cameraBtn}>
              <AppText style={styles.cameraIcon}>📷</AppText>
            </TouchableOpacity>
          </View>

          <AppText style={styles.avatarHint}>
            Max 5MB • JPG or PNG only
          </AppText>
        </View>


        <Section title="Personal Details">
          <Field label="First Name" value={profile?.firstName} />
          <Field label="Last Name" value={profile?.lastName} />
          <Field label="Mobile Number" value={`${profile?.mobile.countryCode} ${profile?.mobile.value}`} disabled />
          <Field
            label="Email ID (Optional)"
            value={profile.email}
          />
        </Section>


        <Section title="Additional Information">
          <Field label="Date of Birth (Optional)" value={profile.dob} />
          <Field label="Gender (Optional)" value={profile.gender} />
        </Section>


        <Section title="Address">
          <MultilineField label="Address Line 1" value={profile.address.permanentAddress.address1} />
          <Field label="City" value={profile.address.permanentAddress.city} />
          <Field label="State" value={profile.address.permanentAddress.state} />
          <Field label="Pincode" value={profile.address.permanentAddress.pin} />
        </Section>


        <View style={styles.kycCard}>
          <AppText style={styles.kycTitle}>KYC Status</AppText>

          <View style={styles.kycBadge}>
            <AppText style={styles.kycCheck}>✓</AppText>
            <AppText style={styles.kycText}>
              Full KYC Completed
            </AppText>
          </View>

          <AppText style={styles.kycNote}>
            Your KYC is fully verified. Some fields cannot be edited as
            they are linked to your KYC documents.
          </AppText>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: vw(5),
  },

  /* Avatar */
  avatarCard: {
    marginTop: vh(3),
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: vh(4),
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },

  avatar: {
    width: vw(24),
    height: vw(24),
    borderRadius: vw(12),
    backgroundColor: '#005ABF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  avatarText: {
    fontSize: vw(7),
    fontFamily: Fonts.bold,
    color: '#FFFFFF',
  },

  cameraBtn: {
    position: 'absolute',
    bottom: -vh(0.8),
    right: -vw(1),
    width: vw(8),
    height: vw(8),
    borderRadius: vw(4),
    backgroundColor: '#005ABF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },

  cameraIcon: {
    fontSize: vw(3.6),
  },

  avatarHint: {
    marginTop: vh(2),
    fontSize: vw(3),
    color: '#6B7280',
  },

  /* Sections */
  section: {
    marginTop: vh(4),
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: vw(4),
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },

  sectionTitle: {
    marginBottom: vh(2),
    fontSize: vw(4),
    fontFamily: Fonts.semiBold,
  },

  fieldWrap: {
    marginBottom: vh(2),
  },

  label: {
    marginBottom: vh(0.6),
    fontSize: vw(3.2),
    color: '#6B7280',
  },

  input: {
    height: vh(6.5),
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    paddingHorizontal: vw(4),
    fontSize: vw(3.6),
    color: '#111827',
  },

  inputDisabled: {
    backgroundColor: '#F3F4F6',
    color: '#6B7280',
  },

  multiline: {
    height: vh(10),
    textAlignVertical: 'top',
    paddingTop: vh(1.5),
  },

  /* KYC */
  kycCard: {
    marginTop: vh(4),
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: vw(4),
    borderWidth: 1,
    borderColor: '#DCFCE7',
  },

  kycTitle: {
    fontSize: vw(4),
    fontFamily: Fonts.semiBold,
  },

  kycBadge: {
    marginTop: vh(2),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    borderRadius: 12,
    padding: vw(3),
    gap: vw(2),
  },

  kycCheck: {
    fontSize: vw(4),
    color: '#16A34A',
  },

  kycText: {
    fontSize: vw(3.4),
    color: '#16A34A',
    fontFamily: Fonts.semiBold,
  },

  kycNote: {
    marginTop: vh(1.5),
    fontSize: vw(3.2),
    color: '#6B7280',
  },
});

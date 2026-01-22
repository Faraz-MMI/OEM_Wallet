import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    Alert,
} from 'react-native';
import ScreenContainer from '../../ui/components/ScreenContainer';
import { vw, vh, FONT_SIZE } from '../../ui/theme/dimensions';
import { Fonts } from '../../ui/theme/fonts';
import { COLORS } from '../../app/constants/colors';
import { AuthStackParamList } from '../../app/navigation/types';
import { Routes } from '../../app/constants/routes';
import { RouteProp, useRoute } from '@react-navigation/native';

type SetNameRouteProp = RouteProp<AuthStackParamList, typeof Routes.SET_USER_NAME>;
export default function SetNameScreen({ navigation }: any) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [emailId, setEmailId] = useState('');
    const route = useRoute<SetNameRouteProp>();
    const { mobile } = route.params;

    const isValid = firstName.trim().length > 0 && lastName.trim().length > 0 && emailId.trim().length > 0;

    const onContinue = () => {
        if (isValid) {
            navigation.navigate(Routes.SET_PASSWORD, { mobile, first_name: firstName, last_name: lastName, email_id: emailId });
        }
    };

    return (
        <ScreenContainer>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                style={styles.container}
            >

                {/* HEADER */}
                <Text style={styles.title}>What's your name?</Text>
                <Text style={styles.subtitle}>
                    Enter your name to personalize your wallet
                </Text>

                {/* FORM */}
                <View style={styles.form}>

                    {/* First Name */}
                    <Text style={styles.label}>First Name</Text>
                    <TextInput
                        placeholder="Enter first name"
                        value={firstName}
                        onChangeText={setFirstName}
                        style={styles.input}
                        placeholderTextColor="#9CA3AF"
                    />

                    {/* Last Name */}
                    <Text style={[styles.label, { marginTop: vh(2) }]}>
                        Last Name
                    </Text>
                    <TextInput
                        placeholder="Enter last name"
                        value={lastName}
                        onChangeText={setLastName}
                        style={styles.input}
                        placeholderTextColor="#9CA3AF"
                    />

                    <Text style={[styles.label, { marginTop: vh(2) }]}>
                        Email ID
                    </Text>
                    <TextInput
                        placeholder="Enter Email ID"
                        value={emailId}
                        onChangeText={setEmailId}
                        style={styles.input}
                        keyboardType='email-address'
                        placeholderTextColor="#9CA3AF"
                    />

                </View>

                {/* CTA */}
                <TouchableOpacity
                    style={[
                        styles.button,
                        !isValid && styles.buttonDisabled,
                    ]}
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
        paddingTop: vh(6),
    },

    title: {
        fontSize: FONT_SIZE.FONT_24,
        fontFamily: Fonts.bold,
        color: '#101828',
    },

    subtitle: {
        marginTop: vh(1),
        fontSize: FONT_SIZE.FONT_14,
        color: '#667085',
        fontFamily: Fonts.regular,
    },

    form: {
        marginTop: vh(4),
    },

    label: {
        fontSize: FONT_SIZE.FONT_14,
        color: '#344054',
        marginBottom: vh(0.8),
        fontFamily: Fonts.medium,
    },

    input: {
        height: 56,
        backgroundColor: '#F3F4F6',
        borderRadius: 12,
        paddingHorizontal: 16,
        fontSize: FONT_SIZE.FONT_14,
        fontFamily: Fonts.regular,
        color: '#111827',
    },

    button: {
        marginTop: vh(5),
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


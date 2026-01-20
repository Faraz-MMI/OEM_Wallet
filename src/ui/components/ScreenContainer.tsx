import React, { JSX } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../../app/constants/colors";
import { StyleSheet, ViewStyle } from "react-native";
type Props = {
    children: React.ReactNode;
    style?: ViewStyle;
    backgroundColor?: string;
}

export default function ScreenContainer({ children,
    style,
    backgroundColor = '#F9FAFB'
}: Props) {
    return <SafeAreaView style={[
        styles.container,
        { backgroundColor },
        style,
    ]}>
        {children}
    </SafeAreaView>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

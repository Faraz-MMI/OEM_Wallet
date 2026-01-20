import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { vh, vw } from "../theme/dimensions";
import AppText from "./AppText";

export default function ActionButton({ label,color,icon }: { label: string, color?: string, icon?: React.ReactNode }) {
    return (
        <TouchableOpacity style={styles.actionItem}>
            <View style={[styles.actionIcon, { backgroundColor: color }]}>
                {icon}
            </View>
            <AppText style={styles.actionText}>{label}</AppText>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: vh(3),
    },

    actionItem: {
        alignItems: 'center',
        flex: 1,
    },

    actionIcon: {
        width: vw(15),
        height: vw(15),
        borderRadius: vw(8),
        backgroundColor: '#F3F4F6',
        marginBottom: vh(0.5),
        alignItems: 'center',
        justifyContent: 'center',
    },

    actionText: {
        fontSize: vw(3.5),
    },
});
import { StyleSheet, Text, View } from "react-native";
import { vh, vw } from "../theme/dimensions";
import AppText from "./AppText";
import { ICON_RIGHT_ANGLE_ARROW } from "../../assets/icons";

function TransactionItem({
  title,
  time,
  amount,
}: {
  title: string;
  time: string;
  amount: string;
}) {
  return (
    <View style={styles.txItem}>
      <View style={{flex:1}}>
        <AppText style={styles.txTitle}>{title}</AppText>
        <AppText style={styles.txTime}>{time}</AppText>
      </View>
      <AppText style={[styles.txAmount,{alignSelf:'center'}]}>{amount}</AppText>
      <ICON_RIGHT_ANGLE_ARROW style={{marginLeft:5,alignSelf:'center'}}/>
    </View>
  );
}

export default TransactionItem;

const styles = StyleSheet.create({
  txItem: {
    marginTop: vh(2),
    paddingVertical: vh(1.5),
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  txTitle: {
    fontSize: vw(3.6),
    fontWeight: '500',
  },

  txTime: {
    fontSize: vw(3.2),
    color: '#6B7280',
    marginTop: vh(0.4),
  },

  txAmount: {
    fontSize: vw(3.6),
    fontWeight: '600',
    color: '#DC2626',
  },
});

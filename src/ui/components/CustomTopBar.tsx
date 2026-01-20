import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import AppText from './AppText';
import { vw, vh, FONT_SIZE } from '../theme/dimensions';
import { ICON_BACK, ICON_TIME } from '../../assets/icons';
import { Fonts } from '../theme/fonts';
import { COLORS } from '../../app/constants/colors';

type Props = {
  title: string;
  onBack?: () => void;
  dark?: boolean;
  canShowIcon?: boolean;
  icon?: React.ReactNode;
  subTitle?: string;
};

export default function CustomTopBar({
  title,
  onBack,
  dark = false,
  canShowIcon = false,
  icon=<ICON_TIME />,
  subTitle = '',
}: Props) {
  console.log(vw(100), vh(100));

  return (
    <View style={[styles.container]}>
      <StatusBar
        barStyle={dark ? 'light-content' : 'dark-content'}
        backgroundColor="transparent"
        translucent
      />

      <TouchableOpacity
        style={styles.backBtn}
        onPress={onBack}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <ICON_BACK width={24} height={24} color={COLORS.BLACK} />
      </TouchableOpacity>

      <View style={{flex:1, justifyContent:'flex-start' }}>
        <AppText style={styles.title}>{title}</AppText>
        {subTitle && <AppText style={styles.subTitle}>{subTitle}</AppText>}
      </View>
      <View>
        {canShowIcon && icon}
      </View>

    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.WHITE,
    height: vh(9),
    paddingHorizontal: vw(4),
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#00000011'
  },

  darkBg: {
    backgroundColor: 'rgba(0,0,0,0.85)',
  },

  backBtn: {
    marginRight: vw(3),
  },

  title: {
    fontSize: FONT_SIZE.FONT_20,
    color: COLORS.BLACK,
    fontFamily: Fonts.bold,
    // alignSelf: 'center'
  },
  subTitle: {
    fontSize: FONT_SIZE.FONT_14,
    color: "#4A5565",
    fontFamily: Fonts.regular,
  },
});

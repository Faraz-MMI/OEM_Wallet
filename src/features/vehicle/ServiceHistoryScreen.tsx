import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
} from 'react-native';
import ScreenContainer from '../../ui/components/ScreenContainer';
import { vw, vh, FONT_SIZE } from '../../ui/theme/dimensions';
import { Fonts } from '../../ui/theme/fonts';
import { COLORS } from '../../app/constants/colors';
import CustomTopBar from '../../ui/components/CustomTopBar';

const DATA = [
  {
    id: '1',
    title: 'Periodic Service',
    subtitle: 'General inspection, oil change',
    date: '12 Mar 2024',
    km: '3,200 km',
  },
  {
    id: '2',
    title: 'First Free Service',
    subtitle: 'Basic check-up & software update',
    date: '18 Dec 2023',
    km: '1,000 km',
  },
  {
    id: '3',
    title: 'Wheel Alignment',
    subtitle: 'Wheel balancing & alignment',
    date: '05 Oct 2023',
    km: '750 km',
  },
  {
    id: '4',
    title: 'Pre-delivery Inspection',
    subtitle: 'Initial vehicle inspection',
    date: '20 Aug 2023',
    km: '50 km',
  },
];

export default function ServiceHistoryScreen() {
  return (
    <ScreenContainer>
        <CustomTopBar title='Service History' onBack={() => {}} />
      <View style={styles.container}>
        <FlatList
          data={DATA}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ServiceCard item={item} />}
          contentContainerStyle={{ paddingBottom: vh(3) }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </ScreenContainer>
  );
}

function ServiceCard({ item }: { item: any }) {
  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.headerRow}>
        <View style={styles.iconWrap}>
          <Text style={styles.icon}>🔧</Text>
        </View>

        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.subtitle}>{item.subtitle}</Text>
        </View>
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Footer */}
      <View style={styles.footerRow}>
        <View style={styles.footerItem}>
          <Text style={styles.footerIcon}>📅</Text>
          <Text style={styles.footerText}>{item.date}</Text>
        </View>

        <View style={styles.footerItem}>
          <Text style={styles.footerIcon}>⏱</Text>
          <Text style={styles.footerText}>{item.km}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: vw(5),
    paddingTop: vh(2),
    backgroundColor: '#FFFFFF',
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: vw(4),
    marginBottom: vh(2),
    borderColor:"#F3F4F6",
    borderWidth:1,
  },

  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#DBEAFE',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: vw(3),
  },

  icon: {
    fontSize: 18,
    color: COLORS.APP_PRIMARY,
  },

  title: {
    fontSize: FONT_SIZE.FONT_16,
    fontFamily: Fonts.semiBold,
    color: '#0F172A',
  },

  subtitle: {
    marginTop: 4,
    fontSize: FONT_SIZE.FONT_14,
    color: '#64748B',
    fontFamily: Fonts.regular,
  },

  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: vh(2),
  },

  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  footerItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  footerIcon: {
    fontSize: 14,
    marginRight: vw(2),
    color: '#64748B',
  },

  footerText: {
    fontSize: FONT_SIZE.FONT_14,
    color: '#475569',
    fontFamily: Fonts.medium,
  },
});

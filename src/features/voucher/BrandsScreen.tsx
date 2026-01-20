import React, { useEffect } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import AppText from '../../ui/components/AppText';
import { vw, vh } from '../../ui/theme/dimensions';
import { Fonts } from '../../ui/theme/fonts';
import { COLORS } from '../../app/constants/colors';
import ScreenContainer from '../../ui/components/ScreenContainer';
import CustomTopBar from '../../ui/components/CustomTopBar';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { VoucherStackParamList } from '../../app/navigation/types';
import { useNavigation } from '@react-navigation/native';
import { Routes } from '../../app/constants/routes';
import { useGetToken } from './hooks/useGetToken';
import { useFetchBrands } from './hooks/useFetchBrands';
import { decrypt } from '../../app/services/encryption';
import CustomLoader from '../../ui/components/CustomLoader';
import { VoucherBrand } from './types';
import { ICON_VOUCHER } from '../../assets/icons';

export default function BrandsScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<VoucherStackParamList>>();
  const { getTokenAsync, token, isLoading } = useGetToken();
  const { fetchBrandsAsync, encryptedBrands, isLoading: isBrandsLoading } = useFetchBrands();

  const [brands, setBrands] = React.useState<VoucherBrand[]>([]);

  const colors = ['#7A3E00', '#FACC15', '#06B6D4', '#1D4ED8'];

  const getRandomColor = (list: string[]) =>
    list[Math.floor(Math.random() * list.length)];

  useEffect(() => {
    getToken();
  }, []);
  const getToken = async () => {
    const res = await getTokenAsync();
    console.log("token:", res);


    const authToken = decrypt(res as string).replace(/^"+|"+$/g, '');;
    const encryptedBrands = await fetchBrandsAsync({
      token: authToken,
    });
    const brands = JSON.parse(decrypt(encryptedBrands as string));

    setBrands(brands);

    console.log('Decrypted Brands:', brands);
  }
  const renderItem = ({ item }: { item: VoucherBrand }) => (
    <TouchableOpacity style={styles.brandCard} onPress={() => {
      navigation.navigate(Routes.VOUCHER_BY_BRAND, { brand: item });
      // navigation.navigate(Routes.VOUCHER_DETAILS, { voucherId: item.id });
    }}>
      <View style={[styles.brandIcon, { backgroundColor: '#ffffff' }]}>
        {/* <AppText style={styles.brandEmoji}>{item}</AppText> */}
        {item.BrandImage ? <Image source={{ uri: item.BrandImage ?? "" }} style={{ width: 100, height: 100, borderRadius: 10, resizeMode: 'contain' }} />
          : <View style={[styles.brandIcon, { backgroundColor: '#7B3F00' }]}> <ICON_VOUCHER color={COLORS.WHITE}/></View>}
      </View>
      <AppText style={styles.brandName}>{item.BrandName}</AppText>
    </TouchableOpacity>
  );

  return (
    <ScreenContainer>
      <CustomTopBar title='Vouchers' onBack={() => {
        navigation.goBack();
      }} />
      <View style={styles.container}>
        <AppText style={styles.sectionTitle}>Browse by Brand</AppText>

        <FlatList
          data={brands}
          renderItem={renderItem}
          keyExtractor={(item) => item.BrandProductCode}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={{ paddingTop: vh(2) }}
          showsVerticalScrollIndicator={false}
        />

        {/* Discover Banner */}
        <View style={styles.discoverCard}>
          <AppText style={styles.discoverTitle}>
            🎁 Discover Brand Vouchers
          </AppText>
          <AppText style={styles.discoverSub}>
            Select a brand to view exclusive offers and discounts available on
            your route
          </AppText>
        </View>
        <CustomLoader visible={isLoading || isBrandsLoading} text='Fetching Brands..' />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    paddingHorizontal: vw(5),
    paddingTop: vh(2),
  },

  sectionTitle: {
    fontSize: vw(4),
    fontFamily: Fonts.semiBold,
    color: '#374151',
  },

  row: {
    justifyContent: 'space-between',
    marginBottom: vh(2),
  },

  brandCard: {
    width: vw(42),
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: vh(3),
    alignItems: 'center',
  },

  brandIcon: {
    width: vw(18),
    height: vw(18),
    borderRadius: vw(9),
    justifyContent: 'center',
    alignItems: 'center',
  },

  brandEmoji: {
    fontSize: vw(6),
  },

  brandName: {
    marginTop: vh(1.5),
    fontSize: vw(3.4),
    fontFamily: Fonts.medium,
    color: '#111827',
    textAlign: 'center',
  },

  discoverCard: {
    marginTop: vh(3),
    backgroundColor: '#EFF6FF',
    borderRadius: 14,
    padding: vw(4),
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },

  discoverTitle: {
    fontSize: vw(3.6),
    fontFamily: Fonts.semiBold,
    color: '#1D4ED8',
  },

  discoverSub: {
    marginTop: vh(0.8),
    fontSize: vw(3.2),
    color: '#2563EB',
    lineHeight: vh(2.2),
  },
});

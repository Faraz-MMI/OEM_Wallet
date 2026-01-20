import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Brand, OEM_LIST } from '../constants/brands';

type UserState = {
    profile: any | null;
    entityId: string | null;
    loading: boolean;
    selectedBrand: Brand;

    setUser: (data: any) => void;
    setBrand: (data: any) => void;
    clearUser: () => void;
};

export const useUserStore = create<UserState>((set) => ({
    profile: null,
    entityId: null,
    loading: true,
    selectedBrand: OEM_LIST[0],

    setUser: (data) => {
        // await AsyncStorage.setItem('USER_PROFILE', JSON.stringify(data));
        const id = data != null && data.accounts != null && data.accounts.length > 0 ? data.accounts[0].entityId : null;
        console.log(id);

        set({ profile: data, loading: false, entityId: id });
    },

    clearUser: () => {
        set({ profile: null, loading: false });
    },

    setBrand: (brand) => {
        set({ selectedBrand: brand });
    }
}));

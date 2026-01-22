import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Brand, OEM_LIST } from '../constants/brands';
import { UserProfile } from '../../features/onboarding/types/profile.types';

type UserState = {
    profile: any | null;
    entityId: string | null;
    loading: boolean;
    selectedBrand: Brand;
    userProfile: UserProfile | null;

    setUser: (data: any) => void;
    setBrand: (data: any) => void;
    setUserProfile: (data: UserProfile) => void;
    clearUser: () => void;
};

export const useUserStore = create<UserState>((set) => ({
    profile: null,
    entityId: null,
    loading: true,
    selectedBrand: OEM_LIST[0],
    userProfile: null,

    setUserProfile: (data) => {
        set({ userProfile: data });
    },

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

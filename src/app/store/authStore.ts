import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';

type AuthState = {
  mobile: string;
  hasPassword: boolean;
  setMobile: (mobile: string) => void;
  setHasPassword: (value: boolean) => void;
  markPasswordSet: () => void;
  token: string;
  clearLogin: () => void;
};

export const useAuthStore = create<AuthState>(set => ({
  mobile: '',
  hasPassword: false,
  token: '',
  setMobile: mobile => set({ mobile }),
  setHasPassword: async (value) => {
    await AsyncStorage.setItem('HAS_PASSWORD', value ? "1" : "0");
    set({ hasPassword: value })
  },
  markPasswordSet: () => set({ hasPassword: true }),
  clearLogin: async () => {
    await AsyncStorage.removeItem('HAS_PASSWORD');
    set({ hasPassword: false, mobile: "" });
  },
}));

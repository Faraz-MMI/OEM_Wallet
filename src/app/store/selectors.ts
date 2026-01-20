import { useUserStore } from './userStore';
import { shallow } from 'zustand/shallow';

export const useUserProfile = () =>
  useUserStore(state => ({
    firstName: state.profile?.firstName,
    lastName: state.profile?.lastName,
    email: state.profile?.email,
    mobile: state.profile?.mobile?.value,
    kycStatus: state.profile?.accounts?.[0]?.kycStatus?.status,
  }));

export const usePrimaryCard = () =>
  useUserStore(state => {
    const card = state.profile?.accounts?.[0]?.card;
    return {
      cardNumber: card?.cardNumber,
      expiry: card?.expiry,
      nameOnCard: card?.nameOnCard,
      status: card?.kitStatus?.status,
    };
  });

export const useWallet = () =>
  useUserStore(state => {
    const wallet = state.profile?.accounts?.[0]?.wallets?.[0];
    return {
      walletId: wallet?.wallet?.id,
      walletName: wallet?.wallet?.walletName,
      currency: wallet?.wallet?.walletBaseCurrency?.currencyCodeISO,
    };
  });

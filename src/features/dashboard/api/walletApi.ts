import axiosClient from '../../../core/api/axiosClient';
import { WalletBalance, WalletTransaction } from '../types';

export const walletApi = {
  getBalance: async (entityId: string = '610965015720000002300925'): Promise<WalletBalance> => {
    const { data } = await axiosClient.post('/v1/wallets/balance', {
      entityId,
    });
    return data;
  },
};

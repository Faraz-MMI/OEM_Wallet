import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { walletApi } from '../api/walletApi';

export const useWallet = (entityId?: string) => {
  const queryClient = useQueryClient();

  const balanceQuery = useQuery({
    queryKey: ['wallet', 'balance', entityId],
    queryFn: () => walletApi.getBalance(entityId as string),
    enabled: !!entityId,
  });

  return {
    balance: balanceQuery.data,
    // transactions: transactionsQuery.data,
    loading:
      balanceQuery.isLoading ,
    error:
      balanceQuery.error,
  };
};

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { transactionsApi } from '../api/transactionsApi';
import { FetchTransactionsRequest } from '../types';

export const useFetchTransactions = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (payload: FetchTransactionsRequest) => transactionsApi.fetchAll(payload),
    onSuccess: (data) => {
      // cache under ['transactions', entityId|kit|mobile]
      const key = ['transactions'];
      queryClient.setQueryData(key, data);
    },
  });

  const isLoading = mutation.status === 'pending';
  const isSuccess = mutation.status === 'success';

  return {
    fetchTransactions: mutation.mutate,
    fetchTransactionsAsync: mutation.mutateAsync,
    data: mutation.data,
    error: mutation.error,
    isLoading,
    isSuccess,
  };
};

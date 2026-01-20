import { useMutation, useQueryClient } from '@tanstack/react-query';
import { customerApi } from '../api/customerApi';
import { FetchCustomerRequest } from '../types';

export const useFetchCustomer = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (payload: FetchCustomerRequest) => customerApi.fetchCustomer(payload),
    onSuccess: (data) => {
      // Cache the returned customer under ['customer', uniqueId]
      const key = ['customer', data?.customerUniqueId ?? data?.id ?? 'unknown'];
      queryClient.setQueryData(key, data);
    },
  });

  const isLoading = mutation.status === 'pending';
  const isSuccess = mutation.status === 'success';

  return {
    fetchCustomer: mutation.mutate,
    fetchCustomerAsync: mutation.mutateAsync,
    data: mutation.data,
    error: mutation.error,
    isLoading,
    isSuccess,
  };
};

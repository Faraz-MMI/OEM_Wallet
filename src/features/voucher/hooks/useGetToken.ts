import { useMutation } from '@tanstack/react-query';
import { voucherAuthApi } from '../api/voucherApi';

export const useGetToken = () => {
  const mutation = useMutation({
    mutationFn: () => voucherAuthApi.getToken(),
  });

  const isLoading = mutation.status === 'pending';
  const isSuccess = mutation.status === 'success';

  return {
    getToken: mutation.mutate,
    getTokenAsync: mutation.mutateAsync,
    token: mutation.data,
    error: mutation.error,
    isLoading,
    isSuccess,
  };
};

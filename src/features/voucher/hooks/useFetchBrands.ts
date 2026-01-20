import { useMutation } from '@tanstack/react-query';
import { brandsApi } from '../api/voucherBrandsApi';

export const useFetchBrands = () => {
  const mutation = useMutation({
    mutationFn: ({
      token,
    }: {
      token: string;
    }) => brandsApi.fetchBrands(undefined, token),
  });

  const isLoading = mutation.status === 'pending';
  const isSuccess = mutation.status === 'success';

  return {
    fetchBrands: mutation.mutate,
    fetchBrandsAsync: mutation.mutateAsync,
    encryptedBrands: mutation.data,
    error: mutation.error,
    isLoading,
    isSuccess,
  };
};

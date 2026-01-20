import voucherAxiosClient from '../../../core/api/voucherAxiosClient';
import { GYFTR_BASE_URL } from '../../../core/config/env';
import { GetBrandsRequest, GetBrandsResponse } from '../types';

export const brandsApi = {
  fetchBrands: async (
    _payload?: GetBrandsRequest,
    token?: string
  ): Promise<GetBrandsResponse['data']> => {
    const { data } = await voucherAxiosClient.post<GetBrandsResponse>(
      '/getBrands',
      {},
      {
        headers: {
          'Content-Type': 'application/json',
          token,
        },
      }
    );

    return data?.data;
  },
};
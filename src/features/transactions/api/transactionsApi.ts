import axiosClient from '../../../core/api/axiosClient';
import { ENDPOINTS } from '../../../core/api/endpoints';
import { FetchTransactionsRequest, FetchTransactionsResponse } from '../types';

export const transactionsApi = {
  fetchAll: async (payload: FetchTransactionsRequest): Promise<FetchTransactionsResponse['result']> => {
    const { data } = await axiosClient.post(ENDPOINTS.TRANSACTIONS.FETCH_ALL, payload);
    return data?.result;
  },
};

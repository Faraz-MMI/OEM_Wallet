// src/features/customer/api/customerApi.ts

import axiosClient from '../../../core/api/axiosClient';
import { ENDPOINTS } from '../../../core/api/endpoints';
import { FetchCustomerRequest, FetchCustomerResponse } from '../types';

export const customerApi = {
  fetchCustomer: async (
    payload: FetchCustomerRequest
  ): Promise<FetchCustomerResponse['result']> => {
  
    try {
      console.log('fetchCustomer payload', payload);

      const response = await axiosClient.post(
        ENDPOINTS.CUSTOMER.FETCH_CUSTOMER,
        payload
      );

      console.log('fetchCustomer response', response);

      return response.data?.result;
    } catch (error: any) {
      console.log('fetchCustomer ERROR', {
        message: error?.message,
        code: error?.code,
        status: error?.response?.status,
        data: error?.response?.data,
      });

      throw error; // IMPORTANT
    }
  },
};

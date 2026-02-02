// src/features/transaction/hooks/useCreatePaytmOrder.ts

import { useState, useCallback } from 'react';
import { createPaytmOrder } from '../api/payments.api';
import { CreatePaytmOrderRequest, CreatePaytmOrderResponse } from '../types/createPaytmOrder.types';


type UseCreatePaytmOrderReturn = {
  createPaytmOrder: (
    payload: CreatePaytmOrderRequest
  ) => Promise<CreatePaytmOrderResponse | null>;
  loading: boolean;
  error: string | null;
};

export const useCreatePaytmOrder = (): UseCreatePaytmOrderReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createPaytmOrderHandler = useCallback(
    async (
      payload: CreatePaytmOrderRequest
    ): Promise<CreatePaytmOrderResponse | null> => {
      try {
        setLoading(true);
        setError(null);

        const response = await createPaytmOrder(payload);

        // API-level failure
        if (!response?.status) {
          setError('Paytm order creation failed');
          return null;
        }

        // Paytm business-level failure
        const resultInfo = response.result?.body?.resultInfo;
        if (resultInfo?.resultStatus !== 'S') {
          setError(resultInfo?.resultMsg || 'Paytm order creation failed');
          return null;
        }

        return response;
      } catch (err: any) {
        const message =
          err?.response?.data?.message ||
          err?.message ||
          'Network error';

        setError(message);
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return {
    createPaytmOrder: createPaytmOrderHandler,
    loading,
    error,
  };
};

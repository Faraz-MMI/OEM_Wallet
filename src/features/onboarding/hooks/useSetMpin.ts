import { useState, useCallback } from 'react';
import { setMpinApi } from '../api/auth.api';
import { SetMpinRequest } from '../types/auth.types';

type UseSetMpinReturn = {
  setMpin: (payload: SetMpinRequest) => Promise<boolean>;
  loading: boolean;
  error: string | null;
};

export const useSetMpin = (): UseSetMpinReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const setMpin = useCallback(async (payload: SetMpinRequest) => {
    try {
      setLoading(true);
      setError(null);

      if (payload.mPin !== payload.confPin) {
        throw new Error('MPIN does not match');
      }

      const response = await setMpinApi(payload);

      if (!response.status) {
        throw new Error(response.message || 'Failed to set MPIN');
      }

      return true;
    } catch (err: any) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        'Network error';

      setError(message);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    setMpin,
    loading,
    error,
  };
};

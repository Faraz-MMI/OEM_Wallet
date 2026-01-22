import { useState, useCallback } from 'react';
import { loginApi } from '../api/auth.api';
import { LoginRequest, LoginResponse } from '../types/auth.types';
import { useAuthStore } from '../../../app/store/authStore';

type UseLoginReturn = {
  login: (payload: LoginRequest) => Promise<LoginResponse | null>;
  loading: boolean;
  error: string | null;
};

export const useLoginUser = (): UseLoginReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const setToken = useAuthStore(state => state.setToken);

  const login = useCallback(async (payload: LoginRequest) => {
    try {
      setLoading(true);
      setError(null);

      const response = await loginApi(payload);

      if (!response.status) {
        throw new Error(response.message || 'Login failed');
      }

      if(response.status && response.token) {
        setToken(response.token);
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
  }, []);

  return {
    login,
    loading,
    error,
  };
};

import { useState, useCallback } from 'react';
import { createUserApi } from '../api/auth.api';
import { CreateUserRequest } from '../types/auth.types';

type UseCreateUserReturn = {
  createUser: (payload: CreateUserRequest) => Promise<boolean>;
  loading: boolean;
  error: string | null;
};

export const useCreateUser = (): UseCreateUserReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createUser = useCallback(
    async (payload: CreateUserRequest) => {
      try {
        setLoading(true);
        setError(null);

        const response = await createUserApi(payload);

        if (!response.status) {
          setError(response.message || 'User creation failed');
          return false;
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
    },
    []
  );

  return {
    createUser,
    loading,
    error,
  };
};

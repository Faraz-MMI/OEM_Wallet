import { useState, useCallback } from 'react';
import { getProfileApi } from '../api/profile.api';
import { UserProfile } from '../types/profile.types';

type UseGetProfileReturn = {
  getProfile: () => Promise<UserProfile | null>;
  loading: boolean;
  error: string | null;
};

export const useGetProfile = (): UseGetProfileReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getProfile = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await getProfileApi();

      if (!response.status) {
        throw new Error(response.message);
      }

      return response.data;
    } catch (err: any) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        'Failed to load profile';

      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    getProfile,
    loading,
    error,
  };
};

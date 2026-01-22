import { GetProfileResponse } from '../types/profile.types';
import apiClient from '../../../core/api/apiClient';

export const getProfileApi = async (): Promise<GetProfileResponse> => {
  const { data } = await apiClient.get<GetProfileResponse>(
    '/auth/GetProfile'
  );
  return data;
};

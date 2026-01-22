import apiClient from '../../../core/api/apiClient';
import { CreateUserRequest, CreateUserResponse, LoginRequest, LoginResponse, SetMpinRequest, SetMpinResponse } from '../types/auth.types';

export const loginApi = async (
  payload: LoginRequest
): Promise<LoginResponse> => {
  const response = await apiClient.post<LoginResponse>(
    '/auth/Login',
    payload
  );
  return response.data;
};

export const createUserApi = async (
  payload: CreateUserRequest
): Promise<CreateUserResponse> => {
  const { data } = await apiClient.post<CreateUserResponse>(
    '/auth/createuser',
    payload
  );
  return data;
};

export const setMpinApi = async (
  payload: SetMpinRequest
): Promise<SetMpinResponse> => {
  const { data } = await apiClient.post<SetMpinResponse>(
    '/auth/SetMpin',
    payload
  );
  return data;
};

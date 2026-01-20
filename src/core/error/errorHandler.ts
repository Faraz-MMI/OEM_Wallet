import { AxiosError } from 'axios';
import { AppError } from './AppError';

export const handleApiError = (error: AxiosError): AppError => {
  if (error.response) {
    const status = error.response.status;
    const data: any = error.response.data;

    return new AppError(
      data?.message || 'Something went wrong',
      status,
      data?.code,
      error
    );
  }

  if (error.request) {
    return new AppError(
      'Network error. Please check your internet connection.',
      undefined,
      'NETWORK_ERROR',
      error
    );
  }

  return new AppError(
    error.message || 'Unexpected error occurred',
    undefined,
    'UNKNOWN_ERROR',
    error
  );
};

import axios, { AxiosError } from 'axios';

export function isApiError(error: unknown): error is AxiosError {
  return axios.isAxiosError(error);
}

export function getErrorMessage(error: unknown): string {
  if (isApiError(error)) {
    return (
      (error.response?.data as { message: string })?.message ||
      error.message ||
      'An unexpected error occurred'
    );
  }
  if (error instanceof Error) {
    return error.message;
  }
  return 'An unexpected error occurred';
}

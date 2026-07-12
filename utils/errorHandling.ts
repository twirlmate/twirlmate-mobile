import { isAxiosError } from 'axios';

interface RequestErrorMessageOptions {
  notFoundMessage: string;
  defaultMessage: string;
}

export function getRequestStatus(error: unknown): number | undefined {
  return isAxiosError(error) ? error.response?.status : undefined;
}

export function getRequestErrorMessage(
  error: unknown,
  { notFoundMessage, defaultMessage }: RequestErrorMessageOptions
): string {
  return getRequestStatus(error) === 404 ? notFoundMessage : defaultMessage;
}

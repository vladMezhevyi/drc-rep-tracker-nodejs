export enum ErrorCodes {
  InternalError = 'INTERNAL_ERROR',
  ValidationError = 'VALIDATION_ERROR',
  BadRequestError = 'BAD_REQUEST'
}

export type ErrorData = Record<string, any>;

export interface ErrorResponse {
  success: false;
  status: number;
  message: string;
  code: ErrorCodes;
  data?: ErrorData;
}

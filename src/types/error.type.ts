export enum ErrorCode {
  InternalError = 'INTERNAL_ERROR',
  ValidationError = 'VALIDATION_ERROR',
  BadRequestError = 'BAD_REQUEST',
  UnauthorizedError = 'UNAUTHORIZED_ERROR'
}

export type ErrorData = Record<string, any>;

export interface ErrorResponse {
  success: false;
  status: number;
  message: string;
  code: (string & {}) | undefined | ErrorCode;
  data?: ErrorData;
}

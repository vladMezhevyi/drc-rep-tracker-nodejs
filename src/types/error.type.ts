export interface ErrorResponse {
  success: false;
  statusCode: number;
  error: string;
  details?: unknown;
}

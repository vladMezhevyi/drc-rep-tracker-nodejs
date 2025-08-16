import { AuthError } from '@supabase/supabase-js';
import { ErrorCode, ErrorData } from '../types/error.type';

export class HttpError extends Error {
  public readonly code: (string & {}) | undefined | ErrorCode;
  public readonly status: number;
  public readonly data: ErrorData;

  constructor(
    message: string,
    status: number,
    code: (string & {}) | undefined | ErrorCode,
    data: ErrorData = {}
  ) {
    super(message);

    this.status = status;
    this.code = code?.toUpperCase();
    this.data = data;

    // This makes `error instanceof HttpError` (and subclasses like UnauthorizedError) work as expected.
    Object.setPrototypeOf(this, new.target.prototype);

    // Captures the stack trace starting from *this constructor*.
    // That way, when the error is logged, the stack trace points to where the error was thrown
    // instead of including this custom class constructor in the trace.
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends HttpError {
  constructor(data: ErrorData) {
    super('Validation Failed', 400, ErrorCode.ValidationError, data);
  }
}

export class BadRequestError extends HttpError {
  constructor() {
    super('Bad Request', 400, ErrorCode.BadRequestError);
  }
}

export class DatabaseError extends HttpError {
  constructor(error: AuthError) {
    super(
      process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong',
      error.status || 500,
      error.code
    );
  }
}

export class InternalError extends HttpError {
  constructor() {
    super('Something went wrong', 500, ErrorCode.InternalError);
  }
}

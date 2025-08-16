import { AuthError } from '@supabase/supabase-js';
import { ZodError } from 'zod';

export class HttpError extends Error {
  public readonly statusCode: number;
  public readonly details?: unknown;

  constructor(message: string, statusCode: number = 500, details?: unknown) {
    super(message);

    this.statusCode = statusCode;
    this.details = details;

    // This makes `error instanceof HttpError` (and subclasses like UnauthorizedError) work as expected.
    Object.setPrototypeOf(this, new.target.prototype);

    // Captures the stack trace starting from *this constructor*.
    // That way, when the error is logged, the stack trace points to where the error was thrown
    // instead of including this custom class constructor in the trace.
    Error.captureStackTrace(this, this.constructor);
  }
}

export class BadRequestError extends HttpError {
  constructor(message: string = 'Bad Request', details?: unknown) {
    super(message, 400, details);
  }
}

export class UnauthorizedError extends HttpError {
  constructor(message: string = 'Unauthorized', details?: unknown) {
    super(message, 401, details);
  }
}

export class DatabaseError extends HttpError {
  constructor(dbError: AuthError, message: string = 'Something went wrong', details?: unknown) {
    super(message, dbError.status || 500, details);

    if (process.env.NODE_ENV === 'development') {
      console.error(dbError.message);
    }
  }
}

export class HttpAuthError extends HttpError {
  constructor(dbError: AuthError, message?: string, details?: unknown) {
    super(message || dbError.message || 'Something went wrong', dbError.status || 500, details);

    if (process.env.NODE_ENV === 'development') {
      console.error(dbError.message);
    }
  }
}

export class ValidationError extends BadRequestError {
  constructor(zodError: ZodError) {
    super('Validation failed', zodError.issues);
  }
}

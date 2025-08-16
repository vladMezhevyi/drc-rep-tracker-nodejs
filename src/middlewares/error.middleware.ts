import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { ErrorResponse } from '../types/error.type';
import { DatabaseError, HttpError, InternalError, ValidationError } from '../common/http-error';
import { isAuthApiError } from '@supabase/supabase-js';

export const errorMiddleware = (
  err: unknown,
  req: Request,
  res: Response<ErrorResponse>,
  _next: NextFunction
): void => {
  let httpError: HttpError;

  if (err instanceof ZodError) {
    httpError = new ValidationError(err.issues);
  } else if (isAuthApiError(err)) {
    httpError = new DatabaseError(err);
  } else if (err instanceof HttpError) {
    httpError = err;
  } else {
    httpError = new InternalError();
  }

  const response: ErrorResponse = {
    success: false,
    message: httpError.message,
    code: httpError.code,
    status: httpError.status,
    data: httpError.data
  };

  res.status(httpError.status).json(response);
};

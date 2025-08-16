import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { ErrorResponse } from '../types/error.type';
import { BadRequestError, HttpError, ValidationError } from '../common/http-error';

export const errorMiddleware = (
  err: unknown,
  req: Request,
  res: Response<ErrorResponse>,
  _next: NextFunction
): void => {
  let httpError: HttpError;

  if (err instanceof ZodError) {
    httpError = new ValidationError(err);
  } else if (err instanceof HttpError) {
    httpError = err;
  } else if (err instanceof SyntaxError) {
    httpError = new BadRequestError();
  } else {
    httpError = new HttpError('Internal Server Error', 500);
  }

  const response: ErrorResponse = {
    success: false,
    statusCode: httpError.statusCode,
    error: httpError.message,
    details: httpError.details
  };

  console.error(err);

  res.status(httpError.statusCode).json(response);
};

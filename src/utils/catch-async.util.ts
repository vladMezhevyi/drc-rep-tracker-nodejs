import { Request, Response, NextFunction, RequestHandler } from 'express';

type AsyncFunction<P = any, ResBody = any, ReqBody = any, ReqQuery = any> = (
  req: Request<P, ResBody, ReqBody, ReqQuery>,
  res: Response<ResBody>,
  next: NextFunction
) => Promise<ResBody> | void;

/**
 * A generic wrapper for async route handlers.
 * It preserves the correct type signature while ensuring
 * that all thrown/rejected errors go to next().
 */
export const catchAsync =
  <P = any, ResBody = any, ReqBody = any, ReqQuery = any>(
    fn: AsyncFunction<P, ResBody, ReqBody, ReqQuery>
  ): RequestHandler<P, ResBody, ReqBody, ReqQuery> =>
  (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch(next);

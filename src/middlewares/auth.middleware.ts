import { Request, Response, NextFunction } from 'express';
import { UnauthorizedError } from '../common/http-error';
import { supabase } from '../configs/database.config';
import { User } from '../types/auth.type';

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader: string | undefined = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new UnauthorizedError();
  }

  const accessToken: string = authHeader.split(' ')[1];

  const { data, error } = await supabase.auth.getUser(accessToken);

  if (error || !data.user) {
    throw new UnauthorizedError();
  }

  const user: User = {
    id: data.user.id,
    email: data.user.email!,
    username: data.user.user_metadata.username,
    createdAt: data.user.created_at,
    updatedAt: data.user.updated_at
  };

  req.user = user;

  next();
};

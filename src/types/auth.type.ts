import z from 'zod';
import { loginSchema, signupSchema } from '../schemas/auth.schema';

export interface User {
  id: string;
  email: string;
  username: string;
  createdAt: string;
  updatedAt: string | undefined;
}

export interface Session {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  expiresAt: number | undefined;
}

export interface AuthenticatedRequest extends Request {
  user: User;
}

// Login
export type LoginInput = z.infer<typeof loginSchema>;

export interface LoginResponse {
  user: User;
  session: Session;
}

// Sign Up
export type SignupInput = z.infer<typeof signupSchema>;

export interface SignupResponse {
  user: User;
  session: Session;
}

// Refresh Token
export interface RefreshTokenResponse {
  user: User;
  session: Session;
}

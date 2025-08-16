import { z } from 'zod';
import { User, Session } from '../types/auth.type';

// Sign Up
export const signupSchema = z.object({
  email: z.email({ error: 'Invalid email address' }).trim(),
  password: z.string().trim().min(8, { error: 'Password must be at least 8 characters long' }),
  username: z.string().trim().min(1, { error: 'Username is required' })
});

export type SignupInput = z.infer<typeof signupSchema>;

export interface SignupResponse {
  user: User;
  session: Session;
}

// Login
export const loginSchema = z.object({
  email: z.email({ error: 'Invalid email address' }).trim(),
  password: z.string().trim().min(1, { error: 'Password is required' })
});

export type LoginInput = z.infer<typeof loginSchema>;

export interface LoginResponse {
  user: User;
  session: Session;
}

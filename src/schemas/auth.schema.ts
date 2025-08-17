import { z } from 'zod';

// Sign Up
export const signupSchema = z.object({
  email: z.email({ error: 'Invalid email address' }).trim(),
  password: z.string().trim().min(8, { error: 'Password must be at least 8 characters long' }),
  username: z.string().trim().min(1, { error: 'Username is required' })
});

// Login
export const loginSchema = z.object({
  email: z.email({ error: 'Invalid email address' }).trim(),
  password: z.string().trim().min(1, { error: 'Password is required' })
});

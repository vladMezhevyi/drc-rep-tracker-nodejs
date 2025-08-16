import { z } from 'zod';

export const signupSchema = z.object({
  email: z.email({ error: 'Invalid email address' }).trim(),
  password: z.string().min(8, { error: 'Password must be at least 8 characters long' }),
  username: z.string().trim().min(1, { error: 'Username is required' })
});

export type SignupInput = z.infer<typeof signupSchema>;

export interface SignupResponse {
  user: {
    id: string;
    email: string;
    username: string;
    createdAt: string;
    updatedAt: string | undefined;
  };
  session: {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
    expiresAt: number | undefined;
  };
}

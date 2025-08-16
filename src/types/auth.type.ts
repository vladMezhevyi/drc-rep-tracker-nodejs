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

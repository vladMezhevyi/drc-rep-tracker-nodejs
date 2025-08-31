import { Request, Response } from 'express';
import { authService } from '../services/auth.service';
import {
  LoginInput,
  LoginResponse,
  RefreshTokenResponse,
  SignupInput,
  SignupResponse
} from '../types/auth.type';
import { getMaxAge } from '../utils/max-age.util';
import { loginSchema, signupSchema } from '../schemas/auth.schema';
import { UnauthorizedError } from '../common/http-error';

class AuthController {
  public signup = async (req: Request, res: Response): Promise<void> => {
    const input: SignupInput = signupSchema.parse(req.body);
    const response: SignupResponse = await authService.signup(input);

    this.setRefreshTokenCookie(res, response.session.refreshToken);

    res.status(201).json({
      session: {
        accessToken: response.session.accessToken,
        expiresIn: response.session.expiresIn,
        expiresAt: response.session.expiresAt
      },
      user: response.user
    });
  };

  public login = async (req: Request, res: Response): Promise<void> => {
    const input: LoginInput = loginSchema.parse(req.body);
    const response: LoginResponse = await authService.login(input);

    this.setRefreshTokenCookie(res, response.session.refreshToken);

    res.status(200).json({
      session: {
        accessToken: response.session.accessToken,
        expiresIn: response.session.expiresIn,
        expiresAt: response.session.expiresAt
      },
      user: response.user
    });
  };

  public refreshToken = async (req: Request, res: Response): Promise<void> => {
    const refreshToken: string | undefined = req.cookies['refreshToken'];
    if (!refreshToken) {
      throw new UnauthorizedError('Refresh token is missing');
    }

    const response: RefreshTokenResponse = await authService.refreshToken(refreshToken);

    this.setRefreshTokenCookie(res, response.session.refreshToken);

    res.status(200).json({
      session: {
        accessToken: response.session.accessToken,
        expiresIn: response.session.expiresIn,
        expiresAt: response.session.expiresAt
      },
      user: response.user
    });
  };

  public signOut = async (req: Request, res: Response): Promise<void> => {
    await authService.signOut();
    res.clearCookie('refreshToken', { path: '/api/auth/refresh-token' });

    res.status(200).json({ success: true, message: 'Logged out successfully' });
  };

  private setRefreshTokenCookie = (res: Response, refreshToken: string): void => {
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: getMaxAge(7, 'days')
    });
  };
}

export const authController = new AuthController();

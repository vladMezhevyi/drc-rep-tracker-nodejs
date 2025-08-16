import { Request, Response } from 'express';
import { authService } from '../services/auth.service';
import {
  LoginInput,
  LoginResponse,
  loginSchema,
  SignupInput,
  SignupResponse,
  signupSchema
} from '../schemas/auth.schema';

class AuthController {
  public signup = async (req: Request, res: Response): Promise<void> => {
    const input: SignupInput = signupSchema.parse(req.body);
    const response: SignupResponse = await authService.signup(input);

    res.status(201).json(response);
  };

  public login = async (req: Request, res: Response): Promise<void> => {
    const input: LoginInput = loginSchema.parse(req.body);
    const response: LoginResponse = await authService.login(input);

    res.status(200).json(response);
  };
}

export const authController = new AuthController();

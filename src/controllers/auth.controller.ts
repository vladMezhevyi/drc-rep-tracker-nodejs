import { Request, Response } from 'express';
import { authService } from '../services/auth.service';
import { SignupInput, SignupResponse, signupSchema } from '../schemas/auth.schema';

class AuthController {
  public signup = async (req: Request, res: Response): Promise<void> => {
    const input: SignupInput = signupSchema.parse(req.body);
    const response: SignupResponse = await authService.signup(input);

    res.status(201).json(response);
  };
}

export const authController = new AuthController();

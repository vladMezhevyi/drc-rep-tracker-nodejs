import { AuthResponse } from '@supabase/supabase-js';
import { supabase } from '../configs/database.config';
import { SignupInput, SignupResponse } from '../schemas/auth.schema';
import bcrypt from 'bcrypt';
import { HttpAuthError } from '../common/http-error';

class AuthService {
  public signup = async (input: SignupInput): Promise<SignupResponse> => {
    const { email, password, username } = input;

    const passwordHash: string = await bcrypt.hash(password, 10);

    const authResponse: AuthResponse = await supabase.auth.signUp({
      email,
      password: passwordHash
    });

    if (authResponse.error) {
      throw new HttpAuthError(authResponse.error);
    }

    if (!authResponse.data.session) {
      throw new Error('No session');
    }

    if (!authResponse.data.user || !authResponse.data.user.email) {
      throw new Error('No User');
    }

    const user = {
      id: authResponse.data.user.id,
      email,
      username,
      created_at: authResponse.data.user.created_at,
      updated_at: authResponse.data.user.updated_at
    };

    const userData = await supabase.from('users').insert(user);

    if (userData.error) {
      throw userData.error;
    }

    return {
      session: {
        accessToken: authResponse.data.session.access_token,
        refreshToken: authResponse.data.session.refresh_token,
        expiresAt: authResponse.data.session.expires_at,
        expiresIn: authResponse.data.session.expires_in
      },
      user: {
        username,
        email,
        id: authResponse.data.user.id,
        createdAt: authResponse.data.user.created_at,
        updatedAt: authResponse.data.user.updated_at
      }
    };
  };
}

export const authService = new AuthService();

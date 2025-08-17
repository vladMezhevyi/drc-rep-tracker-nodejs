import { AuthResponse } from '@supabase/supabase-js';
import { supabase } from '../configs/database.config';
import {
  LoginInput,
  LoginResponse,
  RefreshTokenResponse,
  SignupInput,
  SignupResponse
} from '../types/auth.type';
import { DatabaseError, InternalError } from '../common/http-error';

class AuthService {
  public signup = async (input: SignupInput): Promise<SignupResponse> => {
    const { email, password, username } = input;

    const { data, error }: AuthResponse = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { username }
      }
    });

    if (error) {
      throw new DatabaseError(error);
    }

    if (!data.session || !data.user) {
      throw new InternalError();
    }

    return {
      session: {
        accessToken: data.session.access_token,
        refreshToken: data.session.refresh_token,
        expiresAt: data.session.expires_at,
        expiresIn: data.session.expires_in
      },
      user: {
        id: data.user.id,
        email: data.user.email!,
        username: data.user.user_metadata.username,
        createdAt: data.user.created_at,
        updatedAt: data.user.updated_at
      }
    };
  };

  public login = async (input: LoginInput): Promise<LoginResponse> => {
    const { email, password } = input;

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      throw new DatabaseError(error);
    }

    return {
      session: {
        accessToken: data.session.access_token,
        refreshToken: data.session.refresh_token,
        expiresAt: data.session.expires_at,
        expiresIn: data.session.expires_in
      },
      user: {
        id: data.user.id,
        email: data.user.email!,
        username: data.user.user_metadata.username,
        createdAt: data.user.created_at,
        updatedAt: data.user.updated_at
      }
    };
  };

  public refreshToken = async (refreshToken: string): Promise<RefreshTokenResponse> => {
    const { data, error } = await supabase.auth.refreshSession({ refresh_token: refreshToken });

    if (error) {
      throw new DatabaseError(error);
    }

    if (!data.session || !data.user) {
      throw new InternalError();
    }

    return {
      session: {
        accessToken: data.session.access_token,
        refreshToken: data.session.refresh_token,
        expiresAt: data.session.expires_at,
        expiresIn: data.session.expires_in
      },
      user: {
        id: data.user.id,
        email: data.user.email!,
        username: data.user.user_metadata.username,
        createdAt: data.user.created_at,
        updatedAt: data.user.updated_at
      }
    };
  };

  public signOut = async (): Promise<void> => {
    await supabase.auth.signOut({ scope: 'local' });
  };
}

export const authService = new AuthService();

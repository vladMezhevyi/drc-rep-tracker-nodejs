import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { DatabaseError, HttpError } from '../common/http-error';

class SupabaseService {
  private _client: SupabaseClient;

  constructor() {
    const url: string | undefined = process.env.SUPABASE_URL;
    const key: string | undefined = process.env.SUPABASE_KEY;

    if (!url) {
      throw new HttpError('Supabase project url is missing in .env', 500);
    }

    if (!key) {
      throw new HttpError('Supabase project key is missing in .env', 500);
    }

    this._client = createClient(url, key);
  }

  public getClient(): SupabaseClient {
    return this._client;
  }
}

const service = new SupabaseService();

export const supabase: SupabaseClient = service.getClient();

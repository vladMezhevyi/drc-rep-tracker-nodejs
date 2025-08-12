import { createClient, SupabaseClient } from '@supabase/supabase-js';

class SupabaseService {
  private _client: SupabaseClient;

  constructor() {
    const url: string | undefined = process.env.SUPABASE_URL;
    const key: string | undefined = process.env.SUPABASE_KEY;

    if (!url) {
      throw new Error('Supabase project url is missing in .env');
    }

    if (!key) {
      throw new Error('Supabase project key is missing in .env');
    }

    this._client = createClient(url, key);
  }

  public getClient(): SupabaseClient {
    return this._client;
  }
}

const service = new SupabaseService();

export const supabase: SupabaseClient = service.getClient();

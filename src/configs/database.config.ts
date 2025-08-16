import { createClient, SupabaseClient } from '@supabase/supabase-js';

class SupabaseService {
  private _client: SupabaseClient;

  constructor() {
    const url: string | undefined = process.env.SUPABASE_URL;
    const key: string | undefined = process.env.SUPABASE_KEY;

    if (!url || !key) {
      throw new Error('Failed to connect DB');
    }

    this._client = createClient(url, key);
  }

  public getClient(): SupabaseClient {
    return this._client;
  }
}

const service = new SupabaseService();

export const supabase: SupabaseClient = service.getClient();

import {createClient, SupabaseClient} from '@supabase/supabase-js';
import {Database} from '../models/types/supabase';
import {SUPABASE_ANON_KEY, SUPABASE_URL} from '@env';
export const supabase: SupabaseClient<Database> = createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
);

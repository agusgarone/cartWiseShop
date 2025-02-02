import {createClient, SupabaseClient} from '@supabase/supabase-js';
import {Database} from '../models/types/supabase';
export const supabase: SupabaseClient<Database> = createClient(
  process.env.SUPABASE_URL || '',
  process.env.SUPABASE_ANON_KEY || '',
);

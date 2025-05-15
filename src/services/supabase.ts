import {createClient, SupabaseClient} from '@supabase/supabase-js';
import {Database} from '../models/types/supabase';
import {SUPABASE_ANON_KEY, SUPABASE_URL} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const supabase: SupabaseClient<Database> = createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: false,
      storage: {
        async getItem(key) {
          return await AsyncStorage.getItem(key);
        },
        async setItem(key, value) {
          await AsyncStorage.setItem(key, value);
        },
        async removeItem(key) {
          await AsyncStorage.removeItem(key);
        },
      },
    },
  },
);

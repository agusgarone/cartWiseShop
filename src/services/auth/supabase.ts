import {createClient, SupabaseClient} from '@supabase/supabase-js';
import {Database} from '../models/types/supabase';
import {SUPABASE_ANON_KEY, SUPABASE_URL} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

function devFetchWithLog(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
  return fetch(input, init).catch((err: unknown) => {
    if (__DEV__) {
      const url =
        typeof input === 'string'
          ? input
          : input instanceof URL
            ? input.href
            : (input as Request).url;
      console.warn(
        '[supabase] fetch falló (origen del "Network request failed"). URL:',
        url,
        err,
      );
    }
    throw err;
  });
}

if (__DEV__) {
  try {
    // Si esto fallara, el culpable sería el polyfill de URL, no la red.
    const u = new URL(SUPABASE_URL);
    console.log('[supabase] SUPABASE_URL OK, host:', u.host);
  } catch (e) {
    console.warn('[supabase] SUPABASE_URL no es una URL válida. Revisa .env / @env.', e);
  }
}

export const supabase: SupabaseClient<Database> = createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
  {
    ...(__DEV__ ? {global: {fetch: devFetchWithLog}} : {}),
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

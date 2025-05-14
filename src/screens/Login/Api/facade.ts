import {supabase} from '../../../services/supabase';

export const insertUser = async (user: any) => {
  const response = await supabase.from('users').upsert([
    {
      uid: await getUserUid(),
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      providerId: 'google.com',
      createdAt: new Date().toISOString(),
      language: 'es',
      theme: 'light',
      listView: 'original',
    },
  ]);

  return response;
};

export const getUserById = async () => {
  const response = await supabase
    .from('users')
    .select('*')
    .eq('uid', await getUserUid())
    .single();
  return response;
};

export const accessSupabase = async (token: string) => {
  const response = await supabase.auth.signInWithIdToken({
    provider: 'google',
    token: token,
  });
  return response;
};

export const updateLanguage = async (lang: string) => {
  const response = await supabase
    .from('users')
    .update({
      language: lang,
    })
    .eq('uid', await getUserUid());

  return response;
};

export const updateTheme = async (theme: string) => {
  const response = await supabase
    .from('users')
    .update({
      theme: theme,
    })
    .eq('uid', await getUserUid());

  return response;
};

export const updateListView = async (listView: string) => {
  const response = await supabase
    .from('users')
    .update({
      listView: listView,
    })
    .eq('uid', await getUserUid());

  return response;
};

const getUserUid = async () => {
  const {data: session} = await supabase.auth.getSession();

  const userUid = session?.session?.user?.id;

  if (!userUid) {
    throw new Error('No hay usuario autenticado');
  }
  return userUid;
};

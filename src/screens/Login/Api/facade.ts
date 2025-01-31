import {supabase} from '../../../services/supabase';

export const insertUser = async (user: any) => {
  const response = await supabase.from('users').upsert([
    {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      providerId: 'google.com',
      createdAt: new Date().toISOString(),
    },
  ]);

  return response;
};

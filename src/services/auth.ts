import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {supabase} from './supabase';

// Configurar Google Sign-In
GoogleSignin.configure({
  webClientId: process.env.GOOGLE_WEB_CLIENT,
});

export async function signInWithGoogle() {
  try {
    await GoogleSignin.hasPlayServices();
    const {data} = await GoogleSignin.signIn();

    if (data && data.idToken) {
      const googleCredential = auth.GoogleAuthProvider.credential(data.idToken);
      return auth().signInWithCredential(googleCredential);
    }
  } catch (error) {
    console.error('Error en Google Sign-In:', error);
    throw error;
  }
}

export async function saveUser(user: any) {
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
}

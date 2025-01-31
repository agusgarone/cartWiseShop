import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {insertUser} from '../Api/facade';
import auth from '@react-native-firebase/auth';

// Configurar Google Sign-In
GoogleSignin.configure({
  webClientId: process.env.GOOGLE_WEB_CLIENT,
});

export const createUser = async (userData: any) => {
  const responseInsertUser = await insertUser(userData);
  return responseInsertUser;
};

export const signInWithGoogle = async () => {
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
};

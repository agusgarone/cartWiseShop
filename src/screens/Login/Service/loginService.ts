import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {
  accessSupabase,
  getUserById,
  insertUser,
  updateLanguage,
  updateListView,
  updateTheme,
} from '../Api/facade';
import auth from '@react-native-firebase/auth';
import {GOOGLE_WEB_CLIENT} from '@env';

// Configurar Google Sign-In
GoogleSignin.configure({
  webClientId: GOOGLE_WEB_CLIENT,
});

export const fetchUserById = async () => {
  const responseGetUserById = await getUserById();
  return responseGetUserById;
};

export const createUser = async (userData: any) => {
  const responseInsertUser = await insertUser(userData);
  return responseInsertUser;
};

export const loginSupabase = async (token: string) => {
  const responseLoginSupabase = await accessSupabase(token);
  return responseLoginSupabase;
};

export const signInWithGoogle = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();

    if (!userInfo.data?.idToken) {
      throw new Error('No se recibió un ID Token de Google');
    }

    const googleCredential = auth.GoogleAuthProvider.credential(
      userInfo.data.idToken,
    );
    const firebaseUser = await auth().signInWithCredential(googleCredential);

    return {user: firebaseUser, tokenId: userInfo.data.idToken};
  } catch (error) {
    console.error('❌ Error en Google Sign-In:', error);
    throw error;
  }
};

export const editLanguage = async (lang: string) => {
  const responseUpdateLanguage = await updateLanguage(lang);
  return responseUpdateLanguage;
};

export const editTheme = async (theme: string) => {
  const responseUpdateTheme = await updateTheme(theme);
  return responseUpdateTheme;
};

export const editListView = async (listView: string) => {
  const responseUpdateListView = await updateListView(listView);
  return responseUpdateListView;
};

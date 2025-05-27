import {useContext, useState} from 'react';
import {StorageService} from '../../../storage/asyncStorage';
import {
  createUser,
  signInWithGoogle,
  loginSupabase,
  fetchUserById,
} from '../Service/loginService';
import {NavigationContext} from '@react-navigation/native';
import i18n from '../../../services/i18n';
import {getPreferences} from '../Api/facade';

export const loginController = () => {
  const [isNew, setIsNew] = useState<boolean>(true);
  const navigation = useContext(NavigationContext);
  const handleSigninGoogle = async () => {
    try {
      const {user, tokenId} = await signInWithGoogle();
      console.log('✅ Usuario autenticado:', user);

      const {error: supabaseLoginError} = await loginSupabase(tokenId);
      if (supabaseLoginError) {
        throw new Error('❌ Error al loguearse en Supabase');
      }

      const responseFetchUser = await fetchUserById();

      if (responseFetchUser.data) {
        console.log('El usuario ya existe en supabase');
      } else {
        const responseSaveUser = await createUser(user?.user);

        if (![200, 201, 204].includes(responseSaveUser.status)) {
          console.log('Error guardando usuario en la BD');
          throw new Error('Error guardando usuario en la BD');
        } else {
          console.log('Usuario creado con Exito');
        }
      }
      await setInitialValues(responseFetchUser.data);
    } catch (error) {
      console.error('❌ Error al iniciar sesión:', error);
    }
  };

  const handleLoginGoogle = async () => {
    try {
      const {user, tokenId} = await signInWithGoogle();
      console.log('✅ Usuario autenticado:', user);

      const {error: supabaseLoginError} = await loginSupabase(tokenId);
      if (supabaseLoginError) {
        throw new Error('❌ Error al loguearse en Supabase');
      }
      const responseFetchUser = await fetchUserById();

      if (responseFetchUser.error) {
        console.log('Error verificando usuario en supabase');
        throw responseFetchUser.error;
      }

      if (!responseFetchUser.data) {
        console.log('El usuario no fue encontrado en la BD');
        throw new Error('El usuario no fue encontrado en la BD');
      }

      await setInitialValues(responseFetchUser.data);
    } catch (error) {
      console.error('❌ Error al iniciar sesión:', error);
    }
  };

  const setInitialValues = async (
    data: {
      uid: string;
      email: string;
      displayName: string;
      photoURL: string;
      providerId: string;
      createdAt: string;
      language: string;
      theme: string;
      listView: string;
    } | null,
  ) => {
    await StorageService.setItem('userAuthenticated', data);
    i18n.changeLanguage(data?.language || 'es');
    navigation?.navigate('MainDrawer');
  };

  const handleViewUserLogin = () => {
    setIsNew(!isNew);
  };

  return {
    isNew,
    handleSigninGoogle,
    handleLoginGoogle,
    handleViewUserLogin,
  };
};

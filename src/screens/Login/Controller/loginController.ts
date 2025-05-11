import {useContext, useState} from 'react';
import {StorageService} from '../../../storage/asyncStorage';
import {
  createUser,
  signInWithGoogle,
  loginSupabase,
  fetchUserById,
} from '../Service/loginService';
import {NavigationContext} from '@react-navigation/native';

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
      console.log('response fetchUserById', responseFetchUser);

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

      await StorageService.setItem('userAuthenticated', user.user);
      navigation?.navigate('MainDrawer');
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
      console.log('response fetchUserById', responseFetchUser);

      if (responseFetchUser.error) {
        console.log('Error verificando usuario en supabase');
        throw responseFetchUser.error;
      }

      if (!responseFetchUser.data) {
        console.log('El usuario no fue encontrado en la BD');
        throw new Error('El usuario no fue encontrado en la BD');
      }

      console.log('El usuario existe en supabase');

      await StorageService.setItem('userAuthenticated', responseFetchUser.data);
      navigation?.navigate('MainDrawer');
    } catch (error) {
      console.error('❌ Error al iniciar sesión:', error);
    }
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

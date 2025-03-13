import {useContext} from 'react';
import {StorageService} from '../../../storage/asyncStorage';
import {
  createUser,
  signInWithGoogle,
  loginSupabase,
  fetchUserById,
} from '../Service/loginService';
import {NavigationContext} from '@react-navigation/native';

export const loginController = () => {
  const navigation = useContext(NavigationContext);
  const handleLoginGoogle = async () => {
    try {
      const {user, tokenId} = await signInWithGoogle();
      console.log('✅ Usuario autenticado:', user);

      const responseFetchUser = await fetchUserById(user.user.uid);
      console.log('response fetchUserById', responseFetchUser);
      if (responseFetchUser.error) {
        console.log('Error verificando usuario en supabase');
        throw responseFetchUser.error;
      }
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

      await loginSupabase(tokenId);

      await StorageService.setItem('userAuthenticated', responseFetchUser.data);

      navigation?.navigate('MainDrawer');
    } catch (error) {
      console.error('❌ Error al iniciar sesión:', error);
    }
  };

  return {
    handleLoginGoogle,
  };
};

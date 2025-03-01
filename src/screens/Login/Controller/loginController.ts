import {useContext} from 'react';
import {StorageService} from '../../../storage/asyncStorage';
import {
  createUser,
  signInWithGoogle,
  loginSupabase,
} from '../Service/loginService';
import {NavigationContext} from '@react-navigation/native';

export const loginController = () => {
  const navigation = useContext(NavigationContext);
  const handleLoginGoogle = async () => {
    try {
      const {user, tokenId} = await signInWithGoogle();
      console.log('✅ Usuario autenticado:', user);

      await loginSupabase(tokenId);

      const responseSaveUser = await createUser(user?.user);
      if (![200, 201, 204].includes(responseSaveUser.status)) {
        console.log('Error guardando usuario en la BD');
      }

      await StorageService.setItem('uidUser', user?.user.uid);
      navigation?.navigate('MainDrawer');
    } catch (error) {
      console.error('❌ Error al iniciar sesión:', error);
    }
  };

  return {
    handleLoginGoogle,
  };
};

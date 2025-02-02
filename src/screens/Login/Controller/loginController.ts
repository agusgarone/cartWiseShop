import {useContext} from 'react';
import {StorageService} from '../../../storage/asyncStorage';
import {createUser, signInWithGoogle} from '../Service/loginService';
import {NavigationContext} from '@react-navigation/native';

export const loginController = () => {
  const navigation = useContext(NavigationContext);
  const handleLoginGoogle = async () => {
    try {
      const user = await signInWithGoogle();
      console.log('✅ Usuario autenticado:', user);
      const responseSaveUser = await createUser(user?.user);
      console.log(responseSaveUser.status);
      if (
        responseSaveUser.status === 200 ||
        responseSaveUser.status === 201 ||
        responseSaveUser.status === 204
      ) {
        // * mensaje de exito
        // * redireccion al home y guardado de uid en el localStorage
        console.log('Se guarda el uid_user', user?.user.uid);
        await StorageService.setItem('uidUser', user?.user.uid);
        navigation?.navigate('MainDrawer');
      } else {
        // * mensaje de error
      }
    } catch (error) {
      console.error('❌ Error al iniciar sesión:', error);
    }
  };

  return {
    handleLoginGoogle,
  };
};

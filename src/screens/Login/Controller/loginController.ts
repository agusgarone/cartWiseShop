import {createUser, signInWithGoogle} from '../Service/loginService';

export const loginController = () => {
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

import {useContext, useState} from 'react';
import {NavigationContext} from '@react-navigation/native';
import {FormikState} from 'formik';
import {FORM_STATUS} from '../../../common/utils/formStatus';
import {Alert, Keyboard} from 'react-native';
import {categories} from '../../../data-mock';
import {createProduct} from '../../../services/Product';
import {IProductSupabase} from '../../../models/types/product';
import {StorageService} from '../../../storage/asyncStorage';

export const createProductController = () => {
  const navigation = useContext(NavigationContext);
  const [initialValues, setInitialValues] = useState<{
    name: string;
    category: number | undefined;
  }>({
    name: '',
    category: undefined,
  });

  const handleFormikSubmit = async (
    values: {name: string; category: number | undefined},
    actions: {
      setStatus: (arg0: string) => void;
      setSubmitting: (arg0: boolean) => void;
      resetForm: (nextState?: Partial<FormikState<any>>) => void;
    },
  ) => {
    actions.setStatus(FORM_STATUS.idle);
    if (values.name) {
      // * Se hizo la edicion pero despues decidí sacar es funcionalidad para que solo exista la baja y alta de productos
      const newProduct: IProductSupabase = {
        id: Math.floor(Math.random() * 900000) + 100000,
        name: values.name,
        id_category:
          categories.find(category => category.id === values.category)?.id || 1,
      };
      const uidUser: string = await StorageService.getItem('uidUser');
      await createProduct(newProduct, uidUser);
      Keyboard.dismiss();
      actions.resetForm();
      navigation?.goBack();
    } else {
      Alert.alert(
        'Hubo un error al crear el producto, intentelo de nuevo por favor!',
      );
    }
  };

  const goBack = () => navigation?.goBack();

  return {
    handleFormikSubmit,
    goBack,
    initialValues,
  };
};

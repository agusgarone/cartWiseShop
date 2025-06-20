import {useContext, useState} from 'react';
import {NavigationContext} from '@react-navigation/native';
import {FormikState} from 'formik';
import {FORM_STATUS} from '../../../common/utils/formStatus';
import {Alert, Keyboard} from 'react-native';
import {categories} from '../../../data-mock';
import {createProduct} from '../../../services/Product';
import {IProductSupabase} from '../../../models/types/product';
import {useTranslation} from 'react-i18next';

export const createProductController = () => {
  const {t} = useTranslation();
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
      const newProduct: IProductSupabase = {
        id: Math.floor(Math.random() * 900000) + 100000,
        name: values.name,
        id_category:
          categories.find(category => category.id === values.category)?.id || 1,
      };
      await createProduct(newProduct);
      Keyboard.dismiss();
      actions.resetForm();
      navigation?.goBack();
    } else {
      Alert.alert(t('createProduct.unexpectedErrorToCreateProduct'));
    }
  };

  return {
    handleFormikSubmit,
    initialValues,
  };
};

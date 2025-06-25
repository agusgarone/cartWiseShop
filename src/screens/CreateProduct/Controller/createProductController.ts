import {useCallback, useContext, useState} from 'react';
import {NavigationContext, useFocusEffect} from '@react-navigation/native';
import {FormikState} from 'formik';
import {FORM_STATUS} from '../../../common/utils/formStatus';
import {Alert, Keyboard} from 'react-native';
import {createProduct} from '../../../services/Product';
import {IProductSupabase} from '../../../models/types/product';
import {useTranslation} from 'react-i18next';
import {mapperCategorySupabaseToFilter} from '../../../models/mappers/mapperCategorySupabaseToFilter';
import {ICategoryFilter} from '../../../models/types/category';
import {fetchCategories} from '../../../services/Category';

export const createProductController = () => {
  const {t} = useTranslation();
  const navigation = useContext(NavigationContext);
  const [categories, setCategories] = useState<ICategoryFilter[]>([]);

  const [initialValues, setInitialValues] = useState<{
    name: string;
    category: number | undefined;
  }>({
    name: '',
    category: undefined,
  });

  const getCategories = async () => {
    const responseGetAllCategories = await fetchCategories();
    if (responseGetAllCategories.error) {
      console.log(responseGetAllCategories.error);
    } else {
      setCategories(
        mapperCategorySupabaseToFilter(responseGetAllCategories.data),
      );
    }
  };

  useFocusEffect(
    useCallback(() => {
      getCategories();

      return () => {
        console.log('🔄 Cleanup: Se desmonta el listener');
      };
    }, [categories]),
  );

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
    categories,
  };
};

import {useCallback, useContext, useEffect, useState} from 'react';
import {globalSessionState} from '../../../services/globalStates';
import {NavigationContext, useFocusEffect} from '@react-navigation/native';
import {FormikState} from 'formik';
import {FORM_STATUS} from '../../../common/utils/formStatus';
import {IListDTO} from '../../../models/types/list';
import {Alert, Keyboard} from 'react-native';
import {StorageService} from '../../../storage/asyncStorage';
import {createList} from '../../../services/List';
import {IProductDTO} from '../../../models/types/product';
import {mapperListDTOToSupabase} from '../../../models/mappers/mapperListDTOToSupabase';
import {formatDateToISO} from '../../../common/utils/formatDateISO';
import {useTranslation} from 'react-i18next';

export const createListController = () => {
  const {t} = useTranslation();
  const navigation = useContext(NavigationContext);
  const productsFromZustand = globalSessionState(
    state => state.productsSelected,
  );
  const [products, setProducts] = useState<IProductDTO[]>([]);
  const setProductsSelected = globalSessionState(
    state => state.setProductsSelected,
  );
  const [initialValues, setInitialValues] = useState({
    name: '',
    categories: [],
  });

  useFocusEffect(
    useCallback(() => {
      return () => {
        console.log('🔄 Cleanup: Se desmonta el listener');
        resetVariablesAndStates();
      };
    }, []),
  );

  useEffect(() => {
    setProducts(productsFromZustand);
  }, [productsFromZustand]);

  const handleFormikSubmit = async (
    values: {name: string; categories: string[]},
    actions: {
      setStatus: (arg0: string) => void;
      setSubmitting: (arg0: boolean) => void;
      resetForm: (nextState?: Partial<FormikState<any>>) => void;
    },
  ) => {
    actions.setStatus(FORM_STATUS.idle);

    if (values.name) {
      const newList: IListDTO<IProductDTO> = {
        created_at: formatDateToISO(new Date()),
        name: values.name,
        products: products ?? [],
        id: Math.floor(Math.random() * 900000) + 100000,
      };
      await createList(mapperListDTOToSupabase(newList));
      await resetVariablesAndStates();
      Keyboard.dismiss();
      actions.resetForm();
      navigation?.goBack();
    } else {
      Alert.alert(t('createList.addNameToTheList'));
    }
  };

  const resetVariablesAndStates = async () => {
    await StorageService.removeItem('nameList');
    setProducts([]);
    setProductsSelected([]);
    setInitialValues({name: '', categories: []});
  };

  const goToAddProducts = () => {
    navigation?.navigate('AddProducts');
  };

  const removeProductSelected = (id: number) => {
    const productsFilter = products.filter(product => product.id !== id);
    setProducts(productsFilter);
    setProductsSelected(productsFilter);
  };

  return {
    products,
    initialValues,
    goToAddProducts,
    handleFormikSubmit,
    removeProductSelected,
  };
};

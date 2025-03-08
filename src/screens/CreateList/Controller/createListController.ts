import {useContext, useEffect, useState} from 'react';
import {GlobalStateService} from '../../../services/globalStates';
import {NavigationContext} from '@react-navigation/native';
import {FormikState} from 'formik';
import {FORM_STATUS} from '../../../common/utils/formStatus';
import moment from 'moment';
import {IListDTO} from '../../../models/types/list';
import {Alert, Keyboard} from 'react-native';
import {StorageService} from '../../../storage/asyncStorage';
import {createList, editList, fetchListById} from '../../../services/List';
import {IProductDTO} from '../../../models/types/product';
import {mapperListDTOToSupabase} from '../../../models/mappers/mapperListDTOToSupabase';
import {mapperListSupabaseToDTO} from '../../../models/mappers/mapperListSupabaseToDTO';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';

export const createListController = () => {
  const navigation = useContext(NavigationContext);
  const [products, setProducts] = useState<IProductDTO[]>(
    GlobalStateService.getProductsSelected(),
  );
  const [list, setList] = useState<IListDTO<IProductDTO> | null>(null);
  const [initialValues, setInitialValues] = useState({
    name: '',
  });

  useEffect(() => {
    navigation?.addListener('focus', async () => {
      await getDataFromStorage();
      await getList();
    });
  }, [navigation]);

  useEffect(() => {
    if (list) {
      setInitialValues({
        name: list?.name || '',
      });
    }
    if (list?.products) {
      setProducts(list?.products);
      GlobalStateService.setProductsSelected(list?.products);
    }
  }, [list]);

  const handleFormikSubmit = async (
    values: {name: string},
    actions: {
      setStatus: (arg0: string) => void;
      setSubmitting: (arg0: boolean) => void;
      resetForm: (nextState?: Partial<FormikState<any>>) => void;
    },
  ) => {
    actions.setStatus(FORM_STATUS.idle);
    const currentList: number = await StorageService.getItem('currentList');
    const isEditing: boolean = await StorageService.getItem('isEditing');
    const userAuthenticated: FirebaseAuthTypes.User =
      await StorageService.getItem('userAuthenticated');

    if (values.name) {
      if (currentList && isEditing) {
        const newValues: {newName: string; newProducts: number[]} = {
          newName: values.name,
          newProducts: products.length ? products.map(x => x.id) : [],
        };
        await editList(currentList, newValues);
      } else {
        const newList: IListDTO<IProductDTO> = {
          created_at: moment().format('DD-MM-YYYY'),
          name: values.name,
          products: products ?? [],
          id: Math.floor(Math.random() * 900000) + 100000,
        };
        await createList(
          mapperListDTOToSupabase(newList),
          userAuthenticated.uid,
        );
      }
      await resetVariablesAndStates();
      Keyboard.dismiss();
      actions.resetForm();
      navigation?.navigate('MainTabs', {screen: 'Home'});
    } else {
      Alert.alert('Agregá un nombre a la lista, por favor!');
    }
  };

  const resetVariablesAndStates = async () => {
    await StorageService.removeItem('nameList');
    await StorageService.removeItem('currentList');
    await StorageService.removeItem('isEditing');
    setProducts([]);
    GlobalStateService.setProductsSelected([]);
    setInitialValues({name: ''});
  };

  const getList = async () => {
    const idList: string = await StorageService.getItem('idList');
    if (idList) {
      const userAuthenticated: FirebaseAuthTypes.User =
        await StorageService.getItem('userAuthenticated');
      await StorageService.setItem('isEditing', true);
      await StorageService.removeItem('idList');
      const responseGetList = await fetchListById(
        parseInt(idList, 10),
        userAuthenticated.uid,
      );
      if (responseGetList.error) {
        console.log(responseGetList.error);
      } else {
        if (responseGetList.data) {
          await StorageService.setItem(
            'currentList',
            responseGetList.data[0].list_id,
          );
          setList(mapperListSupabaseToDTO(responseGetList.data[0]));
        }
      }
    }
  };

  const getDataFromStorage = async () => {
    const nameList = await StorageService.getItem('nameList');
    if (nameList) {
      setInitialValues({
        name: nameList,
      });
    }
  };

  const goToAddProducts = (values: {name: string}) => {
    StorageService.setItem('nameList', values.name);
    navigation?.navigate('AddProducts');
  };

  const removeProductSelected = (id: number) => {
    const productsFilter = products.filter(product => product.id !== id);
    setProducts(productsFilter);
    GlobalStateService.setProductsSelected(productsFilter);
  };

  return {
    products,
    handleFormikSubmit,
    goToAddProducts,
    initialValues,
    list,
    removeProductSelected,
  };
};

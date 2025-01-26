import {useContext, useEffect, useState} from 'react';
import {IProduct} from '../../../models/product';
import {GlobalStateService} from '../../../services/globalStates';
import {NavigationContext, RouteProp} from '@react-navigation/native';
import {FormikState} from 'formik';
import {FORM_STATUS} from '../../../common/utils/formStatus';
import moment from 'moment';
import {IList} from '../../../models/list';
import {CreateList, EditList, getListByID} from '../../../services/List';
import {Alert, Keyboard} from 'react-native';
import {RootTabParamList} from '../../../models/RootTabParamList';
import {StorageService} from '../../../storage/asyncStorage';

type CreateListScreenRouteProp = RouteProp<RootTabParamList, 'CreateList'>;

export const createListController = () => {
  const navigation = useContext(NavigationContext);
  const [products, setProducts] = useState<IProduct[]>(
    GlobalStateService.getProductsSelected(),
  );
  const [list, setList] = useState<IList | null>(null);
  const [initialValues, setInitialValues] = useState({
    name: '',
  });

  useEffect(() => {
    navigation?.addListener('focus', () => {
      getList();
      getNameListFromStorage();
    });
  }, []);

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
    const currentList: IList = await StorageService.getItem('currentList');
    const isEditing: boolean = await StorageService.getItem('isEditing');

    if (values.name) {
      if (currentList && isEditing) {
        const editList: IList = {
          fechaAlta: currentList.fechaAlta,
          name: values.name,
          products: products ?? [],
          id: currentList.id,
        };
        await EditList(editList);
      } else {
        const newList: IList = {
          fechaAlta: moment().format('DD-MM-YYYY'),
          name: values.name,
          products: products ?? [],
          id: Math.floor(Math.random() * 900000) + 100000,
        };
        await CreateList(newList);
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
      await StorageService.setItem('isEditing', true);
      await StorageService.removeItem('idList');
      const responseGetList = await getListByID(parseInt(idList, 10));
      if (responseGetList) {
        await StorageService.setItem('currentList', responseGetList);
        setList(responseGetList);
      }
    }
  };

  const getNameListFromStorage = async () => {
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

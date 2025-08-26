import {useCallback, useContext, useEffect, useMemo, useState} from 'react';
import {globalSessionState} from '../../../services/globalStates';
import {NavigationContext, useFocusEffect} from '@react-navigation/native';
import {FormikState} from 'formik';
import {FORM_STATUS} from '../../../common/utils/formStatus';
import {IListDTO, IListForm, ITab} from '../../../models/types/list';
import {Alert, Keyboard} from 'react-native';
import {StorageService} from '../../../storage/asyncStorage';
import {editList, fetchListById} from '../../../services/List';
import {IProductDTO} from '../../../models/types/product';
import {mapperListSupabaseToDTO} from '../../../models/mappers/mapperListSupabaseToDTO';
import {useTranslation} from 'react-i18next';
import {ICategoryFilter} from '../../../models/types/category';
import {getCategoriesByProducts} from '../../../common/utils/functions/getCategoriesByProducts';
import {parseData} from '../../../common/utils/functions/parseData';
import {IFilterListDetail} from '../../../models/types/filter';

export const editListController = () => {
  const {t} = useTranslation();
  const navigation = useContext(NavigationContext);
  const productsFromZustand = globalSessionState(
    state => state.productsSelected,
  );
  const filters: IFilterListDetail = globalSessionState(
    state => state.filtersEditList,
  );
  const [products, setProducts] = useState<IProductDTO[]>([]);
  const setProductsSelected = globalSessionState(
    state => state.setProductsSelected,
  );
  const setNameListSelected = globalSessionState(
    state => state.setNameListSelected,
  );
  const [list, setList] = useState<IListDTO<IProductDTO> | null>(null);
  const [initialValues, setInitialValues] = useState({
    name: '',
    categories: [],
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [categories, setCategories] = useState<ICategoryFilter[] | null>(null);
  const [categoriesFilter, setCategoriesFilter] = useState<
    ICategoryFilter[] | null
  >(null);
  const [listSelectedFormatted, setListSelectedFormatted] =
    useState<IListForm<ITab>>();

  useFocusEffect(
    useCallback(() => {
      getList();

      return () => {
        console.log('🔄 Cleanup: Se desmonta el listener');
      };
    }, []),
  );

  useEffect(() => {
    setProducts(productsFromZustand);
  }, [productsFromZustand]);

  useEffect(() => {
    if (list) {
      setInitialValues({
        name: list?.name || '',
        categories: [],
      });
    }
    if (list?.products) {
      setProducts(list?.products);
      setProductsSelected(list?.products);
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

    if (values.name) {
      if (currentList && isEditing) {
        const newValues: {newName: string; newProducts: number[]} = {
          newName: values.name,
          newProducts: products.length ? products.map(x => x.id) : [],
        };
        await editList(currentList, newValues);
      }
      await resetVariablesAndStates();
      Keyboard.dismiss();
      actions.resetForm();
      navigation?.goBack();
    } else {
      Alert.alert(t('createList.addNameToTheList'));
    }
  };

  const resetVariablesAndStates = async () => {
    await StorageService.removeItem('currentList');
    await StorageService.removeItem('isEditing');
    setProducts([]);
    setProductsSelected([]);
    setNameListSelected('');
    setInitialValues({name: '', categories: []});
  };

  const getList = async () => {
    const idList: string = await StorageService.getItem('idList');
    if (idList) {
      setLoading(true);
      await StorageService.setItem('isEditing', true);
      await StorageService.removeItem('idList');
      const responseGetList = await fetchListById({
        listId: parseInt(idList, 10),
        categories: null,
      });
      if (responseGetList.error) {
        console.log(responseGetList.error);
      } else {
        if (responseGetList.data) {
          if (!categoriesFilter) {
            setCategoriesFilter(
              getCategoriesByProducts(responseGetList.data[0].product_data),
            );
            setCategories(
              getCategoriesByProducts(responseGetList.data[0].product_data),
            );
          }
          await StorageService.setItem(
            'currentList',
            responseGetList.data[0].list_id,
          );
          setList(mapperListSupabaseToDTO(responseGetList.data[0]));
          setLoading(false);
        }
      }
    }
  };

  // useMemo(() => {
  //   if (list && categories) {
  //     parseData({
  //       listSelected: list,
  //       categories: categories,
  //       filters: filters,
  //       setListSelectedFormatted: setListSelectedFormatted,
  //     });
  //   }
  // }, [categories, list]);

  const goToAddProducts = () => {
    navigation?.navigate('AddProducts');
  };

  const handleNameListSelected = (value: string) => {
    setNameListSelected(value);
  };

  const removeProductSelected = (id: number) => {
    const productsFilter = products.filter(product => product.id !== id);
    setProducts(productsFilter);
    setProductsSelected(productsFilter);
  };

  return {
    goToAddProducts,
    handleFormikSubmit,
    removeProductSelected,
    handleNameListSelected,
    setOpen,
    products,
    initialValues,
    list,
    loading,
    open,
    categoriesFilter,
    showWithCategories: filters.splitByCategories,
  };
};

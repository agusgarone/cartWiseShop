import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useRef,
} from 'react';
import {globalSessionState} from '../../../services/globalStates';
import {NavigationContext, useFocusEffect} from '@react-navigation/native';
import {FormikState} from 'formik';
import {FORM_STATUS} from '../formStatus';
import {IListDTO, IListForm, ITab} from '../../../models/types/list';
import {Alert, Keyboard} from 'react-native';
import {StorageService} from '../../../storage/asyncStorage';
import {IProductDTO} from '../../../models/types/product';
import {useTranslation} from 'react-i18next';
import {useProductsManagement} from './useProductsManagement';
import {useCategoriesManagement} from './useCategoriesManagement';
import {IFilterListDetail} from '../../../models/types/filter';
import {getCategoriesByProducts} from '../functions/getCategoriesByProducts';
import {parseDataForEdit} from '../functions/parseData';

interface UseListsManagementProps {
  mode: 'create' | 'edit';
  onListCreated?: (list: IListDTO<IProductDTO>) => void;
  onListUpdated?: (
    listId: number,
    newValues: {newName: string; newProducts: number[]},
  ) => void;
  onListLoaded?: (list: IListDTO<IProductDTO>) => void;
  onMount?: () => void;
}

export const useListsManagement = ({
  mode,
  onListCreated,
  onListUpdated,
  onListLoaded,
  onMount,
}: UseListsManagementProps) => {
  const {t} = useTranslation();
  const navigation = useContext(NavigationContext);

  const {
    products,
    setProducts,
    productsFromZustand,
    syncWithZustand,
    resetProducts,
    removeProductSelected,
    setProductsAndProductsSelected,
  } = useProductsManagement();

  const {categories, categoriesFilter, setCategoriesAndCategoriesFilter} =
    useCategoriesManagement();

  const filters: IFilterListDetail = globalSessionState(
    state => state.filtersEditList,
  );
  const setNameListSelected = globalSessionState(
    state => state.setNameListSelected,
  );

  // Estados comunes
  const [list, setList] = useState<IListDTO<IProductDTO> | null>(
    mode === 'create'
      ? {
          id: Math.floor(Math.random() * 900000) + 100000,
          created_at: new Date().toISOString(),
          name: '',
          products: [],
        }
      : null,
  );
  const [initialValues, setInitialValues] = useState({
    name: '',
    categories: [],
  });
  const [open, setOpen] = useState<boolean>(false);
  const [listSelectedFormatted, setListSelectedFormatted] =
    useState<IListForm<ITab>>();
  const [loading, setLoading] = useState<boolean>(false);

  // Usar useRef para estabilizar la referencia de onMount
  const onMountRef = useRef(onMount);
  onMountRef.current = onMount;

  // Lógica común de useFocusEffect para cleanup y mount
  useFocusEffect(
    useCallback(() => {
      // Ejecutar onMount si está definido (para modo edit)
      if (onMountRef.current) {
        onMountRef.current();
      }

      return () => {
        console.log('🔄 Cleanup: Se desmonta el listener');
        const shouldCleanup = async () => {
          const isCreatingProduct = await StorageService.getItem(
            'isCreatingProduct',
          );
          if (!isCreatingProduct) {
            await resetVariablesAndStates();
          } else {
            await StorageService.removeItem('isCreatingProduct');
          }
        };
        shouldCleanup();
      };
    }, []), // Array de dependencias vacío para evitar bucles
  );

  // Lógica común para sincronizar productos desde Zustand
  useFocusEffect(
    useCallback(() => {
      const checkForReturnFromAddProducts = async () => {
        const isCreatingProduct = await StorageService.getItem(
          'isCreatingProduct',
        );
        if (isCreatingProduct === 'true') {
          await StorageService.removeItem('isCreatingProduct');
          syncWithZustand();
        }
      };
      checkForReturnFromAddProducts();
    }, [productsFromZustand]),
  );

  // Lógica común para sincronizar productos y categorías
  useEffect(() => {
    setProducts(productsFromZustand);
    const formattedProductsToGetCategories = productsFromZustand.map(
      product => ({
        id: product.id.toString(),
        name: product.name,
        id_category: product.category.id,
        category: product.category.name,
      }),
    );
    setCategoriesAndCategoriesFilter(
      getCategoriesByProducts(formattedProductsToGetCategories),
    );
  }, [productsFromZustand]);

  // Lógica específica para modo edit
  useEffect(() => {
    if (mode === 'edit' && list) {
      setInitialValues({
        name: list?.name || '',
        categories: [],
      });
      if (list?.products) {
        setProductsAndProductsSelected(list?.products);
      }
      onListLoaded?.(list);
    }
  }, [list, mode]);

  // Lógica común para parsear datos
  useMemo(() => {
    if (list && categories && products.length > 0) {
      const updatedList = {
        ...list,
        products: products,
      };

      parseDataForEdit({
        listSelected: updatedList,
        categories: categories,
        filters: filters,
        setListSelectedFormatted: setListSelectedFormatted,
      });
    }
  }, [categories, list, filters, products]);

  // Funciones comunes
  const goToAddProducts = async () => {
    await StorageService.setItem('isCreatingProduct', 'true');
    navigation?.navigate('AddProducts');
  };

  const handleNameListSelected = (value: string) => {
    setNameListSelected(value);
  };

  const resetVariablesAndStates = async () => {
    if (mode === 'create') {
      await StorageService.removeItem('nameList');
    } else {
      await StorageService.removeItem('currentList');
      await StorageService.removeItem('isEditing');
      setNameListSelected('');
    }
    resetProducts();
    setInitialValues({name: '', categories: []});
  };

  const handleFormikSubmit = async (
    values: {name: string; categories?: string[]},
    actions: {
      setStatus: (arg0: string) => void;
      setSubmitting: (arg0: boolean) => void;
      resetForm: (nextState?: Partial<FormikState<any>>) => void;
    },
  ) => {
    actions.setStatus(FORM_STATUS.idle);

    if (values.name) {
      if (mode === 'create') {
        const newList: IListDTO<IProductDTO> = {
          created_at: new Date().toISOString(),
          name: values.name,
          products: products ?? [],
          id: Math.floor(Math.random() * 900000) + 100000,
        };
        onListCreated?.(newList);
      } else {
        const currentList: number = await StorageService.getItem('currentList');
        const isEditing: boolean = await StorageService.getItem('isEditing');

        if (currentList && isEditing) {
          const newValues: {newName: string; newProducts: number[]} = {
            newName: values.name,
            newProducts: products.length ? products.map(x => x.id) : [],
          };
          onListUpdated?.(currentList, newValues);
        }
      }

      await resetVariablesAndStates();
      Keyboard.dismiss();
      actions.resetForm();
      navigation?.goBack();
    } else {
      Alert.alert(t('createList.addNameToTheList'));
    }
  };

  return {
    // Estados
    list,
    setList,
    initialValues,
    setInitialValues,
    open,
    setOpen,
    listSelectedFormatted,
    setListSelectedFormatted,
    loading,
    setLoading,

    // Productos y categorías
    products,
    categories,
    categoriesFilter,
    setCategoriesAndCategoriesFilter,

    // Funciones comunes
    goToAddProducts,
    handleFormikSubmit,
    removeProductSelected,
    handleNameListSelected,
    resetVariablesAndStates,

    // Valores calculados
    showWithCategories: filters.splitByCategories,
  };
};

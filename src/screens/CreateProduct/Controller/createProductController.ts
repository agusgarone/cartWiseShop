import {useCallback, useContext, useState, useEffect} from 'react';
import {
  NavigationContext,
  useFocusEffect,
  useRoute,
} from '@react-navigation/native';
import {FormikState} from 'formik';
import {FORM_STATUS} from '../../../common/utils/formStatus';
import {Alert, Keyboard} from 'react-native';
import {createProduct} from '../../../services/Product';
import {IProductSupabase} from '../../../models/types/product';
import {useTranslation} from 'react-i18next';
import {mapperCategorySupabaseToFilter} from '../../../models/mappers/mapperCategorySupabaseToFilter';
import {ICategoryFilter} from '../../../models/types/category';
import {fetchCategories} from '../../../services/Category';
import {StorageService} from '../../../storage/asyncStorage';
import {globalSessionState} from '../../../services/globalStates';
import {IProductDTO} from '../../../models/types/product';
import {fetchProducts} from '../../../services/Product';
import {mapperProductSupabaseToDTO} from '../../../models/mappers/mapperProductSupabaseToDTO';
import {IFilterProducts} from '../../../models/types/filter';

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

  // Obtener las funciones de Zustand fuera de las funciones asíncronas
  const setProductsSelected = globalSessionState(
    state => state.setProductsSelected,
  );
  const currentProducts = globalSessionState(state => state.productsSelected);

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
    }, []), // Remover categories de las dependencias para evitar bucle infinito
  );

  // Cargar el nombre pre-cargado solo una vez al montar el componente
  useEffect(() => {
    loadPreloadedProductName();
  }, []);

  const loadPreloadedProductName = async () => {
    console.log('🔍 CreateProduct: Cargando nombre pre-cargado...');
    const preloadedName = await StorageService.getItem('preloadedProductName');
    console.log('📝 Nombre pre-cargado:', preloadedName);
    if (preloadedName) {
      setInitialValues(prev => ({
        ...prev,
        name: preloadedName,
      }));
      // Limpiar el nombre pre-cargado después de usarlo
      await StorageService.removeItem('preloadedProductName');
      console.log('✅ Nombre pre-cargado aplicado y limpiado');
    }
  };

  const handleFormikSubmit = async (
    values: {name: string; category: number | undefined},
    actions: {
      setStatus: (arg0: string) => void;
      setSubmitting: (arg0: boolean) => void;
      resetForm: (nextState?: Partial<FormikState<any>>) => void;
    },
  ) => {
    console.log('🚀 CreateProduct: handleFormikSubmit ejecutado');
    console.log('📝 Valores:', values);
    actions.setStatus(FORM_STATUS.idle);
    if (values.name) {
      const newProduct: IProductSupabase = {
        id: Math.floor(Math.random() * 900000) + 100000,
        name: values.name,
        id_category:
          categories.find(category => category.id === values.category)?.id || 1,
      };

      const response = await createProduct(newProduct);

      if (!response.error) {
        // Crear un producto temporal para agregar a la lista
        const selectedCategory = categories.find(
          category => category.id === values.category,
        );
        const tempProduct: IProductDTO = {
          id: newProduct.id,
          name: newProduct.name,
          category: {
            id: selectedCategory?.id || 1,
            name: selectedCategory?.name || 'Sin categoría',
          },
          default: false,
        };

        console.log('Lista modificada:', [...currentProducts, tempProduct]);

        // Agregar el producto a la lista actual
        setProductsSelected([...currentProducts, tempProduct]);

        console.log('✅ Producto agregado a la lista:', tempProduct);
      } else {
        console.log('❌ Error al crear el producto:', response.error);
        Alert.alert(t('createProduct.unexpectedErrorToCreateProduct'));
      }

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

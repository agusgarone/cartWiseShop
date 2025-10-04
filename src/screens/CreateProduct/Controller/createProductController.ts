import {useCallback, useContext, useState, useEffect} from 'react';
import {NavigationContext, useFocusEffect} from '@react-navigation/native';
import {FormikState} from 'formik';
import {FORM_STATUS} from '../../../common/utils/formStatus';
import {Alert, Keyboard} from 'react-native';
import {createProduct, verifyProductExists} from '../../../services/Product';
import {IProductSupabase} from '../../../models/types/product';
import {useTranslation} from 'react-i18next';
import {mapperCategorySupabaseToFilter} from '../../../models/mappers/mapperCategorySupabaseToFilter';
import {ICategoryFilter} from '../../../models/types/category';
import {fetchCategories} from '../../../services/Category';
import {StorageService} from '../../../storage/asyncStorage';
import {globalSessionState} from '../../../services/globalStates';
import {IProductDTO} from '../../../models/types/product';
import {capitalizeFirstLetter} from '../../../common/utils/functions/capitalizeFirstLetter';

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
    const preloadedName = await StorageService.getItem('preloadedProductName');
    if (preloadedName) {
      setInitialValues(prev => ({
        ...prev,
        name: preloadedName,
      }));
      // Limpiar el nombre pre-cargado después de usarlo
      await StorageService.removeItem('preloadedProductName');
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
    actions.setStatus(FORM_STATUS.idle);
    if (values.name) {
      const productName = values.name.trim().toLowerCase();

      // Verificar si el producto ya existe
      const checkResponse = await verifyProductExists(productName);

      if (checkResponse.error) {
        console.log('❌ Error al verificar el producto:', checkResponse.error);
        Alert.alert(t('createProduct.unexpectedErrorToCreateProduct'));
        return;
      }

      // Si el producto ya existe, mostrar mensaje de error
      if (checkResponse.data && checkResponse.data.length > 0) {
        Alert.alert(
          t('createProduct.productAlreadyExists'),
          t('createProduct.productAlreadyExistsMessage', {
            productName: productName,
          }),
        );
        actions.setSubmitting(false);
        return;
      }

      const newProduct: IProductSupabase = {
        id: Math.floor(Math.random() * 900000) + 100000,
        name: productName,
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
          name: capitalizeFirstLetter(newProduct.name.trim().toLowerCase()),
          category: {
            id: selectedCategory?.id || 1,
            name: selectedCategory?.name || 'Sin categoría',
          },
          default: false,
        };

        // Agregar el producto a la lista actual
        setProductsSelected([...currentProducts, tempProduct]);
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

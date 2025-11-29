import {useCallback, useContext, useMemo, useState} from 'react';
import {globalSessionState} from '../../../services/globalStates';
import {NavigationContext, useFocusEffect} from '@react-navigation/native';
import {Alert} from 'react-native';
import {IProductDTO} from '../../../models/types/product';
import {useTranslation} from 'react-i18next';
import {IFilterProducts} from '../../../models/types/filter';
import {ICategoryFilter} from '../../../models/types/category';
import {fetchCategories} from '../../../services/Category';
import {mapperCategorySupabaseToFilter} from '../../../models/mappers/mapperCategorySupabaseToFilter';
import {
  ProductsStorage,
  CategoriesStorage,
} from '../../../storage/storageHelpers';

export const productsController = () => {
  const {t} = useTranslation();
  const navigation = useContext(NavigationContext);
  const products: IProductDTO[] = globalSessionState(
    state => state.productsSelected,
  );
  const filters: IFilterProducts = globalSessionState(
    state => state.filtersProducts,
  );

  const [allProducts, setAllProducts] = useState<IProductDTO[]>(products);
  const [categories, setCategories] = useState<ICategoryFilter[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const fetchData = async (filters?: IFilterProducts) => {
    setLoading(true);

    // Cargar productos desde storage local
    let localProducts = await ProductsStorage.getAllProducts();

    // Obtener todas las categorías para mapear nombres
    const allCategories = await CategoriesStorage.getAllCategories();
    const categoryMap = new Map(allCategories.map(cat => [cat.id, cat.name]));

    // Aplicar filtros locales
    if (filters?.category) {
      localProducts = localProducts.filter(
        p => p.id_category === filters.category,
      );
    }
    if (filters?.nameFilter) {
      const searchTerm = filters.nameFilter.toLowerCase();
      localProducts = localProducts.filter(p =>
        p.name.toLowerCase().includes(searchTerm),
      );
    }

    // Ordenar si es necesario
    if (filters?.orderAsc !== undefined) {
      localProducts.sort((a, b) => {
        const comparison = a.name.localeCompare(b.name);
        return filters.orderAsc ? comparison : -comparison;
      });
    }

    // Convertir a DTO
    const mappedProducts = localProducts.map(prod => ({
      id: prod.id,
      name: prod.name,
      category: {
        id: prod.id_category,
        name: categoryMap.get(prod.id_category) || 'Sin categoría',
      },
      default: false,
    })) as IProductDTO[];

    setAllProducts(mappedProducts);
    setLoading(false);
  };

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

  const fetchParams = useMemo(() => {
    return {
      category: filters?.category || null,
      orderAsc: filters.orderAsc,
    };
  }, [filters]);

  useFocusEffect(
    useCallback(() => {
      fetchData({...fetchParams, nameFilter: searchQuery});
      getCategories();

      return () => {
        console.log('🔄 Cleanup: Se desmonta el listener');
      };
    }, [fetchParams, searchQuery]),
  );

  const handleDelete = async (product: IProductDTO) => {
    // Eliminar de storage local
    await ProductsStorage.deleteProduct(product.id);
    fetchData();
  };

  const goToCreateProduct = () => {
    console.log('Pruebaaaa');
    navigation?.navigate('CreateProduct');
  };

  const handleDeleteProduct = (product: IProductDTO, onConfirm: () => void) => {
    Alert.alert(
      t('products.atention'),
      `${t('products.youGoingToDeleteTheProductWithName')} ${product.name}`,
      [
        {
          text: t('products.cancel'),
          onPress: () => null,
          style: 'cancel',
        },
        {
          text: t('products.accept'),
          onPress: async () => {
            onConfirm();
            await handleDelete(product);
          },
        },
      ],
    );
  };

  const handleFormikSubmit = async (values: {textSearched: string}) => {
    const cleanText = values.textSearched.trim().toLowerCase();
    setSearchQuery(cleanText);
  };

  return {
    allProducts,
    loading,
    open,
    categories,
    setOpen,
    handleDeleteProduct,
    goToCreateProduct,
    handleFormikSubmit,
  };
};

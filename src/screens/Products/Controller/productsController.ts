import {useCallback, useContext, useMemo, useState} from 'react';
import {globalSessionState} from '../../../services/globalStates';
import {NavigationContext, useFocusEffect} from '@react-navigation/native';
import {Alert} from 'react-native';
import {fetchProducts, removeProduct} from '../../../services/Product';
import {IProductDTO} from '../../../models/types/product';
import {mapperProductSupabaseToDTO} from '../../../models/mappers/mapperProductSupabaseToDTO';
import {useTranslation} from 'react-i18next';
import {IFilter} from '../../../models/types/filter';

export const productsController = () => {
  const {t} = useTranslation();
  const navigation = useContext(NavigationContext);
  const products: IProductDTO[] = globalSessionState(
    state => state.productsSelected,
  );
  const filters: IFilter = globalSessionState(state => state.filters);

  const [allProducts, setAllProducts] = useState<IProductDTO[]>(products);
  const [loading, setLoading] = useState(false);

  const fetchData = async (filters?: IFilter) => {
    setLoading(true);
    const responseGetAllProducts = await fetchProducts({
      nameFilter: filters?.nameFilter || null,
      category: filters?.category || null,
    });
    if (responseGetAllProducts.error) {
      console.log(responseGetAllProducts.error);
    } else {
      setAllProducts(mapperProductSupabaseToDTO(responseGetAllProducts.data));
    }
    setLoading(false);
  };

  const fetchParams = useMemo(() => {
    return {
      nameFilter: filters?.nameFilter || null,
      category: filters?.category || null,
    };
  }, [filters]);

  useFocusEffect(
    useCallback(() => {
      fetchData(fetchParams);

      return () => {
        console.log('🔄 Cleanup: Se desmonta el listener');
      };
    }, [fetchParams]),
  );

  const DialogDeleteProduct = (product: IProductDTO) =>
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
          onPress: () => handleDelete(product),
        },
      ],
    );

  const handleDelete = async (product: IProductDTO) => {
    const responseRemoveProduct = await removeProduct(product.id);
    if (!responseRemoveProduct.error) {
      fetchData();
    }
  };

  const goToCreateProduct = () => navigation?.navigate('CreateProduct');

  const handleDeleteProduct = (product: IProductDTO) =>
    DialogDeleteProduct(product);

  return {
    allProducts,
    goToCreateProduct,
    handleDeleteProduct,
    loading,
  };
};

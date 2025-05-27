import {useCallback, useContext, useState} from 'react';
import {globalSessionState} from '../../../services/globalStates';
import {NavigationContext, useFocusEffect} from '@react-navigation/native';
import {Alert} from 'react-native';
import {fetchProducts, removeProduct} from '../../../services/Product';
import {IProductDTO} from '../../../models/types/product';
import {mapperProductSupabaseToDTO} from '../../../models/mappers/mapperProductSupabaseToDTO';

export const productsController = () => {
  const navigation = useContext(NavigationContext);
  const products: IProductDTO[] = globalSessionState(
    state => state.productsSelected,
  );

  const [allProducts, setAllProducts] = useState<IProductDTO[]>(products);
  const [loading, setLoading] = useState(false);

  const fetchData = async (filters?: any) => {
    setLoading(true);
    const responseGetAllProducts = await fetchProducts(filters);
    if (responseGetAllProducts.error) {
      console.log(responseGetAllProducts.error);
    } else {
      setAllProducts(mapperProductSupabaseToDTO(responseGetAllProducts.data));
      setLoading(false);
    }
  };

  const DialogDeleteProduct = (product: IProductDTO) =>
    Alert.alert(
      `¡Atención!`,
      `Va a eliminar el producto con nombre: ${product.name}`,
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => handleDelete(product),
        },
      ],
    );

  const handleDelete = async (product: IProductDTO) => {
    const responseRemoveProduct = await removeProduct(product.id);
    if (responseRemoveProduct.error) {
      console.log('error', responseRemoveProduct.error);
    } else {
      fetchData();
    }
  };

  const goToCreateProduct = () => navigation?.navigate('CreateProduct');

  const handleDeleteProduct = (product: IProductDTO) =>
    DialogDeleteProduct(product);

  useFocusEffect(
    useCallback(() => {
      fetchData();

      return () => {
        console.log('🔄 Cleanup: Se desmonta el listener');
      };
    }, []),
  );

  return {
    allProducts,
    goToCreateProduct,
    handleDeleteProduct,
    loading,
  };
};

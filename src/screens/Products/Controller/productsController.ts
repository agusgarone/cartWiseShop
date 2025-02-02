import {useContext, useEffect, useState} from 'react';
import {GlobalStateService} from '../../../services/globalStates';
import {NavigationContext} from '@react-navigation/native';
import {Alert} from 'react-native';
import {fetchProducts, removeProduct} from '../../../services/Product';
import {IProductDTO} from '../../../models/types/product';
import {mapperProductSupabaseToDTO} from '../../../models/mappers/mapperProductSupabaseToDTO';
import {StorageService} from '../../../storage/asyncStorage';

export const productsController = () => {
  const navigation = useContext(NavigationContext);
  const products: IProductDTO[] = GlobalStateService.getProductsSelected();
  const [allProducts, setAllProducts] = useState<IProductDTO[]>(products);

  const fetchData = async (filters?: any) => {
    const uidUser: string = await StorageService.getItem('uidUser');
    const responseGetAllProducts = await fetchProducts(filters, uidUser);
    if (responseGetAllProducts.error) {
      console.log(responseGetAllProducts.error);
    } else {
      setAllProducts(mapperProductSupabaseToDTO(responseGetAllProducts.data));
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
    const userUid: string = '';
    const responseRemoveProduct = await removeProduct(product.id, userUid);
    if (responseRemoveProduct.error) {
      console.log('error', responseRemoveProduct.error);
    } else {
      // * fetch registros actualizados
      fetchData();
    }
  };

  const goToCreateProduct = () => navigation?.navigate('CreateProduct');

  const handleDeleteProduct = (product: IProductDTO) =>
    DialogDeleteProduct(product);

  useEffect(() => {
    navigation?.addListener('focus', () => {
      fetchData();
    });
  }, []);

  return {
    allProducts,
    goToCreateProduct,
    handleDeleteProduct,
  };
};

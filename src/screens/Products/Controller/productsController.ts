import {useContext, useEffect, useState} from 'react';
import {IProduct} from '../../../models/product';
import {GlobalStateService} from '../../../services/globalStates';
import {NavigationContext} from '@react-navigation/native';
import {Alert} from 'react-native';
import {removeProduct, fetchProducts} from '../Service/productsService';

export const productsController = () => {
  const navigation = useContext(NavigationContext);
  const products: IProduct[] = GlobalStateService.getProductsSelected();
  const [allProducts, setAllProducts] = useState<IProduct[]>(products);

  const fetchData = async (filters?: any) => {
    const responseGetAllProducts = await fetchProducts(filters);
    if (responseGetAllProducts.error) {
      console.log(responseGetAllProducts.error);
    } else {
      setAllProducts(responseGetAllProducts.data);
    }
  };

  const DialogDeleteProduct = (product: IProduct) =>
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

  const handleDelete = async (product: IProduct) => {
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

  const handleDeleteProduct = (product: IProduct) =>
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

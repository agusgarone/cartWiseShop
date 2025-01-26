import {useContext, useEffect, useState} from 'react';
import {IProduct} from '../../../models/product';
import {GlobalStateService} from '../../../services/globalStates';
import {NavigationContext} from '@react-navigation/native';
import {getAllProducts, RemoveProduct} from '../../../services/Product';
import {Alert} from 'react-native';

export const productsController = () => {
  const navigation = useContext(NavigationContext);
  const products: IProduct[] = GlobalStateService.getProductsSelected();
  const [allProducts, setAllProducts] = useState<IProduct[]>(products);

  const fetchProducts = async () => {
    const responseGetAllProducts = await getAllProducts();
    setAllProducts(responseGetAllProducts);
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
    const responseRemoveProduct = await RemoveProduct(product);
    if (responseRemoveProduct.length) {
      setAllProducts(responseRemoveProduct);
    }
  };

  const goToCreateProduct = () => navigation?.navigate('CreateProduct');

  const handleDeleteProduct = (product: IProduct) =>
    DialogDeleteProduct(product);

  useEffect(() => {
    navigation?.addListener('focus', () => {
      fetchProducts();
    });
  }, []);

  return {
    allProducts,
    goToCreateProduct,
    handleDeleteProduct,
  };
};

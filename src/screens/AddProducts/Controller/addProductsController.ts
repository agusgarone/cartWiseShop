import {useContext, useEffect, useState} from 'react';
import {IProduct} from '../../../models/product';
import {GlobalStateService} from '../../../services/globalStates';
import {NavigationContext} from '@react-navigation/native';
import {Keyboard} from 'react-native';
import {getAllProducts} from '../../../services/Product';

export const addProductsController = () => {
  const navigation = useContext(NavigationContext);
  const [allProducts, setAllProducts] = useState<IProduct[]>();
  const products: IProduct[] = GlobalStateService.getProductsSelected();
  const [productsSelected, setProductsSelected] =
    useState<IProduct[]>(products);

  useEffect(() => {
    fetchProducts();
  }, []);

  const onPress = ({item}: {item: IProduct}) => {
    if (productsSelected.length) {
      const alreadyExist = productsSelected.find(prod => prod.id === item.id);
      if (alreadyExist) {
        const newArray = productsSelected.filter(prod => prod.id !== item.id);
        setProductsSelected(newArray);
      } else {
        setProductsSelected([...productsSelected, item]);
      }
    } else {
      setProductsSelected([...productsSelected, item]);
    }
  };

  const handleButton = () => {
    GlobalStateService.setProductsSelected(productsSelected);
    navigation?.navigate('MainDrawer', {
      screen: 'MainTabs',
      params: {
        screen: 'CreateList',
      },
    });
  };

  const fetchProducts = async () => {
    const responseGetAllProducts = await getAllProducts();
    setAllProducts(responseGetAllProducts);
    GlobalStateService.setValuesSearched(responseGetAllProducts);
  };

  const handleFormikSubmit = async (values: {textSearched: string}) => {
    if (allProducts?.length) {
      const valuesSearched = allProducts.filter(value =>
        value.name
          .toLocaleLowerCase()
          .includes(values.textSearched.toLocaleLowerCase()),
      );
      GlobalStateService.setValuesSearched(valuesSearched);
      Keyboard.dismiss();
    }
  };

  const goBack = () => navigation?.goBack();

  return {
    productsSelected,
    onPress,
    handleButton,
    handleFormikSubmit,
    goBack,
  };
};

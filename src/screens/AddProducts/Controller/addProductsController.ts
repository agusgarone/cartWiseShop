import {useContext, useEffect, useState} from 'react';
import {GlobalStateService} from '../../../services/globalStates';
import {NavigationContext} from '@react-navigation/native';
import {Keyboard} from 'react-native';
import {fetchProducts} from '../../../services/Product';
import {IProductDTO} from '../../../models/types/product';
import {mapperProductSupabaseToDTO} from '../../../models/mappers/mapperProductSupabaseToDTO';

export const addProductsController = () => {
  const navigation = useContext(NavigationContext);
  const [allProducts, setAllProducts] = useState<IProductDTO[]>();
  const products: IProductDTO[] = GlobalStateService.getProductsSelected();
  const [productsSelected, setProductsSelected] =
    useState<IProductDTO[]>(products);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadProducts();
  }, []);

  const onPress = ({item}: {item: IProductDTO}) => {
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

  const loadProducts = async () => {
    setLoading(true);
    const filters = undefined;
    const responseGetAllProducts = await fetchProducts(filters);
    if (responseGetAllProducts.error) {
      console.log(responseGetAllProducts.error);
    } else {
      console.log('responseGetAllProducts', responseGetAllProducts.data);
      setAllProducts(mapperProductSupabaseToDTO(responseGetAllProducts.data));
      GlobalStateService.setValuesSearched(
        mapperProductSupabaseToDTO(responseGetAllProducts.data),
      );
      setLoading(false);
    }
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

  return {
    productsSelected,
    onPress,
    handleButton,
    handleFormikSubmit,
    loading,
  };
};

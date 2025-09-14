import {useContext, useEffect, useState, useCallback, useRef} from 'react';
import {globalSessionState} from '../../../services/globalStates';
import {NavigationContext, useFocusEffect} from '@react-navigation/native';
import {Keyboard} from 'react-native';
import {fetchProducts} from '../../../services/Product';
import {IProductDTO} from '../../../models/types/product';
import {mapperProductSupabaseToDTO} from '../../../models/mappers/mapperProductSupabaseToDTO';
import {StorageService} from '../../../storage/asyncStorage';
import {IFilterProducts} from '../../../models/types/filter';

export const addProductsController = () => {
  const navigation = useContext(NavigationContext);
  const [allProducts, setAllProducts] = useState<IProductDTO[]>();
  const products: IProductDTO[] = globalSessionState(
    state => state.productsSelected,
  );
  const setValuesSearched = globalSessionState(
    state => state.setValuesSearched,
  );
  const setProductsSelectedZustand = globalSessionState(
    state => state.setProductsSelected,
  );
  const [productsSelected, setProductsSelected] =
    useState<IProductDTO[]>(products);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const searchQueryRef = useRef<string>('');

  useEffect(() => {
    setProductsSelected(products);
  }, [products]);

  useEffect(() => {
    loadProducts();
  }, []);

  useFocusEffect(
    useCallback(() => {
      const checkForNewProduct = async () => {
        const isCreatingProduct = await StorageService.getItem(
          'isCreatingProduct',
        );
        if (isCreatingProduct === 'true') {
          await StorageService.removeItem('isCreatingProduct');
          await loadProducts();
          console.log('✅ AddProducts: Productos recargados');
        }
      };
      checkForNewProduct();
    }, []),
  );

  // Efecto separado para actualizar la búsqueda cuando allProducts cambie
  useEffect(() => {
    const updateSearchIfNeeded = async () => {
      if (
        allProducts &&
        allProducts.length > 0 &&
        searchQueryRef.current &&
        searchQueryRef.current.trim().length > 0
      ) {
        console.log(
          '🔍 AddProducts: Actualizando búsqueda con productos recargados:',
          searchQueryRef.current,
        );
        console.log('productsSelected', productsSelected);
        console.log('allProducts', allProducts);
        await handleFormikSubmit({textSearched: searchQueryRef.current});
      }
    };
    updateSearchIfNeeded();
  }, [allProducts, productsSelected]);

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
    console.log(
      '🔄 AddProducts: Guardando productos en Zustand:',
      productsSelected,
    );
    setProductsSelectedZustand(productsSelected);
    navigation?.goBack();
  };

  const loadProducts = async () => {
    setLoading(true);
    const filters: IFilterProducts = {
      category: null,
      nameFilter: null,
      orderAsc: true,
    };
    const responseGetAllProducts = await fetchProducts(filters);
    if (responseGetAllProducts.error) {
      console.log(
        '❌ Error al cargar productos:',
        responseGetAllProducts.error,
      );
    } else {
      const mappedProducts = mapperProductSupabaseToDTO(
        responseGetAllProducts.data,
      );
      setAllProducts(mappedProducts);
      setValuesSearched(mappedProducts);
      setLoading(false);
    }
  };

  const handleFormikSubmit = async (values: {textSearched: string}) => {
    setSearchQuery(values.textSearched);
    searchQueryRef.current = values.textSearched;
    if (allProducts?.length) {
      const valuesSearched = allProducts.filter(value =>
        value.name
          .toLocaleLowerCase()
          .includes(values.textSearched.toLocaleLowerCase()),
      );
      setValuesSearched(valuesSearched);
      Keyboard.dismiss();
    }
  };

  const goToCreateProduct = async (productName: string) => {
    await StorageService.setItem('preloadedProductName', productName);
    await StorageService.setItem('isCreatingProduct', 'true');
    navigation?.navigate('CreateProduct');
  };

  return {
    productsSelected,
    onPress,
    handleButton,
    handleFormikSubmit,
    loading,
    goToCreateProduct,
    searchQuery,
  };
};

import {useContext, useEffect, useState, useCallback, useRef} from 'react';
import {globalSessionState} from '../../../services/globalStates';
import {NavigationContext, useFocusEffect} from '@react-navigation/native';
import {Keyboard} from 'react-native';
import {IProductDTO} from '../../../models/types/product';
import {StorageService} from '../../../storage/asyncStorage';
import {ProductsStorage, CategoriesStorage} from '../../../storage/storageHelpers';

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
    setProductsSelectedZustand(productsSelected);
  }, [productsSelected]);

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
    setProductsSelectedZustand(productsSelected);
    navigation?.goBack();
  };

  const loadProducts = async () => {
    setLoading(true);
    
    // Cargar productos desde storage local
    const localProducts = await ProductsStorage.getAllProducts();
    
    // Obtener todas las categorías para mapear nombres
    const allCategories = await CategoriesStorage.getAllCategories();
    const categoryMap = new Map(
      allCategories.map(cat => [cat.id, cat.name]),
    );
    
    // Convertir IProductSupabase a IProductDTO
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
    setValuesSearched(mappedProducts);
    setLoading(false);
  };

  const handleFormikSubmit = async (values: {textSearched: string}) => {
    const cleanText = values.textSearched.trim().toLowerCase();
    setSearchQuery(cleanText);
    searchQueryRef.current = cleanText;
    if (allProducts?.length) {
      const valuesSearched = allProducts.filter(value =>
        value.name.toLowerCase().includes(cleanText),
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

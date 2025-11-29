import {useCallback, useContext, useState} from 'react';
import {NavigationContext, useFocusEffect} from '@react-navigation/native';
import {IListDTO} from '../../../models/types/list';
import {StorageService} from '../../../storage/asyncStorage';
import {IProductDTO} from '../../../models/types/product';
// import {User} from '../../../models/types/user';
// import {fetchUserById} from '../../Login/Service/loginService';
import {ListsStorage, CombinedStorage, CategoriesStorage} from '../../../storage/storageHelpers';

export const homeController = () => {
  const [list, setList] = useState<IListDTO<IProductDTO>[]>([]);
  const navigation = useContext(NavigationContext);
  // const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const navigateToListDetail = (id: string) => {
    navigation?.navigate('ListDetail', {id: id});
  };

  const navigateToCreateList = () => {
    navigation?.navigate('CreateList');
  };

  const navigateToUserSettings = () => navigation?.navigate('UserSettings');

  const navigateToEditList = async (id: string) => {
    await StorageService.setItem('idList', id);
    navigation?.navigate('EditList');
  };

  useFocusEffect(
    useCallback(() => {
      // loadList();

      return () => {
        console.log('🔄 Cleanup: Se desmonta el listener');
      };
    }, []),
  );

  const loadList = async () => {
    setLoading(true);
    // const userData = await fetchUserById();

    // Obtener todas las categorías para mapear nombres
    const allCategories = await CategoriesStorage.getAllCategories();
    const categoryMap = new Map(
      allCategories.map(cat => [cat.id, cat.name]),
    );

    // Cargar listas desde storage local
    const localLists = await ListsStorage.getAllLists();
    const mappedLists = await Promise.all(
      localLists.map(async list => {
        // Obtener productos de cada lista
        const products = await CombinedStorage.getProductsFromList(list.id);
        return {
          id: list.id,
          name: list.name,
          created_at: list.created_at,
          color: list.color,
          products: products.map(prod => ({
            id: prod.id,
            name: prod.name,
            category: {
              id: prod.id_category,
              name: categoryMap.get(prod.id_category) || 'Sin categoría',
            },
            default: false,
          })) as IProductDTO[],
        } as IListDTO<IProductDTO>;
      }),
    );

    setList(mappedLists);
    // setUser(userData.data);
    setLoading(false);
  };

  return {
    list,
    // user,
    loading,
    navigateToListDetail,
    navigateToEditList,
    navigateToUserSettings,
    navigateToCreateList,
  };
};

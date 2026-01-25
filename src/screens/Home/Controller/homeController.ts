import {useCallback, useContext, useState} from 'react';
import {NavigationContext, useFocusEffect} from '@react-navigation/native';
import {IListDTO} from '../../../models/types/list';
import {StorageService} from '../../../storage/asyncStorage';
import {IProductDTO} from '../../../models/types/product';
import {ListsStorage, CombinedStorage, CategoriesStorage} from '../../../storage/storageHelpers';

export const homeController = () => {
  const [list, setList] = useState<IListDTO<IProductDTO>[]>([]);
  const navigation = useContext(NavigationContext);
  const [loading, setLoading] = useState(false);

  const navigateToListDetail = (id: string) => {
    navigation?.navigate('ListDetail', {id: id});
  };

  const navigateToCreateList = () => {
    navigation?.navigate('CreateList');
  };

  const navigateToEditList = async (id: string) => {
    await StorageService.setItem('idList', id);
    navigation?.navigate('EditList');
  };

  useFocusEffect(
    useCallback(() => {
      loadList();

      return () => {
        console.log('🔄 Cleanup: Se desmonta el listener');
      };
    }, []),
  );

  const loadList = async () => {
    setLoading(true);

    const allCategories = await CategoriesStorage.getAllCategories();
    const categoryMap = new Map(
      allCategories.map(cat => [cat.id, cat.name]),
    );

    const localLists = await ListsStorage.getAllLists();
    const mappedLists = await Promise.all(
      localLists.map(async list => {
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
    setLoading(false);
  };

  return {
    list,
    loading,
    navigateToListDetail,
    navigateToEditList,
    navigateToCreateList,
  };
};

import {useCallback, useContext, useState} from 'react';
import {NavigationContext, useFocusEffect} from '@react-navigation/native';
import {IListDTO} from '../../../models/types/list';
import {StorageService} from '../../../storage/asyncStorage';
import {IProductDTO} from '../../../models/types/product';
import {ListsStorage, CombinedStorage, CategoriesStorage} from '../../../storage/storageHelpers';
import type {ParsedProduct} from '../../../types/ticket';

export const homeController = () => {
  const [list, setList] = useState<IListDTO<IProductDTO>[]>([]);
  const navigation = useContext(NavigationContext);
  const [loading, setLoading] = useState(false);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [userAlreadyCreatedLists, setUserAlreadyCreatedLists] = useState(false);

  const ONBOARDING_STORAGE_KEY = '@onboarding_completed';
  const USER_CREATED_LISTS_STORAGE_KEY = '@user_already_created_lists';

  const navigateToListDetail = (id: string) => {
    navigation?.navigate('ListEditor', {
      listId: parseInt(id, 10),
      initialMode: 'shopping',
    });
  };

  const navigateToCreateList = () => {
    navigation?.navigate('ListEditor', {});
  };

  const navigateToCreateListWithVoice = (voiceParsedProducts: ParsedProduct[]) => {
    navigation?.navigate('ListEditor', {voiceParsedProducts});
  };

  const navigateToEditList = async (id: string) => {
    navigation?.navigate('ListEditor', {
      listId: parseInt(id, 10),
      initialMode: 'editing',
    });
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

    const [storedOnboardingFlag, storedUserCreatedListsFlag] = await Promise.all([
      StorageService.getItem(ONBOARDING_STORAGE_KEY),
      StorageService.getItem(USER_CREATED_LISTS_STORAGE_KEY),
    ]);

    setHasCompletedOnboarding(Boolean(storedOnboardingFlag));
    setUserAlreadyCreatedLists(Boolean(storedUserCreatedListsFlag));

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

    if (mappedLists.length > 0 && !storedUserCreatedListsFlag) {
      await StorageService.setItem(USER_CREATED_LISTS_STORAGE_KEY, true);
      setUserAlreadyCreatedLists(true);
    }

    setLoading(false);
  };

  return {
    list,
    loading,
    navigateToListDetail,
    navigateToEditList,
    navigateToCreateList,
    navigateToCreateListWithVoice,
    hasCompletedOnboarding,
    userAlreadyCreatedLists,
  };
};

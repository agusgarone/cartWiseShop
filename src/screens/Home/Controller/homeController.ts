import {useCallback, useContext, useEffect, useState} from 'react';
import {NavigationContext, useFocusEffect} from '@react-navigation/native';
import {IListDTO} from '../../../models/types/list';
import {fetchLists} from '../../../services/List';
import {StorageService} from '../../../storage/asyncStorage';
import {IProductDTO} from '../../../models/types/product';
import {mapperListsSupabaseToDTO} from '../../../models/mappers/mapperListsSupabaseToDTO';
import {User} from '../../../models/types/user';

export const homeController = () => {
  const [list, setList] = useState<IListDTO<IProductDTO>[]>([]);
  const navigation = useContext(NavigationContext);
  const [user, setUser] = useState<User>();

  const navigateToListDetail = (id: string) => {
    navigation?.navigate('ListDetail', {id: id});
  };

  const navigateToUserSettings = () => navigation?.navigate('UserSettings');

  const navigateToEditList = async (id: string) => {
    await StorageService.setItem('idList', id);
    navigation?.navigate('MainTabs', {screen: 'CreateList'});
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
    const userAuthenticated: User = await StorageService.getItem(
      'userAuthenticated',
    );
    const responseFetchList = await fetchLists();
    if (responseFetchList.error) {
      console.log(responseFetchList.error);
    } else {
      setList(mapperListsSupabaseToDTO(responseFetchList.data));
      setUser(userAuthenticated);
    }
  };

  return {
    list,
    navigateToListDetail,
    navigateToEditList,
    navigateToUserSettings,
    user,
  };
};

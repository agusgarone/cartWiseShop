import {useCallback, useContext, useState} from 'react';
import {NavigationContext, useFocusEffect} from '@react-navigation/native';
import {IListDTO} from '../../../models/types/list';
import {fetchLists} from '../../../services/List';
import {StorageService} from '../../../storage/asyncStorage';
import {IProductDTO} from '../../../models/types/product';
import {mapperListsSupabaseToDTO} from '../../../models/mappers/mapperListsSupabaseToDTO';
import {User} from '../../../models/types/user';
import {fetchUserById} from '../../Login/Service/loginService';

export const homeController = () => {
  const [list, setList] = useState<IListDTO<IProductDTO>[]>([]);
  const navigation = useContext(NavigationContext);
  const [user, setUser] = useState<User | null>(null);
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
      loadList();

      return () => {
        console.log('🔄 Cleanup: Se desmonta el listener');
      };
    }, []),
  );

  const loadList = async () => {
    setLoading(true);
    const userData = await fetchUserById();
    const responseFetchList = await fetchLists();
    if (responseFetchList.error) {
      console.log(responseFetchList.error);
    } else {
      setList(mapperListsSupabaseToDTO(responseFetchList.data));
      setUser(userData.data);
      setLoading(false);
    }
  };

  return {
    list,
    user,
    loading,
    navigateToListDetail,
    navigateToEditList,
    navigateToUserSettings,
    navigateToCreateList,
  };
};

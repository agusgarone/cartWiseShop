import {useContext, useState} from 'react';
import {NavigationContext} from '@react-navigation/native';
import {IListDTO} from '../../../models/types/list';
import {fetchLists} from '../../../services/List';
import {StorageService} from '../../../storage/asyncStorage';
import {IProductDTO} from '../../../models/types/product';
import {mapperListsSupabaseToDTO} from '../../../models/mappers/mapperListsSupabaseToDTO';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';

export const homeController = () => {
  const [list, setList] = useState<IListDTO<IProductDTO>[]>([]);
  const navigation = useContext(NavigationContext);
  const [user, setUser] = useState<FirebaseAuthTypes.User>();

  const navigateToListDetail = (id: string) => {
    navigation?.navigate('ListDetail', {id: id});
  };

  const navigateToUserSettings = () => navigation?.navigate('UserSettings');

  const navigateToEditList = async (id: string) => {
    await StorageService.setItem('idList', id);
    navigation?.navigate('MainTabs', {screen: 'CreateList'});
  };

  navigation?.addListener('focus', () => {
    loadList();
  });

  const loadList = async () => {
    const userAuthenticated: FirebaseAuthTypes.User =
      await StorageService.getItem('userAuthenticated');
    console.log(userAuthenticated);
    const responseFetchList = await fetchLists(userAuthenticated.uid);
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

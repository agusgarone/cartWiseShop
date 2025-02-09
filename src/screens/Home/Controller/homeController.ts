import {useContext, useState} from 'react';
import {NavigationContext} from '@react-navigation/native';
import {IListDTO} from '../../../models/types/list';
import {fetchLists} from '../../../services/List';
import {StorageService} from '../../../storage/asyncStorage';
import {IProductDTO} from '../../../models/types/product';
import {mapperListsSupabaseToDTO} from '../../../models/mappers/mapperListsSupabaseToDTO';

export const homeController = () => {
  const [list, setList] = useState<IListDTO<IProductDTO>[]>([]);
  const navigation = useContext(NavigationContext);

  const navigateToListDetail = (id: string) => {
    navigation?.navigate('ListDetail', {id: id});
  };

  const navigateToEditList = async (id: string) => {
    await StorageService.setItem('idList', id);
    navigation?.navigate('MainTabs', {screen: 'CreateList'});
  };

  navigation?.addListener('focus', () => {
    loadList();
  });

  const loadList = async () => {
    const uidUser: string = await StorageService.getItem('uidUser');
    const responseFetchList = await fetchLists(uidUser);
    if (responseFetchList.error) {
      console.log(responseFetchList.error);
    } else {
      setList(mapperListsSupabaseToDTO(responseFetchList.data));
    }
  };

  return {
    list,
    navigateToListDetail,
    navigateToEditList,
  };
};

import {useContext, useState} from 'react';
import {NavigationContext} from '@react-navigation/native';
import {IList} from '../../../models/list';
import {StorageService} from '../../../storage/asyncStorage';
import {IProduct} from '../../../models/product';

export const homeController = () => {
  const [list, setList] = useState<IList<IProduct>[]>([]);
  const navigation = useContext(NavigationContext);

  const navigateToListDetail = (id: string) => {
    navigation?.navigate('ListDetail', {id: id});
  };

  const navigateToEditList = async (id: string) => {
    await StorageService.setItem('idList', id);
    navigation?.navigate('MainTabs', {screen: 'CreateList'});
  };

  navigation?.addListener('focus', () => {
    StorageService.getItem('lists').then(res => {
      setList(res);
    });
  });

  return {
    list,
    navigateToListDetail,
    navigateToEditList,
  };
};

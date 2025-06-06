import {useContext, useState} from 'react';
import {NavigationContext} from '@react-navigation/native';
import {StorageService} from '../../../storage/asyncStorage';
import {Alert} from 'react-native';
import {fetchListById, removeList} from '../../../services/List';
import {IProductForm} from '../../../models/types/product';
import {IListForm} from '../../../models/types/list';
import {mapperListSupabaseToForm} from '../../../models/mappers/mapperListSupabaseToForm';
import {User} from '../../../models/types/user';
import {useTranslation} from 'react-i18next';

export const listDetailController = () => {
  const {t} = useTranslation();

  const [listSelected, setListSelected] =
    useState<IListForm<IProductForm> | null>(null);
  const [user, setUser] = useState<User>();
  const navigation = useContext(NavigationContext);
  const [showConfetti, setShowConfetti] = useState(false);
  const [loading, setLoading] = useState(false);

  const getListByID = async (id: string) => {
    setLoading(true);
    const userAuthenticated: User = await StorageService.getItem(
      'userAuthenticated',
    );
    setUser(userAuthenticated);
    const responseFetchListById = await fetchListById(parseInt(id, 10));
    if (responseFetchListById.error) {
      console.log(responseFetchListById.error);
      Alert.alert(t('listDetail.theListDoesntExist'));
      goHome();
    } else {
      if (responseFetchListById.data) {
        setListSelected(
          mapperListSupabaseToForm(responseFetchListById.data[0]),
        );
        setLoading(false);
      }
    }
  };

  const handleDeleteList = async (listId: number) => {
    const responseRemoveList = await removeList(listId);
    if (responseRemoveList.error) {
      console.log(responseRemoveList.error);
    }
  };

  const DialogDeleteList = (list: IListForm<IProductForm>) =>
    Alert.alert(
      t('listDetail.atention'),
      `${t('listDetail.youGoingToDeleteThelistWithName')} ${list.name}`,
      [
        {
          text: t('listDetail.cancel'),
          onPress: () => null,
          style: 'cancel',
        },
        {
          text: t('listDetail.accept'),
          onPress: () => {
            handleDeleteList(list.id);
            navigation?.goBack();
          },
        },
      ],
    );

  const handleAllSelected = () => {
    setShowConfetti(true);
  };

  const handleButtonDelete = (list: IListForm<IProductForm>) =>
    DialogDeleteList(list);

  const goHome = () => navigation?.navigate('MainDrawer');

  return {
    user,
    listSelected,
    getListByID,
    handleButtonDelete,
    handleAllSelected,
    setShowConfetti,
    showConfetti,
    loading,
  };
};

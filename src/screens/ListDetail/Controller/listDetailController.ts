import {useContext, useState} from 'react';
import {NavigationContext} from '@react-navigation/native';
import {StorageService} from '../../../storage/asyncStorage';
import {Alert} from 'react-native';
import {fetchListById, removeList} from '../../../services/List';
import {IProductForm} from '../../../models/types/product';
import {IListForm} from '../../../models/types/list';
import {mapperListSupabaseToForm} from '../../../models/mappers/mapperListSupabaseToForm';
import {User} from '../../../models/types/user';

export const listDetailController = () => {
  const [listSelected, setListSelected] =
    useState<IListForm<IProductForm> | null>(null);
  const [user, setUser] = useState<User>();
  const navigation = useContext(NavigationContext);

  const getListByID = async (id: string) => {
    const userAuthenticated: User = await StorageService.getItem(
      'userAuthenticated',
    );
    setUser(userAuthenticated);
    const responseFetchListById = await fetchListById(parseInt(id, 10));
    if (responseFetchListById.error) {
      console.log(responseFetchListById.error);
      Alert.alert('¡Esta lista no existe!');
      goHome();
    } else {
      if (responseFetchListById.data) {
        setListSelected(
          mapperListSupabaseToForm(responseFetchListById.data[0]),
        );
      }
    }
  };

  const handleDeleteList = async (listId: number) => {
    const responseRemoveList = await removeList(listId);
    if (responseRemoveList.error) {
      console.log(responseRemoveList.error);
    } else {
      console.log('Se ha borrado exitosamente la lista');
    }
  };

  const DialogDeleteList = (list: IListForm<IProductForm>) =>
    Alert.alert(
      `¡Atención!`,
      `Va a eliminar la lista con nombre: ${list.name}`,
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            handleDeleteList(list.id);
            navigation?.navigate('MainTabs', {screen: 'Home'});
          },
        },
      ],
    );

  const handleAllSelected = () => {
    console.log('¡Todos los elementos están seleccionados!');
    // Puedes añadir más lógica aquí, como mostrar un mensaje, enviar datos, etc.
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
  };
};

import {useContext, useState} from 'react';
import {NavigationContext} from '@react-navigation/native';
import {StorageService} from '../../../storage/asyncStorage';
import {Alert} from 'react-native';
import {fetchListById, removeList} from '../../../services/List';
import {IProductForm} from '../../../models/types/product';
import {IListDTO} from '../../../models/types/list';
import {mapperListSupabaseToForm} from '../../../models/mappers/mapperListSupabaseToForm';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';

export const listDetailController = () => {
  const [listSelected, setListSelected] =
    useState<IListDTO<IProductForm> | null>(null);
  const navigation = useContext(NavigationContext);

  const getListByID = async (id: string) => {
    const userAuthenticated: FirebaseAuthTypes.User =
      await StorageService.getItem('userAuthenticated');
    const responseFetchListById = await fetchListById(
      parseInt(id, 10),
      userAuthenticated.uid,
    );
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

  const handleDeleteList = async (listId: number, userUid: string) => {
    const responseRemoveList = await removeList(listId, userUid);
    if (responseRemoveList.error) {
      console.log(responseRemoveList.error);
    } else {
      console.log('Se ha borrado exitosamente la lista');
    }
  };

  const DialogDeleteList = (list: IListDTO<IProductForm>) =>
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
            const userUid = '';
            handleDeleteList(list.id, userUid);
            navigation?.navigate('MainTabs', {screen: 'Home'});
          },
        },
      ],
    );

  const handleAllSelected = () => {
    console.log('¡Todos los elementos están seleccionados!');
    // Puedes añadir más lógica aquí, como mostrar un mensaje, enviar datos, etc.
  };

  const handleButtonDelete = (list: IListDTO<IProductForm>) =>
    DialogDeleteList(list);

  const goHome = () => navigation?.navigate('MainDrawer');

  return {
    listSelected,
    getListByID,
    handleButtonDelete,
    handleAllSelected,
  };
};

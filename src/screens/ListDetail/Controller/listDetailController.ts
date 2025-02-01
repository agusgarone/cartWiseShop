import {useContext, useState} from 'react';
import {NavigationContext} from '@react-navigation/native';
import {StorageService} from '../../../storage/asyncStorage';
import {Alert} from 'react-native';
import {removeList} from '../../../services/List';
import {IProductDTO, IProductForm} from '../../../models/types/product';
import {IListDTO} from '../../../models/types/list';

export const listDetailController = () => {
  const [listSelected, setListSelected] =
    useState<IListDTO<IProductForm> | null>(null);
  const navigation = useContext(NavigationContext);

  const getListByID = async (id: string) => {
    await StorageService.getItem('lists').then(
      (res: IListDTO<IProductDTO>[]) => {
        const listFound = res.find(list => list.id.toString() === id);
        if (listFound) {
          const listWithProductForm: IListDTO<IProductForm> = {
            ...listFound,
            products: listFound.products.map(product => {
              const productForm: IProductForm = {
                ...product,
                isChecked: false,
              };
              return productForm;
            }),
          };
          setListSelected(listWithProductForm);
        } else {
          Alert.alert('¡Esta lista no existe!');
          goHome();
        }
      },
    );
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

  const goHome = () => navigation?.navigate('Home');

  const goBack = () => navigation?.goBack();

  return {
    listSelected,
    getListByID,
    goBack,
    handleButtonDelete,
    handleAllSelected,
  };
};

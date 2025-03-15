import {useContext, useState} from 'react';
import {NavigationContext} from '@react-navigation/native';
import {StorageService} from '../../../storage/asyncStorage';
import {Alert} from 'react-native';
import {fetchListById, removeList} from '../../../services/List';
import {IProductForm} from '../../../models/types/product';
import {IListDTO, IListForm} from '../../../models/types/list';
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
          // {
          //   id: 1,
          //   created_at: '2024-03-07T12:00:00Z',
          //   name: 'Lista de Compras Semanal',
          //   products: {
          //     101: {
          //       id: 101,
          //       name: 'Leche',
          //       category: {
          //         id: 2539,
          //         name: 'Almacén',
          //       },
          //       isChecked: false,
          //     },
          //     102: {
          //       id: 102,
          //       name: 'Pan',
          //       category: {
          //         id: 6993,
          //         name: 'Panadería',
          //       },
          //       isChecked: false,
          //     },
          //     103: {
          //       id: 103,
          //       name: 'Manzanas',
          //       category: {
          //         id: 4479,
          //         name: 'Frutas y Verduras',
          //       },
          //       isChecked: false,
          //     },
          //     104: {
          //       id: 104,
          //       name: 'Detergente',
          //       category: {
          //         id: 8332,
          //         name: 'Limpieza',
          //       },
          //       isChecked: false,
          //     },
          //     105: {
          //       id: 105,
          //       name: 'Yogur',
          //       category: {
          //         id: 9522,
          //         name: 'Lácteos y productos frescos',
          //       },
          //       isChecked: false,
          //     },
          //   },
          // },
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
    user,
    listSelected,
    getListByID,
    handleButtonDelete,
    handleAllSelected,
  };
};

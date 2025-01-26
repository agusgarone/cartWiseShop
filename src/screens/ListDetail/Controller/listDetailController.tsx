import {useContext, useState} from 'react';
import {NavigationContext} from '@react-navigation/native';
import {IList} from '../../../models/list';
import {StorageService} from '../../../storage/asyncStorage';
import {Alert} from 'react-native';
import {RemoveList} from '../../../services/List';
import {IProductForm} from '../../../models/productForm';
import {IProduct} from '../../../models/product';

export const listDetailController = () => {
  const [listSelected, setListSelected] = useState<IList<IProductForm> | null>(
    null,
  );
  const navigation = useContext(NavigationContext);

  const getListByID = async (id: string) => {
    await StorageService.getItem('lists').then((res: IList<IProduct>[]) => {
      const listFound = res.find(list => list.id.toString() === id);
      if (listFound) {
        const listWithProductForm: IList<IProductForm> = {
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
    });
  };

  const DialogDeleteList = (list: IList<IProductForm>) =>
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
            RemoveList(list);
            navigation?.navigate('MainTabs', {screen: 'Home'});
          },
        },
      ],
    );

  const handleAllSelected = () => {
    console.log('¡Todos los elementos están seleccionados!');
    // Puedes añadir más lógica aquí, como mostrar un mensaje, enviar datos, etc.
  };

  const handleDeleteList = (list: IList<IProductForm>) =>
    DialogDeleteList(list);

  const goHome = () => navigation?.navigate('Home');

  const goBack = () => navigation?.goBack();

  return {
    listSelected,
    getListByID,
    goBack,
    handleDeleteList,
    handleAllSelected,
  };
};

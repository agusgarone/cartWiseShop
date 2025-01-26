import React from 'react';
import {StyleSheet, View} from 'react-native';
import BottomSheetForm from './Form';
import Button from '../../../components/Button';
import List from '../../../components/List';
import {IProduct} from '../../../models/product';
import RenderProduct from './RenderProducts';
import {GlobalStateService} from '../../../services/globalStates';

const Content = ({
  handleButton,
  onPress,
  productsSelected,
  handleFormikSubmit,
}: {
  productsSelected: IProduct[];
  handleButton: () => void;
  onPress: ({item}: {item: IProduct}) => void;
  handleFormikSubmit: (values: {textSearched: string}) => Promise<void>;
}) => {
  const _renderProducts = ({item}: {item: IProduct}) => {
    const findProd = productsSelected.find(prod => prod.id === item.id);
    const isSelected = findProd !== undefined;
    return (
      <RenderProduct item={item} isSelected={isSelected} onPress={onPress} />
    );
  };

  return (
    <View style={styles.centeredView}>
      <BottomSheetForm
        handleFormikSubmit={handleFormikSubmit}
        key={'form-bottom-sheet'}
      />
      <View style={styles.containerResult}>
        <View style={styles.containerList}>
          <List
            data={GlobalStateService.getValuesSearched()}
            render={_renderProducts}
          />
        </View>
        <View style={styles.containerButton}>
          <Button type="primary" onPress={handleButton}>
            {'Agregar'}
          </Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    height: '100%',
    display: 'flex',
    paddingHorizontal: 20,
  },
  containerResult: {
    flex: 6,
    width: '100%',
    display: 'flex',
  },
  containerList: {
    marginTop: 12,
    flex: 4,
    width: '100%',
    display: 'flex',
  },
  containerButton: {
    flex: 1,
    width: '100%',
    display: 'flex',
    paddingTop: 12,
  },
});

export default Content;

import React from 'react';
import {StyleSheet, View} from 'react-native';
import BottomSheetForm from './Form';
import Button from '../../../components/Button';
import List from '../../../components/List';
import RenderProduct from './RenderProducts';
import {globalSessionState} from '../../../services/globalStates';
import {IProductDTO} from '../../../models/types/product';
import Loader from '../../../components/Loader';
import {useTranslation} from 'react-i18next';

const Content = ({
  handleButton,
  onPress,
  productsSelected,
  handleFormikSubmit,
  loading,
}: {
  productsSelected: IProductDTO[];
  handleButton: () => void;
  onPress: ({item}: {item: IProductDTO}) => void;
  handleFormikSubmit: (values: {textSearched: string}) => Promise<void>;
  loading: boolean;
}) => {
  const {t} = useTranslation();
  const valuesSearched = globalSessionState(state => state.valuesSearched);

  return (
    <View style={styles.centeredView}>
      <BottomSheetForm
        handleFormikSubmit={handleFormikSubmit}
        key={'form-bottom-sheet'}
      />
      <View style={styles.containerResult}>
        <View style={styles.containerList}>
          {loading ? (
            <Loader />
          ) : (
            <List
              data={valuesSearched}
              render={({item}) => (
                <RenderProductWrapper
                  item={item}
                  productsSelected={productsSelected}
                  onPress={onPress}
                />
              )}
            />
          )}
        </View>
        <View style={styles.containerButton}>
          <Button type="primary" onPress={handleButton}>
            {t('addProducts.button')}
          </Button>
        </View>
      </View>
    </View>
  );
};

const RenderProductWrapper = ({
  item,
  productsSelected,
  onPress,
}: {
  item: IProductDTO;
  productsSelected: IProductDTO[];
  onPress: ({item}: {item: IProductDTO}) => void;
}) => {
  const isSelected = productsSelected.some(prod => prod.id === item.id);
  return (
    <RenderProduct item={item} isSelected={isSelected} onPress={onPress} />
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

import React, {useContext} from 'react';
import {FlatList, StyleSheet, View, Text} from 'react-native';
import BottomSheetForm from './Form';
import Button from '../../../components/Button';
import RenderProduct from './RenderProducts';
import {globalSessionState} from '../../../services/globalStates';
import {IProductDTO} from '../../../models/types/product';
import Loader from '../../../components/Loader';
import {useTranslation} from 'react-i18next';
import {ThemeContext} from '../../../services/ThemeProvider';
import {capitalizeFirstLetter} from '../../../common/utils/functions/capitalizeFirstLetter';

const Content = ({
  handleButton,
  onPress,
  productsSelected,
  handleFormikSubmit,
  loading,
  onCreateProduct,
  searchQuery,
}: {
  productsSelected: IProductDTO[];
  handleButton: () => void;
  onPress: ({item}: {item: IProductDTO}) => void;
  handleFormikSubmit: (values: {textSearched: string}) => Promise<void>;
  loading: boolean;
  onCreateProduct?: (productName: string) => void;
  searchQuery?: string;
}) => {
  const {t} = useTranslation();
  const {theme} = useContext(ThemeContext);
  const valuesSearched = globalSessionState(state => state.valuesSearched);

  // Determinar si mostrar el botón de crear producto
  const shouldShowCreateProduct =
    !loading &&
    valuesSearched &&
    valuesSearched.length === 0 &&
    searchQuery &&
    searchQuery.trim().length > 0;

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
          ) : shouldShowCreateProduct ? (
            <View style={styles.noProducts}>
              <Text style={{color: theme.createList.listEmpty.color}}>
                {t('addProducts.noProductsFound', {
                  query: capitalizeFirstLetter(searchQuery),
                })}
              </Text>
              <Button
                children={t('addProducts.createProductButton', {
                  productName: capitalizeFirstLetter(searchQuery),
                })}
                isDisabled={false}
                type="primary"
                onPress={() =>
                  onCreateProduct?.(capitalizeFirstLetter(searchQuery))
                }
                key={'CreateProductButton'}
              />
            </View>
          ) : (
            <FlatList
              data={valuesSearched}
              renderItem={({item, index}) => (
                <RenderProductWrapper
                  item={item}
                  onPress={onPress}
                  productsSelected={productsSelected}
                  key={`${index}`}
                />
              )}
              style={{paddingVertical: 5}}
              ListFooterComponent={() => (
                <View
                  style={{
                    marginVertical: 20,
                  }}></View>
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
  noProducts: {
    marginTop: 10,
    minHeight: 250,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
});

export default Content;

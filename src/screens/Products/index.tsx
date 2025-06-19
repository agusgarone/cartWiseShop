import React, {useContext} from 'react';
import {FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import Button from '../../components/Button';
import {productsController} from './Controller/productsController';
import {
  DrawerNavigationProp,
  DrawerScreenProps,
} from '@react-navigation/drawer';
import {IProductDTO} from '../../models/types/product';
import Loader from '../../components/Loader';
import {ThemeContext} from '../../services/ThemeProvider';
import {useTranslation} from 'react-i18next';
import SwipeToDeleteItem from './Components/AnimatedRenderItem';
import {FilterButton} from '../../components/FilterButton';

type ProductsProps = {
  NavMainTabs?: DrawerNavigationProp<any, 'MainTabs', undefined>;
  NavProduct?: DrawerScreenProps<any, 'ProductsDrawer'>;
};

const Products = ({NavMainTabs, NavProduct}: ProductsProps) => {
  const {t} = useTranslation();
  const {theme} = useContext(ThemeContext);

  const {allProducts, goToCreateProduct, handleDeleteProduct, loading} =
    productsController();

  const _renderProducts = ({item}: {item: IProductDTO}) => {
    return (
      <SwipeToDeleteItem
        item={item}
        onDismiss={() => null}
        onPressTrash={onConfirm => handleDeleteProduct(item, onConfirm)}
      />
    );
  };

  return (
    <SafeAreaView
      style={[Style.screen, {backgroundColor: theme.backgroundScreen}]}>
      <View style={Style.selectList}>
        <View style={Style.content}>
          <View style={Style.header}>
            <View style={{flexDirection: 'row'}}>
              <FilterButton
                onPress={() =>
                  NavProduct?.navigation
                    ? NavProduct.navigation.openDrawer()
                    : NavMainTabs?.openDrawer()
                }
              />
            </View>
          </View>
          <View style={Style.containerList}>
            {loading ? (
              <Loader />
            ) : (
              <FlatList
                style={{paddingVertical: 5}}
                data={allProducts}
                renderItem={_renderProducts}
                ListEmptyComponent={() => {
                  if (loading) {
                    return null;
                  }
                  return (
                    <View style={Style.noProducts}>
                      <Text style={{color: theme.products.color}}>
                        {t('products.emptyText')}
                      </Text>
                    </View>
                  );
                }}
                ListFooterComponent={() => (
                  <View style={Style.marginListFooter}></View>
                )}
              />
            )}
          </View>
          <View style={Style.containerButton}>
            <Button
              children={t('products.button')}
              isDisabled={false}
              type="primary"
              onPress={goToCreateProduct}
              key={'Button'}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const Style = StyleSheet.create({
  screen: {
    flex: 1,
  },
  selectList: {
    flex: 1,
    justifyContent: 'flex-start',
    marginTop: 32,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 16,
  },
  containerList: {
    flex: 9,
    display: 'flex',
    paddingBottom: 12,
  },
  containerButton: {
    display: 'flex',
    marginBottom: 16,
  },
  noProducts: {
    marginTop: 10,
    minHeight: 250,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  marginListFooter: {
    marginVertical: 20,
  },
});

export default Products;

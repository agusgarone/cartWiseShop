import React, {useContext} from 'react';
import {FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import Button from '../../components/Button';
import {productsController} from './Controller/productsController';
import Loader from '../../components/Loader';
import {ThemeContext} from '../../services/ThemeProvider';
import {useTranslation} from 'react-i18next';
import SwipeToDeleteItem from './Components/AnimatedRenderItem';
import {FilterButton} from '../../components/FilterButton';
import {Drawer} from 'react-native-drawer-layout';
import {CustomDrawerContent} from '../Filters';
import FloatButton from '../../components/FloatButton';

const Products = () => {
  const {t} = useTranslation();
  const {theme} = useContext(ThemeContext);

  const {
    allProducts,
    goToCreateProduct,
    handleDeleteProduct,
    loading,
    setOpen,
    open,
    categories,
  } = productsController();

  return (
    <SafeAreaView
      style={[Style.screen, {backgroundColor: theme.backgroundScreen}]}>
      <Drawer
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        drawerStyle={{width: 300}}
        renderDrawerContent={() => {
          return (
            <CustomDrawerContent
              filterTo="products"
              closeDrawer={() => setOpen(false)}
              productsCategories={[]}
              categories={categories}
            />
          );
        }}>
        <View style={Style.selectList}>
          <View style={Style.content}>
            <View style={Style.header}>
              <View style={{flexDirection: 'row'}}>
                <FilterButton onPress={() => setOpen(true)} />
              </View>
            </View>
            <View style={Style.containerList}>
              {loading ? (
                <Loader />
              ) : (
                <FlatList
                  style={{paddingVertical: 5}}
                  data={allProducts}
                  renderItem={({item}) => (
                    <SwipeToDeleteItem
                      item={item}
                      onDismiss={() => null}
                      onPressTrash={onConfirm =>
                        handleDeleteProduct(item, onConfirm)
                      }
                    />
                  )}
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
            <FloatButton
              navigate={goToCreateProduct}
              isHome
              key={'FloatButton'}
            />
          </View>
        </View>
      </Drawer>
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
    backgroundColor: 'red',
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

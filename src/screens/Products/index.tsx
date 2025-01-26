import React from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import theme from '../../common/theme';
import {IProduct} from '../../models/product';
import RenderProduct from './Components/RenderProducts';
import Button from '../../components/Button';
import {productsController} from './Controller/productsController';
import {DrawerScreenProps} from '@react-navigation/drawer';

type ProductsProps = DrawerScreenProps<any, 'Main'>;

const Products = ({navigation}: ProductsProps) => {
  const {allProducts, goToCreateProduct, handleDeleteProduct} =
    productsController();

  const _renderProducts = ({item}: {item: IProduct}) => {
    return (
      <RenderProduct
        item={item}
        isSelected={false}
        onPress={() => handleDeleteProduct(item)}
      />
    );
  };

  return (
    <SafeAreaView style={Style.screen}>
      <View style={Style.selectList}>
        <View style={Style.content}>
          <View style={Style.header}>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                style={Style.action}
                // onPress={() => navigation.openDrawer()}
              >
                <Text style={Style.buttonText}>Filtros</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={Style.containerList}>
            <FlatList
              style={{paddingVertical: 5}}
              data={allProducts}
              renderItem={_renderProducts}
              ListEmptyComponent={() => (
                <View style={Style.noProducts}>
                  <Text style={Style.text}>¡No hay productos!</Text>
                </View>
              )}
              ListFooterComponent={() => (
                <View style={Style.marginListFooter}></View>
              )}
            />
          </View>
          <View style={Style.containerButton}>
            <Button
              children="Agregar"
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
  delete: {
    padding: 10,
    backgroundColor: theme.colors.red,
    borderRadius: 16,
  },
  action: {
    padding: 10,
    width: 80,
    backgroundColor: theme.colors.primary,
    borderRadius: 16,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: theme.colors.white,
    fontSize: theme.fontSize.m,
    fontWeight: '600',
  },
  containerList: {
    flex: 9,
    display: 'flex',
    paddingBottom: 12,
  },
  containerButton: {
    display: 'flex',
    marginBottom: 32,
  },
  noProducts: {
    marginTop: 10,
    minHeight: 250,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  text: {
    color: theme.colors.grey,
  },
  marginListFooter: {
    marginVertical: 20,
  },
});

export default Products;

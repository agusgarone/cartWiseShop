import React, {useContext} from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import theme from '../../common/theme';
import RenderProduct from './Components/RenderProducts';
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
      <RenderProduct
        item={item}
        isSelected={false}
        onPress={() => handleDeleteProduct(item)}
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
              <TouchableOpacity
                style={[
                  Style.action,
                  {backgroundColor: theme.products.buttonFilter.background},
                ]}
                onPress={() =>
                  NavProduct?.navigation
                    ? NavProduct.navigation.openDrawer()
                    : NavMainTabs?.openDrawer()
                }>
                <Text
                  style={[
                    Style.buttonText,
                    {color: theme.products.buttonFilter.color},
                  ]}>
                  Filtros
                </Text>
              </TouchableOpacity>
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
  action: {
    padding: 10,
    width: 80,
    borderRadius: 16,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
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

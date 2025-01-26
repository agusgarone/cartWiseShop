import {IProduct} from '../../../models/product';
import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import Button from '../../../components/Button';
import theme from '../../../common/theme';

export const Content = ({
  _renderProducts,
  goToAddProducts,
  products,
}: {
  _renderProducts: ({item}: {item: IProduct}) => React.JSX.Element;
  goToAddProducts: () => void | undefined;
  products: IProduct[];
}) => (
  <>
    <View style={Style.first}>
      <FlatList
        style={{paddingVertical: 5}}
        data={products}
        renderItem={_renderProducts}
        ListEmptyComponent={() => (
          <View style={Style.noProducts}>
            <Text style={Style.text}>¡No hay productos!</Text>
            <Button
              children="Agregar productos"
              isDisabled={false}
              type="primary"
              onPress={goToAddProducts}
              key={'Button'}
            />
          </View>
        )}
        ListFooterComponent={() => {
          if (products && products?.length) {
            return (
              <View style={{marginTop: 4}}>
                <Button
                  children="Agregar producto"
                  isDisabled={false}
                  type="primary"
                  onPress={goToAddProducts}
                  key={'Button'}
                />
              </View>
            );
          } else {
            return null;
          }
        }}
      />
    </View>
  </>
);

const Style = StyleSheet.create({
  first: {
    flex: 7,
    width: '100%',
    display: 'flex',
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
});

import React, {useContext} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {ITab} from '../models/types/list';
import RenderProduct from '../screens/ListDetail/Components/RenderProducts';
import {ThemeContext} from '../services/ThemeProvider';

export const ListProductsByCategory = ({
  values,
  emptyComponent = null,
  _renderProducts,
}: {
  values: {
    data: ITab[];
  } | null;
  emptyComponent: React.ComponentType<any> | null;
  _renderProducts: ({item}: {item: any; index: number}) => React.JSX.Element;
}) => {
  const {theme} = useContext(ThemeContext);

  // Verificar si hay productos para mostrar
  const hasProducts =
    values?.data &&
    values.data.length > 0 &&
    values.data.some(tab => tab.products && tab.products.length > 0);

  // Si no hay productos y hay un emptyComponent, renderizarlo
  if (!hasProducts && emptyComponent) {
    return React.createElement(emptyComponent);
  }

  return (
    <ScrollView>
      {values?.data.map((tab, indexTab) => (
        <View key={indexTab}>
          <View style={{padding: 16}}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 700,
                color: theme.listDetail.titleColor,
              }}>
              {tab.categoria}
            </Text>
          </View>
          {tab.products.map((prod, indexProd) =>
            _renderProducts({item: prod, index: indexProd}),
          )}
        </View>
      ))}
    </ScrollView>
  );
};

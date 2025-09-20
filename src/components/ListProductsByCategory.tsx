import {ScrollView, Text, View} from 'react-native';
import {ITab} from '../models/types/list';
import RenderProduct from '../screens/ListDetail/Components/RenderProducts';
import {useContext} from 'react';
import {ThemeContext} from '../services/ThemeProvider';

export const ListProductsByCategory = ({
  values,
  emptyComponent = null,
}: {
  values: {
    data: ITab[];
  } | null;
  emptyComponent: React.ComponentType<any> | null;
}) => {
  const {theme} = useContext(ThemeContext);

  // Verificar si hay productos para mostrar
  const hasProducts =
    values?.data &&
    values.data.length > 0 &&
    values.data.some(tab => tab.products && tab.products.length > 0);

  // Si no hay productos y hay un emptyComponent, renderizarlo
  if (!hasProducts && emptyComponent) {
    const EmptyComponent = emptyComponent;
    return <EmptyComponent />;
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
          {tab.products.map((prod, indexProd) => {
            return (
              <RenderProduct
                item={prod}
                indexTab={indexTab}
                indexProd={indexProd}
                key={`${prod.id}${indexProd}`}
              />
            );
          })}
        </View>
      ))}
    </ScrollView>
  );
};

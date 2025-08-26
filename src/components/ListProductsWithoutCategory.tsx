import {FlatList, View} from 'react-native';
import {ITab} from '../models/types/list';

export const ListProductsWithoutCategory = ({
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
  return (
    <FlatList
      data={values?.data[0].products}
      renderItem={_renderProducts}
      style={{paddingVertical: 5}}
      ListFooterComponent={() => (
        <View
          style={{
            marginVertical: 20,
          }}></View>
      )}
      ListEmptyComponent={emptyComponent}
    />
  );
};

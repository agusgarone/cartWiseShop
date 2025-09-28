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
  _renderProducts: ({
    item,
  }: {
    item: any;
    indexProd: number;
    indexTab: number;
  }) => React.JSX.Element;
}) => {
  return (
    <FlatList
      data={values?.data[0].products}
      renderItem={({item, index}) =>
        _renderProducts({item, indexProd: index, indexTab: 0})
      }
      style={{paddingVertical: 5}}
      ListFooterComponent={() => (
        <View
          style={{
            marginVertical: 40,
          }}></View>
      )}
      ListEmptyComponent={emptyComponent}
    />
  );
};

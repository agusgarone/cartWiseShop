import {FlatList, View} from 'react-native';
import {ITab} from '../models/types/list';
import RenderProduct from '../screens/ListDetail/Components/RenderProducts';

export const ListProductsWithoutCategory = ({
  values,
}: {
  values: {
    data: ITab[];
  };
}) => {
  return (
    <FlatList
      data={values.data[0].products}
      renderItem={({item, index}) => (
        <RenderProduct
          item={item}
          indexTab={0}
          indexProd={index}
          key={`${item.id}${index}`}
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
  );
};

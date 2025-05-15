import React from 'react';
import {FlatList, View} from 'react-native';
import {IListDTO} from '../models/types/list';
import {IProductDTO} from '../models/types/product';

const List = ({
  data,
  render,
}: {
  data: IProductDTO[] | IListDTO<IProductDTO>[];
  render: ({item, index}: {item: any; index: number}) => React.JSX.Element;
}) => {
  return (
    <FlatList
      data={data as any}
      renderItem={render}
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

export default List;

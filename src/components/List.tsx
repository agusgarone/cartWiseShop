import React from 'react';
import {FlatList} from 'react-native';
import {IList} from '../models/list';
import {IProduct} from '../models/product';

const List = ({
  data,
  render,
}: {
  data: IProduct[] | IList<IProduct>[];
  render: ({item, index}: {item: any; index: number}) => React.JSX.Element;
}) => {
  return (
    <FlatList
      data={data as any}
      renderItem={render}
      style={{paddingVertical: 5}}
    />
  );
};

export default List;

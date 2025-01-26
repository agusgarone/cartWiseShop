import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {IList} from '../../../models/list';
import theme from '../../../common/theme';
import {IProduct} from '../../../models/product';

const RenderList = ({
  item,
  navigateToListDetail,
  navigateToEditList,
}: {
  item: IList<IProduct>;
  navigateToListDetail: (id: string) => void;
  navigateToEditList: (id: string) => void;
}) => {
  return (
    <TouchableOpacity
      style={style.view}
      onPress={() => navigateToListDetail(item.id.toString())}
      onLongPress={() => navigateToEditList(item.id.toString())}>
      <Text style={style.name}>{item.name}</Text>
      <Text style={style.subtitle}>
        {`${item.products.length} ${
          item.products.length === 1 ? 'producto' : 'productos'
        }`}
      </Text>
      <Text style={style.date}>{`Creada el ${item.fechaAlta}`}</Text>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  view: {
    backgroundColor: theme.colors.white,
    marginHorizontal: 3,
    marginVertical: 5,
    borderRadius: 20,
    paddingVertical: 16,
    paddingHorizontal: 16,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    elevation: 3,
  },
  name: {
    fontSize: theme.fontSize.xxxl,
    fontWeight: 'bold',
    color: theme.colors.black,
  },
  subtitle: {
    fontSize: theme.fontSize.l,
    marginBottom: 4,
    color: theme.colors.grey,
  },
  date: {
    color: theme.colors.grey,
  },
});

export default RenderList;

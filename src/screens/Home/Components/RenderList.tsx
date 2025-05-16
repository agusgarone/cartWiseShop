import React, {useContext} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {IListDTO} from '../../../models/types/list';
import theme from '../../../common/theme';
import {IProductDTO} from '../../../models/types/product';
import {ThemeContext} from '../../../services/ThemeProvider';

const RenderList = ({
  item,
  navigateToListDetail,
  navigateToEditList,
}: {
  item: IListDTO<IProductDTO>;
  navigateToListDetail: (id: string) => void;
  navigateToEditList: (id: string) => void;
}) => {
  const {theme} = useContext(ThemeContext);
  return (
    <TouchableOpacity
      style={[
        style.view,
        {backgroundColor: theme.home.renderProduct.background},
      ]}
      onPress={() => navigateToListDetail(item.id.toString())}
      onLongPress={() => navigateToEditList(item.id.toString())}>
      <Text style={[style.name, {color: theme.home.renderProduct.titleColor}]}>
        {item.name}
      </Text>
      <Text
        style={[
          style.subtitle,
          {color: theme.home.renderProduct.subtitleColor},
        ]}>
        {`${item.products.length} ${
          item.products.length === 1 ? 'producto' : 'productos'
        }`}
      </Text>
      <Text
        style={{
          color: theme.home.renderProduct.subtitleColor,
        }}>{`Creada el ${item.created_at}`}</Text>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  view: {
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
  },
  subtitle: {
    fontSize: theme.fontSize.l,
    marginBottom: 4,
  },
});

export default RenderList;

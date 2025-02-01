import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import theme from '../../../common/theme';
import Icon, {IconType} from 'react-native-dynamic-vector-icons';
import {IProductDTO} from '../../../models/types/product';

const RenderProduct = ({
  item,
  onPress,
}: {
  item: IProductDTO;
  onPress: (id: number) => void;
}) => {
  return (
    <View style={style.view}>
      <Text style={style.text}>{item.name}</Text>
      <TouchableOpacity style={style.button} onPress={() => onPress(item.id)}>
        <Icon
          name="times"
          type={IconType.FontAwesome}
          size={25}
          color={theme.colors.grey}
          onPress={() => onPress(item.id)}
        />
      </TouchableOpacity>
    </View>
  );
};

const style = StyleSheet.create({
  view: {
    backgroundColor: theme.colors.white,
    marginHorizontal: 3,
    marginTop: 2,
    marginBottom: 5,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 16,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    elevation: 2,
  },
  text: {
    color: theme.colors.grey,
  },
  button: {
    paddingHorizontal: 12,
  },
});

export default RenderProduct;

import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {IProduct} from '../../../models/product';
import theme from '../../../common/theme';
import Icon, {IconType} from 'react-native-dynamic-vector-icons';

const RenderProduct = ({
  item,
  onPress,
  isSelected,
}: {
  isSelected: boolean;
  item: IProduct;
  onPress: ({item}: {item: IProduct}) => void;
}) => {
  return (
    <TouchableOpacity style={style.view} onPress={() => onPress({item})}>
      <Text
        style={[
          style.text,
          isSelected ? {color: theme.colors.white} : {color: theme.colors.grey},
        ]}>
        {item.name}
      </Text>
      <Icon
        style={{paddingRight: 16}}
        name="trash"
        type={IconType.FontAwesome}
        size={25}
        color={theme.colors.grey}
        onPress={() => onPress({item})}
      />
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  view: {
    backgroundColor: theme.colors.white,
    marginHorizontal: 3,
    marginTop: 2,
    marginBottom: 5,
    borderRadius: 12,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
  },
  text: {
    color: theme.colors.grey,
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
});

export default RenderProduct;

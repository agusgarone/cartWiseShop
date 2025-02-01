import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import theme from '../../../common/theme';
import {IProductDTO} from '../../../models/types/product';

const RenderProduct = ({
  item,
  onPress,
  isSelected,
}: {
  isSelected: boolean;
  item: IProductDTO;
  onPress: ({item}: {item: IProductDTO}) => void;
}) => {
  return (
    <TouchableOpacity
      style={[
        style.view,
        isSelected
          ? {backgroundColor: theme.colors.primary}
          : {backgroundColor: theme.colors.white},
      ]}
      onPress={() => onPress({item})}>
      <Text
        style={[
          style.text,
          isSelected ? {color: theme.colors.white} : {color: theme.colors.grey},
        ]}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  view: {
    marginHorizontal: 3,
    marginTop: 2,
    marginBottom: 5,
    borderRadius: 12,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    elevation: 2,
  },
  text: {
    color: theme.colors.grey,
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
});

export default RenderProduct;

import React, {useContext} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {IProductDTO} from '../../../models/types/product';
import {ThemeContext} from '../../../services/ThemeProvider';

const RenderProduct = ({
  item,
  onPress,
  isSelected,
}: {
  isSelected: boolean;
  item: IProductDTO;
  onPress: ({item}: {item: IProductDTO}) => void;
}) => {
  const {theme} = useContext(ThemeContext);
  return (
    <TouchableOpacity
      style={[
        style.view,
        isSelected
          ? {
              backgroundColor:
                theme.addProducts.renderProduct.backgroundSelected,
            }
          : {backgroundColor: theme.addProducts.renderProduct.background},
      ]}
      onPress={() => onPress({item})}>
      <Text
        style={[
          style.text,
          isSelected
            ? {color: theme.addProducts.renderProduct.colorSelected}
            : {color: theme.addProducts.renderProduct.color},
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
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
});

export default RenderProduct;

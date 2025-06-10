import React, {useContext} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {IProductDTO} from '../../../models/types/product';
import {ThemeContext} from '../../../services/ThemeProvider';

const RenderProduct = ({
  item,
  onPress,
  isSelected,
}: {
  isSelected: boolean;
  item: IProductDTO;
  onPress: () => void;
}) => {
  const {theme} = useContext(ThemeContext);

  return (
    <TouchableOpacity onPress={() => onPress()}>
      <Text
        style={[
          isSelected
            ? {color: theme.products.renderProduct.colorSelected}
            : {color: theme.products.renderProduct.color},
        ]}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );
};

export default RenderProduct;

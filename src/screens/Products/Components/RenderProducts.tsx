import React, {useContext} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {IProductDTO} from '../../../models/types/product';
import {Trash} from 'lucide-react-native';
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
        {backgroundColor: theme.products.renderProduct.background},
      ]}
      onPress={() => onPress({item})}>
      <Text
        style={[
          style.text,
          isSelected
            ? {color: theme.products.renderProduct.colorSelected}
            : {color: theme.products.renderProduct.color},
        ]}>
        {item.name}
      </Text>
      <Trash
        color={theme.products.renderProduct.icon}
        size={25}
        onPress={() => onPress({item})}
      />
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
    alignItems: 'center',
    elevation: 2,
    paddingRight: 16,
  },
  text: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
});

export default RenderProduct;

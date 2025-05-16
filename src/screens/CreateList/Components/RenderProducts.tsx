import React, {useContext} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {IProductDTO} from '../../../models/types/product';
import {X} from 'lucide-react-native';
import {ThemeContext} from '../../../services/ThemeProvider';

const RenderProduct = ({
  item,
  onPress,
}: {
  item: IProductDTO;
  onPress: (id: number) => void;
}) => {
  const {theme} = useContext(ThemeContext);
  return (
    <View
      style={[
        style.view,
        {backgroundColor: theme.createList.renderProduct.background},
      ]}>
      <Text style={{color: theme.createList.renderProduct.color}}>
        {item.name}
      </Text>
      <TouchableOpacity style={style.button} onPress={() => onPress(item.id)}>
        <X color={theme.createList.renderProduct.icon} size={25} />
      </TouchableOpacity>
    </View>
  );
};

const style = StyleSheet.create({
  view: {
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
  button: {
    paddingHorizontal: 12,
  },
});

export default RenderProduct;

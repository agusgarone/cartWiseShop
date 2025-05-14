import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import theme from '../../../common/theme';
import {useField} from 'formik';
import CheckBox from '@react-native-community/checkbox';
import {IProductDTO} from '../../../models/types/product';

const RenderProduct = ({item, index}: {index: number; item: IProductDTO}) => {
  const [field, , helpers] = useField(`products.${index}.isChecked`);
  return (
    <TouchableOpacity
      style={style.view}
      onPress={() => helpers.setValue(!field.value)}>
      <Text style={[style.text, field.value ? style.textChecked : null]}>
        {item.name}
      </Text>
      <CheckBox
        value={field.value || false}
        onValueChange={newValue => helpers.setValue(newValue)}
        tintColors={{true: theme.colors.primary, false: theme.colors.grey}}
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
    backgroundColor: theme.colors.white,
    elevation: 2,
    paddingHorizontal: 16,
  },
  text: {
    color: theme.colors.grey,
    paddingVertical: 16,
  },
  textChecked: {
    textDecorationLine: 'line-through',
    color: theme.colors.grey,
  },
});

export default RenderProduct;

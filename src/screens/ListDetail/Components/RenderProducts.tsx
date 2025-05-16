import React, {useContext} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {useField} from 'formik';
import CheckBox from '@react-native-community/checkbox';
import {IProductDTO} from '../../../models/types/product';
import {ThemeContext} from '../../../services/ThemeProvider';

const RenderProduct = ({item, index}: {index: number; item: IProductDTO}) => {
  const [field, , helpers] = useField(`products.${index}.isChecked`);
  const {theme} = useContext(ThemeContext);
  return (
    <TouchableOpacity
      style={[
        style.view,
        {backgroundColor: theme.listDetail.renderProduct.background},
      ]}
      onPress={() => helpers.setValue(!field.value)}>
      <Text
        style={[
          style.text,
          {color: theme.listDetail.renderProduct.color},
          field.value ? style.textChecked : null,
        ]}>
        {item.name}
      </Text>
      <CheckBox
        value={field.value || false}
        onValueChange={newValue => helpers.setValue(newValue)}
        tintColors={{
          true: theme.listDetail.renderProduct.checkboxTrue,
          false: theme.listDetail.renderProduct.checkboxFalse,
        }}
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
    paddingHorizontal: 16,
  },
  text: {
    paddingVertical: 16,
  },
  textChecked: {
    textDecorationLine: 'line-through',
  },
});

export default RenderProduct;

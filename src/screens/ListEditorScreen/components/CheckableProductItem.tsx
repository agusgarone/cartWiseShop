import React, {useContext} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {IProductForm} from '../../../models/types/product';
import {ThemeContext} from '../../../services/ThemeProvider';

type CheckableProductItemProps = {
  item: IProductForm;
  onToggle: (id: number, checked: boolean) => void;
};

export const CheckableProductItem = ({
  item,
  onToggle,
}: CheckableProductItemProps) => {
  const {theme} = useContext(ThemeContext);
  const isChecked = item.isChecked ?? false;

  return (
    <TouchableOpacity
      style={[
        styles.row,
        {backgroundColor: theme.listDetail.renderProduct.background},
      ]}
      onPress={() => onToggle(item.id, !isChecked)}
      activeOpacity={0.85}>
      <Text
        style={[
          styles.name,
          {color: theme.listDetail.renderProduct.color},
          isChecked && styles.nameChecked,
        ]}>
        {item.name}
      </Text>
      <CheckBox
        value={isChecked}
        onValueChange={newValue => onToggle(item.id, newValue)}
        tintColors={{
          true: theme.listDetail.renderProduct.checkboxTrue,
          false: theme.listDetail.renderProduct.checkboxFalse,
        }}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 3,
    marginVertical: 3,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    elevation: 1,
  },
  name: {
    flex: 1,
    fontSize: 16,
    marginRight: 8,
  },
  nameChecked: {
    textDecorationLine: 'line-through',
    opacity: 0.65,
  },
});

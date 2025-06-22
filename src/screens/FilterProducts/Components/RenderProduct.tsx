import React, {useContext} from 'react';
import {StyleSheet, Switch, Text, View} from 'react-native';
import {useField} from 'formik';
import {ICategoryFilter} from '../../../models/types/category';
import {ThemeContext} from '../../../services/ThemeProvider';

const RenderProduct = ({
  item,
  index,
  categories,
  setFieldValue,
}: {
  index: number;
  item: ICategoryFilter;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
  categories: ICategoryFilter[];
}) => {
  const {theme} = useContext(ThemeContext);
  const [field, , helpers] = useField(`categories[${index}].isChecked`);

  const handleSwitch = () => {
    categories.forEach((_, i) => {
      if (i === index && item.isChecked) {
        setFieldValue(`categories[${i}].isChecked`, false);
      } else {
        setFieldValue(`categories[${i}].isChecked`, i === index);
      }
    });
  };

  return (
    <View style={style.view}>
      <Text
        style={[style.text, {color: theme.filterProducts.renderProduct.text}]}>
        {item.name}
      </Text>
      <Switch
        value={field.value || false}
        onValueChange={handleSwitch}
        trackColor={{
          true: theme.filterProducts.renderProduct.true,
          false: theme.filterProducts.renderProduct.false,
        }}
      />
    </View>
  );
};

const style = StyleSheet.create({
  view: {
    marginTop: 2,
    marginBottom: 4,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    paddingVertical: 6,
    width: '75%',
  },
});

export default RenderProduct;

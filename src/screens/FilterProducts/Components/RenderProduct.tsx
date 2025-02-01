import React from 'react';
import {StyleSheet, Switch, Text, View} from 'react-native';
import theme from '../../../common/theme';
import {useField} from 'formik';
import {ICategory} from '../../../models/types/category';

const RenderProduct = ({item, index}: {index: number; item: ICategory}) => {
  const [field, , helpers] = useField(`categories[${index}].isChecked`);
  return (
    <View style={style.view}>
      <Text style={[style.text]}>{item.name}</Text>
      <Switch
        value={field.value || false}
        onValueChange={newValue => {
          helpers.setValue(newValue);
        }}
        trackColor={{true: theme.colors.primary, false: theme.colors.grey}}
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
    color: theme.colors.grey,
    paddingVertical: 6,
    width: '75%',
  },
});

export default RenderProduct;

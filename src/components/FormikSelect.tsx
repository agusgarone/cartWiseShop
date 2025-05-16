import React, {useField} from 'formik';
import {View, StyleSheet} from 'react-native';
import theme from '../common/theme';
import {useContext, useState} from 'react';
import {Picker} from '@react-native-picker/picker';
import {ICategory} from '../models/types/category';
import {ThemeContext} from '../services/ThemeProvider';

interface IFormikInputValue {
  name: string;
  placeholder: string;
  onChange: (value: string) => void;
  options: ICategory[];
}

export const FormikSelectValue = ({
  name,
  placeholder,
  onChange,
  options,
}: IFormikInputValue) => {
  const {theme} = useContext(ThemeContext);
  const [field, , helpers] = useField(name);
  const [focus, setFocus] = useState(false);

  const Style = StyleSheet.create({
    scrollView: {
      overflow: 'hidden',
      display: 'flex',
    },
    container: {
      borderColor: focus ? theme.select.borderColor : 'transparent',
      borderWidth: 2,
    },
  });

  return (
    <View
      style={[
        {
          width: '100%',
          backgroundColor: theme.select.background,
          minHeight: 54,
          borderRadius: 12,
          elevation: 3,
        },
        Style.container,
      ]}>
      <Picker
        mode="dialog"
        dropdownIconRippleColor={theme.select.dropdownIconRipple}
        dropdownIconColor={theme.select.dropdownIcon}
        selectedValue={field.value}
        placeholder={placeholder}
        onValueChange={value => helpers.setValue(value)}
        style={{
          color: theme.select.color,
        }}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}>
        {options.map(op => (
          <Picker.Item
            label={op.name}
            value={op.id}
            key={`${op.id}-${op.name}`}
          />
        ))}
      </Picker>
    </View>
  );
};

import React, {useField} from 'formik';
import {View, StyleSheet, TextInput} from 'react-native';
import theme from '../common/theme';
import {useState} from 'react';
import {Picker} from '@react-native-picker/picker';
import {ICategoria} from '../models/categoria';

interface IFormikInputValue {
  name: string;
  placeholder: string;
  onChange: (value: string) => void;
  options: ICategoria[];
}

export const FormikSelectValue = ({
  name,
  placeholder,
  onChange,
  options,
}: IFormikInputValue) => {
  const [field, meta, helpers] = useField(name);
  const [focus, setFocus] = useState(false);

  const Style = StyleSheet.create({
    scrollView: {
      overflow: 'hidden',
      display: 'flex',
    },
    container: {
      borderColor: focus ? theme.colors.primary : 'transparent',
      borderWidth: 2,
    },
  });

  return (
    <View
      style={[
        {
          width: '100%',
          backgroundColor: theme.colors.white,
          minHeight: 54,
          borderRadius: 12,
          elevation: 3,
        },
        Style.container,
      ]}>
      <Picker
        mode="dialog"
        dropdownIconRippleColor={theme.colors.black}
        dropdownIconColor={theme.colors.black}
        selectedValue={field.value}
        placeholder={placeholder}
        onValueChange={value => helpers.setValue(value)}
        style={{
          color: theme.colors.black,
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

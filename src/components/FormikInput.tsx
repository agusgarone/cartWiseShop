import React, {useField} from 'formik';
import {View, StyleSheet, TextInput} from 'react-native';
import theme from '../common/theme';
import {useContext, useState} from 'react';
import {ThemeContext} from '../services/ThemeProvider';

interface IFormikInputValue {
  name: string;
  placeholder: string;
  onChange: (value: string) => void;
}

export const FormikInputValue = ({
  name,
  placeholder,
  onChange,
}: IFormikInputValue) => {
  const {theme} = useContext(ThemeContext);
  const [field, meta, helpers] = useField(name);
  const [focus, setFocus] = useState(false);

  const Style = StyleSheet.create({
    scrollView: {
      overflow: 'hidden',
      display: 'flex',
    },
    container: {
      flex: 1,
      color: theme.input.color,
      flexDirection: 'row',
      alignItems: 'center',
      borderColor: focus ? theme.input.borderColor : 'transparent',
      width: '100%',
      borderWidth: 2,
      borderRadius: 12,
      backgroundColor: theme.input.background,
      paddingHorizontal: 16,
      justifyContent: 'space-between',
      elevation: 3,
    },
  });

  return (
    <View
      style={{
        width: '100%',
        minHeight: 54,
      }}>
      <View style={Style.container}>
        <TextInput
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          style={{flex: 1}}
          placeholder={placeholder}
          placeholderTextColor={theme.input.placeHolder}
          value={field.value}
          onChangeText={(value: any) => {
            helpers.setTouched(value.trim() !== meta.initialValue.trim());
            helpers.setValue(value);
          }}
          onChange={e => onChange(e.nativeEvent.text)}
        />
      </View>
    </View>
  );
};

import React, {useField} from 'formik';
import {View, StyleSheet, TextInput} from 'react-native';
import theme from '../common/theme';
import {useContext, useState} from 'react';
import {ThemeContext} from '../services/ThemeProvider';

interface IFormikInputValue {
  name: string;
  isNameList?: boolean;
  placeholder: string;
  onChange: (value: string) => void;
}

export const FormikInputValue = ({
  name,
  placeholder,
  isNameList,
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
      flexDirection: 'row',
      alignItems: 'center',
      borderColor: focus ? theme.input.borderColor : 'transparent',
      width: '100%',
      borderWidth: 2,
      borderRadius: 12,
      backgroundColor: theme.input.background,
      paddingHorizontal: isNameList
        ? style.nameList.padding
        : style.regular.padding,
      justifyContent: 'space-between',
      elevation: isNameList
        ? style.nameList.elevation
        : style.regular.elevation,
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
          style={{
            flex: 1,
            color: theme.input.color,
            fontSize: isNameList
              ? style.nameList.fontSize
              : style.regular.fontSize,
            fontWeight: isNameList
              ? style.nameList.fontWeight
              : style.regular.fontWeight,
          }}
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

const style = StyleSheet.create({
  nameList: {
    fontSize: theme.fontSize.xxl,
    fontWeight: 'bold',
    padding: 8,
    elevation: 0,
  },
  regular: {
    fontSize: theme.fontSize.m,
    fontWeight: 'normal',
    padding: 16,
    elevation: 3,
  },
});

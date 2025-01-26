import React, {useField} from 'formik';
import {View, StyleSheet, TextInput} from 'react-native';
import theme from '../common/theme';
import {useState} from 'react';

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
  const [field, meta, helpers] = useField(name);
  const [focus, setFocus] = useState(false);

  const Style = StyleSheet.create({
    scrollView: {
      overflow: 'hidden',
      display: 'flex',
    },
    container: {
      flex: 1,
      color: theme.colors.black,
      flexDirection: 'row',
      alignItems: 'center',
      borderColor: focus ? theme.colors.primary : 'transparent',
      width: '100%',
      borderWidth: 2,
      borderRadius: 12,
      backgroundColor: theme.colors.white,
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
          style={{flex: 1, color: theme.colors.black}}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.grey}
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

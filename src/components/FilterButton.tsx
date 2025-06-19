import {useContext} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {ThemeContext} from '../services/ThemeProvider';
import theme from '../common/theme';

export const FilterButton = ({onPress}: {onPress: () => void}) => {
  const {theme} = useContext(ThemeContext);

  return (
    <TouchableOpacity
      style={[
        Style.action,
        {backgroundColor: theme.products.buttonFilter.background},
      ]}
      onPress={onPress}>
      <Text
        style={[Style.buttonText, {color: theme.products.buttonFilter.color}]}>
        Filtros
      </Text>
    </TouchableOpacity>
  );
};

const Style = StyleSheet.create({
  action: {
    padding: 10,
    width: 80,
    borderRadius: 16,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: theme.fontSize.m,
    fontWeight: '600',
  },
});

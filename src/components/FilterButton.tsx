import {useContext} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {ThemeContext} from '../services/ThemeProvider';
import theme from '../common/theme';
import {SlidersHorizontal} from 'lucide-react-native';

export const FilterButton = ({onPress}: {onPress: () => void}) => {
  const {theme} = useContext(ThemeContext);

  return (
    <TouchableOpacity
      style={[
        Style.action,
        {backgroundColor: theme.products.buttonFilter.background},
      ]}
      onPress={onPress}>
      <SlidersHorizontal size={22} color="white" />
    </TouchableOpacity>
  );
};

const Style = StyleSheet.create({
  action: {
    padding: 10,
    width: 50,
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

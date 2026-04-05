import {Plus} from 'lucide-react-native';
import {memo, useContext} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import theme from '../common/theme';
import {ThemeContext} from '../services/ThemeProvider';

interface IFloatButton {
  navigate: (values: any) => void;
  isHome?: boolean;
}

const FloatButton = memo(function FloatButton({
  navigate,
  isHome = false,
}: IFloatButton) {
  const {theme} = useContext(ThemeContext);
  return (
    <TouchableOpacity
      style={[
        Style.action,
        {backgroundColor: theme.floatFab.background},
        isHome
          ? {position: 'absolute', bottom: 32, right: 16}
          : {position: 'absolute', bottom: 94},
      ]}
      onPress={navigate}>
      <Plus size={25} color={theme.floatFab.icon} />
    </TouchableOpacity>
  );
});

export default FloatButton;

const Style = StyleSheet.create({
  action: {
    width: 55,
    height: 55,
    borderRadius: 16,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
  },
  buttonText: {
    fontSize: theme.fontSize.m,
    fontWeight: '600',
  },
});

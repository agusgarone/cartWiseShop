import {Plus} from 'lucide-react-native';
import {memo} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import theme from '../common/theme';

interface IFloatButton {
  navigate: (values: any) => void;
}

const FloatButton = memo(function FloatButton({navigate}: IFloatButton) {
  return (
    <TouchableOpacity
      style={[Style.action, {backgroundColor: '#39bd5c'}]}
      onPress={navigate}>
      <Plus size={25} color="white" />
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

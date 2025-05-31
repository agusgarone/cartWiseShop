import React, {useContext} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from 'react-native';
import theme from '../common/theme';
import {ThemeContext} from '../services/ThemeProvider';

interface IButton {
  isDisabled?: boolean;
  type: 'primary' | 'secondary';
  children: string;
  onPress?: () => void;
  icon?: JSX.Element;
}

const Button = ({children, onPress, isDisabled, type, icon}: IButton) => {
  const {theme} = useContext(ThemeContext);
  const buttonStyles: StyleProp<ViewStyle> = [
    {
      backgroundColor: theme.button.background,
    },
    icon && {display: 'flex', flexDirection: 'row', gap: 10},
    styles.button,
  ];

  return (
    <View>
      <TouchableOpacity
        style={buttonStyles}
        onPress={onPress}
        disabled={isDisabled}>
        {icon && icon}
        <Text
          style={[
            {
              color: theme.button.text,
            },
            styles.buttonText,
          ]}>
          {children}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 12,
  },
  buttonText: {
    fontSize: theme.fontSize.l,
    fontWeight: '700',
    letterSpacing: 0.25,
  },
});

export default Button;

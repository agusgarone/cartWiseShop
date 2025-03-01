import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from 'react-native';
import theme from '../common/theme';

interface IButton {
  isDisabled?: boolean;
  type: 'primary' | 'secondary';
  children: string;
  onPress?: () => void;
  icon?: JSX.Element;
}

const Button = ({children, onPress, isDisabled, type, icon}: IButton) => {
  const buttonStyles: StyleProp<ViewStyle> = [
    {
      backgroundColor:
        type === 'primary' ? theme.colors.primary : theme.colors.white,
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
          style={{
            color:
              type === 'primary' ? theme.colors.white : theme.colors.primary,
          }}>
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
    letterSpacing: 0.25,
    marginBottom: 1,
  },
  // disabledOpacity: {
  //   opacity: 0.5,
  // },
});

export default Button;

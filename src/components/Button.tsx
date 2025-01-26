import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import theme from '../common/theme';

interface IButton {
  isDisabled?: boolean;
  type: 'primary' | 'secondary';
  children: string;
  onPress?: () => void;
}

const Button = ({children, onPress, isDisabled, type}: IButton) => {
  const buttonStyles = [
    {
      backgroundColor:
        type === 'primary' ? theme.colors.primary : theme.colors.white,
      color: type === 'primary' ? theme.colors.white : theme.colors.primary,
    },
    // isDisabled && styles.disabledOpacity,
    styles.button,
  ];

  return (
    <View>
      <TouchableOpacity
        style={buttonStyles}
        onPress={onPress}
        disabled={isDisabled}>
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

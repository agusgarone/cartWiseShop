import React from 'react';
import Button from '../../components/Button';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import theme from '../../common/theme';
import {loginController} from './Controller/loginController';

export default function Login() {
  const {handleLoginGoogle} = loginController();
  return (
    <SafeAreaView style={Style.screen}>
      <View style={Style.home}>
        <Button type="primary" onPress={handleLoginGoogle}>
          {'Iniciar sesión con Google'}
        </Button>
      </View>
    </SafeAreaView>
  );
}

const Style = StyleSheet.create({
  screen: {
    flex: 1,
  },
  home: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 32,
  },
  text: {
    color: theme.colors.grey,
  },
});

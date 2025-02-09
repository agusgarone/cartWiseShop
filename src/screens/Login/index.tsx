import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import theme from '../../common/theme';
import {loginController} from './Controller/loginController';
import {GoogleSigninButton} from '@react-native-google-signin/google-signin';

export default function Login() {
  const {handleLoginGoogle} = loginController();
  return (
    <SafeAreaView style={Style.screen}>
      <View style={Style.home}>
        <View
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 30,
              color: theme.colors.black,
              fontWeight: 'bold',
              width: '70%',
              textAlign: 'center',
            }}>
            Bienvenido a Cart Wise Shop
          </Text>
        </View>
        <GoogleSigninButton
          style={{
            width: '100%',
            paddingVertical: 12,
            paddingHorizontal: 18,
          }}
          color={GoogleSigninButton.Color.Light}
          onPress={handleLoginGoogle}
          // disabled={isInProgress}
        />
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
    justifyContent: 'space-around',
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

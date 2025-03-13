import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import theme from '../../common/theme';
import {loginController} from './Controller/loginController';
import {SignIn} from './Components/SignIn';
import {LoginUser} from './Components/LogInUser';

export default function Login() {
  const {isNew, handleSigninGoogle, handleViewUserLogin, handleLoginGoogle} =
    loginController();

  return (
    <SafeAreaView style={style.screen}>
      <View style={style.home}>
        <View style={style.content}>
          <View
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
            }}>
            <Text style={style.nameApp}>Cart Wise Shop</Text>
          </View>
          {isNew ? (
            <SignIn
              handleSigninGoogle={handleSigninGoogle}
              handleViewUserLogin={handleViewUserLogin}
              key={'SignIn'}
            />
          ) : (
            <LoginUser
              handleLoginGoogle={handleLoginGoogle}
              handleViewUserLogin={handleViewUserLogin}
              key={'LogIn'}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  screen: {
    flex: 1,
  },
  home: {
    flex: 1,
    display: 'flex',
    justifyContent: 'space-around',
    backgroundColor: theme.colors.primary,
    paddingTop: '35%',
  },
  content: {
    flex: 1,
    display: 'flex',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    borderTopRightRadius: 32,
    borderTopLeftRadius: 32,
    paddingHorizontal: 24,
  },
  nameApp: {
    fontSize: 30,
    color: theme.colors.black,
    fontWeight: 'bold',
    width: '70%',
    textAlign: 'center',
  },
  text: {
    color: theme.colors.grey,
  },
});

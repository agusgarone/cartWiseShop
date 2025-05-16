import React, {useContext} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {loginController} from './Controller/loginController';
import {SignIn} from './Components/SignIn';
import {LoginUser} from './Components/LogInUser';
import {ThemeContext} from '../../services/ThemeProvider';

export default function Login() {
  const {theme} = useContext(ThemeContext);
  const {isNew, handleSigninGoogle, handleViewUserLogin, handleLoginGoogle} =
    loginController();

  return (
    <SafeAreaView style={style.screen}>
      <View style={[style.home, {backgroundColor: theme.login.background}]}>
        <View
          style={[style.content, {backgroundColor: theme.login.backgroundDiv}]}>
          <View
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
            }}>
            <Text style={[style.nameApp, {color: theme.login.color}]}>
              Cart Wise Shop
            </Text>
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
    paddingTop: '35%',
  },
  content: {
    flex: 1,
    display: 'flex',
    justifyContent: 'space-around',
    borderTopRightRadius: 32,
    borderTopLeftRadius: 32,
    paddingHorizontal: 24,
  },
  nameApp: {
    fontSize: 30,
    fontWeight: 'bold',
    width: '70%',
    textAlign: 'center',
  },
});

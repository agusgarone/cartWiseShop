import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import theme from '../../common/theme';
import {loginController} from './Controller/loginController';
import Button from '../../components/Button';
import Icon, {IconType} from 'react-native-dynamic-vector-icons';

export default function Login() {
  const {handleLoginGoogle} = loginController();

  return (
    <SafeAreaView style={Style.screen}>
      <View style={Style.home}>
        <View style={Style.content}>
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
              Cart Wise Shop
            </Text>
          </View>
          <Button
            type="primary"
            onPress={handleLoginGoogle}
            icon={
              <Icon
                name="google"
                type={IconType.FontAwesome}
                size={22}
                color={theme.colors.white}
                onPress={() => null}
              />
            }>
            Sign in with Google
          </Button>
        </View>
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
  text: {
    color: theme.colors.grey,
  },
});

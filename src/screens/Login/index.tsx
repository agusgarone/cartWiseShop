import React from 'react';
import Button from '../../components/Button';
import {saveUser, signInWithGoogle} from '../../services/auth';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import theme from '../../common/theme';

export default function Login() {
  return (
    <SafeAreaView style={Style.screen}>
      <View style={Style.home}>
        <Button
          type="primary"
          onPress={async () => {
            try {
              const user = await signInWithGoogle();
              console.log('✅ Usuario autenticado:', user);
              const responseSaveUser = await saveUser(user?.user);
              console.log(responseSaveUser.status);
              console.log(responseSaveUser.error);
              console.log(responseSaveUser.statusText);
            } catch (error) {
              console.error('❌ Error al iniciar sesión:', error);
            }
          }}>
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

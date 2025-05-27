import React from 'react';
import AuthProvider from './src/services/AuthProvider';
import ThemeProvider from './src/services/ThemeProvider';
import StackNavigator from './src/services/StackNavigator';
import {NavigationContainer} from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import 'react-native-url-polyfill/auto';
import './src/services/i18n';

function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <ThemeProvider>
        <AuthProvider>
          <NavigationContainer>
            <StackNavigator />
          </NavigationContainer>
        </AuthProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

export default App;

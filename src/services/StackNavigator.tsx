import {createStackNavigator} from '@react-navigation/stack';
import ListDetail from '../screens/ListDetail';
import AddProducts from '../screens/AddProducts';
import CreateProduct from '../screens/CreateProduct';
import {DrawerNavigator} from './DrawerNavigator';
import Login from '../screens/Login';
import {useContext, useEffect} from 'react';
import {AuthContext} from './AuthProvider';
import UserSettings from '../screens/UserSettings';
import Loader from '../components/Loader';
import {ThemeContext} from './ThemeProvider';

export type StackParamList = {
  Login: undefined;
  MainDrawer: undefined;
  ListDetail: {itemId: string};
  AddProducts: undefined;
  CreateProduct: undefined;
  UserSettings: undefined;
  Loader: undefined;
};

const Stack = createStackNavigator<StackParamList>();

function StackNavigator() {
  const {theme} = useContext(ThemeContext);
  const auth = useContext(AuthContext);

  return (
    <Stack.Navigator initialRouteName="Login">
      {auth?.loading && (
        <Stack.Screen
          name="Loader"
          component={Loader}
          options={{headerShown: false}}
        />
      )}
      {!auth?.session && (
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
      )}
      <Stack.Screen
        name="MainDrawer"
        component={DrawerNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ListDetail"
        component={ListDetail}
        options={{
          title: 'Detalle de lista',
          headerStyle: {
            backgroundColor: theme.stack.background,
          },
          headerTintColor: theme.stack.titleScreen,
          headerTitleStyle: {
            fontWeight: '600',
            color: theme.stack.icon,
          },
        }}
      />
      <Stack.Screen
        name="AddProducts"
        component={AddProducts}
        options={{
          title: 'Añadir productos',
          headerStyle: {
            backgroundColor: theme.stack.background,
          },
          headerTintColor: theme.stack.titleScreen,
          headerTitleStyle: {
            fontWeight: '600',
            color: theme.stack.icon,
          },
        }}
      />
      <Stack.Screen
        name="CreateProduct"
        component={CreateProduct}
        options={{
          title: 'Crear producto',
          headerStyle: {
            backgroundColor: theme.stack.background,
          },
          headerTintColor: theme.stack.titleScreen,
          headerTitleStyle: {
            fontWeight: '600',
            color: theme.stack.icon,
          },
        }}
      />
      <Stack.Screen
        name="UserSettings"
        component={UserSettings}
        options={{
          title: 'Configuración',
          headerStyle: {
            backgroundColor: theme.stack.background,
          },
          headerTintColor: theme.stack.titleScreen,
          headerTitleStyle: {
            fontWeight: '600',
            color: theme.stack.icon,
          },
        }}
      />
    </Stack.Navigator>
  );
}

export default StackNavigator;

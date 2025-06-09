import {createStackNavigator} from '@react-navigation/stack';
import ListDetail from '../screens/ListDetail';
import AddProducts from '../screens/AddProducts';
import CreateProduct from '../screens/CreateProduct';
import {DrawerNavigator} from './DrawerNavigator';
import Login from '../screens/Login';
import {useContext} from 'react';
import {AuthContext} from './AuthProvider';
import UserSettings from '../screens/UserSettings';
import Loader from '../components/Loader';
import {ThemeContext} from './ThemeProvider';
import {useTranslation} from 'react-i18next';

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
  const {t} = useTranslation();
  const {theme} = useContext(ThemeContext);
  const auth = useContext(AuthContext);

  return (
    <Stack.Navigator>
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
          title: t('listDetail.header'),
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
          title: t('addProducts.header'),
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
          title: t('createProduct.header'),
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
          title: t('userSettings.header'),
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

import {createStackNavigator} from '@react-navigation/stack';
import ListDetail from '../screens/ListDetail';
import AddProducts from '../screens/AddProducts';
import CreateProduct from '../screens/CreateProduct';
import {DrawerNavigator} from './DrawerNavigator';
import Login from '../screens/Login';
import {useContext, useEffect} from 'react';
import {AuthContext} from './AuthProvider';
import UserSettings from '../screens/UserSettings';

export type StackParamList = {
  Login: undefined;
  MainDrawer: undefined;
  ListDetail: {itemId: string};
  AddProducts: undefined;
  CreateProduct: undefined;
  UserSettings: undefined;
};

const Stack = createStackNavigator<StackParamList>();

function StackNavigator() {
  const auth = useContext(AuthContext);

  return (
    <Stack.Navigator initialRouteName="Login">
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
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AddProducts"
        component={AddProducts}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CreateProduct"
        component={CreateProduct}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="UserSettings"
        component={UserSettings}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default StackNavigator;

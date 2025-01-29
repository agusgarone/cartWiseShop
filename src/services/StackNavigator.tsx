import {createStackNavigator} from '@react-navigation/stack';
import ListDetail from '../screens/ListDetail';
import AddProducts from '../screens/AddProducts';
import CreateProduct from '../screens/CreateProduct';
import {DrawerNavigator} from './DrawerNavigator';

export type StackParamList = {
  MainDrawer: undefined;
  ListDetail: {itemId: string};
  AddProducts: undefined;
  CreateProduct: undefined;
};

const Stack = createStackNavigator<StackParamList>();

function StackNavigator() {
  return (
    <Stack.Navigator initialRouteName="MainDrawer">
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
    </Stack.Navigator>
  );
}

export default StackNavigator;

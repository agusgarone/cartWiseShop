import {createDrawerNavigator} from '@react-navigation/drawer';
import BottomTabs from './TabsNavigator';
import Products from '../screens/Products';

export type DrawerParamList = {
  MainTabs: undefined;
  ProductsDrawer: undefined;
};

const Drawer = createDrawerNavigator<DrawerParamList>();

export function DrawerNavigator() {
  return (
    <Drawer.Navigator initialRouteName="MainTabs">
      <Drawer.Screen options={{headerShown: false}} name="MainTabs">
        {props => <BottomTabs {...props} />}
      </Drawer.Screen>
      <Drawer.Screen options={{headerShown: false}} name="ProductsDrawer">
        {props => <Products />}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
}

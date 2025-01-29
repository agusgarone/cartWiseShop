import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomDrawerContent from '../screens/FilterProducts';
import BottomTabs from './TabsNavigator';
import Products from '../screens/Products';

export type DrawerParamList = {
  MainTabs: undefined;
  ProductsDrawer: undefined;
};

const Drawer = createDrawerNavigator<DrawerParamList>();

export function DrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="MainTabs"
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerStyle: {
          backgroundColor: '#f5f5f5',
          width: 300,
        },
      }}>
      <Drawer.Screen options={{headerShown: false}} name="MainTabs">
        {props => <BottomTabs {...props} />}
      </Drawer.Screen>
      <Drawer.Screen options={{headerShown: false}} name="ProductsDrawer">
        {props => <Products NavProduct={props.navigation} />}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
}

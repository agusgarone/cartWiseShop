import {createDrawerNavigator} from '@react-navigation/drawer';
import Products from '../screens/Products';
import CustomDrawerContent from '../screens/FilterProducts';

const Drawer = createDrawerNavigator();

export function DrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="Main"
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerStyle: {
          backgroundColor: '#f5f5f5',
          width: 300,
        },
      }}>
      <Drawer.Screen
        name="Main"
        component={Products}
        options={{headerShown: false}}
      />
    </Drawer.Navigator>
  );
}

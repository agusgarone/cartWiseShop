import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import CreateList from '../screens/CreateList';
import theme from '../common/theme';
import Products from '../screens/Products';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {House, ListPlus, ShoppingBasket} from 'lucide-react-native';

export type TabsParamList = {
  Home: undefined;
  CreateList: undefined;
  ProductsTab: undefined;
};

const Tab = createBottomTabNavigator<TabsParamList>();

type DrawerNavigation = DrawerScreenProps<any, 'MainTabs'>;

const BottomTabs = ({navigation}: DrawerNavigation) => {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen
        name="Home"
        options={{
          header: () => null,
          tabBarIcon: ({focused}) => (
            <House
              color={focused ? theme.colors.primary : theme.colors.grey}
              size={25}
            />
          ),
          tabBarActiveTintColor: theme.colors.primary,
        }}
        component={Home}
      />
      <Tab.Screen
        name="CreateList"
        options={{
          header: () => null,
          tabBarLabel: 'Create list',
          tabBarIcon: ({focused}) => (
            <ListPlus
              color={focused ? theme.colors.primary : theme.colors.grey}
              size={25}
            />
          ),
          tabBarActiveTintColor: theme.colors.primary,
        }}
        component={CreateList}
      />
      <Tab.Screen
        name="ProductsTab"
        options={{
          header: () => null,
          tabBarLabel: 'Products',
          tabBarIcon: ({focused}) => (
            <ShoppingBasket
              color={focused ? theme.colors.primary : theme.colors.grey}
              size={25}
            />
          ),
          tabBarActiveTintColor: theme.colors.primary,
        }}>
        {props => <Products NavMainTabs={navigation} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default BottomTabs;

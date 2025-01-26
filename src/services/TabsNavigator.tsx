import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import CreateList from '../screens/CreateList';
import Icon, {IconType} from 'react-native-dynamic-vector-icons';
import theme from '../common/theme';
import {DrawerNavigator} from './DrawerNavigator';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        options={{
          header: () => null,
          tabBarIcon: ({focused}) => (
            <Icon
              name="home"
              type={IconType.FontAwesome}
              size={25}
              color={focused ? theme.colors.primary : theme.colors.grey}
              onPress={() => {}}
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
            <Icon
              name="plus"
              type={IconType.FontAwesome}
              size={25}
              color={focused ? theme.colors.primary : theme.colors.grey}
              onPress={() => {}}
            />
          ),
          tabBarActiveTintColor: theme.colors.primary,
        }}
        component={CreateList}
      />
      <Tab.Screen
        name="Products"
        options={{
          header: () => null,
          tabBarLabel: 'Products',
          tabBarIcon: ({focused}) => (
            <Icon
              name="list"
              type={IconType.FontAwesome}
              size={25}
              color={focused ? theme.colors.primary : theme.colors.grey}
              onPress={() => {}}
            />
          ),
          tabBarActiveTintColor: theme.colors.primary,
        }}
        component={DrawerNavigator}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;

import React, {useContext} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import CreateList from '../screens/CreateList';
import Products from '../screens/Products';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {House, ListPlus, ShoppingBasket} from 'lucide-react-native';
import {ThemeContext} from './ThemeProvider';
import {useTranslation} from 'react-i18next';

export type TabsParamList = {
  Home: undefined;
  CreateList: undefined;
  ProductsTab: undefined;
};

const Tab = createBottomTabNavigator<TabsParamList>();

type DrawerNavigation = DrawerScreenProps<any, 'MainTabs'>;

const BottomTabs = ({navigation}: DrawerNavigation) => {
  const {t} = useTranslation();
  const {theme} = useContext(ThemeContext);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: theme.tab.background,
        },
      }}
      initialRouteName="Home">
      <Tab.Screen
        name="Home"
        options={{
          header: () => null,
          tabBarIcon: ({focused}) => (
            <House
              color={focused ? theme.tab.iconFocus : theme.tab.icon}
              size={25}
            />
          ),
          title: t('home.tab'),
          tabBarActiveTintColor: theme.tab.activeTabColor,
        }}
        component={Home}
      />
      <Tab.Screen
        name="CreateList"
        options={{
          header: () => null,
          tabBarIcon: ({focused}) => (
            <ListPlus
              color={focused ? theme.tab.iconFocus : theme.tab.icon}
              size={25}
            />
          ),
          title: t('createList.tab'),
          tabBarActiveTintColor: theme.tab.activeTabColor,
        }}
        component={CreateList}
      />
      <Tab.Screen
        name="ProductsTab"
        options={{
          header: () => null,
          tabBarIcon: ({focused}) => (
            <ShoppingBasket
              color={focused ? theme.tab.iconFocus : theme.tab.icon}
              size={25}
            />
          ),
          title: t('products.tab'),
          tabBarActiveTintColor: theme.tab.activeTabColor,
        }}>
        {props => <Products NavMainTabs={navigation} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default BottomTabs;

import {createStackNavigator} from '@react-navigation/stack';
import ListDetail from '../screens/ListDetail';
import AddProducts from '../screens/AddProducts';
import CreateProduct from '../screens/CreateProduct';
import {DrawerNavigator} from '../components/DrawerNavigator';
// import Login from '../screens/Login';
import {useContext} from 'react';
// import {AuthContext} from './AuthProvider';
// UserSettings no se importa aquí: arrastra loginService → facade → supabase y dispara red al inicio
// import Loader from '../components/Loader';
import {ThemeContext} from './ThemeProvider';
import {useTranslation} from 'react-i18next';
import CreateList from '../screens/CreateList';
import EditList from '../screens/EditList';
import VoiceProductsReview from '../screens/VoiceProductsReview';
import type {ParsedProduct} from '../types/ticket';

export type StackParamList = {
  Login: undefined;
  MainDrawer: undefined;
  ListDetail: {itemId: string};
  CreateList: undefined;
  EditList: undefined;
  AddProducts: undefined;
  CreateProduct: undefined;
  UserSettings: undefined;
  Loader: undefined;
  VoiceProductsReview: {products: ParsedProduct[]};
};

const Stack = createStackNavigator<StackParamList>();

function StackNavigator() {
  const {t} = useTranslation();
  const {theme} = useContext(ThemeContext);
  // const auth = useContext(AuthContext);

  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: {backgroundColor: theme.stack.background},
      }}>
      {/* {auth?.loading && (
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
      )} */}
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
        getComponent={() => require('../screens/UserSettings').default}
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
      <Stack.Screen
        name="CreateList"
        component={CreateList}
        options={{
          title: t('createList.stack'),
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
        name="EditList"
        component={EditList}
        options={{
          title: t('editList.stack'),
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
        name="VoiceProductsReview"
        component={VoiceProductsReview}
        options={{
          title: t('products.voiceReview.headerStack'),
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

import {createStackNavigator} from '@react-navigation/stack';
import {DrawerNavigator} from './DrawerNavigator';
import {useContext, useEffect, useState} from 'react';
import {ThemeContext} from '../ThemeProvider';
import {useTranslation} from 'react-i18next';
import ListEditorScreen from '../../screens/ListEditorScreen';
import type {ParsedProduct} from '../../types/ticket';
import Onboarding from '../../screens/Onboarding';
import {StorageService} from '../../storage/asyncStorage';

export type ListEditorMode = 'shopping' | 'editing';

export type StackParamList = {
  Onboarding: undefined;
  Login: undefined;
  MainDrawer: undefined;
  ListEditor: {
    listId?: number;
    voiceParsedProducts?: ParsedProduct[];
    initialMode?: ListEditorMode;
  };
  Loader: undefined;
};

const Stack = createStackNavigator<StackParamList>();
const ONBOARDING_STORAGE_KEY = '@onboarding_completed';

function StackNavigator() {
  const {t} = useTranslation();
  const {theme} = useContext(ThemeContext);
  const [isOnboardingReady, setIsOnboardingReady] = useState(false);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadOnboardingStatus = async () => {
      const onboardingValue = await StorageService.getItem(
        ONBOARDING_STORAGE_KEY,
      );

      if (!isMounted) return;

      setHasCompletedOnboarding(Boolean(onboardingValue));
      setIsOnboardingReady(true);
    };

    loadOnboardingStatus();

    return () => {
      isMounted = false;
    };
  }, []);

  if (!isOnboardingReady) {
    return null;
  }

  return (
    <Stack.Navigator
      initialRouteName={hasCompletedOnboarding ? 'MainDrawer' : 'Onboarding'}
      screenOptions={{
        cardStyle: {backgroundColor: theme.stack.background},
      }}>
      {!hasCompletedOnboarding && (
        <Stack.Screen
          name="Onboarding"
          component={Onboarding}
          options={{headerShown: false}}
        />
      )}
      <Stack.Screen
        name="MainDrawer"
        component={DrawerNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ListEditor"
        component={ListEditorScreen}
        options={{
          title: t('listEditor.header'),
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

import React, {useContext, useMemo, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import type {StackScreenProps} from '@react-navigation/stack';
import {ThemeContext} from '../../services/ThemeProvider';
import type {StackParamList} from '../../services/navigation/StackNavigator';
import {StorageService} from '../../storage/asyncStorage';
import Button from '../../components/Button';
import Tab1 from './tabs/tab1';
import Tab2 from './tabs/tab2';
import Tab3 from './tabs/tab3';
import Tab4 from './tabs/tab4';
import {speechRecognitionNative} from '../../features/voice/speechRecognitionNative';
import {useTranslation} from 'react-i18next';

const LAST_TAB_INDEX = 3;
const ONBOARDING_STORAGE_KEY = '@onboarding_completed';

type OnboardingProps = StackScreenProps<StackParamList, 'Onboarding'>;

const Onboarding = ({navigation}: OnboardingProps) => {
  const {t} = useTranslation();
  const {theme} = useContext(ThemeContext);
  const [currentTab, setCurrentTab] = useState(0);
  const [loading, setLoading] = useState(false);

  const tabs = useMemo(() => [Tab1, Tab2, Tab3, Tab4], []);

  const CurrentTabComponent = tabs[currentTab];
  const isLastTab = currentTab === LAST_TAB_INDEX;

  const finishOnboarding = async () => {
    try {
      setLoading(true);
      await StorageService.setItem(ONBOARDING_STORAGE_KEY, true);
      navigation.replace('MainDrawer');
    } finally {
      setLoading(false);
    }
  };

  const goNext = async () => {
    if (isLastTab) {
      try {
        await speechRecognitionNative.requestPermissionsAsync();
      } catch (error) {
        // Si falla el request, no bloqueamos el cierre del onboarding.
      }
      await finishOnboarding();
      return;
    }

    setCurrentTab(prev => prev + 1);
  };

  const goBack = () => {
    setCurrentTab(prev => (prev > 0 ? prev - 1 : prev));
  };

  return (
    <SafeAreaView
      style={[styles.screen, {backgroundColor: theme.backgroundScreen}]}>
      <View style={[styles.card, {backgroundColor: theme.modal.background}]}>
        <View style={styles.stepContainer}>
          {tabs.map((_, index) => (
            <TouchableOpacity
              key={`tab-indicator-${index}`}
              accessibilityRole="button"
              accessibilityLabel={t('onboarding.goToStepA11y', {
                step: index + 1,
              })}
              onPress={() => setCurrentTab(index)}
              style={[
                styles.stepDot,
                {
                  backgroundColor:
                    index === currentTab
                      ? theme.tab.activeTabColor
                      : theme.input.borderColor,
                },
              ]}
            />
          ))}
        </View>

        <CurrentTabComponent
          titleColor={theme.stack.titleScreen}
          descriptionColor={theme.home.color}
          iconColor={theme.tab.activeTabColor}
          fontSize={{l: 16, xxxl: 24}}
        />

        <View style={styles.buttonsContainer}>
          {currentTab > 0 && (
            <View style={styles.buttonItem}>
              <Button type="secondary" onPress={goBack}>
                {t('onboarding.back')}
              </Button>
            </View>
          )}

          <View style={styles.buttonItem}>
            <Button type="primary" onPress={goNext} isDisabled={loading}>
              {isLastTab ? t('onboarding.start') : t('onboarding.next')}
            </Button>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  card: {
    flex: 1,
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  stepContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  stepDot: {
    width: 10,
    height: 10,
    borderRadius: 50,
  },
  buttonsContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  buttonItem: {
    flex: 1,
  },
  skipText: {
    marginTop: 14,
    textAlign: 'center',
    fontWeight: '600',
  },
});

export default Onboarding;

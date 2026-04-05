import {Image, Text, View} from 'react-native';
import Button from '../../../components/Button';
import {ThemeContext} from '../../../services/ThemeProvider';
import {useContext} from 'react';
import {CirclePlus, Mic} from 'lucide-react-native';
import {useTranslation} from 'react-i18next';

interface EmptyListProps {
  navigateToCreateListWithVoice: () => void;
  navigateToCreateList: () => void;
  userAlreadyCreatedLists: boolean;
  hasCompletedOnboarding: boolean;
}

export const EmptyList = ({
  navigateToCreateListWithVoice,
  navigateToCreateList,
  userAlreadyCreatedLists = false,
  hasCompletedOnboarding = false,
}: EmptyListProps) => {
  const {theme} = useContext(ThemeContext);
  const {t} = useTranslation();
  return (
    <View
      style={{
        flex: 1,
        padding: 16,
        gap: 16,
        height: '100%',
      }}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
        <Image
          style={{width: 270, height: 270}}
          source={require('../../../assets/images/bag-grocery.png')}
        />
        <View
          style={{
            gap: 8,
            justifyContent: 'center',
            alignItems: 'center',
            // width: 260,s
          }}>
          <Text
            style={{
              fontSize: 24,
              fontWeight: 'bold',
              color: theme.home.color,
              textAlign: 'center',
            }}>
            {hasCompletedOnboarding
              ? t('home.emptyList.titleOnboardingComplete')
              : t('home.emptyList.titleOnboardingPending')}
          </Text>
          <Text
            style={{
              fontSize: 14,
              textAlign: 'center',
              color: theme.home.color,
            }}>
            {hasCompletedOnboarding
              ? t('home.emptyList.subtitleMore')
              : t('home.emptyList.subtitleFirst')}
          </Text>
        </View>
      </View>

      {!userAlreadyCreatedLists && (
        <View style={{gap: 10}}>
          <Button
            children={t('home.emptyList.voiceButton')}
            onPress={navigateToCreateListWithVoice}
            type="primary"
            icon={<Mic size={22} color={theme.home.emptyList.iconIA} />}
          />
          <Text
            style={{
              fontSize: 14,
              textAlign: 'center',
              color: theme.home.color,
            }}>
            {t('home.emptyList.orAlso')}
          </Text>

          <Button
            children={t('home.emptyList.manualButton')}
            onPress={navigateToCreateList}
            type="secondary"
            icon={
              <CirclePlus size={22} color={theme.home.emptyList.iconManual} />
            }
          />
        </View>
      )}
    </View>
  );
};

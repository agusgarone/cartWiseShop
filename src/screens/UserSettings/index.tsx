import React, {useContext} from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import theme from '../../common/theme';
import {userSettingsController} from './Controller/userSettingsController';
import {Moon, Sun} from 'lucide-react-native';
import CountryFlag from 'react-native-country-flag';
import {ThemeContext} from '../../services/ThemeProvider';
import {useTranslation} from 'react-i18next';
import Button from '../../components/Button';
import Loader from '../../components/Loader';

const UserSettings = () => {
  const {
    themeApp,
    user,
    lang,
    loading,
    handleChangeTheme,
    handleChangeLanguage,
    capitalizeEachWord,
    capitalizeFirstLetter,
    logOut,
  } = userSettingsController();
  const {t} = useTranslation();
  const {theme} = useContext(ThemeContext);
  return (
    <SafeAreaView style={Style.screen}>
      <View
        style={[Style.home, {backgroundColor: theme.userSettings.background}]}>
        <View
          style={[
            Style.content,
            {backgroundColor: theme.userSettings.backgroundDiv},
          ]}>
          {loading ? (
            <Loader />
          ) : (
            <>
              <View>
                <View style={Style.containerImage}>
                  {user?.photoURL && (
                    <Image source={{uri: user?.photoURL}} style={Style.image} />
                  )}
                </View>
                <View style={Style.infoUser}>
                  <Text
                    style={[
                      Style.nameGoogle,
                      {color: theme.userSettings.nameColor},
                    ]}>
                    {capitalizeEachWord(user?.displayName || '')}
                  </Text>
                  <Text
                    style={[
                      Style.byGoogle,
                      {color: theme.userSettings.descriptionColor},
                    ]}>
                    {t('userSettings.profileCreatedWith')}
                    {` ${capitalizeFirstLetter(
                      user?.providerId.split('.')[0] || '',
                    )}`}
                  </Text>
                </View>
                <View style={Style.settingsContainer}>
                  <View style={Style.itemSetting}>
                    <Text
                      style={[
                        Style.itemSettingText,
                        {color: theme.userSettings.itemSettingColor},
                      ]}>
                      {t('userSettings.language')}
                    </Text>
                    <TouchableOpacity onPress={() => handleChangeLanguage()}>
                      {lang && (
                        <CountryFlag
                          isoCode={lang === 'en' ? 'us' : lang.toLowerCase()}
                          size={20}
                          style={{borderRadius: 6}}
                        />
                      )}
                    </TouchableOpacity>
                  </View>
                  <View style={Style.itemSetting}>
                    <Text
                      style={[
                        Style.itemSettingText,
                        {color: theme.userSettings.itemSettingColor},
                      ]}>
                      {t('userSettings.appTheme')}
                    </Text>
                    <TouchableOpacity onPress={handleChangeTheme}>
                      {themeApp === 'light' ? (
                        <Sun color={theme.userSettings.iconColor} />
                      ) : (
                        <Moon color={theme.userSettings.iconColor} />
                      )}
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <View>
                <Button type="primary" onPress={logOut}>
                  {t('userSettings.logOut')}
                </Button>
              </View>
            </>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const Style = StyleSheet.create({
  screen: {
    flex: 1,
  },
  home: {
    flex: 1,
    display: 'flex',
    justifyContent: 'space-around',
    paddingTop: '25%',
  },
  content: {
    flex: 1,
    display: 'flex',
    borderTopRightRadius: 32,
    borderTopLeftRadius: 32,
    paddingHorizontal: 24,
    paddingBottom: 32,
    justifyContent: 'space-between',
  },
  containerImage: {
    width: 100,
    height: 100,
    borderRadius: 99,
    overflow: 'hidden',
    position: 'relative',
    top: -40,
    alignSelf: 'center',
  },
  image: {
    height: '100%',
    width: '100%',
  },
  infoUser: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    height: 70,
    gap: 8,
    marginBottom: 50,
  },
  nameGoogle: {
    fontSize: theme.fontSize.xxxl,
  },
  byGoogle: {
    fontSize: theme.fontSize.l,
  },
  settingsContainer: {
    display: 'flex',
    width: '100%',
    gap: 16,
  },
  itemSetting: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemSettingText: {
    fontSize: theme.fontSize.xl,
  },
});

export default UserSettings;

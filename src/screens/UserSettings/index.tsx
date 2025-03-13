import React from 'react';
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
import PreviewList from './Components/PreviewList';
import CountryFlag from 'react-native-country-flag';

const UserSettings = () => {
  const {
    themeApp,
    user,
    lang,
    selectedOption,
    handleChangeTheme,
    handleChangeLanguage,
    handleChangeViewList,
  } = userSettingsController();
  return (
    <SafeAreaView style={Style.screen}>
      <View style={Style.home}>
        <View style={Style.content}>
          <View style={Style.containerImage}>
            {user?.photoURL && (
              <Image source={{uri: user?.photoURL}} style={Style.image} />
            )}
          </View>
          <View style={Style.infoUser}>
            <Text style={Style.nameGoogle}>{'agus garone'}</Text>
            <Text style={Style.byGoogle}>{'Perfil creado con Google'}</Text>
          </View>
          <View style={Style.settingsContainer}>
            <View style={Style.itemSetting}>
              <Text style={Style.itemSettingText}>Idioma</Text>
              <TouchableOpacity onPress={handleChangeLanguage}>
                <CountryFlag
                  isoCode={lang === 'en' ? 'us' : lang.toLowerCase()}
                  size={20}
                  style={{borderRadius: 6}}
                />
              </TouchableOpacity>
            </View>
            <View style={Style.itemSetting}>
              <Text style={Style.itemSettingText}>Tema de la app</Text>
              <TouchableOpacity onPress={handleChangeTheme}>
                {themeApp === 'light' ? (
                  <Sun color={theme.colors.black} />
                ) : (
                  <Moon color={theme.colors.black} />
                )}
              </TouchableOpacity>
            </View>
            <PreviewList
              handleChangeViewList={handleChangeViewList}
              selectedOption={selectedOption}
            />
          </View>
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
    backgroundColor: theme.colors.primary,
    paddingTop: '25%',
  },
  content: {
    flex: 1,
    display: 'flex',
    backgroundColor: 'white',
    borderTopRightRadius: 32,
    borderTopLeftRadius: 32,
    paddingHorizontal: 24,
  },
  containerImage: {
    width: 100,
    height: 100,
    borderRadius: 99,
    overflow: 'hidden',
    backgroundColor: 'red',
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
    color: theme.colors.black,
  },
  byGoogle: {
    fontSize: theme.fontSize.l,
    color: theme.colors.grey,
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
    color: theme.colors.black,
  },
});

export default UserSettings;

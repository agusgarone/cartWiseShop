import {useCallback, useContext, useEffect, useState} from 'react';
import {NavigationContext, useFocusEffect} from '@react-navigation/native';
import {
  editLanguage,
  editListView,
  editTheme,
  fetchUserById,
} from '../../Login/Service/loginService';
import {User} from '../../../models/types/user';
import {ThemeContext} from '../../../services/ThemeProvider';
import i18n from '../../../services/i18n';
import {logOutSupabase} from '../../Login/Api/facade';

export const userSettingsController = () => {
  const navigation = useContext(NavigationContext);
  const {mode, setMode} = useContext(ThemeContext);
  const [user, setUser] = useState<User | null>(null);
  const [themeApp, setTheme] = useState<'light' | 'dark'>(mode);
  const [lang, setLang] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState('original');
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async (filters?: any) => {
    const userData = await fetchUserById();
    setUser(userData.data);
    setLoading(false);
  };

  useEffect(() => {
    if (user) {
      setTheme(user.theme as 'light' | 'dark');
      setLang(user.language);
      setSelectedOption(user.listView);
    }
  }, [user]);

  const logOut = async () => {
    const {error} = await logOutSupabase();
    if (error) {
      console.error('❌ Error al desloguearse:', error.message);
    } else {
      navigation?.navigate('Login');
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();

      return () => {
        console.log('🔄 Cleanup: Se desmonta el listener');
      };
    }, []),
  );

  const handleChangeTheme = () => {
    if (themeApp === 'light') {
      setTheme('dark');
      console.log('Dark');
      handleEditTheme('dark');
    } else {
      setTheme('light');
      console.log('Light');
      handleEditTheme('light');
    }
  };

  const handleChangeLanguage = () => {
    switch (lang) {
      case 'es':
        setLang('en');
        console.log('EN');
        handleEditLang('en');
        i18n.changeLanguage('en');
        break;
      case 'en':
        setLang('it');
        console.log('IT');
        handleEditLang('it');
        i18n.changeLanguage('it');
        break;
      case 'it':
        setLang('es');
        console.log('ES');
        handleEditLang('es');
        i18n.changeLanguage('es');
        break;
    }
  };

  const handleEditLang = async (lang: string) => {
    await editLanguage(lang);
  };

  const handleEditTheme = async (theme: 'light' | 'dark') => {
    await editTheme(theme);
    setMode(theme);
  };

  const capitalizeFirstLetter = (text: string) => {
    if (!text) return '';
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  const capitalizeEachWord = (text: string) => {
    return text
      .split(' ')
      .map(word => capitalizeFirstLetter(word))
      .join(' ');
  };

  // const handleEditListView = async (listView: string) => {
  //   setSelectedOption(listView);
  //   await editListView(listView);
  // };

  // const handleChangeViewList = (
  //   // viewType: 'original' | 'separated' | 'sorted',
  //   viewType: string,
  // ) => {
  //   console.log('viewType', viewType);
  //   handleEditListView(viewType);
  // };

  return {
    user,
    themeApp,
    lang,
    loading,
    logOut,
    handleChangeTheme,
    handleChangeLanguage,
    capitalizeEachWord,
    capitalizeFirstLetter,
  };
};

import {useContext, useEffect, useState} from 'react';
import {NavigationContext} from '@react-navigation/native';
import {IProductDTO} from '../../../models/types/product';
import {StorageService} from '../../../storage/asyncStorage';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';

export const userSettingsController = () => {
  const navigation = useContext(NavigationContext);
  const [user, setUser] = useState<FirebaseAuthTypes.User>();
  const [themeApp, setTheme] = useState<'Light' | 'Dark'>('Light');
  const [lang, setLang] = useState<'ES' | 'EN' | 'IT'>('ES');

  const fetchData = async (filters?: any) => {
    const userAuthenticated: FirebaseAuthTypes.User =
      await StorageService.getItem('userAuthenticated');
    setUser(userAuthenticated);
  };

  const logOut = async (product: IProductDTO) => {};

  useEffect(() => {
    navigation?.addListener('focus', () => {
      fetchData();
    });
  }, []);

  const handleChangeTheme = () => {
    if (themeApp === 'Light') {
      setTheme('Dark');
    } else {
      setTheme('Light');
    }
  };

  const handleChangeLanguage = () => {
    if (lang === 'ES') {
      setLang('EN');
    } else if (lang === 'EN') {
      setLang('IT');
    } else {
      setLang('ES');
    }
  };

  return {
    user,
    themeApp,
    lang,
    handleChangeTheme,
    handleChangeLanguage,
  };
};

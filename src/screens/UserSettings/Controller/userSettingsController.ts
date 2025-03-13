import {useContext, useEffect, useState} from 'react';
import {NavigationContext} from '@react-navigation/native';
import {IProductDTO} from '../../../models/types/product';
import {StorageService} from '../../../storage/asyncStorage';
import {
  editLanguage,
  editListView,
  editTheme,
} from '../../Login/Service/loginService';
import {User} from '../../../models/types/user';

export const userSettingsController = () => {
  const navigation = useContext(NavigationContext);
  const [user, setUser] = useState<User>();
  const [themeApp, setTheme] = useState<'light' | 'dark'>('light');
  const [lang, setLang] = useState<'es' | 'en' | 'it'>('es');

  const fetchData = async (filters?: any) => {
    const userAuthenticated: User = await StorageService.getItem(
      'userAuthenticated',
    );
    console.log(userAuthenticated);
    setUser(userAuthenticated);
  };

  const logOut = async (product: IProductDTO) => {};

  useEffect(() => {
    navigation?.addListener('focus', () => {
      fetchData();
    });
  }, []);

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
        break;
      case 'en':
        setLang('it');
        console.log('IT');
        handleEditLang('it');
        break;
      case 'it':
        setLang('es');
        console.log('ES');
        handleEditLang('es');
        break;
    }
  };

  const handleEditLang = async (lang: string) => {
    const responseEditLang = await editLanguage(user, lang);
    console.log('responseEditLang', responseEditLang);
  };

  const handleEditTheme = async (theme: string) => {
    const responseEditTheme = await editTheme(user, theme);
    console.log('responseEditTheme', responseEditTheme);
  };

  const handleEditListView = async (listView: string) => {
    const responseListView = await editListView(user, listView);
    console.log('responseListView', responseListView);
  };

  const handleChangeViewList = (
    // viewType: 'original' | 'separated' | 'sorted',
    viewType: string,
  ) => {
    console.log('viewType', viewType);
    handleEditListView(viewType);
  };

  return {
    user,
    themeApp,
    lang,
    handleChangeTheme,
    handleChangeLanguage,
    handleChangeViewList,
  };
};

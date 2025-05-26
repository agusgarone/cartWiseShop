import React, {useContext} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import Header from '../../components/Header';
import List from '../../components/List';
import RenderList from './Components/RenderList';
import {IListDTO} from '../../models/types/list';
import {homeController} from './Controller/homeController';
import {IProductDTO} from '../../models/types/product';
import ProfileButton from '../../components/ProfileButton';
import Loader from '../../components/Loader';
import {ThemeContext} from '../../services/ThemeProvider';
import {useTranslation} from 'react-i18next';

const Home = () => {
  const {
    list,
    navigateToListDetail,
    navigateToEditList,
    navigateToUserSettings,
    user,
    loading,
  } = homeController();
  const {t} = useTranslation();
  const {theme} = useContext(ThemeContext);

  const _renderList = ({item}: {item: IListDTO<IProductDTO>}) => {
    return (
      <RenderList
        item={item}
        navigateToListDetail={navigateToListDetail}
        navigateToEditList={navigateToEditList}
      />
    );
  };

  return (
    <SafeAreaView
      style={[Style.screen, {backgroundColor: theme.backgroundScreen}]}>
      <View style={Style.home}>
        <Header
          center={
            <Text style={{color: theme.home.color}}>{t('home.nameApp')}</Text>
          }
          left={
            <ProfileButton
              onPress={navigateToUserSettings}
              imageUrl={user?.photoURL || ''}
            />
          }
          right={<></>}
          key={'Header'}
        />
        <View style={Style.content}>
          {loading ? <Loader /> : <List data={list} render={_renderList} />}
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
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 32,
  },
});

export default Home;

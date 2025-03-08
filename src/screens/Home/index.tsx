import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import Header from '../../components/Header';
import List from '../../components/List';
import RenderList from './Components/RenderList';
import {IListDTO} from '../../models/types/list';
import theme from '../../common/theme';
import {homeController} from './Controller/homeController';
import {IProductDTO} from '../../models/types/product';
import ProfileButton from '../../components/ProfileButton';

const Home = () => {
  const {
    list,
    navigateToListDetail,
    navigateToEditList,
    navigateToUserSettings,
    user,
  } = homeController();

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
    <SafeAreaView style={Style.screen}>
      <View style={Style.home}>
        <Header
          center={<Text style={Style.text}>ShopListApp</Text>}
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
          <List data={list} render={_renderList} />
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
  text: {
    color: theme.colors.grey,
  },
});

export default Home;

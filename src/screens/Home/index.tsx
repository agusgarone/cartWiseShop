import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import Header from '../../components/Header';
import List from '../../components/List';
import RenderList from './Components/RenderList';
import {IList} from '../../models/list';
import theme from '../../common/theme';
import {homeController} from './Controller/homeController';
import {IProduct} from '../../models/product';

const Home = () => {
  const {list, navigateToListDetail, navigateToEditList} = homeController();

  const _renderList = ({item}: {item: IList<IProduct>}) => {
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
          left={<></>}
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

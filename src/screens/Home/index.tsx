import React, {useContext} from 'react';
import {FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import Header from '../../components/Header';
import RenderList from './Components/RenderList';
import {homeController} from './Controller/homeController';
import ProfileButton from '../../components/ProfileButton';
import Loader from '../../components/Loader';
import {ThemeContext} from '../../services/ThemeProvider';
import {useTranslation} from 'react-i18next';
import FloatButton from '../../components/FloatButton';

const Home = () => {
  const {
    list,
    // user,
    loading,
    navigateToListDetail,
    navigateToEditList,
    navigateToUserSettings,
    navigateToCreateList,
  } = homeController();
  const {t} = useTranslation();
  const {theme} = useContext(ThemeContext);

  return (
    <SafeAreaView
      style={[Style.screen, {backgroundColor: theme.backgroundScreen}]}>
      <View style={Style.home}>
        <Header
          center={
            <Text style={{color: theme.home.color}}>{t('home.nameApp')}</Text>
          }
          left={
            // <ProfileButton
            //   onPress={navigateToUserSettings}
            //   imageUrl={user?.photoURL || ''}
            // />
            <></>
          }
          right={<></>}
          key={'Header'}
        />
        <View style={Style.content}>
          {loading ? (
            <Loader />
          ) : (
            <>
              <FlatList
                data={list}
                renderItem={({item}) => (
                  <RenderList
                    item={item}
                    navigateToListDetail={navigateToListDetail}
                    navigateToEditList={navigateToEditList}
                  />
                )}
                style={{paddingVertical: 5}}
                ListFooterComponent={() => (
                  <View
                    style={{
                      marginVertical: 20,
                    }}></View>
                )}
              />
              <FloatButton
                navigate={navigateToCreateList}
                isHome
                key={'FloatButton'}
              />
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
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
});

export default Home;

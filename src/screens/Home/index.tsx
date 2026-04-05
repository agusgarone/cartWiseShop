import React, {useContext, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Sparkles} from 'lucide-react-native';
import Header from '../../components/Header';
import RenderList from './Components/RenderList';
import {homeController} from './Controller/homeController';
import Loader from '../../components/Loader';
import {ThemeContext} from '../../services/ThemeProvider';
import {useTranslation} from 'react-i18next';
import FloatButton from '../../components/FloatButton';
import {VoiceShoppingListModal} from '../../features/voice/components/VoiceShoppingListModal';
import {EmptyList} from './Components/EmptyList';

const Home = () => {
  const {
    list,
    loading,
    navigateToListDetail,
    navigateToEditList,
    navigateToCreateList,
    navigateToCreateListWithVoice,
    hasCompletedOnboarding,
    userAlreadyCreatedLists,
  } = homeController();
  const {t} = useTranslation();
  const {theme} = useContext(ThemeContext);
  const [aiVoiceOpen, setAiVoiceOpen] = useState(false);

  return (
    <SafeAreaView
      style={[Style.screen, {backgroundColor: theme.backgroundScreen}]}>
      <View style={Style.home}>
        <Header
          center={
            <Text style={{color: theme.home.color}}>{t('home.nameApp')}</Text>
          }
          left={<></>}
          right={<></>}
          key={'Header'}
        />
        <View style={Style.content}>
          {loading ? (
            <Loader />
          ) : (
            <View style={Style.listWrap}>
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
                ListEmptyComponent={
                  <EmptyList
                    navigateToCreateList={navigateToCreateList}
                    navigateToCreateListWithVoice={() => setAiVoiceOpen(true)}
                    userAlreadyCreatedLists={userAlreadyCreatedLists}
                    hasCompletedOnboarding={hasCompletedOnboarding}
                  />
                }
              />
              {userAlreadyCreatedLists ? (
                <>
                  <TouchableOpacity
                    accessibilityRole="button"
                    accessibilityLabel={t('createList.aiVoice.openAssistant')}
                    style={[
                      Style.aiFab,
                      {
                        backgroundColor: theme.fabAi.background,
                        shadowColor: theme.fabAi.shadowColor,
                      },
                    ]}
                    onPress={() => setAiVoiceOpen(true)}
                    activeOpacity={0.85}>
                    <Sparkles size={22} color={theme.fabAi.icon} />
                  </TouchableOpacity>
                  <FloatButton
                    navigate={navigateToCreateList}
                    isHome
                    key={'FloatButton'}
                  />
                </>
              ) : null}
              <VoiceShoppingListModal
                visible={aiVoiceOpen}
                onClose={() => setAiVoiceOpen(false)}
                i18nPrefix="createList"
                onContinueWithParsed={parsed => {
                  setAiVoiceOpen(false);
                  navigateToCreateListWithVoice(parsed.products);
                }}
              />
            </View>
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
  },
  listWrap: {
    flex: 1,
  },
  aiFab: {
    position: 'absolute',
    bottom: 95,
    right: 16,
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});

export default Home;

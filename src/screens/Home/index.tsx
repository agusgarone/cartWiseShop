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

const Home = () => {
  const {
    list,
    loading,
    navigateToListDetail,
    navigateToEditList,
    navigateToCreateList,
    navigateToCreateListWithVoice,
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
              />
              <TouchableOpacity
                accessibilityRole="button"
                accessibilityLabel={t('createList.aiVoice.openAssistant')}
                style={Style.aiFab}
                onPress={() => setAiVoiceOpen(true)}
                activeOpacity={0.85}>
                <Sparkles size={22} color="#FFFFFF" />
              </TouchableOpacity>
              <FloatButton
                navigate={navigateToCreateList}
                isHome
                key={'FloatButton'}
              />
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
    backgroundColor: '#6366f1',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});

export default Home;

import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import Header from '../../components/Header';
import theme from '../../common/theme';

const UserSettings = () => {
  return (
    <SafeAreaView style={Style.screen}>
      <View style={Style.home}>
        <Header center={<></>} left={<></>} right={<></>} key={'Header'} />
        <View style={Style.content}></View>
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

export default UserSettings;

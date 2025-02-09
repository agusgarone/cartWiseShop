import React from 'react';
import {SafeAreaView, StyleSheet, TouchableOpacity} from 'react-native';
import Header from '../../components/Header';
import theme from '../../common/theme';
import Content from './Components/Content';
import {listDetailController} from './Controller/listDetailController';
import {ArrowLeft} from 'lucide-react-native';

const ListDetail = ({route}: any) => {
  const {key, name, params} = route;
  const {
    goBack,
    listSelected,
    getListByID,
    handleButtonDelete,
    handleAllSelected,
  } = listDetailController();

  return (
    <SafeAreaView style={Style.screen}>
      <Header
        center={<></>}
        left={
          <TouchableOpacity onPress={goBack}>
            <ArrowLeft color={theme.colors.grey} size={25} onPress={goBack} />
          </TouchableOpacity>
        }
        right={<></>}
        key={'Header'}
      />
      <Content
        id={params?.id}
        getListByID={getListByID}
        handleAllSelected={handleAllSelected}
        handleButtonDelete={handleButtonDelete}
        listSelected={listSelected}
      />
    </SafeAreaView>
  );
};

const Style = StyleSheet.create({
  screen: {
    flex: 1,
  },
  text: {
    color: theme.colors.grey,
  },
});

export default ListDetail;

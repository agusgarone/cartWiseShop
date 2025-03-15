import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import theme from '../../common/theme';
import Content from './Components/Content';
import {listDetailController} from './Controller/listDetailController';

const ListDetail = ({route}: any) => {
  const {key, name, params} = route;
  const {
    user,
    listSelected,
    getListByID,
    handleButtonDelete,
    handleAllSelected,
  } = listDetailController();

  return (
    <SafeAreaView style={Style.screen}>
      <Content
        id={params?.id}
        getListByID={getListByID}
        handleAllSelected={handleAllSelected}
        handleButtonDelete={handleButtonDelete}
        listSelected={listSelected}
        user={user}
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

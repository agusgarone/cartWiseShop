import React from 'react';
import {SafeAreaView, StyleSheet, TouchableOpacity} from 'react-native';
import Header from '../../components/Header';
import theme from '../../common/theme';
import Icon, {IconType} from 'react-native-dynamic-vector-icons';
import Content from './Components/Content';
import {listDetailController} from './Controller/listDetailController';

const ListDetail = ({route}: any) => {
  const {key, name, params} = route;
  const {
    goBack,
    listSelected,
    getListByID,
    handleDeleteList,
    handleAllSelected,
  } = listDetailController();

  return (
    <SafeAreaView style={Style.screen}>
      <Header
        center={<></>}
        left={
          <TouchableOpacity onPress={goBack}>
            <Icon
              name="arrow-left"
              type={IconType.FontAwesome}
              size={25}
              color={theme.colors.grey}
              onPress={goBack}
            />
          </TouchableOpacity>
        }
        right={<></>}
        key={'Header'}
      />
      <Content
        id={params?.id}
        getListByID={getListByID}
        handleAllSelected={handleAllSelected}
        handleDeleteList={handleDeleteList}
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

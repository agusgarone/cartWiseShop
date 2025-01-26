import React from 'react';
import {SafeAreaView, StyleSheet, TouchableOpacity} from 'react-native';
import Content from './Components/Content';
import Header from '../../components/Header';
import theme from '../../common/theme';
import Icon, {IconType} from 'react-native-dynamic-vector-icons';
import {addProductsController} from './Controller/addProductsController';

const AddProducts = () => {
  const {goBack, handleButton, handleFormikSubmit, onPress, productsSelected} =
    addProductsController();

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
        handleButton={handleButton}
        handleFormikSubmit={handleFormikSubmit}
        onPress={onPress}
        productsSelected={productsSelected}
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

export default AddProducts;

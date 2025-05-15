import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import Content from './Components/Content';
import theme from '../../common/theme';
import {addProductsController} from './Controller/addProductsController';

const AddProducts = () => {
  const {handleButton, handleFormikSubmit, onPress, productsSelected, loading} =
    addProductsController();

  return (
    <SafeAreaView style={Style.screen}>
      <Content
        handleButton={handleButton}
        handleFormikSubmit={handleFormikSubmit}
        onPress={onPress}
        productsSelected={productsSelected}
        loading={loading}
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

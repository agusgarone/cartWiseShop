import React, {useContext} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import Content from './Components/Content';
import {addProductsController} from './Controller/addProductsController';
import {ThemeContext} from '../../services/ThemeProvider';

const AddProducts = () => {
  const {theme} = useContext(ThemeContext);

  const {handleButton, handleFormikSubmit, onPress, productsSelected, loading} =
    addProductsController();

  return (
    <SafeAreaView
      style={[Style.screen, {backgroundColor: theme.backgroundScreen}]}>
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
});

export default AddProducts;

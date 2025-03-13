import React from 'react';
import {View, StyleSheet, SafeAreaView} from 'react-native';
import theme from '../../common/theme';
import CreateProductForm from './Components/Form';

const CreateProduct = ({route}: any) => {
  return (
    <SafeAreaView style={Style.screen}>
      <View style={Style.content}>
        <CreateProductForm />
      </View>
    </SafeAreaView>
  );
};

const Style = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    display: 'flex',
    flex: 1,
  },
  text: {
    color: theme.colors.grey,
  },
});

export default CreateProduct;

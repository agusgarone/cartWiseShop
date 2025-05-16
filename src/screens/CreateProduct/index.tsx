import React from 'react';
import {View, StyleSheet, SafeAreaView} from 'react-native';
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
});

export default CreateProduct;

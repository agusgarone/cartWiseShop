import React, {useContext} from 'react';
import {View, StyleSheet, SafeAreaView} from 'react-native';
import CreateProductForm from './Components/Form';
import {ThemeContext} from '../../services/ThemeProvider';

const CreateProduct = ({route}: any) => {
  const {theme} = useContext(ThemeContext);

  return (
    <SafeAreaView
      style={[Style.screen, {backgroundColor: theme.backgroundScreen}]}>
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

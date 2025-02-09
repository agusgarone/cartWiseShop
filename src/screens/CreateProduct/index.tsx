import React from 'react';
import {View, StyleSheet, TouchableOpacity, SafeAreaView} from 'react-native';
import theme from '../../common/theme';

import Header from '../../components/Header';
import Icon, {IconType} from 'react-native-dynamic-vector-icons';
import CreateProductForm from './Components/Form';
import {createProductController} from './Controller/createProductController';
import {ArrowLeft} from 'lucide-react-native';

const CreateProduct = ({route}: any) => {
  const {goBack} = createProductController();

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

import React from 'react';
import {View, StyleSheet, SafeAreaView} from 'react-native';
import theme from '../../common/theme';
import CreateListForm from '../../screens/CreateList/Components/Form';
import {createListController} from './Controller/createListController';

const CreateList = () => {
  const {
    handleFormikSubmit,
    initialValues,
    goToAddProducts,
    products,
    removeProductSelected,
  } = createListController();

  return (
    <SafeAreaView style={Style.screen}>
      <View style={Style.content}>
        <CreateListForm
          handleFormikSubmit={handleFormikSubmit}
          initialValues={initialValues}
          goToAddProducts={goToAddProducts}
          products={products}
          removeProductSelected={removeProductSelected}
        />
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
    paddingVertical: 16,
    paddingTop: 32,
    display: 'flex',
    flex: 1,
  },
  text: {
    color: theme.colors.grey,
  },
});

export default CreateList;

import React, {useContext} from 'react';
import {View, StyleSheet, SafeAreaView} from 'react-native';
import CreateListForm from '../../screens/CreateList/Components/Form';
import {createListController} from './Controller/createListController';
import {ThemeContext} from '../../services/ThemeProvider';

const CreateList = () => {
  const {
    handleFormikSubmit,
    initialValues,
    goToAddProducts,
    products,
    removeProductSelected,
  } = createListController();
  const {theme} = useContext(ThemeContext);

  return (
    <SafeAreaView
      style={[Style.screen, {backgroundColor: theme.backgroundScreen}]}>
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
});

export default CreateList;

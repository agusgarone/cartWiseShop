import React, {useContext} from 'react';
import {View, StyleSheet, SafeAreaView} from 'react-native';
import {editListController} from './Controller/editListController';
import {ThemeContext} from '../../services/ThemeProvider';
import EditListForm from './Components/Form';

const EditList = () => {
  const {
    initialValues,
    products,
    loading,
    goToAddProducts,
    handleFormikSubmit,
    removeProductSelected,
  } = editListController();
  const {theme} = useContext(ThemeContext);

  return (
    <SafeAreaView
      style={[Style.screen, {backgroundColor: theme.backgroundScreen}]}>
      <View style={Style.content}>
        <EditListForm
          handleFormikSubmit={handleFormikSubmit}
          initialValues={initialValues}
          goToAddProducts={goToAddProducts}
          products={products}
          removeProductSelected={removeProductSelected}
          loading={loading}
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
    paddingTop: 16,
    display: 'flex',
    flex: 1,
  },
});

export default EditList;

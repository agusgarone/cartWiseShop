import React, {useContext} from 'react';
import {View, StyleSheet, SafeAreaView} from 'react-native';
import {editListController} from './Controller/editListController';
import {ThemeContext} from '../../services/ThemeProvider';
import EditListForm from './Components/Form';
import {Drawer} from 'react-native-drawer-layout';
import {CustomDrawerContent} from '../Filters';

const EditList = () => {
  const {
    initialValues,
    products,
    loading,
    open,
    categoriesFilter,
    showWithCategories,
    goToAddProducts,
    handleFormikSubmit,
    removeProductSelected,
    handleNameListSelected,
    setOpen,
    listSelectedFormatted,
  } = editListController();
  const {theme} = useContext(ThemeContext);

  return (
    <SafeAreaView
      style={[Style.screen, {backgroundColor: theme.backgroundScreen}]}>
      <Drawer
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        drawerStyle={{width: 300}}
        renderDrawerContent={() => {
          return (
            <CustomDrawerContent
              filterTo="edit"
              closeDrawer={() => setOpen(false)}
              productsCategories={categoriesFilter}
              categories={[]}
            />
          );
        }}>
        <View style={Style.content}>
          <EditListForm
            initialValues={initialValues}
            products={products}
            loading={loading}
            showWithCategories={showWithCategories}
            handleFormikSubmit={handleFormikSubmit}
            removeProductSelected={removeProductSelected}
            handleNameListSelected={handleNameListSelected}
            goToAddProducts={goToAddProducts}
            setOpen={setOpen}
            listSelectedFormatted={listSelectedFormatted}
          />
        </View>
      </Drawer>
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

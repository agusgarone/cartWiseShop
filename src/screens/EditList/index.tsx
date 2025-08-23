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
    goToAddProducts,
    handleFormikSubmit,
    removeProductSelected,
    handleNameListSelected,
    setOpen,
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
              filterTo="detail"
              closeDrawer={() => setOpen(false)}
              productsCategories={categoriesFilter}
              categories={[]}
            />
          );
        }}>
        <View style={Style.content}>
          <EditListForm
            handleFormikSubmit={handleFormikSubmit}
            initialValues={initialValues}
            goToAddProducts={goToAddProducts}
            products={products}
            removeProductSelected={removeProductSelected}
            loading={loading}
            handleNameListSelected={handleNameListSelected}
            setOpen={setOpen}
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

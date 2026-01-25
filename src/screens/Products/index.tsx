import React, {useContext} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {productsController} from './Controller/productsController';
import {ThemeContext} from '../../services/ThemeProvider';
import {Drawer} from 'react-native-drawer-layout';
import {CustomDrawerContent} from '../Filters';
import {Form} from './Components/Form';

const Products = () => {
  const {theme} = useContext(ThemeContext);

  const {
    allProducts,
    goToCreateProduct,
    handleDeleteProduct,
    handleFormikSubmit,
    loading,
    setOpen,
    open,
    categories,
  } = productsController();

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
              filterTo="products"
              closeDrawer={() => setOpen(false)}
              productsCategories={[]}
              categories={categories}
            />
          );
        }}>
        <Form
          setOpen={setOpen}
          loading={loading}
          allProducts={allProducts}
          handleDeleteProduct={handleDeleteProduct}
          goToCreateProduct={goToCreateProduct}
          handleFormikSubmit={handleFormikSubmit}
        />
      </Drawer>
    </SafeAreaView>
  );
};

const Style = StyleSheet.create({
  screen: {
    flex: 1,
  },
});

export default Products;

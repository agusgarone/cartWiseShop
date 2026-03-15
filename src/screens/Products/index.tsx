import React, {useContext} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {productsController} from './Controller/productsController';
import {ThemeContext} from '../../services/ThemeProvider';
import {Drawer} from 'react-native-drawer-layout';
import {CustomDrawerContent} from '../Filters';
import {Form} from './Components/Form';
import CustomModal from '../../components/Modal';
import Button from '../../components/Button';
import {TriangleAlert} from 'lucide-react-native';
import {useTranslation} from 'react-i18next';

const Products = () => {
  const {theme} = useContext(ThemeContext);
  const {t} = useTranslation();

  const {
    allProducts,
    goToCreateProduct,
    handleButtonDeleteProduct,
    handleAcceptDeleteProduct,
    handleFormikSubmit,
    loading,
    setOpen,
    open,
    categories,
    productSelected,
    isModalVisibleDeleteProduct,
    toggleModalDeleteProduct,
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
          handleDeleteProduct={handleButtonDeleteProduct}
          goToCreateProduct={goToCreateProduct}
          handleFormikSubmit={handleFormikSubmit}
        />
      </Drawer>
      <CustomModal
        key={'ModalProductsDeleteProduct'}
        isModalVisible={isModalVisibleDeleteProduct}
        icon={<TriangleAlert size={40} color={theme.modal.icon} />}
        title={t('products.atention')}
        subtitle={`${t('products.youGoingToDeleteTheProductWithName')} ${
          productSelected?.name || ''
        }`}
        acceptButton={
          <Button
            children={t('modal.acceptButton')}
            isDisabled={false}
            type="secondary"
            onPress={handleAcceptDeleteProduct}
            key={'Button1'}
          />
        }
        cancelButton={
          <Button
            children={t('modal.cancelButton')}
            isDisabled={false}
            type="secondary"
            onPress={toggleModalDeleteProduct}
            key={'Button1'}
          />
        }
      />
    </SafeAreaView>
  );
};

const Style = StyleSheet.create({
  screen: {
    flex: 1,
  },
});

export default Products;

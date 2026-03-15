import React, {useContext} from 'react';
import {View, StyleSheet, SafeAreaView} from 'react-native';
import {editListController} from './Controller/editListController';
import {ThemeContext} from '../../services/ThemeProvider';
import EditListForm from './Components/Form';
import {Drawer} from 'react-native-drawer-layout';
import {CustomDrawerContent} from '../Filters';
import {useTranslation} from 'react-i18next';
import {TriangleAlert} from 'lucide-react-native';
import CustomModal from '../../components/Modal';

const EditList = () => {
  const {
    initialValues,
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
    isModalVisible,
    toggleModal,
  } = editListController();
  const {theme} = useContext(ThemeContext);
  const {t} = useTranslation();

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
      <CustomModal
        isModalVisible={isModalVisible}
        toggleModal={toggleModal}
        icon={<TriangleAlert size={40} color={theme.modal.icon} />}
        title={t('createList.addNameToTheList')}
      />
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

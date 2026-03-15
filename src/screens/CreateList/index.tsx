import React, {useContext} from 'react';
import {View, StyleSheet, SafeAreaView} from 'react-native';
import CreateListForm from '../../screens/CreateList/Components/Form';
import {createListController} from './Controller/createListController';
import {ThemeContext} from '../../services/ThemeProvider';
import {Drawer} from 'react-native-drawer-layout';
import {CustomDrawerContent} from '../Filters';
import CustomModal from '../../components/Modal';
import {useTranslation} from 'react-i18next';
import {TriangleAlert} from 'lucide-react-native';

const CreateList = () => {
  const {
    initialValues,
    goToAddProducts,
    handleFormikSubmit,
    removeProductSelected,
    showWithCategories,
    listSelectedFormatted,
    handleNameListSelected,
    open,
    setOpen,
    categoriesFilter,
    isModalVisible,
    toggleModal,
  } = createListController();
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
          <CreateListForm
            handleFormikSubmit={handleFormikSubmit}
            initialValues={initialValues}
            goToAddProducts={goToAddProducts}
            removeProductSelected={removeProductSelected}
            showWithCategories={showWithCategories}
            listSelectedFormatted={listSelectedFormatted}
            handleNameListSelected={handleNameListSelected}
            setOpen={setOpen}
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

export default CreateList;

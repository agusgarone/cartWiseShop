import React, {useContext} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import Content from './Components/Content';
import {listDetailController} from './Controller/listDetailController';
import ConfettiCannon from 'react-native-confetti-cannon';
import {ThemeContext} from '../../services/ThemeProvider';
import {Drawer} from 'react-native-drawer-layout';
import {CustomDrawerContent} from '../Filters';
import CustomModal from '../../components/Modal';
import {TriangleAlert} from 'lucide-react-native';
import {useTranslation} from 'react-i18next';
import Button from '../../components/Button';

const ListDetail = ({route}: any) => {
  const {theme} = useContext(ThemeContext);
  const {t} = useTranslation();
  const {key, name, params} = route;
  const {
    listSelectedFormatted,
    showConfetti,
    loading,
    open,
    categoriesFilter,
    showWithCategories,
    handleButtonDelete,
    handleAcceptDeleteList,
    handleShareList,
    handleAllSelected,
    setShowConfetti,
    navigateToEditList,
    setOpen,
    isModalVisibleListDoesntExist,
    isModalVisibleDeleteList,
    isModalVisibleShareError,
    toggleModalListDoesntExist,
    toggleModalDeleteList,
    toggleModalShareError,
  } = listDetailController(params?.id);

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
        {listSelectedFormatted && (
          <Content
            listSelected={listSelectedFormatted}
            loading={loading}
            showWithCategories={showWithCategories}
            handleAllSelected={handleAllSelected}
            handleButtonDelete={handleButtonDelete}
            handleShareList={handleShareList}
            navigateToEditList={navigateToEditList}
            setOpen={setOpen}
          />
        )}
        {showConfetti && (
          <ConfettiCannon
            count={200}
            origin={{x: -10, y: 0}}
            fadeOut={true}
            explosionSpeed={650}
            fallSpeed={3000}
            onAnimationEnd={() => setShowConfetti(false)}
          />
        )}
      </Drawer>
      <CustomModal
        key={'ModalListDetailDoesntExist'}
        isModalVisible={isModalVisibleListDoesntExist}
        icon={<TriangleAlert size={40} color={theme.modal.icon} />}
        title={t('listDetail.theListDoesntExist')}
        acceptButton={
          <Button
            children={t('modal.acceptButton')}
            isDisabled={false}
            type="secondary"
            onPress={toggleModalListDoesntExist}
            key={'Button1'}
          />
        }
      />
      <CustomModal
        key={'ModalListDetailDeleteList'}
        isModalVisible={isModalVisibleDeleteList}
        icon={<TriangleAlert size={40} color={theme.modal.icon} />}
        title={t('listDetail.atention')}
        subtitle={`${t('listDetail.youGoingToDeleteThelistWithName')} ${
          listSelectedFormatted?.name || ''
        }`}
        acceptButton={
          <Button
            children={t('modal.acceptButton')}
            isDisabled={false}
            type="secondary"
            onPress={handleAcceptDeleteList}
            key={'Button1'}
          />
        }
        cancelButton={
          <Button
            children={t('modal.cancelButton')}
            isDisabled={false}
            type="secondary"
            onPress={toggleModalDeleteList}
            key={'Button1'}
          />
        }
      />
      <CustomModal
        key={'ModalListDetailShareError'}
        isModalVisible={isModalVisibleShareError}
        icon={<TriangleAlert size={40} color={theme.modal.icon} />}
        title={t('listDetail.shareError')}
        acceptButton={
          <Button
            children={t('modal.acceptButton')}
            isDisabled={false}
            type="secondary"
            onPress={toggleModalShareError}
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

export default ListDetail;

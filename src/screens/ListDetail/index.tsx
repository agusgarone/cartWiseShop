import React, {useContext} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import Content from './Components/Content';
import {listDetailController} from './Controller/listDetailController';
import ConfettiCannon from 'react-native-confetti-cannon';
import {ThemeContext} from '../../services/ThemeProvider';
import {Drawer} from 'react-native-drawer-layout';
import {CustomDrawerContent} from '../Filters';

const ListDetail = ({route}: any) => {
  const {theme} = useContext(ThemeContext);
  const {key, name, params} = route;
  const {
    listSelectedFormatted,
    showConfetti,
    loading,
    open,
    categoriesFilter,
    showWithCategories,
    handleButtonDelete,
    handleShareList,
    handleAllSelected,
    setShowConfetti,
    navigateToEditList,
    setOpen,
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
    </SafeAreaView>
  );
};

const Style = StyleSheet.create({
  screen: {
    flex: 1,
  },
});

export default ListDetail;

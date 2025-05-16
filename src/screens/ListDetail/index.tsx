import React, {useContext} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import Content from './Components/Content';
import {listDetailController} from './Controller/listDetailController';
import ConfettiCannon from 'react-native-confetti-cannon';
import {ThemeContext} from '../../services/ThemeProvider';

const ListDetail = ({route}: any) => {
  const {theme} = useContext(ThemeContext);
  const {key, name, params} = route;
  const {
    user,
    listSelected,
    getListByID,
    handleButtonDelete,
    handleAllSelected,
    setShowConfetti,
    showConfetti,
    loading,
  } = listDetailController();

  return (
    <SafeAreaView
      style={[Style.screen, {backgroundColor: theme.backgroundScreen}]}>
      <Content
        id={params?.id}
        getListByID={getListByID}
        handleAllSelected={handleAllSelected}
        handleButtonDelete={handleButtonDelete}
        listSelected={listSelected}
        user={user}
        loading={loading}
      />
      {showConfetti && (
        <ConfettiCannon
          count={200}
          origin={{x: -10, y: 0}}
          fadeOut={true}
          explosionSpeed={350}
          fallSpeed={3000}
          onAnimationEnd={() => setShowConfetti(false)}
        />
      )}
    </SafeAreaView>
  );
};

const Style = StyleSheet.create({
  screen: {
    flex: 1,
  },
});

export default ListDetail;

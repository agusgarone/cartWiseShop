import React from 'react';
import {View, StyleSheet, Platform} from 'react-native';

interface IHeader {
  left: React.JSX.Element;
  center: React.JSX.Element;
  right?: React.JSX.Element;
}

const Header = ({left, center, right}: IHeader) => {
  return (
    <View style={[styles.structure]}>
      <View style={styles.sides}>{left}</View>
      <View style={styles.center}>{center}</View>
      <View style={styles.sides}>{right}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  structure: {
    justifyContent: 'space-between',
    width: '100%',
    height: Platform.OS === 'ios' ? 30 : 54,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    alignContent: 'center',
    paddingHorizontal: 24,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    backgroundColor: 'white',
  },
  center: {
    flex: 3,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sides: {
    flex: 1,
  },
});

export default Header;

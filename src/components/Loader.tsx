import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import theme from '../common/theme';

const Loader = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={theme.colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
});

export default Loader;

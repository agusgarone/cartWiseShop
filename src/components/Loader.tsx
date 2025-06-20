import React, {useContext} from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import {ThemeContext} from '../services/ThemeProvider';

const Loader = ({isLoadingPreferences}: {isLoadingPreferences?: boolean}) => {
  const {theme} = useContext(ThemeContext);
  return (
    <View style={styles.container}>
      <ActivityIndicator
        size="large"
        color={
          isLoadingPreferences
            ? theme.loader.isLoadingPreferences
            : theme.loader.color
        }
      />
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

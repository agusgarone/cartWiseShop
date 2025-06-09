import {DrawerContentComponentProps} from '@react-navigation/drawer';
import React, {useContext} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import FilterForm from './Components/Form';
import {useTranslation} from 'react-i18next';
import {ThemeContext} from '../../services/ThemeProvider';
import {filterProductService} from './Controller';

export default function CustomDrawerContent(
  props: DrawerContentComponentProps,
) {
  const {t} = useTranslation();
  const {theme} = useContext(ThemeContext);
  const {applyFilters} = filterProductService(props);

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: theme.filterProducts.background},
      ]}>
      <Text style={[styles.title, {color: theme.filterProducts.title}]}>
        {t('filterProducts.title')}
      </Text>
      <FilterForm handleFormikSubmit={applyFilters} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});

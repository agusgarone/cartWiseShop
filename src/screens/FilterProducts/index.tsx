import {DrawerContentComponentProps} from '@react-navigation/drawer';
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import theme from '../../common/theme';
import FilterForm from './Components/Form';
import {ICategory} from '../../models/types/category';

export default function CustomDrawerContent(
  props: DrawerContentComponentProps,
) {
  const applyFilters = (values: {
    textSearched: string;
    categories: ICategory[];
  }) => {
    console.log('Filtros aplicados:', values);
    props.navigation.closeDrawer();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Filtros</Text>
      <FilterForm handleFormikSubmit={applyFilters} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: theme.light.black,
  },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  filterText: {
    fontSize: 16,
    color: theme.light.black,
  },
});

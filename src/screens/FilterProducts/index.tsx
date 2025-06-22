import React, {useContext} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import FilterFormProducts from './Components/FormProducts';
import {useTranslation} from 'react-i18next';
import {ThemeContext} from '../../services/ThemeProvider';
import {filterProductService} from './Controller';
import FilterFormDetail from './Components/FormListDetail';
import {ICategoryFilter} from '../../models/types/category';

export const CustomDrawerContent = ({
  filterTo,
  closeDrawer,
  productsCategories,
}: {
  filterTo: 'products' | 'detail';
  closeDrawer: () => void;
  productsCategories: ICategoryFilter[];
}) => {
  const {t} = useTranslation();
  const {theme} = useContext(ThemeContext);
  const {applyFiltersProducts, applyFiltersListDetail, categories} =
    filterProductService();

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: theme.filterProducts.background},
      ]}>
      <Text style={[styles.title, {color: theme.filterProducts.title}]}>
        {t('filterProducts.title')}
      </Text>
      {filterTo === 'products' ? (
        <FilterFormProducts
          categories={categories}
          handleFormikSubmit={applyFiltersProducts}
          closeDrawer={closeDrawer}
        />
      ) : (
        <FilterFormDetail
          categories={productsCategories}
          handleFormikSubmit={applyFiltersListDetail}
          closeDrawer={closeDrawer}
        />
      )}
    </View>
  );
};

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

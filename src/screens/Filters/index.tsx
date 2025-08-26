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
  categories,
}: {
  filterTo: 'products' | 'detail' | 'edit';
  closeDrawer: () => void;
  productsCategories: ICategoryFilter[] | null;
  categories: ICategoryFilter[];
}) => {
  const {t} = useTranslation();
  const {theme} = useContext(ThemeContext);
  const {applyFiltersProducts, applyFiltersListDetail, applyFiltersEditList} =
    filterProductService();

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: theme.filterProducts.background},
      ]}>
      {filterTo === 'detail' && productsCategories && (
        <FilterFormDetail
          categories={productsCategories}
          handleFormikSubmit={applyFiltersListDetail}
          closeDrawer={closeDrawer}
        />
      )}
      {filterTo === 'edit' && productsCategories && (
        <FilterFormDetail
          categories={productsCategories}
          handleFormikSubmit={applyFiltersEditList}
          closeDrawer={closeDrawer}
        />
      )}
      {filterTo === 'products' && categories && (
        <FilterFormProducts
          categories={categories}
          handleFormikSubmit={applyFiltersProducts}
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

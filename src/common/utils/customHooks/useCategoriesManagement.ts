import {useState} from 'react';
import {ICategoryFilter} from '../../../models/types/category';
import {getCategoriesByProducts} from '../functions/getCategoriesByProducts';

export const useCategoriesManagement = () => {
  const [categories, setCategories] = useState<ICategoryFilter[] | null>(null);
  const [categoriesFilter, setCategoriesFilter] = useState<
    ICategoryFilter[] | null
  >(null);

  const setCategoriesAndCategoriesFilter = (values: ICategoryFilter[]) => {
    setCategories(values);
    setCategoriesFilter(values);
  };

  return {
    categories,
    categoriesFilter,
    setCategoriesAndCategoriesFilter,
  };
};

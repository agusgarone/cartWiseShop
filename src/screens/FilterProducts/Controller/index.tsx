import {useMemo, useState} from 'react';
import {ICategory, ICategoryFilter} from '../../../models/types/category';
import {fetchCategories} from '../../../services/Category';
import {globalSessionState} from '../../../services/globalStates';
import {mapperCategorySupabaseToFilter} from '../../../models/mappers/mapperCategorySupabaseToFilter';

export const filterProductService = () => {
  const setFilterProducts = globalSessionState(
    state => state.setFiltersProducts,
  );
  const setFilterListDetail = globalSessionState(
    state => state.setFiltersListDetail,
  );
  const [categories, setCategories] = useState<ICategoryFilter[]>([]);

  const fetchData = async () => {
    const responseGetAllCategories = await fetchCategories();
    if (responseGetAllCategories.error) {
      console.log(responseGetAllCategories.error);
    } else {
      setCategories(
        mapperCategorySupabaseToFilter(responseGetAllCategories.data),
      );
    }
  };

  useMemo(() => {
    fetchData();
  }, []);

  const applyFiltersProducts = (values: {
    textSearched: string;
    categories: ICategoryFilter[] | ICategory[];
    orderAsc: boolean;
  }) => {
    let categorySelected: number | undefined | null = null;
    values.categories.forEach((category: any) => {
      if (category?.isChecked) {
        categorySelected = category?.id;
      }
    });
    setFilterProducts({
      category: categorySelected,
      nameFilter: values.textSearched,
      orderAsc: values.orderAsc,
    });
  };

  const applyFiltersListDetail = (values: {
    splitByCategories: boolean;
    categories: ICategoryFilter[];
    orderAsc: boolean;
  }) => {
    let categoriesSelected: number[] = [];
    values.categories.forEach((category: ICategoryFilter) => {
      if (category?.isChecked) {
        categoriesSelected?.push(category?.id);
      }
    });
    setFilterListDetail({
      categories: categoriesSelected,
      splitByCategories: values.splitByCategories,
      orderAsc: values.orderAsc,
    });
  };

  return {
    applyFiltersProducts,
    applyFiltersListDetail,
    categories,
  };
};

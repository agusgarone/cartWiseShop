import {ICategory, ICategoryFilter} from '../../../models/types/category';
import {globalSessionState} from '../../../services/globalStates';

export const filterProductService = () => {
  const setFilterProducts = globalSessionState(
    state => state.setFiltersProducts,
  );
  const setFilterListDetail = globalSessionState(
    state => state.setFiltersListDetail,
  );
  const setFilterEditList = globalSessionState(
    state => state.setFiltersEditList,
  );

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
      nameFilter: values.textSearched.trim().toLowerCase(),
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

  const applyFiltersEditList = (values: {
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
    setFilterEditList({
      categories: categoriesSelected,
      splitByCategories: values.splitByCategories,
      orderAsc: values.orderAsc,
    });
  };

  return {
    applyFiltersProducts,
    applyFiltersListDetail,
    applyFiltersEditList,
  };
};

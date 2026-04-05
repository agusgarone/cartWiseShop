import {ICategoryFilter} from '../../../models/types/category';
import {
  DEFAULT_FILTERS_LIST,
  ShowFilter,
  SortOption,
} from '../../../models/types/filter';
import {globalSessionState} from '../../../services/globalStates';

export const filterProductService = () => {
  const setFiltersList = globalSessionState(state => state.setFiltersList);

  const applyFiltersList = (values: {
    splitByCategories: boolean;
    categories: ICategoryFilter[];
    orderAsc: boolean;
    sortOption: SortOption;
    showFilter: ShowFilter;
    allCategoryIds: number[];
  }) => {
    const categoriesSelected: number[] = [];
    values.categories.forEach((category: ICategoryFilter) => {
      if (category?.isChecked) {
        categoriesSelected.push(category.id);
      }
    });

    const allSelected =
      categoriesSelected.length === 0 ||
      categoriesSelected.length >= values.allCategoryIds.length;

    setFiltersList({
      categories: allSelected ? null : categoriesSelected,
      splitByCategories: values.splitByCategories,
      orderAsc: values.orderAsc,
      sortOption: values.sortOption,
      showFilter: values.showFilter,
    });
  };

  const clearFiltersList = () => {
    setFiltersList(DEFAULT_FILTERS_LIST);
  };

  return {
    applyFiltersList,
    clearFiltersList,
  };
};

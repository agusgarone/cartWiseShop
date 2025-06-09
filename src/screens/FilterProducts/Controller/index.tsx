import {DrawerContentComponentProps} from '@react-navigation/drawer';
import {ICategory, ICategoryFilter} from '../../../models/types/category';
import {globalSessionState} from '../../../services/globalStates';

export const filterProductService = (props: DrawerContentComponentProps) => {
  const setFilter = globalSessionState(state => state.setFilters);

  const applyFilters = (values: {
    textSearched: string;
    categories: ICategoryFilter[] | ICategory[];
  }) => {
    props.navigation.closeDrawer();
    let categorySelected: number | undefined | null = null;
    values.categories.forEach((category: any) => {
      if (category?.isChecked) {
        categorySelected = category?.id;
      }
    });
    setFilter({
      category: categorySelected,
      nameFilter: values.textSearched,
    });
  };

  return {
    applyFilters,
  };
};

import {ICategory, ICategoryFilter} from '../types/category';

export const mapperCategorySupabaseToFilter = (
  entry: ICategory[],
): ICategoryFilter[] => {
  const newArray = entry.map(i => {
    const newValue = {
      ...i,
      isChecked: false,
    };
    return newValue;
  });
  return newArray;
};

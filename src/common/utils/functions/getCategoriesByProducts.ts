import {ICategoryFilter} from '../../../models/types/category';

export const getCategoriesByProducts = (
  products: Array<{
    id: string;
    name: string;
    id_category: number;
    category: string;
  }> | null,
) => {
  const categories: ICategoryFilter[] = [];
  products?.forEach(prod => {
    const findCat = categories.find(cat => cat.id === prod.id_category);
    if (!findCat) {
      categories.push({
        id: prod.id_category,
        name: prod.category,
        isChecked: false,
      });
    }
  });
  return categories;
};

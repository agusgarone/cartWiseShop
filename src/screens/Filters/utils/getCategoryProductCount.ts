import {IProductForm} from '../../../models/types/product';

export function getCategoryProductCount(
  products: IProductForm[],
  categoryId: number,
): number {
  return products.filter(p => p.category.id === categoryId).length;
}

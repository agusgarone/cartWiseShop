import {IProductForm} from '../models/types/product';

export type GroupedProducts = Record<string, IProductForm[]>;

/**
 * Agrupa productos por nombre de categoría para renderizado por secciones.
 */
export function groupProductsByCategory(
  products: IProductForm[],
): GroupedProducts {
  const groups: GroupedProducts = {};

  for (const product of products) {
    const categoryName = product.category?.name?.trim() || 'Sin categoría';
    if (!groups[categoryName]) {
      groups[categoryName] = [];
    }
    groups[categoryName].push(product);
  }

  return groups;
}

/** Ordena las claves de categoría alfabéticamente, dejando "Sin categoría" al final. */
export function sortCategoryKeys(keys: string[], orderAsc = true): string[] {
  const withoutUncategorized = keys
    .filter(k => k !== 'Sin categoría')
    .sort((a, b) => (orderAsc ? a.localeCompare(b) : b.localeCompare(a)));
  if (keys.includes('Sin categoría')) {
    withoutUncategorized.push('Sin categoría');
  }
  return withoutUncategorized;
}

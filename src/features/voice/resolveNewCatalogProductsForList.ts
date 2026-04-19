import type {IProductDTO, IProductSupabase} from '../../models/types/product';
import {
  CategoriesStorage,
  ProductsStorage,
} from '../../storage/storageHelpers';
import {findCatalogProductByGroceryName} from '../../common/utils/groceryProductNameMatch';

function stripNewFlag(p: IProductDTO): IProductDTO {
  const next = {...p};
  delete next.isNewToCatalog;
  return next;
}

function toDTO(
  row: IProductSupabase,
  categoryNames: Map<number, string>,
): IProductDTO {
  return {
    id: row.id,
    name: row.name,
    category: {
      id: row.id_category,
      name: categoryNames.get(row.id_category) || 'Sin categoría',
    },
    default: false,
  };
}

/**
 * Antes de guardar la lista: productos nuevos por voz se crean en el catálogo y reciben id real.
 */
export async function resolveNewCatalogProductsForList(
  products: IProductDTO[],
): Promise<IProductDTO[]> {
  let catalog = await ProductsStorage.getAllProducts();
  const categoryNames = new Map(
    (await CategoriesStorage.getAllCategories()).map(c => [c.id, c.name]),
  );

  const batch: Array<{name: string; id_category: number}> = [];
  for (const p of products) {
    if (!p.isNewToCatalog) {
      continue;
    }
    const nameNorm = p.name.trim().toLowerCase();
    if (!nameNorm) {
      continue;
    }
    if (!findCatalogProductByGroceryName(nameNorm, catalog)) {
      batch.push({name: nameNorm, id_category: p.category.id});
    }
  }

  if (batch.length) {
    await ProductsStorage.appendNewProducts(batch);
    catalog = await ProductsStorage.getAllProducts();
  }

  return products.map(p => {
    if (!p.isNewToCatalog) {
      return stripNewFlag(p);
    }
    const nameNorm = p.name.trim().toLowerCase();
    const match = findCatalogProductByGroceryName(nameNorm, catalog);
    if (match) {
      return toDTO(match, categoryNames);
    }
    return stripNewFlag(p);
  });
}

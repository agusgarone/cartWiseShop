import type {ParsedProduct} from '../../types/ticket';
import type {IProductDTO, IProductSupabase} from '../../models/types/product';
import {
  CategoriesStorage,
  ProductsStorage,
} from '../../storage/storageHelpers';
import {findCatalogProductByGroceryName} from '../../common/utils/groceryProductNameMatch';

const VOICE_TEMP_ID_BASE = -9_200_000_000;

function toProductDTO(
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
 * Convierte productos interpretados por voz en filas de lista:
 * coincide con el catálogo local o marca `isNewToCatalog` con id temporal negativo.
 */
export async function mapParsedProductsToListProductDTOs(
  parsed: ParsedProduct[],
): Promise<IProductDTO[]> {
  const catalog = await ProductsStorage.getAllProducts();
  const categories = await CategoriesStorage.getAllCategories();
  const categoryNames = new Map(categories.map(c => [c.id, c.name]));

  let tempCounter = 0;
  const out: IProductDTO[] = [];

  for (const item of parsed) {
    const nameNorm = item.name.trim().toLowerCase();
    if (!nameNorm) {
      continue;
    }
    const match = findCatalogProductByGroceryName(nameNorm, catalog);
    if (match) {
      out.push(toProductDTO(match, categoryNames));
      continue;
    }
    tempCounter += 1;
    out.push({
      id: VOICE_TEMP_ID_BASE - tempCounter,
      name: nameNorm,
      category: {
        id: item.id_category,
        name: categoryNames.get(item.id_category) || item.category,
      },
      default: false,
      isNewToCatalog: true,
    });
  }

  return out;
}

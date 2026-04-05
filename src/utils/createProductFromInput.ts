import {
  CATALOG_CATEGORY_DISPLAY_NAME,
  CATALOG_CATEGORY_TO_APP_ID,
} from '../constants/productCatalog';
import {IProductDTO} from '../models/types/product';
import {CategoriesStorage, ProductsStorage} from '../storage/storageHelpers';
import {findCatalogProductByGroceryName} from '../common/utils/groceryProductNameMatch';
import {findProductMatch} from './productMatching';
import {normalizeText} from './normalizeText';

export type ProductSource = 'catalog' | 'manual' | 'voice';

export type CreateProductOptions = {
  source?: ProductSource;
};

const VOICE_TEMP_ID_BASE = -9_200_000_000;
let tempIdCounter = 0;

function nextTempId(): number {
  tempIdCounter += 1;
  return VOICE_TEMP_ID_BASE - tempIdCounter;
}

function resetTempIdCounter(): void {
  tempIdCounter = 0;
}

/** Expuesto para tests; reinicia ids temporales entre sesiones de prueba. */
export function __resetTempIdCounterForTests(): void {
  resetTempIdCounter();
}

/**
 * Crea un producto listo para agregar a una lista a partir de texto libre.
 * 1. Busca en catálogo local de la app (ProductsStorage).
 * 2. Busca en PRODUCT_CATALOG por keywords.
 * 3. Si no hay match, usa el texto ingresado con categoría "Sin categoría".
 */
export async function createProductFromInput(
  input: string,
  options: CreateProductOptions = {},
): Promise<IProductDTO | null> {
  const trimmed = input.trim();
  const normalized = normalizeText(trimmed);
  if (!normalized) {
    return null;
  }

  void (options.source ?? 'manual');
  const catalog = await ProductsStorage.getAllProducts();
  const categories = await CategoriesStorage.getAllCategories();
  const categoryNames = new Map(categories.map(c => [c.id, c.name]));

  const existingMatch = findCatalogProductByGroceryName(normalized, catalog);
  if (existingMatch) {
    return {
      id: existingMatch.id,
      name: existingMatch.name,
      category: {
        id: existingMatch.id_category,
        name: categoryNames.get(existingMatch.id_category) || 'Sin categoría',
      },
      default: false,
    };
  }

  const catalogMatch = findProductMatch(trimmed);
  if (catalogMatch) {
    const {catalogProduct} = catalogMatch;
    const categoryId = CATALOG_CATEGORY_TO_APP_ID[catalogProduct.category];
    const displayName = CATALOG_CATEGORY_DISPLAY_NAME[catalogProduct.category];
    return {
      id: nextTempId(),
      name: catalogProduct.name,
      category: {
        id: categoryId,
        name: displayName,
      },
      default: false,
      isNewToCatalog: true,
    };
  }

  return {
    id: nextTempId(),
    name: trimmed,
    category: {
      id: CATALOG_CATEGORY_TO_APP_ID['Sin categoría'],
      name: 'Sin categoría',
    },
    default: false,
    isNewToCatalog: true,
  };
}

/** Variante síncrona que devuelve metadatos del source para debugging/UI. */
export function getProductSourceLabel(source: ProductSource): string {
  switch (source) {
    case 'catalog':
      return 'catalog';
    case 'voice':
      return 'voice';
    default:
      return 'manual';
  }
}

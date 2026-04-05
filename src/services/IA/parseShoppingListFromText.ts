import {ParsedProducts} from '../../types/ticket';
import {completeMistralChatJson} from './mistralClient';
import {systemPrompt} from './systemPrompt';
import {parseProductsFromSpeech} from '../../utils/parseProductsFromSpeech';
import {findProductMatch} from '../../utils/productMatching';
import {
  CATALOG_CATEGORY_DISPLAY_NAME,
  CATALOG_CATEGORY_TO_APP_ID,
} from '../../constants/productCatalog';

const EMPTY_PARSED_PRODUCTS: ParsedProducts = {
  products: [],
};

const ALLOWED_CATEGORIES: Record<number, string> = {
  1: 'Frutas y Verduras',
  2: 'Carnes y Pescados',
  3: 'Lacteos y Huevos',
  4: 'Panaderia y Pasteleria',
  5: 'Bebidas',
  6: 'Limpieza',
  7: 'Higiene Personal',
  8: 'Despensa',
  9: 'Congelados',
  10: 'Otros',
};

const normalizeParsedProducts = (value: unknown): ParsedProducts => {
  if (!value || typeof value !== 'object' || !('products' in value)) {
    return EMPTY_PARSED_PRODUCTS;
  }

  const rawProducts = (value as {products?: unknown}).products;
  if (!Array.isArray(rawProducts)) {
    return EMPTY_PARSED_PRODUCTS;
  }

  const normalizedProducts = rawProducts
    .filter(
      (product): product is Record<string, unknown> =>
        !!product && typeof product === 'object',
    )
    .map(product => {
      const rawName = typeof product.name === 'string' ? product.name : '';
      const name = rawName.trim().toLowerCase();
      const rawCategoryId =
        typeof product.id_category === 'number' ? product.id_category : 10;
      const id_category = ALLOWED_CATEGORIES[rawCategoryId]
        ? rawCategoryId
        : 10;
      const category = ALLOWED_CATEGORIES[id_category];

      return {
        name,
        id_category,
        category,
      };
    })
    .filter(product => product.name.length > 0)
    .filter(
      (product, index, array) =>
        array.findIndex(
          item =>
            item.name === product.name &&
            item.id_category === product.id_category,
        ) === index,
    );

  return {
    products: normalizedProducts,
  };
};

/**
 * Fallback sin IA: separa el transcripto y asigna categoría desde el catálogo local.
 */
export function parseShoppingListLocally(text: string): ParsedProducts {
  const names = parseProductsFromSpeech(text);
  if (!names.length) {
    return EMPTY_PARSED_PRODUCTS;
  }

  return {
    products: names.map(name => {
      const match = findProductMatch(name);
      if (match) {
        const {category, name: catalogName} = match.catalogProduct;
        return {
          name: catalogName.trim().toLowerCase(),
          id_category: CATALOG_CATEGORY_TO_APP_ID[category],
          category: CATALOG_CATEGORY_DISPLAY_NAME[category],
        };
      }
      return {
        name: name.trim().toLowerCase(),
        id_category: 10,
        category: 'Sin categoría',
      };
    }),
  };
}

/**
 * Interpreta texto libre (voz o escrito) como lista de compras.
 * Usa Mistral si está disponible; si falla o no hay API key, parsea localmente.
 */
export async function parseShoppingListFromText(
  text: string,
): Promise<ParsedProducts> {
  const trimmed = text.trim();
  if (!trimmed) {
    return EMPTY_PARSED_PRODUCTS;
  }

  try {
    const parsed = await completeMistralChatJson(systemPrompt, trimmed);
    if (parsed !== null) {
      const normalized = normalizeParsedProducts(parsed);
      if (normalized.products.length > 0) {
        return normalized;
      }
    }
  } catch (error) {
    console.log('[parseShoppingListFromText] Mistral unavailable, using local parser', error);
  }

  return parseShoppingListLocally(trimmed);
}

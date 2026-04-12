import {ParsedTicket} from '../types/ticket';
import {completeMistralChatJson} from './mistralClient';
import {systemPrompt} from './systemPrompt';

const EMPTY_PARSED_TICKET: ParsedTicket = {
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

const normalizeParsedTicket = (value: unknown): ParsedTicket => {
  if (!value || typeof value !== 'object' || !('products' in value)) {
    return EMPTY_PARSED_TICKET;
  }

  const rawProducts = (value as {products?: unknown}).products;
  if (!Array.isArray(rawProducts)) {
    return EMPTY_PARSED_TICKET;
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
      const id_category = ALLOWED_CATEGORIES[rawCategoryId] ? rawCategoryId : 10;
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
 * Interpreta texto libre (voz o escrito) como lista de compras usando el prompt de productos multiples.
 */
export async function parseShoppingListFromText(
  text: string,
): Promise<ParsedTicket> {
  const trimmed = text.trim();
  if (!trimmed) {
    return EMPTY_PARSED_TICKET;
  }

  const parsed = await completeMistralChatJson(systemPrompt, trimmed);
  if (parsed === null) {
    return EMPTY_PARSED_TICKET;
  }

  return normalizeParsedTicket(parsed);
}

import {
  CatalogProduct,
  PRODUCT_CATALOG,
} from '../constants/productCatalog';
import {areGroceryProductNamesDuplicate} from '../common/utils/groceryProductNameMatch';
import {normalizeText} from './normalizeText';

export type ProductMatchResult = {
  catalogProduct: CatalogProduct;
  matchedKeyword: string;
  matchType: 'exact' | 'partial';
};

/**
 * Busca coincidencia en PRODUCT_CATALOG por keywords normalizadas.
 * Prioriza match exacto; luego match parcial solo si la keyword es suficientemente específica.
 */
export function findProductMatch(input: string): ProductMatchResult | null {
  const normalizedInput = normalizeText(input);
  if (!normalizedInput || normalizedInput.length < 2) {
    return null;
  }

  let bestPartial: ProductMatchResult | null = null;

  for (const product of PRODUCT_CATALOG) {
    for (const keyword of product.keywords) {
      const normalizedKeyword = normalizeText(keyword);
      if (!normalizedKeyword) {
        continue;
      }

      if (normalizedInput === normalizedKeyword) {
        return {
          catalogProduct: product,
          matchedKeyword: keyword,
          matchType: 'exact',
        };
      }

      const inputContainsKeyword =
        normalizedKeyword.length >= 3 &&
        (normalizedInput.startsWith(`${normalizedKeyword} `) ||
          (normalizedInput.startsWith(normalizedKeyword) &&
            (normalizedInput === normalizedKeyword ||
              areGroceryProductNamesDuplicate(
                normalizedKeyword,
                normalizedInput,
              ))));

      const keywordContainsInput =
        normalizedKeyword.includes(normalizedInput) &&
        normalizedInput.length >= 3 &&
        normalizedInput.length < normalizedKeyword.length;

      if (inputContainsKeyword || keywordContainsInput) {
        const candidate: ProductMatchResult = {
          catalogProduct: product,
          matchedKeyword: keyword,
          matchType: 'partial',
        };
        if (
          !bestPartial ||
          normalizedKeyword.length > normalizeText(bestPartial.matchedKeyword).length
        ) {
          bestPartial = candidate;
        }
      }
    }

    const normalizedName = normalizeText(product.name);
    if (normalizedInput === normalizedName) {
      return {
        catalogProduct: product,
        matchedKeyword: product.name,
        matchType: 'exact',
      };
    }
  }

  return bestPartial;
}

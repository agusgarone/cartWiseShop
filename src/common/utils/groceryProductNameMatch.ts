/**
 * Detección de “mismo producto” para catálogo local: evita duplicados tipo tomate/tomates
 * sin usar includes() bidireccional (que bloquea casos como sal vs salsa).
 */

export function normalizeGroceryProductName(name: string): string {
  return name.trim().toLowerCase();
}

const SPANISH_PLURAL_SUFFIXES = ['s', 'es', 'os', 'as'] as const;

/**
 * True si dos nombres ya normalizados son el mismo ítem de compra (exacto o singular/plural obvio).
 */
export function areGroceryProductNamesDuplicate(a: string, b: string): boolean {
  const x = normalizeGroceryProductName(a);
  const y = normalizeGroceryProductName(b);
  if (x === y) {
    return true;
  }
  const [shorter, longer] = x.length <= y.length ? [x, y] : [y, x];
  // Raíz muy corta: no inferimos plural (evita ruido tipo mes/mesas si algún día se relaja más).
  if (shorter.length < 3) {
    return false;
  }
  if (longer.length <= shorter.length) {
    return false;
  }
  if (!longer.startsWith(shorter)) {
    return false;
  }
  const suffix = longer.slice(shorter.length);
  return (SPANISH_PLURAL_SUFFIXES as readonly string[]).includes(suffix);
}

/** Primer producto del catálogo que coincide por nombre exacto o variante plural simple. */
export function findCatalogProductByGroceryName<T extends {name: string}>(
  normalizedName: string,
  catalog: T[],
): T | undefined {
  const n = normalizeGroceryProductName(normalizedName);
  const exact = catalog.find(p => normalizeGroceryProductName(p.name) === n);
  if (exact) {
    return exact;
  }
  return catalog.find(p => areGroceryProductNamesDuplicate(p.name, n));
}

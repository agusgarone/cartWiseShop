import {normalizeText} from './normalizeText';

const FILLER_WORDS = [
  'agrega',
  'agregá',
  'agregar',
  'suma',
  'sumá',
  'sumar',
  'comprar',
  'necesito',
  'necesitamos',
  'pon',
  'poné',
  'poner',
  'añade',
  'añadir',
  'anade',
  'anadir',
  'dame',
  'trae',
  'traé',
];

const SEPARATOR_PATTERN = /\s*(?:,|\by\b|\be\b|\bo\b|\u00f3\b|\u00e1\b|\u00ed\b|\n|\r|\|)\s*/i;

function stripFillers(text: string): string {
  let cleaned = text.trim();
  for (const word of FILLER_WORDS) {
    const pattern = new RegExp(`^${word}\\s+`, 'i');
    cleaned = cleaned.replace(pattern, '');
  }
  return cleaned.trim();
}

/**
 * Convierte texto transcripto de voz en nombres de productos individuales.
 */
export function parseProductsFromSpeech(text: string): string[] {
  const cleaned = stripFillers(text);
  if (!cleaned) {
    return [];
  }

  const parts = cleaned
    .split(SEPARATOR_PATTERN)
    .map(part => part.trim())
    .filter(Boolean);

  const seen = new Set<string>();
  const result: string[] = [];

  for (const part of parts) {
    const normalized = normalizeText(part);
    if (normalized.length < 2 || seen.has(normalized)) {
      continue;
    }
    seen.add(normalized);
    result.push(part.trim());
  }

  return result;
}

import {completeMistralChatJson} from './mistralClient';

/**
 * Ejecuta el agente Mistral con un system prompt arbitrario y devuelve el JSON parseado.
 * Para listas de compras usar `parseShoppingListFromText`; para crear un producto, otro prompt + normalizador propio.
 */
export async function runMistralJsonAgent(
  systemPrompt: string,
  userText: string,
): Promise<unknown | null> {
  const trimmed = userText.trim();
  if (!trimmed) {
    return null;
  }
  return completeMistralChatJson(systemPrompt, trimmed);
}

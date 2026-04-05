import {MISTRAL_API_KEY} from '@env';

const mistralApiKey = MISTRAL_API_KEY?.trim();

const getResponseText = (content: unknown): string => {
  if (typeof content === 'string') {
    return content;
  }

  if (!Array.isArray(content)) {
    return '';
  }

  return content
    .map(chunk => {
      if (
        chunk &&
        typeof chunk === 'object' &&
        'type' in chunk &&
        'text' in chunk &&
        chunk.type === 'text' &&
        typeof chunk.text === 'string'
      ) {
        return chunk.text;
      }

      return '';
    })
    .join('')
    .trim();
};

/**
 * Chat completion con Mistral forzando JSON; devuelve el objeto parseado o null si falla red/parseo.
 */
export async function completeMistralChatJson(
  systemPrompt: string,
  userMessage: string,
): Promise<unknown | null> {
  if (!mistralApiKey) {
    console.warn(
      '[mistral] MISTRAL_API_KEY no configurada. Revisá .env y reiniciá Metro.',
    );
    return null;
  }

  try {
    const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${mistralApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'mistral-large-latest',
        messages: [
          {role: 'system', content: systemPrompt},
          {role: 'user', content: userMessage},
        ],
        response_format: {type: 'json_object'},
      }),
    });

    if (!response.ok) {
      console.log(
        'Mistral request error',
        response.status,
        response.statusText,
      );
      return null;
    }

    const result = (await response.json()) as {
      choices?: Array<{
        message?: {
          content?: unknown;
        };
      }>;
    };

    const raw = getResponseText(result.choices?.[0]?.message?.content);
    if (!raw) {
      return null;
    }

    return JSON.parse(raw) as unknown;
  } catch (error) {
    console.log('Mistral parse error', error);
    return null;
  }
}

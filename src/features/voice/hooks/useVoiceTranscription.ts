import {useCallback, useEffect, useRef, useState} from 'react';
import {useSpeechRecognitionEvent} from 'expo-speech-recognition';
import {speechRecognitionNative} from '../speechRecognitionNative';
import {parseShoppingListFromText} from '../../../services/parseShoppingListFromText';

export function useVoiceTranscription() {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [interim, setInterim] = useState('');
  const [error, setError] = useState<string | null>(null);
  const lastProcessedTranscriptRef = useRef('');

  useSpeechRecognitionEvent('start', () => setListening(true));
  useSpeechRecognitionEvent('end', () => {
    setListening(false);
    setInterim('');
  });
  useSpeechRecognitionEvent('result', ev => {
    const text = ev.results[0]?.transcript ?? '';
    if (ev.isFinal) {
      setTranscript(prev => (prev ? `${prev} ${text}` : text).trim());
      setInterim('');
    } else {
      setInterim(text);
    }
  });
  useSpeechRecognitionEvent('error', ev => {
    setError(ev.message || ev.error);
    setListening(false);
  });

  useEffect(() => {
    const normalizedTranscript = transcript.trim();
    if (
      !normalizedTranscript ||
      normalizedTranscript === lastProcessedTranscriptRef.current
    ) {
      return;
    }

    lastProcessedTranscriptRef.current = normalizedTranscript;

    const parseTranscript = async () => {
      try {
        const parsedTicket =
          await parseShoppingListFromText(normalizedTranscript);
        console.log('[Voice][Transcript]', normalizedTranscript);
        console.log('[Voice][ShoppingList][ParsedTicket]', parsedTicket);
      } catch (parseError) {
        console.log('[Voice][ShoppingList][Error]', parseError);
      }
    };

    parseTranscript();
  }, [transcript]);

  const start = useCallback(async () => {
    setError(null);
    try {
      const perm = await speechRecognitionNative.requestPermissionsAsync();
      if (!perm.granted) {
        setError('Permisos de micrófono o reconocimiento de voz denegados.');
        return;
      }

      if (!speechRecognitionNative.isRecognitionAvailable()) {
        setError(
          'Reconocimiento de voz no disponible en el dispositivo (servicios de Google / Siri).',
        );
        return;
      }

      // `start` a veces devuelve Promise desde el bridge; Promise.resolve evita rechazos sin manejar.
      await Promise.resolve(
        speechRecognitionNative.start({
          lang: 'es-ES',
          interimResults: true,
          continuous: false,
        }),
      );
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      setError(msg || 'No se pudo iniciar el dictado.');
      setListening(false);
    }
  }, []);

  const stop = useCallback(() => {
    speechRecognitionNative.stop();
  }, []);

  const reset = useCallback(() => {
    setTranscript('');
    setInterim('');
    setError(null);
    lastProcessedTranscriptRef.current = '';
  }, []);

  return {listening, transcript, interim, error, start, stop, reset};
}

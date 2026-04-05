import {useCallback, useEffect, useRef, useState} from 'react';
import {useSpeechRecognitionEvent} from 'expo-speech-recognition';
import {speechRecognitionNative} from '../speechRecognitionNative';
import {buildVoiceRecognitionOptions} from '../voiceRecognitionConfig';
import {parseShoppingListFromText} from '../../../services/IA/parseShoppingListFromText';
import i18n from '../../../services/i18n';
import {
  claimVoiceSession,
  isVoiceSessionOwner,
  releaseVoiceSession,
} from '../voiceSessionOwner';

export type UseVoiceTranscriptionOptions = {
  /** Si es false, no se llama a la IA al cambiar el transcript (p. ej. modal que finaliza manualmente). */
  autoParse?: boolean;
  /**
   * Si es true, cada start() limpia transcript (p. ej. pantalla de prueba con varios dictados seguidos).
   * En el modal de productos debe ser false para poder detener y seguir dictando en la misma sesión.
   */
  clearTranscriptOnStart?: boolean;
};

export function useVoiceTranscription(options?: UseVoiceTranscriptionOptions) {
  const autoParse = options?.autoParse ?? true;
  const clearTranscriptOnStart = options?.clearTranscriptOnStart ?? false;
  const sessionIdRef = useRef(
    `voice-${Math.random().toString(36).slice(2, 11)}`,
  );
  const sessionId = sessionIdRef.current;

  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [interim, setInterim] = useState('');
  const [error, setError] = useState<string | null>(null);
  const lastProcessedTranscriptRef = useRef('');
  const userRequestedStopRef = useRef(false);

  useSpeechRecognitionEvent('start', () => {
    if (!isVoiceSessionOwner(sessionId)) {
      return;
    }
    setListening(true);
  });

  useSpeechRecognitionEvent('end', () => {
    if (!isVoiceSessionOwner(sessionId)) {
      return;
    }

    if (!userRequestedStopRef.current) {
      void Promise.resolve(
        speechRecognitionNative.start(buildVoiceRecognitionOptions()),
      ).catch(() => {
        userRequestedStopRef.current = true;
        setListening(false);
        setInterim('');
        releaseVoiceSession(sessionId);
      });
      return;
    }

    setListening(false);
    setInterim('');
    releaseVoiceSession(sessionId);
  });

  useSpeechRecognitionEvent('result', ev => {
    if (!isVoiceSessionOwner(sessionId)) {
      return;
    }
    const text = ev.results[0]?.transcript ?? '';
    if (ev.isFinal) {
      setTranscript(prev => (prev ? `${prev} ${text}` : text).trim());
      setInterim('');
    } else {
      setInterim(text);
    }
  });

  useSpeechRecognitionEvent('error', ev => {
    if (!isVoiceSessionOwner(sessionId)) {
      return;
    }
    userRequestedStopRef.current = true;
    setError(ev.message || ev.error);
    setListening(false);
    releaseVoiceSession(sessionId);
  });

  useEffect(() => {
    if (!autoParse) {
      return;
    }

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
        await parseShoppingListFromText(normalizedTranscript);
      } catch (parseError) {
        console.log('parseTranscript error');
      }
    };

    parseTranscript();
  }, [transcript, autoParse]);

  useEffect(() => {
    return () => {
      if (isVoiceSessionOwner(sessionId)) {
        speechRecognitionNative.stop();
        releaseVoiceSession(sessionId);
      }
    };
  }, [sessionId]);

  const start = useCallback(async () => {
    if (clearTranscriptOnStart) {
      setTranscript('');
      setInterim('');
      lastProcessedTranscriptRef.current = '';
    }
    setError(null);
    userRequestedStopRef.current = false;
    try {
      const perm = await speechRecognitionNative.requestPermissionsAsync();
      if (!perm.granted) {
        setError(i18n.t('voice.errors.permissionDenied'));
        return;
      }

      if (!speechRecognitionNative.isRecognitionAvailable()) {
        setError(i18n.t('voice.errors.recognitionUnavailable'));
        return;
      }

      claimVoiceSession(sessionId);

      await Promise.resolve(
        speechRecognitionNative.start(buildVoiceRecognitionOptions()),
      );
    } catch (e) {
      releaseVoiceSession(sessionId);
      const msg = e instanceof Error ? e.message : String(e);
      setError(msg || i18n.t('voice.errors.startFailed'));
      setListening(false);
    }
  }, [clearTranscriptOnStart, sessionId]);

  /** Marca fin de sesión; el evento `end` libera el owner. */
  const stop = useCallback(() => {
    userRequestedStopRef.current = true;
    speechRecognitionNative.stop();
  }, []);

  const reset = useCallback(() => {
    userRequestedStopRef.current = true;
    if (isVoiceSessionOwner(sessionId)) {
      speechRecognitionNative.stop();
      releaseVoiceSession(sessionId);
    }
    setListening(false);
    setTranscript('');
    setInterim('');
    setError(null);
    lastProcessedTranscriptRef.current = '';
  }, [sessionId]);

  return {listening, transcript, interim, error, start, stop, reset};
}

import type {ExpoSpeechRecognitionOptions} from 'expo-speech-recognition';

/** Silencio prolongado (Android) antes de dar por terminado el dictado. */
export const VOICE_COMPLETE_SILENCE_MS = 20_000;

/** Pausa intermedia (Android) antes de un resultado parcial final. */
export const VOICE_POSSIBLY_COMPLETE_SILENCE_MS = 10_000;

export function buildVoiceRecognitionOptions(): ExpoSpeechRecognitionOptions {
  return {
    lang: 'es-ES',
    interimResults: true,
    /** Evita corte ~3s en iOS; el usuario frena con "Detener". */
    continuous: true,
    iosTaskHint: 'dictation',
    androidIntentOptions: {
      EXTRA_SPEECH_INPUT_COMPLETE_SILENCE_LENGTH_MILLIS:
        VOICE_COMPLETE_SILENCE_MS,
      EXTRA_SPEECH_INPUT_POSSIBLY_COMPLETE_SILENCE_LENGTH_MILLIS:
        VOICE_POSSIBLY_COMPLETE_SILENCE_MS,
    },
  };
}

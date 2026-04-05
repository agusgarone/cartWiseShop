import {requireNativeModule} from 'expo-modules-core';
import type {ExpoSpeechRecognitionOptions} from 'expo-speech-recognition';

/**
 * expo-speech-recognition hace `{...requireNativeModule()}` y solo re-enlaza stop/abort/etc.
 * En Hermes/JSI, `start` a veces no se copia con el spread → queda `undefined`.
 * Aquí llamamos al módulo nativo directamente (mismo patrón que stop en la librería).
 */
type Native = {
  start: (options: ExpoSpeechRecognitionOptions) => void | Promise<void>;
  stop: () => void;
  abort: () => void;
  requestPermissionsAsync: () => Promise<import('expo-modules-core').PermissionResponse>;
  isRecognitionAvailable: () => boolean;
};

const ExpoSpeechRecognition = requireNativeModule<Native>('ExpoSpeechRecognition');

export const speechRecognitionNative = {
  start: (options: ExpoSpeechRecognitionOptions) => ExpoSpeechRecognition.start(options),
  stop: () => ExpoSpeechRecognition.stop(),
  abort: () => ExpoSpeechRecognition.abort(),
  requestPermissionsAsync: () => ExpoSpeechRecognition.requestPermissionsAsync(),
  isRecognitionAvailable: () => ExpoSpeechRecognition.isRecognitionAvailable(),
};

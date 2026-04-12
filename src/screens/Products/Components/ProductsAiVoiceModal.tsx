import React, {useCallback, useContext, useEffect, useRef, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import Modal from 'react-native-modal';
import {Sparkles} from 'lucide-react-native';
import {useTranslation} from 'react-i18next';
import {ThemeContext} from '../../../services/ThemeProvider';
import {useVoiceTranscription} from '../../../features/voice/hooks/useVoiceTranscription';
import {parseShoppingListFromText} from '../../../services/parseShoppingListFromText';
import type {ParsedTicket} from '../../../types/ticket';
import Button from '../../../components/Button';

type Props = {
  visible: boolean;
  onClose: () => void;
  onContinueWithParsed: (parsed: ParsedTicket) => void;
};

const POST_STOP_MS = 400;

export function ProductsAiVoiceModal({
  visible,
  onClose,
  onContinueWithParsed,
}: Props) {
  const {t} = useTranslation();
  const {theme} = useContext(ThemeContext);
  const {listening, transcript, interim, error, start, stop, reset} =
    useVoiceTranscription({autoParse: false});
  const [finalizing, setFinalizing] = useState(false);
  const prevVisibleRef = useRef(visible);
  const visibleRef = useRef(visible);
  visibleRef.current = visible;

  /** Al cerrar el modal: cortar reconocimiento y limpiar transcript (evita texto de la sesión anterior). */
  const clearVoiceSession = useCallback(() => {
    stop();
    reset();
    setFinalizing(false);
  }, [reset, stop]);

  useEffect(() => {
    const wasVisible = prevVisibleRef.current;
    prevVisibleRef.current = visible;

    if (visible && !wasVisible) {
      reset();
      setFinalizing(false);
    }
    if (!visible && wasVisible) {
      clearVoiceSession();
    }
  }, [visible, reset, clearVoiceSession]);

  const handleClose = useCallback(() => {
    clearVoiceSession();
    onClose();
  }, [clearVoiceSession, onClose]);

  const handleContinue = useCallback(async () => {
    if (finalizing) {
      return;
    }
    setFinalizing(true);
    if (listening) {
      stop();
    }
    await new Promise<void>(resolve => setTimeout(resolve, POST_STOP_MS));
    try {
      const text = [transcript, interim].filter(Boolean).join(' ').trim();
      const parsed = await parseShoppingListFromText(text);
      onContinueWithParsed(parsed);
    } catch (e) {
      console.log('[Products][AI Voice] Error al interpretar:', e);
    } finally {
      clearVoiceSession();
      onClose();
    }
  }, [
    clearVoiceSession,
    finalizing,
    interim,
    listening,
    onClose,
    onContinueWithParsed,
    stop,
    transcript,
  ]);

  const displayText = [transcript, interim].filter(Boolean).join(' ').trim();
  const hasRecognizedText = displayText.length > 0;

  /** Escuchando → Detener+Cerrar. Con texto y sin escuchar → Continuar+Cerrar. Si no → Iniciar+Cerrar. */
  const primaryAction = listening
    ? 'stop'
    : hasRecognizedText
      ? 'continue'
      : 'start';

  const previewLabel =
    listening
      ? t('products.aiVoice.listening')
      : hasRecognizedText
        ? t('products.aiVoice.readyToContinue')
        : t('products.aiVoice.preview');

  return (
    <Modal
      isVisible={visible}
      onBackdropPress={handleClose}
      onBackButtonPress={handleClose}
      onModalHide={() => {
        if (!visibleRef.current) {
          clearVoiceSession();
        }
      }}
      avoidKeyboard>
      <View
        style={[
          styles.sheet,
          {
            backgroundColor: theme.modal.background,
            borderColor: theme.modal.borderColor,
          },
        ]}>
        <View style={styles.iconWrap}>
          <Sparkles size={36} color={theme.modal.icon} />
        </View>
        <Text style={[styles.title, {color: theme.modal.text}]}>
          {t('products.aiVoice.title')}
        </Text>
        <Text style={[styles.subtitle, {color: theme.modal.text}]}>
          {t('products.aiVoice.subtitle')}
        </Text>

        {error ? (
          <Text style={[styles.error, {color: theme.modal.text}]}>{error}</Text>
        ) : null}

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}>
          <Text style={[styles.previewLabel, {color: theme.modal.text}]}>
            {previewLabel}
          </Text>
          <Text style={[styles.preview, {color: theme.modal.text}]}>
            {displayText || '—'}
          </Text>
        </ScrollView>

        <View style={styles.row}>
          <View style={styles.flex}>
            <Button
              type="primary"
              isDisabled={finalizing}
              onPress={
                primaryAction === 'start'
                  ? start
                  : primaryAction === 'stop'
                    ? stop
                    : handleContinue
              }
              children={
                primaryAction === 'start'
                  ? t('products.aiVoice.start')
                  : primaryAction === 'stop'
                    ? t('products.aiVoice.stop')
                    : t('products.aiVoice.continue')
              }
            />
          </View>
          <View style={styles.flex}>
            <Button
              type="secondary"
              isDisabled={finalizing}
              onPress={handleClose}
              children={t('products.aiVoice.close')}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  sheet: {
    borderRadius: 12,
    borderWidth: 2,
    padding: 20,
    maxHeight: '72%',
  },
  iconWrap: {
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 22,
  },
  error: {
    fontSize: 14,
    marginBottom: 8,
    textAlign: 'center',
  },
  scroll: {
    maxHeight: 140,
    marginBottom: 16,
  },
  scrollContent: {
    paddingVertical: 4,
  },
  previewLabel: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 6,
  },
  preview: {
    fontSize: 16,
    lineHeight: 22,
  },
  row: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
  },
  flex: {
    flex: 1,
  },
});

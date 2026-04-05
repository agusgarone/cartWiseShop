import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {ScrollView, StyleSheet, Text, View, Alert} from 'react-native';
import Modal from 'react-native-modal';
import {Sparkles} from 'lucide-react-native';
import {useTranslation} from 'react-i18next';
import {ThemeContext} from '../../../services/ThemeProvider';
import {useVoiceTranscription} from '../hooks/useVoiceTranscription';
import {parseShoppingListFromText} from '../../../services/IA/parseShoppingListFromText';
import type {ParsedProducts} from '../../../types/ticket';
import Button from '../../../components/Button';

type I18nPrefix = 'products' | 'createList' | 'listEditor';

type Props = {
  visible: boolean;
  onClose: () => void;
  onContinueWithParsed: (parsed: ParsedProducts) => void;
  i18nPrefix: I18nPrefix;
};

const POST_STOP_MS = 400;

export function VoiceShoppingListModal({
  visible,
  onClose,
  onContinueWithParsed,
  i18nPrefix,
}: Props) {
  const {t} = useTranslation();
  const {theme} = useContext(ThemeContext);
  const {listening, transcript, interim, error, start, stop, reset} =
    useVoiceTranscription({autoParse: false});
  const [finalizing, setFinalizing] = useState(false);
  const prevVisibleRef = useRef(visible);
  const visibleRef = useRef(visible);
  visibleRef.current = visible;

  const tk = (key: string) => t(`${i18nPrefix}.aiVoice.${key}` as const);

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
    let shouldClose = false;
    try {
      const text = [transcript, interim].filter(Boolean).join(' ').trim();
      const parsed = await parseShoppingListFromText(text);
      if (!parsed.products.length) {
        Alert.alert(t('products.voiceReview.empty'));
        return;
      }
      onContinueWithParsed(parsed);
      shouldClose = true;
    } catch (e) {
      console.log(`[${i18nPrefix}][AI Voice] Error al interpretar:`, e);
    } finally {
      if (shouldClose) {
        clearVoiceSession();
        onClose();
      } else {
        setFinalizing(false);
      }
    }
  }, [
    clearVoiceSession,
    finalizing,
    i18nPrefix,
    interim,
    listening,
    onClose,
    onContinueWithParsed,
    stop,
    t,
    transcript,
  ]);

  const displayText = [transcript, interim].filter(Boolean).join(' ').trim();
  const hasRecognizedText = displayText.length > 0;

  const primaryAction = listening
    ? 'stop'
    : hasRecognizedText
    ? 'continue'
    : 'start';

  const previewLabel = listening
    ? tk('listening')
    : hasRecognizedText
    ? tk('readyToContinue')
    : tk('preview');

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
          {tk('title')}
        </Text>
        <Text style={[styles.subtitle, {color: theme.modal.text}]}>
          {tk('subtitle')}
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
                  ? tk('start')
                  : primaryAction === 'stop'
                  ? tk('stop')
                  : tk('continue')
              }
            />
          </View>
          <View style={styles.flex}>
            <Button
              type="secondary"
              isDisabled={finalizing}
              onPress={handleClose}
              children={tk('close')}
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

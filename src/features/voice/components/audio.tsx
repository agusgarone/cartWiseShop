import React from 'react';
import {View, Text, Button, ScrollView, StyleSheet} from 'react-native';
import {useVoiceTranscription} from '../hooks/useVoiceTranscription';

export default function AudioTestScreen() {
  const {listening, transcript, interim, error, start, stop, reset} =
    useVoiceTranscription({clearTranscriptOnStart: true});

  return (
    <View style={styles.wrap}>
      <Text style={styles.label}>
        {listening ? 'Escuchando…' : 'Listo para dictar'}
      </Text>

      {!listening ? (
        <Button title="Empezar dictado" onPress={start} />
      ) : (
        <Button title="Detener" onPress={stop} color="#c62828" />
      )}

      <Button title="Borrar texto" onPress={reset} disabled={!transcript} />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <ScrollView style={styles.scroll}>
        <Text style={styles.transcript}>
          {transcript}
          {interim ? <Text style={styles.interim}> {interim}</Text> : null}
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    paddingVertical: 12,
    gap: 8,
    maxHeight: 220,
  },
  label: {marginBottom: 4, fontSize: 15},
  error: {color: '#c62828', marginTop: 4},
  scroll: {maxHeight: 120, marginTop: 8},
  transcript: {fontSize: 15, lineHeight: 22},
  interim: {color: '#666', fontStyle: 'italic'},
});

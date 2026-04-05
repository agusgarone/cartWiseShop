import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {filterDrawerTheme} from './filterDrawerTheme';

type BottomFilterActionsProps = {
  clearLabel: string;
  applyLabel: string;
  onClear: () => void;
  onApply: () => void;
};

export const BottomFilterActions = ({
  clearLabel,
  applyLabel,
  onClear,
  onApply,
}: BottomFilterActionsProps) => (
  <View style={styles.container}>
    <Pressable
      onPress={onClear}
      style={({pressed}) => [styles.clearBtn, pressed && styles.pressed]}>
      <Text style={styles.clearText}>{clearLabel}</Text>
    </Pressable>
    <Pressable
      onPress={onApply}
      style={({pressed}) => [styles.applyBtn, pressed && styles.pressed]}>
      <Text style={styles.applyText}>{applyLabel}</Text>
    </Pressable>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingTop: 12,
    paddingBottom: 8,
    borderTopWidth: 1,
    borderTopColor: filterDrawerTheme.border,
    backgroundColor: filterDrawerTheme.background,
  },
  clearBtn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: filterDrawerTheme.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearText: {
    fontSize: 15,
    fontWeight: '700',
    color: filterDrawerTheme.accent,
  },
  applyBtn: {
    flex: 1.6,
    paddingVertical: 14,
    borderRadius: 16,
    backgroundColor: filterDrawerTheme.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  applyText: {
    fontSize: 15,
    fontWeight: '700',
    color: filterDrawerTheme.onAccent,
  },
  pressed: {
    opacity: 0.9,
  },
});

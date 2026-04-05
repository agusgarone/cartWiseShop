import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
import {filterDrawerTheme} from './filterDrawerTheme';

type FilterChipProps = {
  label: string;
  selected: boolean;
  onPress: () => void;
  compact?: boolean;
};

export const FilterChip = ({
  label,
  selected,
  onPress,
  compact = false,
}: FilterChipProps) => (
  <Pressable
    onPress={onPress}
    style={({pressed}) => [
      styles.chip,
      compact && styles.chipCompact,
      selected ? styles.chipSelected : styles.chipIdle,
      pressed && styles.chipPressed,
    ]}>
    <Text
      style={[
        styles.label,
        compact && styles.labelCompact,
        selected ? styles.labelSelected : styles.labelIdle,
      ]}>
      {label}
    </Text>
  </Pressable>
);

const styles = StyleSheet.create({
  chip: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    minWidth: 72,
    alignItems: 'center',
  },
  chipCompact: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    minWidth: 64,
  },
  chipSelected: {
    backgroundColor: filterDrawerTheme.accent,
    borderColor: filterDrawerTheme.accent,
  },
  chipIdle: {
    backgroundColor: filterDrawerTheme.card,
    borderColor: filterDrawerTheme.border,
  },
  chipPressed: {
    opacity: 0.88,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
  },
  labelCompact: {
    fontSize: 13,
  },
  labelSelected: {
    color: filterDrawerTheme.onAccent,
  },
  labelIdle: {
    color: filterDrawerTheme.textPrimary,
  },
});

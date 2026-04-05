import React, {useContext} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ThemeContext} from '../../../services/ThemeProvider';
import {useTranslation} from 'react-i18next';

export type ShoppingFilter = 'all' | 'pending' | 'purchased';

type ListFilterBarProps = {
  activeFilter: ShoppingFilter;
  onFilterChange: (filter: ShoppingFilter) => void;
};

export const ListFilterBar = ({
  activeFilter,
  onFilterChange,
}: ListFilterBarProps) => {
  const {theme} = useContext(ThemeContext);
  const {t} = useTranslation();

  const filters: {key: ShoppingFilter; label: string}[] = [
    {key: 'all', label: t('listEditor.filterAll')},
    {key: 'pending', label: t('listEditor.filterPending')},
    {key: 'purchased', label: t('listEditor.filterPurchased')},
  ];

  return (
    <View style={styles.container}>
      {filters.map(filter => {
        const isActive = activeFilter === filter.key;
        return (
          <TouchableOpacity
            key={filter.key}
            style={[
              styles.chip,
              {
                backgroundColor: isActive
                  ? theme.button.background
                  : theme.listEditor?.filterChipBackground ?? theme.input.background,
                borderColor: theme.input.borderColor,
              },
            ]}
            onPress={() => onFilterChange(filter.key)}>
            <Text
              style={[
                styles.chipText,
                {
                  color: isActive
                    ? theme.button.text
                    : theme.listEditor?.filterChipText ?? theme.input.color,
                },
              ]}>
              {filter.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
    flexWrap: 'wrap',
  },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
  },
  chipText: {
    fontSize: 13,
    fontWeight: '600',
  },
});

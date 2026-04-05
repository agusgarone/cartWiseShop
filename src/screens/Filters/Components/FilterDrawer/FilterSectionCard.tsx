import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {filterDrawerTheme} from './filterDrawerTheme';

type FilterSectionCardProps = {
  title: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
};

export const FilterSectionCard = ({
  title,
  children,
  icon,
}: FilterSectionCardProps) => (
  <View style={styles.card}>
    <View style={styles.header}>
      {icon ? <View style={styles.iconWrap}>{icon}</View> : null}
      <Text style={styles.title}>{title}</Text>
    </View>
    {children}
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: filterDrawerTheme.card,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: filterDrawerTheme.border,
    padding: 16,
    marginBottom: 14,
    shadowColor: '#2E2A24',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  iconWrap: {
    width: 28,
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: filterDrawerTheme.textPrimary,
    flex: 1,
  },
});

import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {Check, Circle} from 'lucide-react-native';
import {filterDrawerTheme} from './filterDrawerTheme';

type CategoryFilterItemProps = {
  name: string;
  count: number;
  selected: boolean;
  icon?: React.ReactNode;
  onPress: () => void;
};

export const CategoryFilterItem = ({
  name,
  count,
  selected,
  icon,
  onPress,
}: CategoryFilterItemProps) => (
  <Pressable
    onPress={onPress}
    style={({pressed}) => [
      styles.row,
      selected ? styles.rowSelected : styles.rowIdle,
      pressed && styles.rowPressed,
    ]}>
    <View style={styles.left}>
      {icon ? <View style={styles.icon}>{icon}</View> : null}
      <Text
        style={[styles.name, selected && styles.nameSelected]}
        numberOfLines={1}>
        {name}
      </Text>
    </View>
    <View style={styles.right}>
      <View style={[styles.badge, selected && styles.badgeSelected]}>
        <Text style={[styles.badgeText, selected && styles.badgeTextSelected]}>
          {count}
        </Text>
      </View>
      {selected ? (
        <Check size={20} color={filterDrawerTheme.accent} strokeWidth={2.5} />
      ) : (
        <Circle size={20} color={filterDrawerTheme.border} strokeWidth={1.5} />
      )}
    </View>
  </Pressable>
);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 14,
    borderWidth: 1,
    marginBottom: 8,
  },
  rowSelected: {
    backgroundColor: filterDrawerTheme.accentSoft,
    borderColor: filterDrawerTheme.accent,
  },
  rowIdle: {
    backgroundColor: filterDrawerTheme.card,
    borderColor: filterDrawerTheme.border,
  },
  rowPressed: {
    opacity: 0.9,
  },
  left: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginRight: 8,
  },
  icon: {
    width: 22,
    alignItems: 'center',
  },
  name: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: filterDrawerTheme.textPrimary,
  },
  nameSelected: {
    color: filterDrawerTheme.textPrimary,
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  badge: {
    minWidth: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: filterDrawerTheme.background,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  badgeSelected: {
    backgroundColor: filterDrawerTheme.onAccent,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: filterDrawerTheme.textSecondary,
  },
  badgeTextSelected: {
    color: filterDrawerTheme.accent,
  },
  rowSelectedBadgeFix: {},
});

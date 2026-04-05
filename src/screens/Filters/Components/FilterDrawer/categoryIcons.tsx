import React from 'react';
import {
  Apple,
  Beef,
  CupSoda,
  Droplets,
  Egg,
  Fish,
  Leaf,
  Milk,
  Package,
  Snowflake,
  Wheat,
} from 'lucide-react-native';
import {filterDrawerTheme} from './filterDrawerTheme';

const ICON_SIZE = 20;
const ICON_COLOR = filterDrawerTheme.textSecondary;

/** Ícono aproximado según nombre de categoría del sistema. */
export function getCategoryIcon(categoryName: string): React.ReactNode {
  const key = categoryName.toLowerCase();

  if (key.includes('fruta') || key.includes('verdura')) {
    return <Apple size={ICON_SIZE} color={ICON_COLOR} />;
  }
  if (key.includes('carne') || key.includes('pescado')) {
    return key.includes('pescado') ? (
      <Fish size={ICON_SIZE} color={ICON_COLOR} />
    ) : (
      <Beef size={ICON_SIZE} color={ICON_COLOR} />
    );
  }
  if (key.includes('lácteo') || key.includes('lacteo') || key.includes('huevo')) {
    return <Milk size={ICON_SIZE} color={ICON_COLOR} />;
  }
  if (key.includes('panader')) {
    return <Wheat size={ICON_SIZE} color={ICON_COLOR} />;
  }
  if (key.includes('bebida')) {
    return <CupSoda size={ICON_SIZE} color={ICON_COLOR} />;
  }
  if (key.includes('limpieza')) {
    return <Droplets size={ICON_SIZE} color={ICON_COLOR} />;
  }
  if (key.includes('higiene')) {
    return <Leaf size={ICON_SIZE} color={ICON_COLOR} />;
  }
  if (key.includes('congel')) {
    return <Snowflake size={ICON_SIZE} color={ICON_COLOR} />;
  }
  if (key.includes('despensa') || key.includes('almacén') || key.includes('almacen')) {
    return <Package size={ICON_SIZE} color={ICON_COLOR} />;
  }
  if (key.includes('huevo')) {
    return <Egg size={ICON_SIZE} color={ICON_COLOR} />;
  }

  return <Package size={ICON_SIZE} color={ICON_COLOR} />;
}

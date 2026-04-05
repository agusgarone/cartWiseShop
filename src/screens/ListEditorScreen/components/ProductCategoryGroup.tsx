import React, {useContext} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {IProductForm} from '../../../models/types/product';
import {ThemeContext} from '../../../services/ThemeProvider';
import {
  groupProductsByCategory,
  sortCategoryKeys,
} from '../../../utils/groupProductsByCategory';
import {CheckableProductItem} from './CheckableProductItem';
import {EditableProductItem} from './EditableProductItem';
import type {ListMode} from './ListModeSelector';

type ProductCategoryGroupProps = {
  products: IProductForm[];
  mode: ListMode;
  groupByCategory: boolean;
  sortOrderAsc?: boolean;
  onRemoveProduct: (id: number) => void;
  onToggleChecked: (id: number, checked: boolean) => void;
  emptyComponent?: React.ReactNode;
};

export const ProductCategoryGroup = ({
  products,
  mode,
  groupByCategory,
  sortOrderAsc = true,
  onRemoveProduct,
  onToggleChecked,
  emptyComponent,
}: ProductCategoryGroupProps) => {
  const {theme} = useContext(ThemeContext);

  if (products.length === 0) {
    return emptyComponent ? <>{emptyComponent}</> : null;
  }

  if (!groupByCategory || mode === 'editing') {
    return (
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled">
        {products.map(product =>
          mode === 'editing' ? (
            <EditableProductItem
              key={product.id}
              item={product}
              onRemove={onRemoveProduct}
            />
          ) : (
            <CheckableProductItem
              key={product.id}
              item={product}
              onToggle={onToggleChecked}
            />
          ),
        )}
      </ScrollView>
    );
  }

  const grouped = groupProductsByCategory(products);
  const categoryKeys = sortCategoryKeys(Object.keys(grouped), sortOrderAsc);

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.scrollContent}
      keyboardShouldPersistTaps="handled">
      {categoryKeys.map(category => (
        <View key={category} style={styles.section}>
          <Text
            style={[
              styles.sectionTitle,
              {color: theme.listDetail.titleColor},
            ]}>
            {category}
          </Text>
          {grouped[category].map(product => (
            <CheckableProductItem
              key={product.id}
              item={product}
              onToggle={onToggleChecked}
            />
          ))}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 80,
  },
  section: {
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
});

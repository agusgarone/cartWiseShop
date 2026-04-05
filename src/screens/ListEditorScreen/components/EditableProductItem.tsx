import React, {useContext} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {X} from 'lucide-react-native';
import {IProductForm} from '../../../models/types/product';
import {ThemeContext} from '../../../services/ThemeProvider';

type EditableProductItemProps = {
  item: IProductForm;
  onRemove: (id: number) => void;
};

export const EditableProductItem = ({
  item,
  onRemove,
}: EditableProductItemProps) => {
  const {theme} = useContext(ThemeContext);
  const categoryLabel = item.category?.name || 'Sin categoría';

  return (
    <View
      style={[
        styles.row,
        {
          backgroundColor:
            theme.listEditor?.productRowBackground ??
            theme.createList.renderProduct.background,
        },
      ]}>
      <View style={styles.content}>
        <Text
          style={[
            styles.name,
            {color: theme.createList.renderProduct.color},
          ]}>
          {item.name}
        </Text>
        <View
          style={[
            styles.chip,
            {
              backgroundColor:
                theme.listEditor?.categoryChipBackground ??
                theme.createList.newProductChip.background,
            },
          ]}>
          <Text
            style={[
              styles.chipText,
              {
                color:
                  theme.listEditor?.categoryChipText ??
                  theme.createList.newProductChip.color,
              },
            ]}
            numberOfLines={1}>
            {categoryLabel}
          </Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => onRemove(item.id)}
        hitSlop={{top: 8, bottom: 8, left: 8, right: 8}}>
        <X color={theme.createList.renderProduct.icon} size={22} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 3,
    marginVertical: 3,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    elevation: 1,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    marginRight: 8,
  },
  name: {
    flex: 1,
    fontSize: 16,
  },
  chip: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 8,
    maxWidth: '45%',
  },
  chipText: {
    fontSize: 12,
    fontWeight: '600',
  },
  removeButton: {
    padding: 4,
  },
});

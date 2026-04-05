import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Eye, LayoutGrid, SlidersHorizontal} from 'lucide-react-native';
import {useTranslation} from 'react-i18next';
import {ICategoryFilter} from '../../../../models/types/category';
import {
  DEFAULT_FILTERS_LIST,
  ShowFilter,
  SortOption,
} from '../../../../models/types/filter';
import {IProductForm} from '../../../../models/types/product';
import {globalSessionState} from '../../../../services/globalStates';
import {filterProductService} from '../../Controller';
import {getCategoryProductCount} from '../../utils/getCategoryProductCount';
import {BottomFilterActions} from './BottomFilterActions';
import {CategoryFilterItem} from './CategoryFilterItem';
import {FilterChip} from './FilterChip';
import {FilterSectionCard} from './FilterSectionCard';
import {filterDrawerTheme} from './filterDrawerTheme';
import {getCategoryIcon} from './categoryIcons';

type FilterDraft = {
  showFilter: ShowFilter;
  sortOption: SortOption;
  splitByCategories: boolean;
  selectedCategoryIds: number[] | null;
};

function buildDraftFromGlobal(
  categories: ICategoryFilter[],
  filtersList: typeof DEFAULT_FILTERS_LIST,
): FilterDraft {
  const allIds = categories.map(c => c.id);
  let selectedCategoryIds: number[] | null = filtersList.categories;

  if (selectedCategoryIds != null && selectedCategoryIds.length === allIds.length) {
    const allIncluded = allIds.every(id => selectedCategoryIds!.includes(id));
    if (allIncluded) {
      selectedCategoryIds = null;
    }
  }

  return {
    showFilter: filtersList.showFilter ?? 'all',
    sortOption: filtersList.sortOption ?? (filtersList.orderAsc ? 'az' : 'za'),
    splitByCategories: filtersList.splitByCategories,
    selectedCategoryIds,
  };
}

function isCategorySelected(
  categoryId: number,
  selectedIds: number[] | null,
  allIds: number[],
): boolean {
  if (selectedIds === null) {
    return true;
  }
  return selectedIds.includes(categoryId);
}

function toggleCategoryId(
  categoryId: number,
  selectedIds: number[] | null,
  allIds: number[],
): number[] | null {
  if (selectedIds === null) {
    return allIds.filter(id => id !== categoryId);
  }

  const isSelected = selectedIds.includes(categoryId);
  if (isSelected) {
    const next = selectedIds.filter(id => id !== categoryId);
    return next.length === 0 ? [] : next;
  }

  const next = [...selectedIds, categoryId];
  if (next.length >= allIds.length) {
    return null;
  }
  return next;
}

export type FilterDrawerPanelProps = {
  closeDrawer: () => void;
  products: IProductForm[];
  productsCategories: ICategoryFilter[];
  isOpen: boolean;
};

export const FilterDrawerPanel = ({
  closeDrawer,
  products,
  productsCategories,
  isOpen,
}: FilterDrawerPanelProps) => {
  const {t} = useTranslation();
  const filtersList = globalSessionState(state => state.filtersList);
  const {applyFiltersList, clearFiltersList} = filterProductService();

  const allCategoryIds = useMemo(
    () => productsCategories.map(c => c.id),
    [productsCategories],
  );

  const [draft, setDraft] = useState<FilterDraft>(() =>
    buildDraftFromGlobal(productsCategories, filtersList),
  );

  useEffect(() => {
    if (isOpen) {
      setDraft(buildDraftFromGlobal(productsCategories, filtersList));
    }
  }, [isOpen, filtersList, productsCategories]);

  const showChips: {key: ShowFilter; label: string}[] = [
    {key: 'all', label: t('filterProducts.showAll')},
    {key: 'pending', label: t('filterProducts.showPending')},
    {key: 'purchased', label: t('filterProducts.showPurchased')},
  ];

  const sortChips: {key: SortOption; label: string}[] = [
    {key: 'az', label: t('filterProducts.sortAz')},
    {key: 'za', label: t('filterProducts.sortZa')},
    {key: 'recent', label: t('filterProducts.sortRecent')},
  ];

  const handleApply = useCallback(() => {
    const categoriesForForm: ICategoryFilter[] = productsCategories.map(cat => ({
      ...cat,
      isChecked: isCategorySelected(
        cat.id,
        draft.selectedCategoryIds,
        allCategoryIds,
      ),
    }));

    applyFiltersList({
      splitByCategories: draft.splitByCategories,
      categories: categoriesForForm,
      orderAsc: draft.sortOption === 'az',
      sortOption: draft.sortOption,
      showFilter: draft.showFilter,
      allCategoryIds,
    });
    closeDrawer();
  }, [
    applyFiltersList,
    allCategoryIds,
    closeDrawer,
    draft,
    productsCategories,
  ]);

  const handleClear = useCallback(() => {
    setDraft(buildDraftFromGlobal(productsCategories, DEFAULT_FILTERS_LIST));
    clearFiltersList();
  }, [clearFiltersList, productsCategories]);

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <View style={styles.root}>
        <View style={styles.header}>
          <View style={styles.headerText}>
            <Text style={styles.title}>{t('filterProducts.drawerTitle')}</Text>
            <Text style={styles.subtitle}>
              {t('filterProducts.drawerSubtitle')}
            </Text>
          </View>
          <View style={styles.headerIcon}>
            <SlidersHorizontal
              size={22}
              color={filterDrawerTheme.accent}
              strokeWidth={2}
            />
          </View>
        </View>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          <FilterSectionCard
            title={t('filterProducts.sectionShow')}
            icon={<Eye size={20} color={filterDrawerTheme.textSecondary} />}>
            <View style={styles.chipRow}>
              {showChips.map(chip => (
                <FilterChip
                  key={chip.key}
                  label={chip.label}
                  selected={draft.showFilter === chip.key}
                  onPress={() =>
                    setDraft(prev => ({...prev, showFilter: chip.key}))
                  }
                />
              ))}
            </View>
          </FilterSectionCard>

          <FilterSectionCard
            title={t('filterProducts.sectionView')}
            icon={
              <LayoutGrid size={20} color={filterDrawerTheme.textSecondary} />
            }>
            <View style={styles.switchRow}>
              <Text style={styles.switchLabel}>
                {t('filterProducts.groupByCategory')}
              </Text>
              <Switch
                value={draft.splitByCategories}
                onValueChange={value =>
                  setDraft(prev => ({...prev, splitByCategories: value}))
                }
                trackColor={{
                  false: filterDrawerTheme.border,
                  true: filterDrawerTheme.accentSoft,
                }}
                thumbColor={
                  draft.splitByCategories
                    ? filterDrawerTheme.accent
                    : '#FFF9F0'
                }
                ios_backgroundColor={filterDrawerTheme.border}
              />
            </View>
          </FilterSectionCard>

          <FilterSectionCard title={t('filterProducts.sectionSort')}>
            <View style={styles.chipRowWrap}>
              {sortChips.map(chip => (
                <FilterChip
                  key={chip.key}
                  label={chip.label}
                  selected={draft.sortOption === chip.key}
                  compact
                  onPress={() =>
                    setDraft(prev => ({...prev, sortOption: chip.key}))
                  }
                />
              ))}
            </View>
          </FilterSectionCard>

          <FilterSectionCard title={t('filterProducts.categories')}>
            {productsCategories.map(cat => (
              <CategoryFilterItem
                key={cat.id}
                name={cat.name}
                count={getCategoryProductCount(products, cat.id)}
                selected={isCategorySelected(
                  cat.id,
                  draft.selectedCategoryIds,
                  allCategoryIds,
                )}
                icon={getCategoryIcon(cat.name)}
                onPress={() =>
                  setDraft(prev => ({
                    ...prev,
                    selectedCategoryIds: toggleCategoryId(
                      cat.id,
                      prev.selectedCategoryIds,
                      allCategoryIds,
                    ),
                  }))
                }
              />
            ))}
          </FilterSectionCard>
        </ScrollView>

        <View style={styles.footer}>
          <BottomFilterActions
            clearLabel={t('filterProducts.clearButton')}
            applyLabel={t('filterProducts.addButton')}
            onClear={handleClear}
            onApply={handleApply}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: filterDrawerTheme.background,
  },
  root: {
    flex: 1,
    paddingHorizontal: 18,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingTop: 8,
    paddingBottom: 16,
  },
  headerText: {
    flex: 1,
    paddingRight: 12,
  },
  headerIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: filterDrawerTheme.accentSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: filterDrawerTheme.textPrimary,
    letterSpacing: -0.3,
  },
  subtitle: {
    fontSize: 14,
    color: filterDrawerTheme.textSecondary,
    marginTop: 4,
    lineHeight: 20,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 12,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chipRowWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  switchLabel: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: filterDrawerTheme.textPrimary,
    paddingRight: 12,
  },
  footer: {
    paddingBottom: 4,
  },
});

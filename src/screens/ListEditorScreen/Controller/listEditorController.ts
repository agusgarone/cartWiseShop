import {useCallback, useContext, useEffect, useMemo, useRef, useState} from 'react';
import {
  NavigationContext,
  RouteProp,
  useFocusEffect,
  useRoute,
} from '@react-navigation/native';
import {Alert, Share} from 'react-native';
import {useTranslation} from 'react-i18next';
import type {StackParamList} from '../../../services/navigation/StackNavigator';
import {IProductForm} from '../../../models/types/product';
import {IListDTO} from '../../../models/types/list';
import {
  CombinedStorage,
  ListsStorage,
  CategoriesStorage,
} from '../../../storage/storageHelpers';
import {mapperListDTOToSupabase} from '../../../models/mappers/mapperListDTOToSupabase';
import {createProductFromInput} from '../../../utils/createProductFromInput';
import {resolveNewCatalogProductsForList} from '../../../features/voice/resolveNewCatalogProductsForList';
import type {ParsedProduct} from '../../../types/ticket';
import type {ListMode} from '../components/ListModeSelector';
import type {ShowFilter} from '../../../models/types/filter';
import {getCategoriesByProducts} from '../../../common/utils/functions/getCategoriesByProducts';
import {globalSessionState} from '../../../services/globalStates';

const DEFAULT_LIST_COLOR = '#87A96B';

function generateListId(): number {
  return Math.floor(Math.random() * 900000) + 100000;
}

function toProductForm(
  dto: {
    id: number;
    name: string;
    category: {id: number; name: string};
    default: boolean;
    isNewToCatalog?: boolean;
  },
  isChecked = false,
): IProductForm {
  return {...dto, isChecked};
}

function buildSaveSnapshot(name: string, items: IProductForm[]): string {
  return JSON.stringify({
    name: name.trim(),
    products: items.map(p => ({
      id: p.id,
      name: p.name.trim().toLowerCase(),
      categoryId: p.category.id,
      isChecked: p.isChecked ?? false,
    })),
  });
}

function productsNeedIdSync(
  before: IProductForm[],
  after: IProductForm[],
): boolean {
  if (before.length !== after.length) {
    return true;
  }
  return after.some((p, i) => p.id !== before[i]?.id);
}

export const listEditorController = () => {
  const route = useRoute<RouteProp<StackParamList, 'ListEditor'>>();
  const navigation = useContext(NavigationContext);
  const {t} = useTranslation();

  const listIdParam = route.params?.listId;
  const initialMode = route.params?.initialMode;
  const isNewList = listIdParam == null;

  const [listId, setListId] = useState<number | null>(listIdParam ?? null);
  const [listName, setListName] = useState('');
  const [listColor, setListColor] = useState(DEFAULT_LIST_COLOR);
  const [products, setProducts] = useState<IProductForm[]>([]);
  const [mode, setMode] = useState<ListMode>(
    initialMode ?? (isNewList ? 'editing' : 'shopping'),
  );
  const filtersList = globalSessionState(state => state.filtersList);
  const [productInput, setProductInput] = useState('');
  const [loading, setLoading] = useState(!isNewList);
  const [open, setOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const voiceRouteKeyRef = useRef<string | null>(null);
  const lastVoiceSeedKeyRef = useRef<string | null>(null);
  const hasLoadedRef = useRef(false);
  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const suppressAutosaveRef = useRef(false);
  const lastSavedSnapshotRef = useRef('');
  const listIdRef = useRef<number | null>(listIdParam ?? null);
  listIdRef.current = listId;

  const loadExistingList = useCallback(async (id: number) => {
    setLoading(true);
    const listSupabase = await ListsStorage.getListById(id);
    if (!listSupabase) {
      Alert.alert(t('listDetail.theListDoesntExist'));
      navigation?.goBack();
      setLoading(false);
      return;
    }

    const storedProducts = await CombinedStorage.getProductsFromList(id);
    const allCategories = await CategoriesStorage.getAllCategories();
    const categoryMap = new Map(allCategories.map(cat => [cat.id, cat.name]));

    setListId(listSupabase.id);
    setListName(listSupabase.name);
    setListColor(listSupabase.color || DEFAULT_LIST_COLOR);
    setProducts(
      storedProducts.map(prod =>
        toProductForm({
          id: prod.id,
          name: prod.name,
          category: {
            id: prod.id_category,
            name: categoryMap.get(prod.id_category) || 'Sin categoría',
          },
          default: false,
        }),
      ),
    );
    lastSavedSnapshotRef.current = buildSaveSnapshot(
      listSupabase.name,
      storedProducts.map(prod =>
        toProductForm({
          id: prod.id,
          name: prod.name,
          category: {
            id: prod.id_category,
            name: categoryMap.get(prod.id_category) || 'Sin categoría',
          },
          default: false,
        }),
      ),
    );
    setLoading(false);
  }, [navigation, t]);

  const addProductsFromVoiceParsed = useCallback(
    async (parsed: ParsedProduct[]) => {
      if (!parsed?.length) {
        return;
      }

      const newProducts: IProductForm[] = [];
      for (const item of parsed) {
        const created = await createProductFromInput(item.name, {source: 'voice'});
        if (created) {
          newProducts.push(toProductForm(created));
        }
      }

      if (newProducts.length) {
        setProducts(prev => {
          const existingNames = new Set(
            prev.map(p => p.name.trim().toLowerCase()),
          );
          const toAdd = newProducts.filter(
            p => !existingNames.has(p.name.trim().toLowerCase()),
          );
          return [...prev, ...toAdd];
        });
      }
    },
    [],
  );

  useFocusEffect(
    useCallback(() => {
      if (!isNewList && listIdParam != null && !hasLoadedRef.current) {
        hasLoadedRef.current = true;
        void loadExistingList(listIdParam);
      }
      return () => {
        hasLoadedRef.current = false;
      };
    }, [isNewList, listIdParam, loadExistingList]),
  );

  useFocusEffect(
    useCallback(() => {
      const seed = route.params?.voiceParsedProducts;
      if (!seed?.length) {
        voiceRouteKeyRef.current = null;
        lastVoiceSeedKeyRef.current = null;
        return;
      }

      const seedKey = JSON.stringify(seed.map(p => p.name));
      if (
        voiceRouteKeyRef.current === route.key &&
        lastVoiceSeedKeyRef.current === seedKey
      ) {
        return;
      }

      voiceRouteKeyRef.current = route.key;
      lastVoiceSeedKeyRef.current = seedKey;

      void (async () => {
        await addProductsFromVoiceParsed(seed);
        navigation?.setParams({voiceParsedProducts: undefined});
      })();
    }, [
      route.key,
      route.params?.voiceParsedProducts,
      addProductsFromVoiceParsed,
      navigation,
    ]),
  );

  const persistList = useCallback(
    async (name: string, items: IProductForm[]) => {
      if (!name.trim()) {
        return;
      }

      const incomingSnapshot = buildSaveSnapshot(name, items);
      if (incomingSnapshot === lastSavedSnapshotRef.current) {
        return;
      }

      setIsSaving(true);
      try {
        const dtos = items.map(({isChecked, ...rest}) => rest);
        const resolved = await resolveNewCatalogProductsForList(dtos);
        const resolvedForms: IProductForm[] = resolved.map(p =>
          toProductForm(
            p,
            items.find(i => i.id === p.id || i.name === p.name)?.isChecked ??
              false,
          ),
        );

        const currentId = listIdRef.current ?? generateListId();
        const existing = await ListsStorage.getListById(currentId);
        const listDto: IListDTO<(typeof resolved)[0]> = {
          id: currentId,
          name: name.trim(),
          color: listColor,
          created_at: existing?.created_at ?? new Date().toISOString(),
          products: resolved,
        };
        const listSupabase = mapperListDTOToSupabase(listDto);
        if (existing) {
          await ListsStorage.updateList(currentId, listSupabase);
        } else {
          await ListsStorage.saveList(listSupabase);
        }

        lastSavedSnapshotRef.current = buildSaveSnapshot(
          name.trim(),
          resolvedForms,
        );

        if (listIdRef.current !== currentId) {
          listIdRef.current = currentId;
          setListId(currentId);
        }

        if (productsNeedIdSync(items, resolvedForms)) {
          suppressAutosaveRef.current = true;
          setProducts(resolvedForms);
        }
      } finally {
        setIsSaving(false);
      }
    },
    [listColor],
  );

  useEffect(() => {
    if (suppressAutosaveRef.current) {
      suppressAutosaveRef.current = false;
      return;
    }

    if (!listName.trim()) {
      return;
    }

    const pendingSnapshot = buildSaveSnapshot(listName, products);
    if (pendingSnapshot === lastSavedSnapshotRef.current) {
      return;
    }

    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    saveTimeoutRef.current = setTimeout(() => {
      void persistList(listName, products);
    }, 800);

    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [listName, products, persistList]);

  const addProductFromInput = useCallback(async () => {
    const trimmed = productInput.trim();
    if (!trimmed) {
      return;
    }

    const created = await createProductFromInput(trimmed, {source: 'manual'});
    if (!created) {
      return;
    }

    const isDuplicate = products.some(
      p => p.name.trim().toLowerCase() === created.name.trim().toLowerCase(),
    );
    if (isDuplicate) {
      setProductInput('');
      return;
    }

    setProducts(prev => [...prev, toProductForm(created)]);
    setProductInput('');
  }, [productInput, products]);

  const removeProduct = useCallback((id: number) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  }, []);

  const toggleProductChecked = useCallback((id: number, checked: boolean) => {
    setProducts(prev =>
      prev.map(p => (p.id === id ? {...p, isChecked: checked} : p)),
    );
  }, []);

  const filteredProducts = useMemo(() => {
    let result = products;

    const showFilter: ShowFilter = filtersList.showFilter ?? 'all';
    if (mode === 'shopping' && showFilter !== 'all') {
      if (showFilter === 'pending') {
        result = result.filter(p => !p.isChecked);
      } else {
        result = result.filter(p => p.isChecked);
      }
    }

    const categoryIds = filtersList.categories;
    if (categoryIds != null && categoryIds.length > 0) {
      result = result.filter(p => categoryIds.includes(p.category.id));
    }

    const sortOption = filtersList.sortOption ?? (filtersList.orderAsc ? 'az' : 'za');
    if (sortOption === 'recent') {
      const orderMap = new Map(products.map((p, index) => [p.id, index]));
      return [...result].sort(
        (a, b) => (orderMap.get(a.id) ?? 0) - (orderMap.get(b.id) ?? 0),
      );
    }

    const isAsc = sortOption === 'az';
    return [...result].sort((a, b) =>
      isAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name),
    );
  }, [mode, products, filtersList]);

  const categoriesFilter = useMemo(() => {
    const base = getCategoriesByProducts(
      products.map(prod => ({
        id: prod.id.toString(),
        name: prod.name,
        id_category: prod.category.id,
        category: prod.category.name,
      })),
    );
    const selectedIds = filtersList.categories;
    return base.map(cat => ({
      ...cat,
      isChecked:
        selectedIds === null ||
        selectedIds.length === 0 ||
        selectedIds.includes(cat.id),
    }));
  }, [products, filtersList.categories]);

  const handleShareList = useCallback(async () => {
    if (!listName.trim()) {
      return;
    }
    try {
      const lines = [listName, ''];
      const grouped = filteredProducts.reduce<Record<string, IProductForm[]>>(
        (acc, p) => {
          const cat = p.category?.name || 'Sin categoría';
          if (!acc[cat]) acc[cat] = [];
          acc[cat].push(p);
          return acc;
        },
        {},
      );
      Object.entries(grouped).forEach(([cat, prods]) => {
        lines.push(`${cat}:`);
        prods.forEach(p => {
          const mark = p.isChecked ? '✓' : '○';
          lines.push(`${mark} ${p.name}`);
        });
        lines.push('');
      });
      await Share.share({message: lines.join('\n').trim(), title: listName});
    } catch (err) {
      if ((err as Error).message !== 'User did not share') {
        Alert.alert(t('listDetail.shareError'));
      }
    }
  }, [filteredProducts, listName, t]);

  const handleDeleteList = useCallback(async () => {
    if (listId == null) {
      navigation?.goBack();
      return;
    }
    Alert.alert(
      t('listDetail.atention'),
      `${t('listDetail.youGoingToDeleteThelistWithName')} ${listName}`,
      [
        {text: t('listDetail.cancel'), style: 'cancel'},
        {
          text: t('listDetail.accept'),
          style: 'destructive',
          onPress: async () => {
            await ListsStorage.deleteList(listId);
            navigation?.goBack();
          },
        },
      ],
    );
  }, [listId, listName, navigation, t]);

  return {
    isNewList,
    listName,
    setListName,
    listColor,
    products,
    mode,
    setMode,
    productInput,
    setProductInput,
    loading,
    open,
    setOpen,
    isSaving,
    filteredProducts,
    addProductFromInput,
    addProductsFromVoiceParsed,
    removeProduct,
    toggleProductChecked,
    handleShareList,
    handleDeleteList,
    groupByCategory: mode === 'shopping' && filtersList.splitByCategories,
    sortOrderAsc: filtersList.sortOption !== 'za',
    categoriesFilter,
  };
};

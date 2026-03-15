import {useCallback, useContext, useEffect, useMemo, useState} from 'react';
import {NavigationContext, useFocusEffect} from '@react-navigation/native';
import {StorageService} from '../../../storage/asyncStorage';
import {Alert, Share} from 'react-native';
import {IProductForm} from '../../../models/types/product';
import {IListDTO, IListForm, ITab} from '../../../models/types/list';
import {useTranslation} from 'react-i18next';
import {IFilterListDetail} from '../../../models/types/filter';
import {globalSessionState} from '../../../services/globalStates';
import {ICategory, ICategoryFilter} from '../../../models/types/category';
import {getCategoriesByProducts} from '../../../common/utils/functions/getCategoriesByProducts';
import {parseData} from '../../../common/utils/functions/parseData';
import {ListsStorage, CombinedStorage} from '../../../storage/storageHelpers';
import { fetchCategories } from '../../../services/Category';

export const listDetailController = (id: string) => {
  const {t} = useTranslation();

  const filters: IFilterListDetail = globalSessionState(
    state => state.filtersListDetail,
  );

  const [listSelected, setListSelected] = useState<IListDTO<IProductForm>>();
  const [listSelectedFormatted, setListSelectedFormatted] =
    useState<IListForm<ITab>>();
  const navigation = useContext(NavigationContext);
  const [showConfetti, setShowConfetti] = useState(false);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState<ICategoryFilter[] | null>(null);
  const [categoriesFilter, setCategoriesFilter] = useState<
    ICategoryFilter[] | null
  >(null);

  const fetchParams = useMemo(() => {
    return {
      splitByCategories: filters?.splitByCategories || null,
      categories: filters?.categories || null,
      orderAsc: filters.orderAsc,
    };
  }, [filters]);

  const getListByID = async () => {
    setLoading(true);
    let categoriesData: ICategory[] = [];
    const listId = parseInt(id, 10);

    // Cargar lista desde storage local
    const listSupabase = await ListsStorage.getListById(listId);
    if (!listSupabase) {
      Alert.alert(t('listDetail.theListDoesntExist'));
      goHome();
      setLoading(false);
      return;
    }

    // Obtener productos de la lista
    let products = await CombinedStorage.getProductsFromList(listId);

    const responseGetAllCategories = await fetchCategories();
    if (responseGetAllCategories.error) {
      console.log('categories', responseGetAllCategories.error);
    } else {
      categoriesData = responseGetAllCategories.data || [];
    }

    // Aplicar filtro de categorías si existe
    if (fetchParams.categories && fetchParams.categories.length > 0) {
      products = products.filter(prod =>
        fetchParams.categories?.includes(prod.id_category),
      );
    }

    // Convertir productos a formato Form
    const productData = products.map(prod => ({
      id: prod.id.toString(),
      name: prod.name,
      id_category: prod.id_category,
      category: categoriesData.find(cat => cat.id === prod.id_category)?.name || '',
    }));

    if (!categoriesFilter && productData.length > 0) {
      setCategoriesFilter(getCategoriesByProducts(productData));
    }
    setCategories(getCategoriesByProducts(productData));

    // Convertir a formato IListDTO<IProductForm>
    const mappedList: IListDTO<IProductForm> = {
      id: listSupabase.id,
      name: listSupabase.name,
      created_at: listSupabase.created_at,
      color: listSupabase.color,
      products: products.map(prod => ({
        id: prod.id,
        name: prod.name,
        category: {id: prod.id_category, name: categoriesData.find(cat => cat.id === prod.id_category)?.name || ''},
        default: false,
        isChecked: false,
      })),
    };
    setListSelected(mappedList);
    setLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      getListByID();

      return () => {
        console.log('🔄 Cleanup: Se desmonta el listener');
      };
    }, [fetchParams, id]),
  );

  useMemo(() => {
    if (listSelected && categories) {
      parseData({
        listSelected: listSelected,
        categories: categories,
        filters: filters,
        setListSelectedFormatted: setListSelectedFormatted,
      });
    }
  }, [categories, listSelected]);

  const handleDeleteList = async (listId: number) => {
    // Eliminar de storage local
    await ListsStorage.deleteList(listId);
  };

  const DialogDeleteList = (list: IListForm<ITab>) =>
    Alert.alert(
      t('listDetail.atention'),
      `${t('listDetail.youGoingToDeleteThelistWithName')} ${list.name}`,
      [
        {
          text: t('listDetail.cancel'),
          onPress: () => null,
          style: 'cancel',
        },
        {
          text: t('listDetail.accept'),
          onPress: async () => {
            await handleDeleteList(list.id);
            navigation?.goBack();
          },
        },
      ],
    );

  const handleAllSelected = () => {
    setShowConfetti(true);
  };

  const handleButtonDelete = (list: IListForm<ITab>) => DialogDeleteList(list);

  const getListAsText = (list: IListForm<ITab>): string => {
    const lines: string[] = [list.name, ''];
    if (list.data?.length) {
      list.data.forEach(tab => {
        if (tab.categoria) {
          lines.push(`${tab.categoria}:`);
        }
        tab.products?.forEach(prod => {
          lines.push(`• ${prod.name}`);
        });
        if (tab.categoria) {
          lines.push('');
        }
      });
    }
    return lines.join('\n').trim();
  };

  const handleShareList = async (list: IListForm<ITab>) => {
    try {
      const message = getListAsText(list);
      await Share.share({
        message,
        title: list.name,
      });
    } catch (err) {
      if ((err as Error).message !== 'User did not share') {
        Alert.alert(t('listDetail.shareError'));
      }
    }
  };

  const goHome = () => navigation?.navigate('MainDrawer');

  const navigateToEditList = async () => {
    await StorageService.setItem('idList', id);
    navigation?.navigate('EditList');
  };

  return {
    handleButtonDelete,
    handleShareList,
    handleAllSelected,
    setShowConfetti,
    navigateToEditList,
    setOpen,
    listSelectedFormatted,
    showConfetti,
    loading,
    open,
    categoriesFilter,
    showWithCategories: filters.splitByCategories,
  };
};

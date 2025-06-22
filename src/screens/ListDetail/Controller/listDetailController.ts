import {useCallback, useContext, useMemo, useState} from 'react';
import {NavigationContext, useFocusEffect} from '@react-navigation/native';
import {StorageService} from '../../../storage/asyncStorage';
import {Alert} from 'react-native';
import {fetchListById, removeList} from '../../../services/List';
import {IProductForm} from '../../../models/types/product';
import {IListForm} from '../../../models/types/list';
import {mapperListSupabaseToForm} from '../../../models/mappers/mapperListSupabaseToForm';
import {useTranslation} from 'react-i18next';
import {IFilterListDetail} from '../../../models/types/filter';
import {globalSessionState} from '../../../services/globalStates';
import {ICategoryFilter} from '../../../models/types/category';

export const listDetailController = (id: string) => {
  const {t} = useTranslation();

  const filters: IFilterListDetail = globalSessionState(
    state => state.filtersListDetail,
  );

  const [listSelected, setListSelected] =
    useState<IListForm<IProductForm> | null>(null);
  const navigation = useContext(NavigationContext);
  const [showConfetti, setShowConfetti] = useState(false);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState<ICategoryFilter[]>([]);

  const fetchParams = useMemo(() => {
    return {
      splitByCategories: filters?.splitByCategories || null,
      categories: filters?.categories || null,
      orderAsc: filters.orderAsc,
    };
  }, [filters]);

  const getListByID = async (id: string) => {
    setLoading(true);
    const responseFetchListById = await fetchListById(parseInt(id, 10));
    if (responseFetchListById.error) {
      console.log(responseFetchListById.error);
      Alert.alert(t('listDetail.theListDoesntExist'));
      goHome();
    } else {
      if (responseFetchListById.data) {
        getCategoriesByProducts(responseFetchListById.data[0].product_data);
        sortProducts(responseFetchListById.data[0]);
        setListSelected(
          mapperListSupabaseToForm(responseFetchListById.data[0]),
        );
        setLoading(false);
      }
    }
  };

  useFocusEffect(
    useCallback(() => {
      getListByID(id);

      return () => {
        console.log('🔄 Cleanup: Se desmonta el listener');
      };
    }, [fetchParams, id]),
  );

  const handleDeleteList = async (listId: number) => {
    const responseRemoveList = await removeList(listId);
    if (responseRemoveList.error) {
      console.log(responseRemoveList.error);
    }
  };

  const DialogDeleteList = (list: IListForm<IProductForm>) =>
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
          onPress: () => {
            handleDeleteList(list.id);
            navigation?.goBack();
          },
        },
      ],
    );

  const handleAllSelected = () => {
    setShowConfetti(true);
  };

  const handleButtonDelete = (list: IListForm<IProductForm>) =>
    DialogDeleteList(list);

  const goHome = () => navigation?.navigate('MainDrawer');

  const navigateToEditList = async () => {
    await StorageService.setItem('idList', id);
    navigation?.navigate('MainDrawer', {
      screen: 'MainTabs',
      params: {
        screen: 'CreateList',
      },
    });
  };

  const sortProducts = (
    list: {
      list_id: number;
      list_name: string;
      created_at: string;
      uid_user: string;
      product_data: Array<{
        id: string;
        name: string;
        id_category: number;
        category: string;
      }> | null;
    } | null,
  ) => {
    const listValue = list;
    const isAsc = filters?.orderAsc ?? true;
    listValue?.product_data?.sort((a, b) =>
      isAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name),
    );
  };

  const getCategoriesByProducts = (
    products: Array<{
      id: string;
      name: string;
      id_category: number;
      category: string;
    }> | null,
  ) => {
    const categories: ICategoryFilter[] = [];
    products?.forEach(prod => {
      const findCat = categories.find(cat => cat.id === prod.id_category);
      if (!findCat) {
        categories.push({
          id: prod.id_category,
          name: prod.category,
          isChecked: false,
        });
      }
    });
    setCategories(categories);
  };

  return {
    handleButtonDelete,
    handleAllSelected,
    setShowConfetti,
    navigateToEditList,
    setOpen,
    listSelected,
    showConfetti,
    loading,
    open,
    categories,
  };
};

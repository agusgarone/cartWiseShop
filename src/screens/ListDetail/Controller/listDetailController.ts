import {useCallback, useContext, useMemo, useState} from 'react';
import {NavigationContext, useFocusEffect} from '@react-navigation/native';
import {StorageService} from '../../../storage/asyncStorage';
import {Alert} from 'react-native';
import {fetchListById, removeList} from '../../../services/List';
import {IProductForm} from '../../../models/types/product';
import {IListDTO, IListForm, ITab} from '../../../models/types/list';
import {mapperListSupabaseToForm} from '../../../models/mappers/mapperListSupabaseToForm';
import {useTranslation} from 'react-i18next';
import {IFilterListDetail} from '../../../models/types/filter';
import {globalSessionState} from '../../../services/globalStates';
import {ICategoryFilter} from '../../../models/types/category';
import {getCategoriesByProducts} from '../../../common/utils/functions/getCategoriesByProducts';
import {parseData} from '../../../common/utils/functions/parseData';

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
    const responseFetchListById = await fetchListById({
      listId: parseInt(id, 10),
      categories: fetchParams.categories,
    });
    if (responseFetchListById.error) {
      console.log(responseFetchListById.error);
      Alert.alert(t('listDetail.theListDoesntExist'));
      goHome();
    } else {
      if (responseFetchListById.data && responseFetchListById.data[0]) {
        if (!categoriesFilter) {
          setCategoriesFilter(
            getCategoriesByProducts(responseFetchListById.data[0].product_data),
          );
        }
        setCategories(
          getCategoriesByProducts(responseFetchListById.data[0].product_data),
        );
        setListSelected(
          mapperListSupabaseToForm(responseFetchListById.data[0]),
        );
        setLoading(false);
      }
    }
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
    const responseRemoveList = await removeList(listId);
    if (responseRemoveList.error) {
      console.log(responseRemoveList.error);
    }
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

  const handleButtonDelete = (list: IListForm<ITab>) => DialogDeleteList(list);

  const goHome = () => navigation?.navigate('MainDrawer');

  const navigateToEditList = async () => {
    await StorageService.setItem('idList', id);
    navigation?.navigate('EditList');
  };

  return {
    handleButtonDelete,
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

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

  const parseData = () => {
    if (listSelected && categories) {
      const newFormatArrayList: IListForm<ITab> = {
        id: listSelected?.id,
        created_at: listSelected?.created_at,
        name: listSelected?.name,
        data: [],
      };
      if (!filters.splitByCategories) {
        const tab: ITab = {
          categoria: 'default',
          products: listSelected.products,
        };
        newFormatArrayList.data = [tab];
      } else {
        const tabs: ITab[] = categories.map(i => {
          const tab: ITab = {
            categoria: i.name,
            products: [],
          };
          return tab;
        });

        tabs.forEach(tab => {
          listSelected.products?.forEach(prod => {
            if (prod.category.name === tab.categoria) {
              tab.products.push(prod);
            }
          });
        });
        newFormatArrayList.data = tabs;
        sortCategories(newFormatArrayList);
      }
      newFormatArrayList.data.forEach(tab => {
        sortProducts(tab.products);
      });
      setListSelectedFormatted(newFormatArrayList);
    }
  };

  const sortProducts = (products: IProductForm[]) => {
    const productsValue = products;
    const isAsc = filters?.orderAsc ?? true;
    productsValue?.sort((a, b) =>
      isAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name),
    );
    return productsValue;
  };

  const sortCategories = (list: IListForm<ITab>) => {
    const listValue = list;
    const isAsc = filters?.orderAsc ?? true;
    listValue?.data.sort((a, b) =>
      isAsc
        ? a.categoria.localeCompare(b.categoria)
        : b.categoria.localeCompare(a.categoria),
    );
    return listValue;
  };

  useMemo(() => {
    if (listSelected && categories) {
      parseData();
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
    return categories;
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

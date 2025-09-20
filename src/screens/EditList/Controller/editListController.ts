import {FormikState} from 'formik';
import {editList, fetchListById} from '../../../services/List';
import {mapperListSupabaseToDTO} from '../../../models/mappers/mapperListSupabaseToDTO';
import {useListsManagement} from '../../../common/utils/customHooks/useListsManagement';
import {StorageService} from '../../../storage/asyncStorage';
import {getCategoriesByProducts} from '../../../common/utils/functions/getCategoriesByProducts';

export const editListController = () => {
  const {
    goToAddProducts,
    handleFormikSubmit: baseHandleFormikSubmit,
    removeProductSelected,
    handleNameListSelected,
    setOpen,
    initialValues,
    list,
    loading,
    open,
    categoriesFilter,
    showWithCategories,
    listSelectedFormatted,
    setList,
    setLoading,
    setCategoriesAndCategoriesFilter,
  } = useListsManagement({
    mode: 'edit',
    onListUpdated: async (listId, newValues) => {
      await editList(listId, newValues);
    },
    onListLoaded: list => {
      // Lógica específica cuando se carga la lista
    },
    onMount: () => {
      getList();
    },
  });

  const getList = async () => {
    const idList: string = await StorageService.getItem('idList');
    if (idList) {
      setLoading(true);
      await StorageService.setItem('isEditing', true);
      await StorageService.removeItem('idList');
      const responseGetList = await fetchListById({
        listId: parseInt(idList, 10),
        categories: null,
      });
      if (responseGetList.error) {
        console.log(responseGetList.error);
      } else {
        if (responseGetList.data) {
          if (!categoriesFilter) {
            setCategoriesAndCategoriesFilter(
              getCategoriesByProducts(responseGetList.data[0].product_data),
            );
          }
          await StorageService.setItem(
            'currentList',
            responseGetList.data[0].list_id,
          );
          setList(mapperListSupabaseToDTO(responseGetList.data[0]));
          setLoading(false);
        }
      }
    }
  };

  const handleFormikSubmit = async (
    values: {name: string; color: string},
    actions: {
      setStatus: (arg0: string) => void;
      setSubmitting: (arg0: boolean) => void;
      resetForm: (nextState?: Partial<FormikState<any>>) => void;
    },
  ) => {
    console.log('📝 Valores:', values);
    await baseHandleFormikSubmit(values, actions);
  };

  return {
    goToAddProducts,
    handleFormikSubmit,
    removeProductSelected,
    handleNameListSelected,
    setOpen,
    initialValues,
    list,
    loading,
    open,
    categoriesFilter,
    showWithCategories,
    listSelectedFormatted,
    getList,
  };
};

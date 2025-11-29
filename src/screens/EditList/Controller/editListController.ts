import {FormikState} from 'formik';
import {useListsManagement} from '../../../common/utils/customHooks/useListsManagement';
import {StorageService} from '../../../storage/asyncStorage';
import {getCategoriesByProducts} from '../../../common/utils/functions/getCategoriesByProducts';
import {ListsStorage, CombinedStorage, CategoriesStorage} from '../../../storage/storageHelpers';
import {IProductDTO} from '../../../models/types/product';

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
    fetchParams,
  } = useListsManagement({
    mode: 'edit',
    onListUpdated: async (listId, newValues) => {
      // Actualizar en storage local
      const currentList = await ListsStorage.getListById(listId);
      if (currentList) {
        await ListsStorage.updateList(listId, {
          name: newValues.newName || currentList.name,
          color: newValues.newColor || currentList.color,
          id_products: newValues.newProducts || currentList.id_products,
        });
      }
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
      const listId = parseInt(idList, 10);

      // Cargar lista desde storage local
      const listSupabase = await ListsStorage.getListById(listId);
      if (listSupabase) {
        // Obtener productos de la lista
        const products = await CombinedStorage.getProductsFromList(listId);

        // Obtener todas las categorías para mapear nombres
        const allCategories = await CategoriesStorage.getAllCategories();
        const categoryMap = new Map(
          allCategories.map(cat => [cat.id, cat.name]),
        );

        // Convertir a formato DTO
        const mappedList = {
          id: listSupabase.id,
          name: listSupabase.name,
          created_at: listSupabase.created_at,
          color: listSupabase.color,
          products: products.map(prod => ({
            id: prod.id,
            name: prod.name,
            category: {
              id: prod.id_category,
              name: categoryMap.get(prod.id_category) || 'Sin categoría',
            },
            default: false,
          })) as IProductDTO[],
        };

        if (!categoriesFilter && products.length > 0) {
          const productData = products.map(prod => ({
            id: prod.id.toString(),
            name: prod.name,
            id_category: prod.id_category,
            category: '',
          }));
          setCategoriesAndCategoriesFilter(
            getCategoriesByProducts(productData),
          );
        }

        await StorageService.setItem('currentList', listId.toString());
        setList(mappedList);
      }

      setLoading(false);
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
    fetchParams,
  };
};

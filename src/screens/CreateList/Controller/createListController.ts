import {FormikState} from 'formik';
import {createList} from '../../../services/List';
import {mapperListDTOToSupabase} from '../../../models/mappers/mapperListDTOToSupabase';
import {useListsManagement} from '../../../common/utils/customHooks/useListsManagement';

export const createListController = () => {
  const {
    products,
    initialValues,
    goToAddProducts,
    handleFormikSubmit: baseHandleFormikSubmit,
    removeProductSelected,
    showWithCategories,
    listSelectedFormatted,
    handleNameListSelected,
    setOpen,
    open,
    categoriesFilter,
  } = useListsManagement({
    mode: 'create',
    onListCreated: async list => {
      console.log(
        '🚀 createListController: Lista creada con color:',
        list.color,
      );
      await createList(mapperListDTOToSupabase(list));
    },
  });

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
    products,
    initialValues,
    goToAddProducts,
    handleFormikSubmit,
    removeProductSelected,
    showWithCategories,
    listSelectedFormatted,
    handleNameListSelected,
    setOpen,
    open,
    categoriesFilter,
  };
};

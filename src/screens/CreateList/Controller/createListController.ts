import {FormikState} from 'formik';
import {mapperListDTOToSupabase} from '../../../models/mappers/mapperListDTOToSupabase';
import {useListsManagement} from '../../../common/utils/customHooks/useListsManagement';
import {ListsStorage} from '../../../storage/storageHelpers';
import {useCallback, useRef, useState} from 'react';
import {RouteProp, useFocusEffect, useRoute} from '@react-navigation/native';
import type {StackParamList} from '../../../services/navigation/StackNavigator';

export const createListController = () => {
  const route = useRoute<RouteProp<StackParamList, 'CreateList'>>();
  const voiceRouteKeyRef = useRef<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };
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
    applyVoiceParsedSeed,
  } = useListsManagement({
    mode: 'create',
    onListCreated: async list => {
      const listSupabase = mapperListDTOToSupabase(list);
      // Guardar en storage local
      await ListsStorage.saveList(listSupabase);
    },
    toggleModal,
    persistNewCatalogProductsOnListSubmit: true,
  });

  useFocusEffect(
    useCallback(() => {
      const seed = route.params?.voiceParsedProducts;
      if (!seed?.length) {
        voiceRouteKeyRef.current = null;
        return;
      }
      if (voiceRouteKeyRef.current === route.key) {
        return;
      }
      voiceRouteKeyRef.current = route.key;
      void applyVoiceParsedSeed(seed);
    }, [applyVoiceParsedSeed, route.key, route.params?.voiceParsedProducts]),
  );

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
    isModalVisible,
    toggleModal,
  };
};

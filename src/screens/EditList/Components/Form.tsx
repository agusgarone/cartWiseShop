import React, {Dispatch, SetStateAction, useEffect} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {Formik, FormikState} from 'formik';
import {FormikInputValue} from '../../../components/FormikInput';
import Button from '../../../components/Button';
import {Content} from '../../CreateList/Components/Content';
import RenderProduct from '../../CreateList/Components/RenderProducts';
import {IProductDTO} from '../../../models/types/product';
import {IListForm, ITab} from '../../../models/types/list';
import {useTranslation} from 'react-i18next';
import Loader from '../../../components/Loader';
import {Colors} from '../../CreateList/Components/Colors';
import FloatButton from '../../../components/FloatButton';
import {useDebounce} from '../../../common/utils/customHooks/useDebounce';
import {FilterButton} from '../../../components/FilterButton';

const EditListForm = ({
  initialValues,
  loading,
  showWithCategories,
  goToAddProducts,
  handleFormikSubmit,
  removeProductSelected,
  handleNameListSelected,
  setOpen,
  listSelectedFormatted,
}: {
  initialValues: {name: string; color: string};
  loading: boolean;
  showWithCategories: boolean;
  goToAddProducts: (values: {name: string; color: string}) => void;
  handleFormikSubmit: (
    values: {
      name: string;
      color: string;
    },
    actions: {
      setStatus: (arg0: string) => void;
      setSubmitting: (arg0: boolean) => void;
      resetForm: (nextState?: Partial<FormikState<any>>) => void;
    },
  ) => Promise<any>;
  removeProductSelected: (id: number) => void;
  handleNameListSelected: (value: string) => void;
  setOpen: Dispatch<SetStateAction<boolean>>;
  listSelectedFormatted?: IListForm<ITab>;
}) => {
  const {t} = useTranslation();
  const _renderProducts = ({item}: {item: IProductDTO}) => {
    return (
      <RenderProduct
        item={item}
        onPress={removeProductSelected}
        key={`${item.id}`}
      />
    );
  };

  const handleFloatButton = (values: any) => {
    goToAddProducts(values);
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleFormikSubmit}
      enableReinitialize>
      {({handleSubmit, values}) => {
        const debouncedSearch = useDebounce(values.name, 700);

        useEffect(() => {
          if (debouncedSearch) {
            handleNameListSelected(values.name);
          }
        }, [debouncedSearch]);
        return (
          <View style={styles.form}>
            {loading ? (
              <Loader />
            ) : (
              <>
                <View style={{paddingBottom: 12}}>
                  <View style={styles.containerTitleAndFilter}>
                    <View style={{width: Dimensions.get('screen').width - 110}}>
                      <FormikInputValue
                        name="name"
                        placeholder={t('createList.inputPlaceHolder')}
                        onChange={() => null}
                        isNameList
                      />
                    </View>
                    <FilterButton onPress={() => setOpen(true)} />
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                    }}>
                    <Colors name="color" values={values} key={'Colors'} />
                  </View>
                </View>
                <View style={styles.containerResult}>
                  <Content
                    _renderProducts={_renderProducts}
                    goToAddProducts={() => goToAddProducts(values)}
                    showWithCategories={showWithCategories}
                    listSelectedFormatted={listSelectedFormatted}
                  />
                  <FloatButton
                    navigate={handleFloatButton}
                    key={'FloatButton'}
                  />
                  <View style={styles.containerButton}>
                    <Button
                      children={t('createList.button')}
                      isDisabled={false}
                      type="primary"
                      onPress={handleSubmit}
                      key={'Button'}
                    />
                  </View>
                </View>
              </>
            )}
          </View>
        );
      }}
    </Formik>
  );
};

const styles = StyleSheet.create({
  form: {
    height: '100%',
    flex: 1,
    display: 'flex',
  },
  containerResult: {
    flex: 6,
    width: '100%',
    display: 'flex',
  },
  containerButton: {
    paddingTop: 12,
    width: '100%',
    display: 'flex',
    marginBottom: 28,
  },
  containerTitleAndFilter: {
    display: 'flex',
    flexDirection: 'row',
    gap: 20,
  },
});

export default EditListForm;

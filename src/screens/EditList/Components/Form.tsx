import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {Formik, FormikState} from 'formik';
import {FormikInputValue} from '../../../components/FormikInput';
import Button from '../../../components/Button';
import {Content} from '../../CreateList/Components/Content';
import RenderProduct from '../../CreateList/Components/RenderProducts';
import {IProductDTO} from '../../../models/types/product';
import {useTranslation} from 'react-i18next';
import Loader from '../../../components/Loader';
import {Colors} from '../../CreateList/Components/Colors';
import FloatButton from '../../../components/FloatButton';
import {useDebounce} from '../../../common/utils/customHooks/useDebounce';

const EditListForm = ({
  products,
  initialValues,
  loading,
  goToAddProducts,
  handleFormikSubmit,
  removeProductSelected,
  handleNameListSelected,
}: {
  initialValues: {name: string; categories: string[]};
  handleFormikSubmit: (
    values: {
      name: string;
      categories: string[];
    },
    actions: {
      setStatus: (arg0: string) => void;
      setSubmitting: (arg0: boolean) => void;
      resetForm: (nextState?: Partial<FormikState<any>>) => void;
    },
  ) => Promise<any>;
  goToAddProducts: (values: {name: string}) => void;
  products: IProductDTO[];
  removeProductSelected: (id: number) => void;
  handleNameListSelected: (value: string) => void;
  loading: boolean;
}) => {
  const {t} = useTranslation();
  const _renderProducts = ({item}: {item: IProductDTO}) => {
    return <RenderProduct item={item} onPress={removeProductSelected} />;
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
                  <FormikInputValue
                    name="name"
                    placeholder={t('createList.inputPlaceHolder')}
                    onChange={() => null}
                    isNameList
                  />
                  <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                    <Colors name="categories" values={values} key={'Colors'} />
                  </View>
                </View>
                <View style={styles.containerResult}>
                  <Content
                    _renderProducts={_renderProducts}
                    goToAddProducts={() => goToAddProducts(values)}
                    products={products}
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
});

export default EditListForm;

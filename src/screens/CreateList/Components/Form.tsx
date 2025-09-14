import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {Formik, FormikState} from 'formik';
import {FormikInputValue} from '../../../components/FormikInput';
import Button from '../../../components/Button';
import {Content} from './Content';
import RenderProduct from './RenderProducts';
import {IProductDTO} from '../../../models/types/product';
import {useTranslation} from 'react-i18next';
import FloatButton from '../../../components/FloatButton';
import {Chip} from '../../../components/ChipColor';
import {Colors} from './Colors';

const CreateListForm = ({
  products,
  initialValues,
  goToAddProducts,
  handleFormikSubmit,
  removeProductSelected,
  goToCreateProduct,
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
  goToCreateProduct: (productName: string) => void;
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
      {({handleSubmit, values, setFieldValue}) => (
        <View style={styles.form}>
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
              <FloatButton navigate={handleFloatButton} key={'FloatButton'} />
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
        </View>
      )}
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

export default CreateListForm;

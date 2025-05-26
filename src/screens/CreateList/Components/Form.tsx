import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Formik, FormikState} from 'formik';
import {FormikInputValue} from '../../../components/FormikInput';
import Button from '../../../components/Button';
import {Content} from './Content';
import RenderProduct from './RenderProducts';
import {IProductDTO} from '../../../models/types/product';
import {useTranslation} from 'react-i18next';

const CreateListForm = ({
  goToAddProducts,
  products,
  initialValues,
  handleFormikSubmit,
  removeProductSelected,
}: {
  initialValues: {name: string};
  handleFormikSubmit: (
    values: {
      name: string;
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
}) => {
  const {t} = useTranslation();
  const _renderProducts = ({item}: {item: IProductDTO}) => {
    return <RenderProduct item={item} onPress={removeProductSelected} />;
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleFormikSubmit}
      enableReinitialize>
      {({handleSubmit, values}) => {
        return (
          <View style={styles.form}>
            <View style={{marginTop: 16}}>
              <FormikInputValue
                name="name"
                placeholder={t('createList.inputPlaceHolder')}
                onChange={() => null}
              />
            </View>
            <View style={styles.containerResult}>
              <Content
                _renderProducts={_renderProducts}
                goToAddProducts={() => goToAddProducts(values)}
                products={products}
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
    width: '100%',
    display: 'flex',
    marginBottom: 32,
  },
});

export default CreateListForm;

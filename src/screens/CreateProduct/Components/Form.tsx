import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Formik} from 'formik';
import {FormikInputValue} from '../../../components/FormikInput';
import Button from '../../../components/Button';
import {createProductController} from '../Controller/createProductController';
import {FormikSelectValue} from '../../../components/FormikSelect';
import {categories} from '../../../data-mock';

const CreateProductForm = () => {
  const {handleFormikSubmit, initialValues} = createProductController();

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleFormikSubmit}
      enableReinitialize
      validateOnMount>
      {({handleSubmit}) => {
        return (
          <View style={styles.form}>
            <View style={{marginTop: 32, display: 'flex', gap: 32}}>
              <FormikInputValue
                name="name"
                placeholder={'Nombre del producto'}
                onChange={() => null}
              />
              <FormikSelectValue
                name="category"
                placeholder={'Categoria del producto'}
                onChange={() => null}
                options={categories}
              />
            </View>
            <View style={styles.containerResult}>
              <View style={styles.containerButton}>
                <Button
                  children="Aceptar"
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
    justifyContent: 'flex-end',
  },
  containerButton: {
    width: '100%',
    display: 'flex',
    marginBottom: 32,
  },
});

export default CreateProductForm;

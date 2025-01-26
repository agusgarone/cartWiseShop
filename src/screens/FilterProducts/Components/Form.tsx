import React, {useState} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {FieldArray, Formik} from 'formik';
import {categories} from '../../../data-mock';
import RenderProduct from './RenderProduct';
import theme from '../../../common/theme';
import {FormikInputValue} from '../../../components/FormikInput';
import Button from '../../../components/Button';
import {ICategoria} from '../../../models/categoria';

const initialValues = {
  textSearched: '',
  categories: categories,
};

const FilterForm = ({
  handleFormikSubmit,
}: {
  handleFormikSubmit: (values: {
    textSearched: string;
    categories: ICategoria[];
  }) => void;
}) => {
  return (
    <Formik initialValues={initialValues} onSubmit={handleFormikSubmit}>
      {({handleSubmit, values}) => {
        return (
          <View style={styles.form}>
            <FormikInputValue
              name="textSearched"
              placeholder={'Buscar categoria'}
              onChange={value => null}
            />
            <FieldArray
              name="categories"
              render={() => (
                <FlatList
                  data={values.categories}
                  renderItem={({item, index}) => (
                    <RenderProduct item={item} index={index} />
                  )}
                  style={{paddingVertical: 5}}
                />
              )}
            />
            <Button
              children="Agregar"
              isDisabled={false}
              type="primary"
              onPress={handleSubmit}
              key={'Button'}
            />
          </View>
        );
      }}
    </Formik>
  );
};

const styles = StyleSheet.create({
  form: {
    paddingTop: 16,
    width: '100%',
    gap: 32,
  },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  filterText: {
    fontSize: 16,
    color: theme.colors.black,
  },
});

export default FilterForm;

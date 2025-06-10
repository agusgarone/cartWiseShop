import React from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {FieldArray, Formik} from 'formik';
import {categories} from '../../../data-mock';
import RenderProduct from './RenderProduct';
import {FormikInputValue} from '../../../components/FormikInput';
import Button from '../../../components/Button';
import {ICategory, ICategoryFilter} from '../../../models/types/category';
import {useTranslation} from 'react-i18next';

const initialValues = {
  textSearched: '',
  categories: categories,
};

const FilterForm = ({
  handleFormikSubmit,
}: {
  handleFormikSubmit: (values: {
    textSearched: string;
    categories: ICategoryFilter[] | ICategory[];
  }) => void;
}) => {
  const {t} = useTranslation();
  return (
    <Formik initialValues={initialValues} onSubmit={handleFormikSubmit}>
      {({handleSubmit, values, setFieldValue}) => {
        return (
          <View style={styles.form}>
            <FormikInputValue
              name="textSearched"
              placeholder={t('filterProducts.inputPlaceholder')}
              onChange={value => null}
            />
            <FieldArray
              name="categories"
              render={() => (
                <FlatList
                  data={values.categories}
                  renderItem={({item, index}) => (
                    <RenderProduct
                      item={item}
                      index={index}
                      categories={categories}
                      setFieldValue={setFieldValue}
                    />
                  )}
                  style={{
                    paddingVertical: 5,
                    height: '70%',
                  }}
                />
              )}
            />
            <Button
              children={t('filterProducts.addButton')}
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
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingTop: 16,
    gap: 32,
  },
});

export default FilterForm;

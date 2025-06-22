import React, {useContext} from 'react';
import {View, StyleSheet, FlatList, Text, TouchableOpacity} from 'react-native';
import {FieldArray, Formik} from 'formik';
import RenderProduct from './RenderProduct';
import {FormikInputValue} from '../../../components/FormikInput';
import Button from '../../../components/Button';
import {ICategory, ICategoryFilter} from '../../../models/types/category';
import {useTranslation} from 'react-i18next';
import {ArrowDownAZ, ArrowUpAZ} from 'lucide-react-native';
import {ThemeContext} from '../../../services/ThemeProvider';
import theme from '../../../common/theme';

const FilterFormProducts = ({
  handleFormikSubmit,
  closeDrawer,
  categories,
}: {
  handleFormikSubmit: (values: {
    textSearched: string;
    categories: ICategoryFilter[] | ICategory[];
    orderAsc: boolean;
  }) => void;
  closeDrawer: () => void;
  categories: ICategoryFilter[];
}) => {
  const {t} = useTranslation();
  const {theme} = useContext(ThemeContext);

  const initialValues = {
    textSearched: '',
    categories: categories,
    orderAsc: true,
  };

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      onSubmit={handleFormikSubmit}>
      {({handleSubmit, values, setFieldValue}) => {
        return (
          <View style={styles.form}>
            <FormikInputValue
              name="textSearched"
              placeholder={t('filterProducts.inputPlaceholder')}
              onChange={value => null}
            />
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text
                style={[
                  styles.subtitle,
                  {color: theme.filterProducts.subtitle},
                ]}>
                {t('filterProducts.sort')}:{' '}
              </Text>
              <TouchableOpacity
                onPress={() => setFieldValue('orderAsc', !values.orderAsc)}>
                {values.orderAsc ? (
                  <ArrowUpAZ color={theme.filterProducts.sortIcon} />
                ) : (
                  <ArrowDownAZ color={theme.filterProducts.sortIcon} />
                )}
              </TouchableOpacity>
            </View>
            <View>
              <Text
                style={[
                  styles.subtitle,
                  {color: theme.filterProducts.subtitle, marginBottom: 8},
                ]}>
                {t('filterProducts.categories')}:{' '}
              </Text>
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
                      height: '55%',
                    }}
                  />
                )}
              />
            </View>
            <Button
              children={t('filterProducts.addButton')}
              isDisabled={false}
              type="primary"
              onPress={() => {
                handleSubmit();
                closeDrawer();
              }}
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
    gap: 26,
  },
  subtitle: {
    fontSize: theme.fontSize.l,
  },
});

export default FilterFormProducts;

import React, {useContext, useEffect} from 'react';
import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import theme from '../../../common/theme';
import {Formik} from 'formik';
import {IListFormPrueba, ITab} from '../../../models/types/list';
import RenderProduct from './RenderProducts';
import Loader from '../../../components/Loader';
import {ThemeContext} from '../../../services/ThemeProvider';
import Button from '../../../components/Button';
import {useTranslation} from 'react-i18next';
import {FilterButton} from '../../../components/FilterButton';

const Content = ({
  handleAllSelected,
  handleButtonDelete,
  navigateToEditList,
  setOpen,
  listSelected,
  loading,
  showWithCategories,
}: {
  showWithCategories: boolean;
  listSelected: IListFormPrueba<ITab>;
  loading: boolean;
  handleButtonDelete: (list: IListFormPrueba<ITab>) => void;
  handleAllSelected: () => void;
  navigateToEditList: () => Promise<void>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const {theme} = useContext(ThemeContext);
  const {t} = useTranslation();

  return (
    <View style={styles.centeredView}>
      {loading ? (
        <Loader />
      ) : (
        <View style={styles.containerResult}>
          <View style={styles.containerTitle}>
            <Text style={[styles.title, {color: theme.listDetail.titleColor}]}>
              {listSelected?.name}
            </Text>
            <FilterButton onPress={() => setOpen(true)} />
          </View>
          <View style={styles.containerList}>
            <Formik
              enableReinitialize
              initialValues={{
                data: listSelected.data,
              }}
              onSubmit={values => console.log(values)}>
              {({values, getFieldHelpers}) => {
                useEffect(() => {
                  const allSelected = values.data.every(tab =>
                    tab.products.every(product => product.isChecked === true),
                  );
                  console.log('allSelected');
                  // JSON.stringify(values.data)
                  if (allSelected) {
                    handleAllSelected();
                  }
                }, [values]);
                if (showWithCategories) {
                  return <ShowProductsWithCategories values={values} />;
                }
                return <ShowOnlyProducts values={values} />;
              }}
            </Formik>
          </View>
          <View style={styles.buttonsWrapper}>
            <View style={{flex: 1}}>
              <Button
                children={t('listDetail.editButton')}
                isDisabled={false}
                type="secondary"
                onPress={navigateToEditList}
                key={'Button1'}
              />
            </View>
            <View style={{flex: 1}}>
              <Button
                children={t('listDetail.deleteButton')}
                isDisabled={false}
                type="primary"
                onPress={() => listSelected && handleButtonDelete(listSelected)}
                key={'Button2'}
              />
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

const ShowProductsWithCategories = ({
  values,
}: {
  values: {
    data: ITab[];
  };
}) => {
  return (
    <ScrollView>
      {values.data.map((tab, indexTab) => (
        <View key={indexTab}>
          <View style={{padding: 16}}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 700,
                color: '#000',
              }}>
              {tab.categoria}
            </Text>
          </View>
          {tab.products.map((prod, indexProd) => {
            return (
              <RenderProduct
                item={prod}
                indexTab={indexTab}
                indexProd={indexProd}
                key={`${prod.id}${indexProd}`}
              />
            );
          })}
        </View>
      ))}
    </ScrollView>
  );
};

const ShowOnlyProducts = ({
  values,
}: {
  values: {
    data: ITab[];
  };
}) => {
  return (
    <FlatList
      data={values.data[0].products}
      renderItem={({item, index}) => (
        <RenderProduct
          item={item}
          indexTab={0}
          indexProd={index}
          key={`${item.id}${index}`}
        />
      )}
      style={{paddingVertical: 5}}
      ListFooterComponent={() => (
        <View
          style={{
            marginVertical: 20,
          }}></View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  centeredView: {
    display: 'flex',
    flex: 1,
    paddingHorizontal: 20,
  },
  containerResult: {
    flex: 6,
    display: 'flex',
    paddingVertical: 10,
  },
  containerList: {
    flex: 4,
    display: 'flex',
  },
  containerTitle: {
    paddingVertical: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: theme.fontSize.xxl,
    fontWeight: '700',
    maxWidth: '70%',
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 8,
    height: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonsWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
    paddingBottom: 28,
    paddingTop: 16,
  },
});

export default Content;

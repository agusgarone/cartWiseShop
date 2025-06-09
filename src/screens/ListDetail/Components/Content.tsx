import React, {useContext, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import List from '../../../components/List';
import theme from '../../../common/theme';
import {Formik} from 'formik';
import {IListForm} from '../../../models/types/list';
import RenderProduct from './RenderProducts';
import {IProductDTO, IProductForm} from '../../../models/types/product';
import {User} from '../../../models/types/user';
import Loader from '../../../components/Loader';
import {ThemeContext} from '../../../services/ThemeProvider';
import Button from '../../../components/Button';
import {useTranslation} from 'react-i18next';

const Content = ({
  id,
  getListByID,
  handleAllSelected,
  handleButtonDelete,
  navigateToEditList,
  listSelected,
  user,
  loading,
}: {
  id: string;
  user: User | undefined;
  listSelected: IListForm<IProductForm> | null;
  loading: boolean;
  getListByID: (id: string) => Promise<void>;
  handleButtonDelete: (list: IListForm<IProductForm>) => void;
  handleAllSelected: () => void;
  navigateToEditList: (id: string) => Promise<void>;
}) => {
  const {theme} = useContext(ThemeContext);
  const {t} = useTranslation();

  useEffect(() => {
    getListByID(id);
  }, [id]);

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
          </View>
          <View style={styles.containerList}>
            <Formik
              enableReinitialize
              initialValues={{
                products: listSelected?.products || [],
              }}
              onSubmit={values => console.log(values)}>
              {({values}) => {
                useEffect(() => {
                  const allSelected = Object.values(values.products).every(
                    product => product.isChecked,
                  );
                  if (allSelected && Object.keys(values.products).length > 0) {
                    handleAllSelected();
                  }
                }, [
                  Object.values(values.products)
                    .map(p => p.isChecked)
                    .join(','),
                ]);

                // if (user && user.listView === 'separated') {
                //   return (
                //     <Separated
                //       data={mapProductsArrayToObject(
                //         Object.values(values.products),
                //       )}
                //       render={_renderProducts}
                //     />
                //   );
                // }
                return (
                  <List
                    data={Object.values(values.products)}
                    render={_renderProducts}
                  />
                );
              }}
            </Formik>
          </View>
          <View style={styles.buttonsWrapper}>
            <View style={{flex: 1}}>
              <Button
                children={t('listDetail.editButton')}
                isDisabled={false}
                type="secondary"
                onPress={() => navigateToEditList(id)}
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

const _renderProducts = ({item, index}: {item: IProductDTO; index: number}) => {
  return <RenderProduct item={item} index={index} key={`${item.id}${index}`} />;
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

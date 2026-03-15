import React, {useContext, useEffect, useMemo, useRef} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import theme from '../../../common/theme';
import {Formik, useFormikContext} from 'formik';
import {IListForm, ITab} from '../../../models/types/list';
import Loader from '../../../components/Loader';
import {ThemeContext} from '../../../services/ThemeProvider';
import Button from '../../../components/Button';
import {useTranslation} from 'react-i18next';
import {FilterButton} from '../../../components/FilterButton';
import {Share2} from 'lucide-react-native';
import {ListProductsByCategory} from '../../../components/ListProductsByCategory';
import {ListProductsWithoutCategory} from '../../../components/ListProductsWithoutCategory';
import RenderProduct from './RenderProducts';
import {IProductForm} from '../../../models/types/product';

const Content = ({
  handleAllSelected,
  handleButtonDelete,
  handleShareList,
  navigateToEditList,
  setOpen,
  listSelected,
  loading,
  showWithCategories,
}: {
  showWithCategories: boolean;
  listSelected: IListForm<ITab>;
  loading: boolean;
  handleButtonDelete: (list: IListForm<ITab>) => void;
  handleShareList: (list: IListForm<ITab>) => Promise<void>;
  handleAllSelected: () => void;
  navigateToEditList: () => Promise<void>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const {theme} = useContext(ThemeContext);
  const {t} = useTranslation();

  const _renderProducts = ({
    item,
    indexProd,
    indexTab,
  }: {
    item: IProductForm;
    indexProd: number;
    indexTab: number;
  }) => (
    <RenderProduct
      item={item}
      indexTab={indexTab}
      indexProd={indexProd}
      key={`${item.id}${indexTab}${indexProd}`}
    />
  );

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
            <View style={styles.containerActions}>
              <TouchableOpacity
                style={[
                  styles.iconButton,
                  {backgroundColor: theme.products.buttonFilter.background},
                ]}
                onPress={() => listSelected && handleShareList(listSelected)}>
                <Share2 size={22} color="white" />
              </TouchableOpacity>
              <FilterButton onPress={() => setOpen(true)} />
            </View>
          </View>
          <View style={styles.containerList}>
            <Formik
              enableReinitialize
              initialValues={{
                data: listSelected.data,
              }}
              onSubmit={values => console.log(values)}>
              {({values}) => (
                <>
                  <AllSelectedWatcher onAllSelected={handleAllSelected} />

                  {showWithCategories ? (
                    <ListProductsByCategory
                      values={values}
                      _renderProducts={_renderProducts}
                      emptyComponent={null}
                    />
                  ) : (
                    <ListProductsWithoutCategory
                      values={values}
                      _renderProducts={_renderProducts}
                      emptyComponent={null}
                    />
                  )}
                </>
              )}
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

const AllSelectedWatcher = ({onAllSelected}: {onAllSelected: () => void}) => {
  const {values} = useFormikContext<{data: ITab[]}>();
  const alreadyExecuted = useRef(false);

  const allSelected = useMemo(() => {
    return values.data.every(tab =>
      tab.products.every(prod => prod.isChecked === true),
    );
  }, [values.data]);

  useEffect(() => {
    if (allSelected && !alreadyExecuted.current) {
      alreadyExecuted.current = true;
      onAllSelected();
    }

    if (!allSelected) {
      alreadyExecuted.current = false;
    }
  }, [allSelected, onAllSelected]);

  return null;
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
    alignItems: 'center',
  },
  containerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconButton: {
    padding: 10,
    width: 50,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
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

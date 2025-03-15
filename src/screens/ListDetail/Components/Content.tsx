import React, {useEffect} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import List from '../../../components/List';
import theme from '../../../common/theme';
import {FieldArray, Formik} from 'formik';
import {IListDTO} from '../../../models/types/list';
import RenderProduct from './RenderProducts';
import {IProductDTO, IProductForm} from '../../../models/types/product';
import {Trash} from 'lucide-react-native';
import Separated from './ListView/Separated';
import {User} from '../../../models/types/user';

const Content = ({
  id,
  getListByID,
  handleAllSelected,
  handleButtonDelete,
  listSelected,
  user,
}: {
  id: string;
  user: User | undefined;
  getListByID: (id: string) => Promise<void>;
  handleButtonDelete: (list: IListDTO<IProductForm>) => void;
  handleAllSelected: () => void;
  listSelected: IListDTO<IProductForm> | null;
}) => {
  useEffect(() => {
    getListByID(id);
  }, [id]);

  const _renderProducts = ({
    item,
    index,
  }: {
    item: IProductDTO;
    index: number;
  }) => {
    return (
      <RenderProduct item={item} index={index} key={`${item.id}${index}`} />
    );
  };

  return (
    <View style={styles.centeredView}>
      <View style={styles.containerResult}>
        <View style={styles.containerTitle}>
          <Text style={styles.title}>{listSelected?.name}</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => listSelected && handleButtonDelete(listSelected)}>
            <Trash color={theme.colors.white} size={25} />
          </TouchableOpacity>
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
              }, [values.products]);
              return (
                <FieldArray
                  name="products"
                  render={() => {
                    if (user && user.listView === 'separated') {
                      return (
                        <Separated
                          data={Object.values(values.products)}
                          render={_renderProducts}
                        />
                      );
                    }
                    return (
                      <List
                        data={Object.values(values.products)}
                        render={_renderProducts}
                      />
                    );
                  }}
                />
              );
            }}
          </Formik>
        </View>
      </View>
    </View>
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
    color: theme.colors.black,
    fontSize: theme.fontSize.xxl,
    fontWeight: '700',
    maxWidth: '70%',
  },
  button: {
    backgroundColor: theme.colors.grey,
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 8,
    height: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Content;

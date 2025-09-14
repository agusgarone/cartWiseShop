import React, {useContext} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import Button from '../../../components/Button';
import {IProductDTO} from '../../../models/types/product';
import {IListForm, ITab} from '../../../models/types/list';
import {ThemeContext} from '../../../services/ThemeProvider';
import {useTranslation} from 'react-i18next';
import {ListProductsByCategory} from '../../../components/ListProductsByCategory';
import {ListProductsWithoutCategory} from '../../../components/ListProductsWithoutCategory';

export const Content = ({
  _renderProducts,
  goToAddProducts,
  products,
  showWithCategories,
  listSelectedFormatted,
}: {
  _renderProducts: ({item}: {item: IProductDTO}) => React.JSX.Element;
  goToAddProducts: () => void | undefined;
  products: IProductDTO[];
  showWithCategories: boolean;
  listSelectedFormatted?: IListForm<ITab>;
}) => {
  const {t} = useTranslation();
  const {theme} = useContext(ThemeContext);

  return (
    <>
      <View style={Style.first}>
        {showWithCategories ? (
          <ListProductsByCategory
            values={listSelectedFormatted || null}
            emptyComponent={null}
          />
        ) : (
          <ListProductsWithoutCategory
            values={listSelectedFormatted || null}
            _renderProducts={_renderProducts}
            emptyComponent={() => (
              <View style={Style.noProducts}>
                <Text style={{color: theme.createList.listEmpty.color}}>
                  {t('createList.emptyText')}
                </Text>
                <Button
                  children={t('createList.emptyButton')}
                  isDisabled={false}
                  type="primary"
                  onPress={goToAddProducts}
                  key={'Button'}
                />
              </View>
            )}
          />
        )}
      </View>
    </>
  );
};

const Style = StyleSheet.create({
  first: {
    flex: 7,
    width: '100%',
    display: 'flex',
  },
  noProducts: {
    marginTop: 10,
    minHeight: 250,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
});

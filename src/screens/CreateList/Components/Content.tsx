import React, {useContext} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import Button from '../../../components/Button';
import {IProductDTO} from '../../../models/types/product';
import {ThemeContext} from '../../../services/ThemeProvider';
import {useTranslation} from 'react-i18next';

export const Content = ({
  _renderProducts,
  goToAddProducts,
  products,
}: {
  _renderProducts: ({item}: {item: IProductDTO}) => React.JSX.Element;
  goToAddProducts: () => void | undefined;
  products: IProductDTO[];
}) => {
  const {t} = useTranslation();
  const {theme} = useContext(ThemeContext);
  return (
    <>
      <View style={Style.first}>
        <FlatList
          style={{paddingVertical: 5}}
          data={products}
          renderItem={_renderProducts}
          ListEmptyComponent={() => (
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
          ListFooterComponent={() => {
            if (products && products?.length) {
              return (
                <View style={{marginTop: 4}}>
                  <Button
                    children={t('createList.buttonAddProduct')}
                    isDisabled={false}
                    type="primary"
                    onPress={goToAddProducts}
                    key={'Button'}
                  />
                </View>
              );
            } else {
              return null;
            }
          }}
        />
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

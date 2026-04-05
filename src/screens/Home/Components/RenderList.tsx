import React, {useContext} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {IListDTO} from '../../../models/types/list';
import theme from '../../../common/theme';
import {IProductDTO} from '../../../models/types/product';
import {ThemeContext} from '../../../services/ThemeProvider';
import {useTranslation} from 'react-i18next';

const RenderList = ({
  item,
  navigateToListDetail,
  navigateToEditList,
}: {
  item: IListDTO<IProductDTO>;
  navigateToListDetail: (id: string) => void;
  navigateToEditList: (id: string) => void;
}) => {
  const {t} = useTranslation();
  const {theme} = useContext(ThemeContext);
  return (
    <TouchableOpacity
      style={[style.view]}
      activeOpacity={1}
      onPress={() => navigateToListDetail(item.id.toString())}
      onLongPress={() => navigateToEditList(item.id.toString())}>
      <View
        style={[
          style.content,
          {backgroundColor: theme.home.renderProduct.background},
        ]}>
        <Text
          style={[style.name, {color: theme.home.renderProduct.titleColor}]}>
          {item.name}
        </Text>
        <Text
          style={[
            style.subtitle,
            {color: theme.home.renderProduct.subtitleColor},
          ]}>
          {`${item.products.length} ${
            item.products.length === 1
              ? t('home.renderItem.product')
              : t('home.renderItem.products')
          }`}
        </Text>
        <Text
          style={{
            color: theme.home.renderProduct.subtitleColor,
          }}>
          {t('home.renderItem.createdAt')}
          {` ${new Date(item.created_at).toLocaleDateString()}`}
        </Text>
      </View>
      <View
        style={[
          style.color,
          {backgroundColor: item.color || theme.home.renderProduct.background},
        ]}
      />
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  view: {
    marginHorizontal: 16,
    marginVertical: 5,
    borderRadius: 20,
    display: 'flex',
    flexDirection: 'row',
    elevation: 3,
  },
  content: {
    width: '94%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 20,
    zIndex: 100,
  },
  color: {
    width: '16%',
    borderRadius: 20,
    position: 'relative',
    left: -38,
  },
  name: {
    fontSize: theme.fontSize.xxxl,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: theme.fontSize.l,
    marginBottom: 4,
  },
});

export default RenderList;

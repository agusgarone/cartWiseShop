import React, {useContext} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {IProductDTO} from '../../../models/types/product';
import {X} from 'lucide-react-native';
import {ThemeContext} from '../../../services/ThemeProvider';
import {useTranslation} from 'react-i18next';

const RenderProduct = ({
  item,
  onPress,
}: {
  item: IProductDTO;
  onPress: (id: number) => void;
}) => {
  const {theme} = useContext(ThemeContext);
  const {t} = useTranslation();
  return (
    <View
      style={[
        style.view,
        {backgroundColor: theme.createList.renderProduct.background},
      ]}>
      <View style={style.rowText}>
        <Text style={{color: theme.createList.renderProduct.color}}>
          {item.name}
        </Text>
        {item.isNewToCatalog ? (
          <View
            style={[
              style.chip,
              {backgroundColor: theme.createList.newProductChip.background},
            ]}>
            <Text
              style={[style.chipText, {color: theme.createList.newProductChip.color}]}
              numberOfLines={2}>
              {t('createList.newProductChip')}
            </Text>
          </View>
        ) : null}
      </View>
      <TouchableOpacity style={style.button} onPress={() => onPress(item.id)}>
        <X color={theme.createList.renderProduct.icon} size={25} />
      </TouchableOpacity>
    </View>
  );
};

const style = StyleSheet.create({
  view: {
    marginHorizontal: 3,
    marginTop: 2,
    marginBottom: 5,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 16,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
  },
  rowText: {
    flex: 1,
    marginRight: 8,
    gap: 8,
  },
  chip: {
    alignSelf: 'flex-start',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
    maxWidth: '100%',
  },
  chipText: {
    fontSize: 11,
    fontWeight: '600',
    lineHeight: 14,
  },
  button: {
    paddingHorizontal: 12,
  },
});

export default RenderProduct;

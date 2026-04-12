import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {FilterButton} from '../../../components/FilterButton';
import Loader from '../../../components/Loader';
import {IProductDTO} from '../../../models/types/product';
import SwipeToDeleteItem from './AnimatedRenderItem';
import {useTranslation} from 'react-i18next';
import {useContext, useState} from 'react';
import {ThemeContext} from '../../../services/ThemeProvider';
import FloatButton from '../../../components/FloatButton';
import BottomSheetForm from '../../AddProducts/Components/Form';
import {Sparkles} from 'lucide-react-native';
import {ProductsAiVoiceModal} from './ProductsAiVoiceModal';
import type {ParsedProduct} from '../../../types/ticket';

interface IFormProps {
  setOpen: (open: boolean) => void;
  loading: boolean;
  allProducts: IProductDTO[];
  handleDeleteProduct: (product: IProductDTO, onConfirm: () => void) => void;
  goToCreateProduct: () => void | undefined;
  onVoiceAiContinue: (products: ParsedProduct[]) => void;
  handleFormikSubmit: (values: {textSearched: string}) => Promise<void>;
}

export const Form = ({
  setOpen,
  loading,
  allProducts,
  handleDeleteProduct,
  goToCreateProduct,
  onVoiceAiContinue,
  handleFormikSubmit,
}: IFormProps) => {
  const {t} = useTranslation();
  const {theme} = useContext(ThemeContext);
  const [aiVoiceOpen, setAiVoiceOpen] = useState(false);

  return (
    <View style={Style.selectList}>
      <View style={Style.content}>
        <View style={Style.header}>
          <View style={{width: '84%'}}>
            <BottomSheetForm
              handleFormikSubmit={handleFormikSubmit}
              key={'form-bottom-sheet'}
            />
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              paddingBottom: 6,
            }}>
            <FilterButton onPress={() => setOpen(true)} />
          </View>
        </View>
        <View style={Style.containerList}>
          {loading ? (
            <Loader />
          ) : (
            <FlatList
              style={{paddingVertical: 5}}
              data={allProducts}
              renderItem={({item}) => (
                <SwipeToDeleteItem
                  item={item}
                  onDismiss={() => null}
                  onPressTrash={onConfirm =>
                    handleDeleteProduct(item, onConfirm)
                  }
                />
              )}
              ListEmptyComponent={() => {
                if (loading) {
                  return null;
                }
                return (
                  <View style={Style.noProducts}>
                    <Text style={{color: theme.products.color}}>
                      {t('products.emptyText')}
                    </Text>
                  </View>
                );
              }}
              ListFooterComponent={() => (
                <View style={Style.marginListFooter}></View>
              )}
            />
          )}
        </View>
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel={t('products.aiVoice.openAssistant')}
          style={[
            Style.aiFab,
            {
              backgroundColor: '#6366f1',
            },
          ]}
          onPress={() => setAiVoiceOpen(true)}
          activeOpacity={0.85}>
          <Sparkles size={22} color="#FFFFFF" />
        </TouchableOpacity>
        <FloatButton navigate={goToCreateProduct} isHome key={'FloatButton'} />
        <ProductsAiVoiceModal
          visible={aiVoiceOpen}
          onClose={() => setAiVoiceOpen(false)}
          onContinueWithParsed={parsed => {
            setAiVoiceOpen(false);
            onVoiceAiContinue(parsed.products);
          }}
        />
      </View>
    </View>
  );
};

const Style = StyleSheet.create({
  selectList: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  containerList: {
    flex: 9,
    display: 'flex',
    paddingBottom: 12,
  },
  containerButton: {
    display: 'flex',
    marginBottom: 16,
    backgroundColor: 'red',
  },
  noProducts: {
    marginTop: 10,
    minHeight: 250,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  marginListFooter: {
    marginVertical: 20,
  },
  aiFab: {
    position: 'absolute',
    bottom: 99,
    right: 16,
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});

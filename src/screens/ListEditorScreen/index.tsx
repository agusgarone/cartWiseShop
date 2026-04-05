import React, {useContext, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {Drawer} from 'react-native-drawer-layout';
import {Share2, Trash2, Sparkles, SlidersHorizontal} from 'lucide-react-native';
import {ThemeContext} from '../../services/ThemeProvider';
import {useTranslation} from 'react-i18next';
import {CustomDrawerContent} from '../Filters';
import Loader from '../../components/Loader';
import {VoiceShoppingListModal} from '../../features/voice/components/VoiceShoppingListModal';
import {listEditorController} from './Controller/listEditorController';
import {ListModeSelector} from './components/ListModeSelector';
import {InlineProductInput} from './components/InlineProductInput';
import {ProductCategoryGroup} from './components/ProductCategoryGroup';

const ListEditorScreen = () => {
  const {theme} = useContext(ThemeContext);
  const {t} = useTranslation();
  const [aiVoiceOpen, setAiVoiceOpen] = useState(false);
  const {
    isNewList,
    listName,
    setListName,
    mode,
    setMode,
    productInput,
    products,
    setProductInput,
    loading,
    open,
    setOpen,
    isSaving,
    filteredProducts,
    addProductFromInput,
    addProductsFromVoiceParsed,
    removeProduct,
    toggleProductChecked,
    handleShareList,
    handleDeleteList,
    groupByCategory,
    sortOrderAsc,
    categoriesFilter,
  } = listEditorController();

  return (
    <SafeAreaView
      style={[styles.screen, {backgroundColor: theme.backgroundScreen}]}>
      <Drawer
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        drawerStyle={{width: '88%', maxWidth: 360}}
        renderDrawerContent={() => (
          <CustomDrawerContent
            isOpen={open}
            closeDrawer={() => setOpen(false)}
            products={products}
            productsCategories={categoriesFilter}
          />
        )}>
        <View style={styles.content}>
          {loading ? (
            <Loader />
          ) : (
            <>
              <View style={styles.headerRow}>
                <TextInput
                  style={[
                    styles.titleInput,
                    {
                      color: theme.input.color,
                      borderColor: theme.input.borderColor,
                      backgroundColor: theme.input.background,
                    },
                  ]}
                  placeholder={t('listEditor.listNamePlaceholder')}
                  placeholderTextColor={theme.input.placeHolder}
                  value={listName}
                  onChangeText={setListName}
                />
                <View style={styles.headerActions}>
                  {!isNewList ? (
                    <>
                      <TouchableOpacity
                        style={[
                          styles.iconButton,
                          {
                            backgroundColor:
                              theme.products.buttonFilter.background,
                          },
                        ]}
                        onPress={() => void handleShareList()}>
                        <Share2 size={20} color="white" />
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[
                          styles.iconButton,
                          {backgroundColor: theme.fabAi.background},
                        ]}
                        onPress={() => void handleDeleteList()}>
                        <Trash2 size={20} color={theme.fabAi.icon} />
                      </TouchableOpacity>
                    </>
                  ) : null}
                  <TouchableOpacity
                    style={[
                      styles.iconButton,
                      {
                        backgroundColor:
                          theme.products.buttonFilter.background,
                      },
                    ]}
                    onPress={() => setOpen(true)}>
                    <SlidersHorizontal size={20} color="white" />
                  </TouchableOpacity>
                </View>
              </View>

              <ListModeSelector mode={mode} onModeChange={setMode} />

              <View style={styles.listArea}>
                <ProductCategoryGroup
                  products={filteredProducts}
                  mode={mode}
                  groupByCategory={groupByCategory}
                  sortOrderAsc={sortOrderAsc}
                  onRemoveProduct={removeProduct}
                  onToggleChecked={toggleProductChecked}
                  emptyComponent={
                    <View style={styles.empty}>
                      <Text
                        style={[
                          styles.emptyText,
                          {color: theme.createList.listEmpty.color},
                        ]}>
                        {t('listEditor.emptyProducts')}
                      </Text>
                    </View>
                  }
                />
              </View>

              {mode === 'editing' ? (
                <View style={styles.editingFooter}>
                  <TouchableOpacity
                    accessibilityRole="button"
                    accessibilityLabel={t('listEditor.aiVoice.openAssistant')}
                    style={[
                      styles.aiFab,
                      {
                        backgroundColor: theme.fabAi.background,
                        shadowColor: theme.fabAi.shadowColor,
                      },
                    ]}
                    onPress={() => setAiVoiceOpen(true)}
                    activeOpacity={0.85}>
                    <Sparkles size={22} color={theme.fabAi.icon} />
                  </TouchableOpacity>
                  <InlineProductInput
                    value={productInput}
                    onChangeText={setProductInput}
                    onSubmit={() => void addProductFromInput()}
                    autoFocus={isNewList}
                  />
                </View>
              ) : null}

              {isSaving ? (
                <View style={styles.savingIndicator}>
                  <ActivityIndicator
                    size="small"
                    color={theme.loader.color}
                  />
                  <Text
                    style={[
                      styles.savingText,
                      {color: theme.createList.listEmpty.color},
                    ]}>
                    {t('listEditor.saving')}
                  </Text>
                </View>
              ) : null}
            </>
          )}
        </View>
      </Drawer>
      <VoiceShoppingListModal
        visible={aiVoiceOpen}
        onClose={() => setAiVoiceOpen(false)}
        i18nPrefix="listEditor"
        onContinueWithParsed={parsed => {
          setAiVoiceOpen(false);
          void addProductsFromVoiceParsed(parsed.products);
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
  },
  titleInput: {
    flex: 1,
    fontSize: 22,
    fontWeight: '700',
    borderBottomWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
  },
  listArea: {
    flex: 1,
  },
  savingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 8,
  },
  savingText: {
    fontSize: 13,
  },
  editingFooter: {
    position: 'relative',
  },
  aiFab: {
    position: 'absolute',
    right: 0,
    top: -52,
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    zIndex: 10,
  },
});

export default ListEditorScreen;

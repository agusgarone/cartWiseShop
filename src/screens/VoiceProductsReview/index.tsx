import React, {useCallback, useContext, useState} from 'react';
import {
  Alert,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {Trash2} from 'lucide-react-native';
import {useTranslation} from 'react-i18next';
import {ThemeContext} from '../../services/ThemeProvider';
import type {StackParamList} from '../../services/navigation/StackNavigator';
import type {ParsedProduct} from '../../types/ticket';
import Button from '../../components/Button';
import {ProductsStorage} from '../../storage/storageHelpers';

type VoiceProductsReviewRoute = RouteProp<
  StackParamList,
  'VoiceProductsReview'
>;

type ReviewRow = ParsedProduct & {rowKey: string};

const VoiceProductsReview = () => {
  const {t} = useTranslation();
  const {theme} = useContext(ThemeContext);
  const navigation = useNavigation();
  const route = useRoute<VoiceProductsReviewRoute>();
  const initial = route.params?.products ?? [];

  const [items, setItems] = useState<ReviewRow[]>(() =>
    initial.map((p, i) => ({
      ...p,
      rowKey: `${i}-${p.name}-${p.id_category}-${Math.random()
        .toString(36)
        .slice(2, 9)}`,
    })),
  );

  const updateName = useCallback((rowKey: string, name: string) => {
    setItems(prev => prev.map(p => (p.rowKey === rowKey ? {...p, name} : p)));
  }, []);

  const removeRow = useCallback((rowKey: string) => {
    setItems(prev => prev.filter(p => p.rowKey !== rowKey));
  }, []);

  const [saving, setSaving] = useState(false);

  const handleDone = useCallback(async () => {
    const rows = items
      .map(item => ({
        name: item.name.trim().toLowerCase(),
        id_category: item.id_category,
      }))
      .filter(r => r.name.length > 0);

    const goBack = () => navigation.goBack();

    if (rows.length === 0) {
      goBack();
      return;
    }

    setSaving(true);
    try {
      const {added, skippedDuplicates} =
        await ProductsStorage.appendNewProducts(rows);

      if (added === 0 && skippedDuplicates.length > 0) {
        Alert.alert(
          t('products.voiceReview.nothingSavedTitle'),
          t('products.voiceReview.nothingSavedMessage'),
          [{text: t('modal.acceptButton'), onPress: goBack}],
        );
      } else if (added > 0 && skippedDuplicates.length > 0) {
        Alert.alert(
          t('products.voiceReview.partialSavedTitle'),
          t('products.voiceReview.partialSavedMessage', {
            added: String(added),
            skipped: String(skippedDuplicates.length),
          }),
          [{text: t('modal.acceptButton'), onPress: goBack}],
        );
      } else {
        goBack();
      }
    } catch {
      Alert.alert(
        t('products.voiceReview.saveErrorTitle'),
        t('products.voiceReview.saveErrorMessage'),
      );
    } finally {
      setSaving(false);
    }
  }, [items, navigation, t]);

  const renderItem = useCallback(
    ({item}: {item: ReviewRow}) => (
      <View
        style={[
          styles.row,
          {
            backgroundColor: theme.products.renderProduct.background,
            borderColor: theme.input.borderColor,
          },
        ]}>
        <View style={styles.rowMain}>
          <TextInput
            value={item.name}
            onChangeText={text => updateName(item.rowKey, text)}
            placeholder={t('products.voiceReview.namePlaceholder')}
            placeholderTextColor={theme.input.placeHolder}
            style={[styles.input, {color: theme.input.color}]}
            autoCapitalize="none"
            autoCorrect
          />
          <Text style={[styles.category, {color: theme.products.color}]}>
            {item.category}
          </Text>
        </View>
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel={t('products.voiceReview.deleteA11y')}
          onPress={() => removeRow(item.rowKey)}
          style={styles.trashBtn}
          hitSlop={{top: 12, bottom: 12, left: 12, right: 12}}>
          <Trash2 size={22} color={theme.products.renderProduct.icon} />
        </TouchableOpacity>
      </View>
    ),
    [
      removeRow,
      t,
      theme.input.color,
      theme.input.placeHolder,
      theme.input.borderColor,
      theme.products.color,
      theme.products.renderProduct.background,
      theme.products.renderProduct.icon,
      updateName,
    ],
  );

  return (
    <SafeAreaView
      style={[styles.safe, {backgroundColor: theme.backgroundScreen}]}>
      <View style={styles.inner}>
        <Text style={[styles.subtitle, {color: theme.products.color}]}>
          {t('products.voiceReview.subtitle')}
        </Text>
        <FlatList
          data={items}
          keyExtractor={item => item.rowKey}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <Text style={[styles.empty, {color: theme.products.color}]}>
              {t('products.voiceReview.empty')}
            </Text>
          }
        />
        <View style={styles.footer}>
          <Button
            type="primary"
            isDisabled={saving}
            onPress={() => {
              void handleDone();
            }}
            children={t('products.voiceReview.done')}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  inner: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 16,
  },
  listContent: {
    paddingBottom: 24,
    flexGrow: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 2,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  rowMain: {
    flex: 1,
    marginRight: 8,
  },
  input: {
    fontSize: 16,
    fontWeight: '600',
    paddingVertical: 4,
    minHeight: 28,
  },
  category: {
    fontSize: 13,
    marginTop: 4,
  },
  trashBtn: {
    padding: 8,
  },
  empty: {
    textAlign: 'center',
    marginTop: 48,
    fontSize: 16,
  },
  footer: {
    paddingBottom: 16,
    paddingTop: 8,
  },
});

export default VoiceProductsReview;

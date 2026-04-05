import React, {useContext, useRef, useEffect} from 'react';
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Plus} from 'lucide-react-native';
import {ThemeContext} from '../../../services/ThemeProvider';
import {useTranslation} from 'react-i18next';

type InlineProductInputProps = {
  value: string;
  onChangeText: (text: string) => void;
  onSubmit: () => void;
  autoFocus?: boolean;
};

export const InlineProductInput = ({
  value,
  onChangeText,
  onSubmit,
  autoFocus = false,
}: InlineProductInputProps) => {
  const {theme} = useContext(ThemeContext);
  const {t} = useTranslation();
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (autoFocus) {
      const timer = setTimeout(() => inputRef.current?.focus(), 300);
      return () => clearTimeout(timer);
    }
  }, [autoFocus]);

  const refocus = () => {
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const handleSubmit = () => {
    onSubmit();
    refocus();
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.listEditor?.inputBackground ?? theme.input.background,
          borderColor: theme.listEditor?.inputBorder ?? theme.input.borderColor,
        },
      ]}>
      <TouchableOpacity
        style={[
          styles.addButton,
          {backgroundColor: theme.button.background},
        ]}
        onPress={handleSubmit}
        accessibilityLabel={t('listEditor.addProductA11y')}>
        <Plus size={20} color={theme.button.text} />
      </TouchableOpacity>
      <TextInput
        ref={inputRef}
        style={[styles.input, {color: theme.input.color}]}
        placeholder={t('listEditor.addProductPlaceholder')}
        placeholderTextColor={theme.input.placeHolder}
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={handleSubmit}
        returnKeyType="done"
        blurOnSubmit={false}
      />
    </View>
  );
};

/** Re-enfoca el input externamente después de agregar un producto. */
export function useInlineInputRefocus() {
  return useRef<TextInput>(null);
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 6,
    marginBottom: 12,
    gap: 8,
  },
  addButton: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
});

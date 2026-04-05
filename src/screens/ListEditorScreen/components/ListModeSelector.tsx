import React, {useContext} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ThemeContext} from '../../../services/ThemeProvider';
import {useTranslation} from 'react-i18next';

export type ListMode = 'shopping' | 'editing';

type ListModeSelectorProps = {
  mode: ListMode;
  onModeChange: (mode: ListMode) => void;
};

export const ListModeSelector = ({mode, onModeChange}: ListModeSelectorProps) => {
  const {theme} = useContext(ThemeContext);
  const {t} = useTranslation();

  const segments: {key: ListMode; label: string}[] = [
    {key: 'shopping', label: t('listEditor.modeShopping')},
    {key: 'editing', label: t('listEditor.modeEditing')},
  ];

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: theme.listEditor?.segmentBackground ?? theme.input.background},
      ]}>
      {segments.map(segment => {
        const isActive = mode === segment.key;
        return (
          <TouchableOpacity
            key={segment.key}
            style={[
              styles.segment,
              isActive && {
                backgroundColor:
                  theme.listEditor?.segmentActive ?? theme.button.background,
              },
            ]}
            onPress={() => onModeChange(segment.key)}
            activeOpacity={0.8}>
            <Text
              style={[
                styles.segmentText,
                {
                  color: isActive
                    ? theme.listEditor?.segmentActiveText ?? theme.button.text
                    : theme.listEditor?.segmentInactiveText ?? theme.input.color,
                },
              ]}>
              {segment.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 12,
    padding: 4,
    marginBottom: 12,
  },
  segment: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  segmentText: {
    fontSize: 14,
    fontWeight: '600',
  },
});

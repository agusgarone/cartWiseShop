import React, {useState} from 'react';
import {View, Text, TouchableOpacity, FlatList, StyleSheet} from 'react-native';
import theme from '../../../common/theme';

const LIST_OPTIONS = [
  {
    id: 'original',
    title: 'Original',
    description: 'Se mantiene tal cual se crea.',
  },
  {
    id: 'separated',
    title: 'Split in 2',
    description:
      'Los productos comprados y pendientes se separan en listas diferentes.',
  },
  {
    id: 'sorted',
    title: 'Up Down',
    description: 'Los productos pendientes suben y los comprados bajan.',
  },
];

const PreviewList = ({
  handleChangeViewList,
  selectedOption,
}: {
  handleChangeViewList: (viewType: string) => void;
  selectedOption: string;
}) => {
  const exampleList = [
    {id: '1', name: 'Leche', checked: false},
    {id: '2', name: 'Pan', checked: true},
    {id: '3', name: 'Huevos', checked: false},
    {id: '4', name: 'Manzanas', checked: true},
  ];

  return (
    <View>
      <Text style={styles.header}>Configuración de Listas</Text>
      <View style={styles.optionsContainer}>
        {LIST_OPTIONS.map(option => (
          <TouchableOpacity
            key={option.id}
            style={[
              styles.option,
              selectedOption === option.id && styles.selectedOption,
            ]}
            onPress={() => handleChangeViewList(option.id)}>
            <Text
              style={[
                styles.optionTitle,
                selectedOption === option.id && {color: theme.light.white},
              ]}>
              {option.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.optionDescription}>
        {LIST_OPTIONS.find(item => item.id === selectedOption)?.description}
      </Text>

      {selectedOption === 'separated' ? (
        <View style={styles.separatedPreview}>
          <View
            style={[
              styles.previewBox,
              {backgroundColor: theme.light.primaryOpacity},
            ]}>
            <Text style={styles.previewSubtitle}>Pendientes</Text>
            <FlatList
              data={exampleList.filter(item => !item.checked)}
              keyExtractor={item => item.id}
              renderItem={({item}) => (
                <Text style={styles.previewItem}>{item.name}</Text>
              )}
            />
          </View>
          <View
            style={[
              styles.previewBox,
              {backgroundColor: theme.light.redOpacity},
            ]}>
            <Text style={styles.previewSubtitle}>Comprados</Text>
            <FlatList
              data={exampleList.filter(item => item.checked)}
              keyExtractor={item => item.id}
              renderItem={({item}) => (
                <Text style={styles.previewItem}>{item.name}</Text>
              )}
            />
          </View>
        </View>
      ) : (
        <FlatList
          data={[
            ...exampleList.filter(item => !item.checked),
            ...exampleList.filter(item => item.checked),
          ]}
          style={[styles.previewList, {backgroundColor: theme.light.white}]}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <Text
              style={[
                styles.previewItem,
                item.checked && styles.completedItem,
                {color: theme.light.grey},
              ]}>
              {item.name}
            </Text>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  optionsContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  header: {
    fontSize: theme.fontSize.xl,
    color: theme.light.black,
    marginBottom: 10,
  },
  option: {
    padding: 12,
    borderRadius: 8,
    width: '31.5%',
    alignItems: 'center',
  },
  selectedOption: {
    backgroundColor: theme.light.primary,
  },
  optionTitle: {
    fontWeight: 'bold',
    fontSize: theme.fontSize.l,

    color: theme.light.black,
  },
  optionDescription: {fontSize: 14, color: theme.light.grey, marginBottom: 20},
  previewTitle: {fontSize: 18, fontWeight: 'bold', marginTop: 15},
  previewItem: {
    paddingVertical: 5,
    fontSize: 16,
    color: theme.light.white,
  },
  completedItem: {
    textDecorationLine: 'line-through',
    color: theme.light.black,
  },
  separatedPreview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  previewBox: {flex: 1, padding: 10, borderRadius: 16},
  previewSubtitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    color: theme.light.white,
  },
  previewList: {padding: 10, borderRadius: 16, elevation: 2},
});

export default PreviewList;

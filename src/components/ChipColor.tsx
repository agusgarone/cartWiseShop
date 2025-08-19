import {memo} from 'react';
import {TouchableOpacity} from 'react-native';

interface IChip {
  cat: string;
  onPress: () => void;
  isSelected: boolean;
}

export const Chip = memo(function ({cat, isSelected, onPress}: IChip) {
  return (
    <TouchableOpacity
      key={cat}
      onPress={onPress}
      style={{
        width: 30,
        height: 30,
        margin: 10,
        borderRadius: 20,
        borderWidth: isSelected ? 2 : 0,
        borderColor: isSelected ? '#000' : 'transparent',
        backgroundColor: cat,
      }}
    />
  );
});

import {View} from 'lucide-react-native';
import React from 'react';
import {TouchableOpacity, Image, StyleSheet} from 'react-native';
import theme from '../common/theme';

interface ProfileButtonProps {
  imageUrl: string;
  onPress: () => void;
}

const ProfileButton = ({imageUrl, onPress}: ProfileButtonProps) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {imageUrl ? (
        <Image source={{uri: imageUrl}} style={styles.image} />
      ) : (
        <View style={[styles.image, styles.background]} />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 30,
    height: 30,
    borderRadius: 20,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  background: {
    backgroundColor: theme.colors.grey,
  },
});

export default ProfileButton;

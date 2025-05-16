import {View} from 'lucide-react-native';
import React, {useContext} from 'react';
import {TouchableOpacity, Image, StyleSheet} from 'react-native';
import {ThemeContext} from '../services/ThemeProvider';

interface ProfileButtonProps {
  imageUrl: string;
  onPress: () => void;
}

const ProfileButton = ({imageUrl, onPress}: ProfileButtonProps) => {
  const {theme} = useContext(ThemeContext);
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {imageUrl ? (
        <Image source={{uri: imageUrl}} style={styles.image} />
      ) : (
        <View
          style={[
            styles.image,
            {backgroundColor: theme.profileButton.background},
          ]}
        />
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
});

export default ProfileButton;

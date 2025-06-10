import React, {useContext, useState} from 'react';
import {StyleSheet, View, Dimensions, TouchableOpacity} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import {PanGestureHandler} from 'react-native-gesture-handler';
import {Trash} from 'lucide-react-native';
import {ThemeContext} from '../../../services/ThemeProvider';
import RenderProduct from './RenderProducts';
import {IProductDTO} from '../../../models/types/product';

const SwipeToDeleteItem = ({
  item,
  onPressTrash,
  onDismiss,
}: {
  item: IProductDTO;
  onPressTrash: (onConfirm: () => void) => void;
  onDismiss: () => void;
}) => {
  const {theme} = useContext(ThemeContext);
  const opacity = useSharedValue(1);
  const opacityTrash = useSharedValue(1);
  const height = useSharedValue(1);
  const width = useSharedValue(Dimensions.get('screen').width - 42);
  const [isTouched, setIsTouched] = useState(false);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    height: height.value === 0 ? 0 : undefined,
    width: width.value,
  }));

  const animatedStyleTrash = useAnimatedStyle(() => ({
    opacity: opacityTrash.value,
    height: height.value === 0 ? 0 : undefined,
  }));

  const handleTrashPress = () => {
    runOnJS(onPressTrash)(handleConfirmDelete);
  };

  const handleConfirmDelete = () => {
    opacityTrash.value = withTiming(0, {duration: 150});
    opacity.value = withTiming(0, {duration: 300});
    height.value = withTiming(0, {duration: 300}, () => {
      runOnJS(onDismiss)();
    });
  };

  const handleOnPressItem = () => {
    if (!item.default) {
      if (!isTouched) {
        width.value = withTiming(Dimensions.get('screen').width - 94, {
          duration: 300,
        });
        setIsTouched(true);
      } else {
        width.value = withTiming(Dimensions.get('screen').width - 42, {
          duration: 300,
        });
        setIsTouched(false);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.trashBackground, animatedStyleTrash]}>
        <TouchableOpacity onPress={handleTrashPress}>
          <Trash color="white" size={24} />
        </TouchableOpacity>
      </Animated.View>
      <PanGestureHandler activeOffsetX={[-10, 10]} failOffsetY={[-5, 5]}>
        <Animated.View
          style={[
            styles.item,
            {backgroundColor: theme.products.renderProduct.background},
            animatedStyle,
          ]}>
          <RenderProduct
            item={item}
            isSelected={false}
            onPress={handleOnPressItem}
          />
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 1,
    marginTop: 2,
    marginBottom: 5,
  },
  trashBackground: {
    backgroundColor: 'red',
    position: 'absolute',
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    paddingTop: 14,
    paddingBottom: 13,
    borderTopRightRadius: 13,
    borderBottomRightRadius: 13,
  },
  item: {
    backgroundColor: 'red',
    padding: 16,
    borderRadius: 12,
    elevation: 1,
  },
  text: {
    fontSize: 16,
    color: '#000',
  },
});

export default SwipeToDeleteItem;

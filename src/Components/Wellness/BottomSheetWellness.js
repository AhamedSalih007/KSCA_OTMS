import React, {useCallback, useEffect} from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {HEIGHT, WIDTH} from '../../Constant/Dimensions';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
  withTiming,
} from 'react-native-reanimated';
import {bgColor} from '../../Constant/Fonts&Colors';
import MoreCard from '../More/MoreCard';

const SCREEN_HEIGHT = HEIGHT;
const BOTTOM_SHEET_HEIGHT = HEIGHT / 2.5;

const BottomSheetWellness = ({isOpen, closeSheet}) => {
  const translateY = useSharedValue(SCREEN_HEIGHT);

  const quickActions = [
    {
      id: 1,
      name: 'Log Daily Wellness',
      image: require('../../Assets/Images/pulse.png'),
    },
    {
      id: 2,
      name: 'Add Meal Entry',
      image: require('../../Assets/Images/meal.png'),
    },
  ];

  useEffect(() => {
    if (isOpen) {
      translateY.value = withTiming(SCREEN_HEIGHT - BOTTOM_SHEET_HEIGHT, {
        duration: 400,
      });
    } else {
      translateY.value = withSpring(SCREEN_HEIGHT);
    }
  }, [isOpen]);

  const closeSheetHandle = useCallback(() => {
    translateY.value = withSpring(SCREEN_HEIGHT);
    closeSheet();
  }, []);

  // Animated style for bottom sheet
  const sheetStyle = useAnimatedStyle(() => ({
    transform: [{translateY: translateY.value}],
  }));

  // Dim background
  const overlayStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateY.value,
      [SCREEN_HEIGHT - BOTTOM_SHEET_HEIGHT, SCREEN_HEIGHT],
      [0.5, 0],
    );
    return {opacity};
  });

  const renderItem = useCallback((item, index) => {
    return (
      <MoreCard
        colorBg={bgColor.coloured}
        colorIcon={bgColor.white}
        name={item.name}
        image={item.image}
        isBottomSheet={true}
      />
    );
  }, []);

  return (
    <View style={{position: 'absolute', width: WIDTH, height: HEIGHT}}>
      <Pressable style={StyleSheet.absoluteFill} onPress={closeSheetHandle}>
        <Animated.View style={[styles.overlay, overlayStyle]} />
      </Pressable>

      <Animated.View style={[styles.bottomSheet, sheetStyle]}>
        <View style={styles.line} />
        <Text style={styles.title}>Quick Actions</Text>

        <FlatList
          data={quickActions}
          renderItem={({item, index}) => renderItem(item, index)}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6FA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {backgroundColor: '#007AFF', padding: 16, borderRadius: 12},
  buttonText: {color: '#fff', fontWeight: '600'},
  bottomSheet: {
    height: BOTTOM_SHEET_HEIGHT,
    width: '100%',
    backgroundColor: bgColor.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
  },
  line: {
    width: 50,
    height: 5,
    backgroundColor: '#ccc',
    borderRadius: 3,
    alignSelf: 'center',
    marginBottom: 10,
  },
  overlay: {
    backgroundColor: 'black',
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  actionButton: {
    backgroundColor: '#E6F2F7',
    padding: 26,
    borderRadius: 12,
    marginBottom: 10,
  },
});

export default BottomSheetWellness;

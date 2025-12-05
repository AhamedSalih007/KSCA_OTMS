// 🔹 AnimatedSearchBar.js

import React, {useState, forwardRef, useImperativeHandle, useRef} from 'react';
import {TextInput, Pressable, Image, StyleSheet} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';

import {WIDTH, HT, WD} from '../../Constant/Dimensions';
import {bgColor} from '../../Constant/Fonts&Colors';

const AnimatedSearchBar = forwardRef(({onChangeText, openState}, ref) => {
  const searchRef = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const translateX = useSharedValue(WIDTH);

  const toggle = () => {
    setIsOpen(current => {
      const nextState = !current;

      openState(nextState);

      translateX.value = withTiming(nextState ? 0 : WIDTH, {
        duration: 300,
        easing: Easing.out(Easing.ease),
      });

      return nextState;
    });
  };

  // 🔹 Allow parent to control open/close if needed
  useImperativeHandle(ref, () => ({
    open: () => toggle(),
    close: () => toggle(),
    clearSearch: () => searchRef.current?.clear(),
  }));

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{translateX: translateX.value}],
  }));

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <Pressable onPress={toggle} style={styles.iconContainer}>
        <Image
          resizeMode="contain"
          style={[styles.icon, {transform: [{rotate: '90deg'}]}]}
          source={require('../../Assets/Images/down-arrow.png')}
        />
      </Pressable>

      <TextInput
        ref={searchRef}
        style={styles.input}
        placeholder="Search Player"
        placeholderTextColor="#777"
        onChangeText={text => onChangeText?.(text)}
      />
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  container: {
    width: WIDTH,
    height: HT(7),
    position: 'absolute',
    top: HT(2),
    zIndex: 100,
    backgroundColor: bgColor.white,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: WD(2),
  },
  iconContainer: {
    width: '10%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: '70%',
    height: '70%',
    tintColor: bgColor.black,
    opacity: 0.8,
  },
  input: {
    width: '85%',
    height: '80%',
    backgroundColor: bgColor.text_secondary,
    paddingHorizontal: WD(2),
    borderRadius: WD(2),
  },
});

export default AnimatedSearchBar;

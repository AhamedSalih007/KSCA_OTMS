import React, {useEffect, useState} from 'react';
import {FlatList, Image, Pressable, View} from 'react-native';
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {HT, WD} from '../../Constant/Dimensions';
import {bgColor} from '../../Constant/Fonts&Colors';

const ColorListView = ({selectedColor, onPress, fullScreen}) => {
  const [isVisible, setIsVisible] = useState(false);

  const animValue = useSharedValue(0);

  // precompute constants outside worklet
  const slideDistance = HT(20);

  useEffect(() => {
    toggleColors();
  }, []);

  const toggleColors = () => {
    const show = !isVisible;
    setIsVisible(show);
    // animate when toggled (not inside worklet)
    animValue.value = withTiming(show ? 1 : 0, {duration: 500});
  };

  // Map animValue -> style
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: animValue.value,
    transform: [
      {
        translateY: (1 - animValue.value) * slideDistance,
      },
    ],
  }));

  const colors = [
    {id: 1, color: 'red'},
    {id: 2, color: 'green'},
    {id: 3, color: 'yellow'},
    {id: 4, color: 'blue'},
    {id: 5, color: 'eraser', image: require('../../Assets/Paint/eraser.png')},
  ];

  const renderColors = (item, index) => {
    return (
      <>
        {item.id != 5 ? (
          <Pressable
            key={item.id}
            onPress={() => onPress(item.color)}
            style={{
              width: WD(7),
              height: WD(7),
              backgroundColor: item.color,
              borderRadius: WD(7) / 2,
              alignSelf: 'center',
              marginTop: HT(1.2),
              borderWidth: selectedColor == item.color ? 3 : 0,
              borderColor: bgColor.white,
            }}
          />
        ) : (
          <Pressable
            key={item.id}
            onPress={() => onPress(item.color)}
            style={{
              width: WD(7),
              height: WD(7),
              borderRadius: WD(7) / 2,
              alignSelf: 'center',
              marginTop: HT(1.2),
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor:
                selectedColor == item.color ? bgColor.coloured : 'transparent',
            }}>
            <Image
              style={{width: '80%', height: '80%', tintColor: bgColor.white}}
              source={item.image}
            />
          </Pressable>
        )}
      </>
    );
  };

  return (
    <View
      style={{
        width: WD(11),
        height: HT(28),
        position: 'absolute',
        bottom: HT(5),
        left: !fullScreen ? WD(3) : WD(14),
        borderRadius: WD(5.5),
        overflow: 'hidden',
        alignItems: 'center',
        // backgroundColor: 'red',
      }}>
      <Animated.View
        style={[
          {
            width: '100%',
            height: '100%',
            position: 'absolute',
          },
          animatedStyle,
        ]}>
        <View
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            backgroundColor: bgColor.black,
            opacity: 0.6,
          }}
        />

        <FlatList
          data={colors}
          keyExtractor={item => item.id.toString()}
          renderItem={({item, index}) => renderColors(item, index)}
        />
      </Animated.View>

      <Pressable
        style={{
          width: '100%',
          height: '20%',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          bottom: 0,
        }}
        onPress={toggleColors}>
        <View
          style={{
            width: WD(10),
            height: WD(10),
            position: 'absolute',
            backgroundColor: bgColor.black,
            opacity: 0.6,
            borderRadius: WD(10) / 2,
          }}
        />

        {!isVisible ? (
          <Image
            resizeMode="contain"
            style={{
              width: WD(7),
              height: WD(7),
              tintColor: bgColor.white,
              // bottom: 0,
              // position: 'absolute',
            }}
            source={require('../../Assets/Paint/art.png')}
          />
        ) : (
          <Image
            resizeMode="contain"
            style={{
              width: WD(7),
              height: WD(7),
              tintColor: bgColor.white,
              // bottom: 0,
              // position: 'absolute',
            }}
            source={require('../../Assets/Video/cancel.png')}
          />
        )}
      </Pressable>
    </View>
  );
};

export default ColorListView;

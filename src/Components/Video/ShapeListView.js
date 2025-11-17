import React, {useEffect, useState} from 'react';
import {FlatList, Image, Pressable, View} from 'react-native';
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {HT, WD} from '../../Constant/Dimensions';
import {bgColor} from '../../Constant/Fonts&Colors';

const ShapeListView = ({selctedShape, onPress, fullScreen}) => {
  const [isVisible, setIsVisible] = useState(false);
  const animValue = useSharedValue(0);

  const slideDistance = HT(20);

  useEffect(() => {
    setTimeout(() => {
      toggleShapes();
    }, 400);
  }, []);

  const toggleShapes = () => {
    const show = !isVisible;
    setIsVisible(show);
    // animate when toggled (not inside worklet)
    animValue.value = withTiming(show ? 1 : 0, {duration: 500});
  };

  // 🔹 Only map value to visual style (no animation triggers here)
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: animValue.value,
    transform: [
      {
        translateY: (1 - animValue.value) * slideDistance,
      },
    ],
  }));

  const shapes = [
    {id: 1, shape: require('../../Assets/Paint/scribble.png')},
    {id: 6, shape: require('../../Assets/Paint/circle.png')},
    {id: 7, shape: require('../../Assets/Paint/rectangle.png')},
    {id: 2, shape: require('../../Assets/Paint/straight-line.png')},
    {id: 3, shape: require('../../Assets/Paint/right-up.png')},
  ];

  const renderShapes = (item, index) => {
    return (
      <Pressable
        key={item.id}
        onPress={() => onPress(item.id)}
        style={{
          width: WD(7),
          height: WD(7),
          borderRadius: WD(7) / 2,
          alignSelf: 'center',
          marginTop: HT(1.3),
          backgroundColor:
            selctedShape == item.id ? bgColor.coloured : 'transparent',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          resizeMode="contain"
          style={{
            width: WD(6),
            height: WD(6),
            tintColor: bgColor.white,
          }}
          source={item.shape}
        />
      </Pressable>
    );
  };

  return (
    <View
      style={{
        width: WD(11),
        height: HT(28),
        position: 'absolute',
        bottom: HT(5),
        right: !fullScreen ? WD(3) : WD(14),
        borderRadius: WD(5.5),
        overflow: 'hidden',
        alignItems: 'center',
      }}>
      {/* Animated shapes list */}
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
          contentContainerStyle={{
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}
          data={shapes}
          keyExtractor={item => item.id.toString()}
          renderItem={({item, index}) => renderShapes(item, index)}
        />
      </Animated.View>

      <Pressable
        style={{
          width: '100%',
          height: '20%',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          bottom: -HT(0.5),
        }}
        onPress={toggleShapes}>
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
              width: WD(6.5),
              height: WD(6.5),
              tintColor: bgColor.white,
              // bottom: 0,
              // position: 'absolute',
            }}
            source={require('../../Assets/Paint/shapes.png')}
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

export default ShapeListView;

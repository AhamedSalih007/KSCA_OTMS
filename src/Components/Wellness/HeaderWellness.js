import React, {useEffect} from 'react';
import {Image, Pressable, Text, View} from 'react-native';
import {HT, WD} from '../../Constant/Dimensions';
import {bgColor} from '../../Constant/Fonts&Colors';
import moment from 'moment';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
} from 'react-native-reanimated';

const HeaderWellness = ({
  selectedDate,
  isCalendar,
  pressedDate,
  pressedDrawer,
  pressedRightDrawer,
}) => {
  const progress = useSharedValue(1); // 0 = down, 1 = up

  const animatedStyle = useAnimatedStyle(() => {
    const rotation = interpolate(progress.value, [0, 1], [0, 180]);
    return {
      transform: [{rotate: `${rotation}deg`}],
    };
  });

  useEffect(() => {
    progress.value = withTiming(progress.value === 0 ? 1 : 0, {duration: 200});
  }, [isCalendar]);

  return (
    <View
      style={{
        height: HT(7),
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomColor: bgColor.grey,
        borderBottomWidth: 0.2,
        flexDirection: 'row',
        backgroundColor: bgColor.white,
      }}>
      <Pressable
        onPress={() => pressedDrawer()}
        style={{
          width: WD(11),
          height: WD(11),
          backgroundColor: bgColor.coloured,
          borderRadius: WD(11) / 2,
          position: 'absolute',
          left: WD(5),
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{color: bgColor.white, fontWeight: 'bold'}}>VV</Text>
      </Pressable>

      <Pressable
        onPress={() => pressedDate()}
        style={{
          width: '50%',
          height: '80%',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
        }}>
        <Text>{moment(selectedDate).format('LL')}</Text>
        <Animated.Image
          resizeMode="contain"
          style={[
            {
              width: '7%',
              height: '60%',
              tintColor: bgColor.grey,
              left: WD(2),
            },
            animatedStyle,
          ]}
          source={require('../../Assets/Images/down-arrow.png')}
        />
      </Pressable>

      <Pressable
        onPress={pressedRightDrawer}
        style={{
          width: '15%',
          height: '80%',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          right: WD(2),
        }}>
        <Image
          resizeMode="contain"
          style={{
            width: '50%',
            height: '50%',
            alignSelf: 'center',
            // tintColor: bgColor.icons_tertiary,
          }}
          source={require('../../Assets/Images/loudspeaker.png')}
        />
      </Pressable>
    </View>
  );
};

export default HeaderWellness;

import React, {useEffect} from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {HT, WD} from '../../Constant/Dimensions';
import {bgColor, fontSize} from '../../Constant/Fonts&Colors';
import {Image, Text} from 'react-native';

const MessageToast = ({message, isToastHide, toast}) => {
  const translateY = useSharedValue(HT(20));
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (!isToastHide) {
      translateY.value = withTiming(-HT(7), {duration: 600});
      opacity.value = withTiming(1, {duration: 700});

      setTimeout(() => {
        toast();
      }, 2000);
    } else {
      translateY.value = withTiming(HT(20), {duration: 600});
      opacity.value = withTiming(0, {duration: 300});
    }
  }, [isToastHide]);

  const messageAnimStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{translateY: translateY.value}],
    };
  });

  return (
    <Animated.View
      style={[
        {
          width: WD(80),
          height: HT(7),
          backgroundColor: bgColor.white,
          borderRadius: WD(2),
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          bottom: 30,
          alignSelf: 'center',
          shadowColor: bgColor.grey,
          shadowOffset: {width: 0.5, height: 0.5},
          shadowOpacity: 0.5,
        },
        messageAnimStyle,
      ]}>
      <Image
        resizeMode="contain"
        style={{
          width: '10%',
          height: '90%',
          tintColor: bgColor.coloured,
          position: 'absolute',
          left: WD(3),
        }}
        source={require('../../Assets/Images/message.png')}
      />

      <Text style={{color: bgColor.black, fontSize: fontSize.Medium}}>
        {message}
      </Text>
    </Animated.View>
  );
};

export default MessageToast;

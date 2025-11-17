import React from 'react';
import {Image, Pressable, Text} from 'react-native';
import {bgColor, fontSize} from '../../Constant/Fonts&Colors';
import {HT, WD} from '../../Constant/Dimensions';

const ButtonImage = ({
  width,
  height,
  br,
  bg,
  text,
  image,
  pressedButton,
  right,
}) => {
  return (
    <Pressable
      onPress={pressedButton}
      style={{
        width,
        height,
        borderRadius: br,
        backgroundColor: bg,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        position: 'absolute',
        bottom: HT(6),
        right,
      }}>
      <Text
        style={{
          color: bgColor.white,
          fontSize: fontSize.Medium,
          right: WD(1),
          fontWeight: 'bold',
        }}>
        {text}
      </Text>

      <Image
        resizeMode="contain"
        style={{
          width: '20%',
          height: '80%',
          tintColor: bgColor.white,
          left: WD(2),
        }}
        source={image}
      />
    </Pressable>
  );
};

export default ButtonImage;

import React from 'react';
import {Pressable} from 'react-native';
import {HT, WD} from '../../Constant/Dimensions';
import {bgColor} from '../../Constant/Fonts&Colors';
import {Image} from 'react-native';

const FloatingButton = ({pressedFloating}) => {
  return (
    <Pressable
      style={{
        width: WD(14),
        height: WD(14),
        borderRadius: WD(14) / 2,
        backgroundColor: bgColor.coloured,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: HT(5),
        right: WD(5),
      }}
      onPress={() => pressedFloating()}>
      <Image
        resizeMode="contain"
        style={{
          width: '40%',
          height: '40%',
          alignSelf: 'center',
          tintColor: bgColor.tertiaryMain,
        }}
        source={require('../../Assets/Images/plus.png')}
      />
    </Pressable>
  );
};

export default FloatingButton;

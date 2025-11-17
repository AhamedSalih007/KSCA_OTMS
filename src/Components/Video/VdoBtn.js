import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {bgColor, fontSize} from '../../Constant/Fonts&Colors';
import {WD} from '../../Constant/Dimensions';
import {BlurView} from '@react-native-community/blur';

const VdoBtn = ({onPress, image, left, right, top, isMsg, commentsLength}) => {
  return (
    <>
      <Pressable
        onPress={onPress}
        style={{
          width: WD(10),
          height: WD(10),
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          left,
          right,
          top,
          borderRadius: WD(10) / 2,
          overflow: 'hidden',
          borderColor: bgColor.white,
          borderWidth: 1,
        }}>
        <BlurView
          style={{
            ...StyleSheet.absoluteFillObject,
          }}
        />
        <Image
          resizeMode="contain"
          style={{
            width: '60%',
            height: '50%',
            tintColor: bgColor.white,
          }}
          source={image}
        />
      </Pressable>
      {isMsg ? (
        <View
          style={{
            width: WD(4),
            height: WD(4),
            position: 'absolute',
            backgroundColor: bgColor.red,
            borderRadius: WD(4) / 2,
            left,
            right: right - WD(0.9),
            top,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{color: bgColor.white, fontSize: fontSize.Small}}>
            {commentsLength}
          </Text>
        </View>
      ) : null}
    </>
  );
};

export default VdoBtn;

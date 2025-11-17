import React from 'react';
import {Image, View, Text} from 'react-native';
import {WD} from '../../Constant/Dimensions';
import {bgColor, fontSize} from '../../Constant/Fonts&Colors';

const ImgTextView = ({image, text}) => {
  return (
    <View
      style={{
        width: '50%',
        height: '70%',
        flexDirection: 'row',
      }}>
      <Image
        resizeMode="contain"
        style={{
          width: WD(4),
          height: WD(4),
          tintColor: bgColor.grey,
        }}
        source={image}
      />
      <Text
        style={{
          left: WD(2),
          color: bgColor.grey,
          fontSize: fontSize.lightMedium,
        }}>
        {text}
      </Text>
    </View>
  );
};

export default ImgTextView;

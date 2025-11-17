import React from 'react';
import {Pressable, View, Text, TextInput, Image} from 'react-native';
import {HT, WD} from '../../../Constant/Dimensions';
import {bgColor, fontSize} from '../../../Constant/Fonts&Colors';

const NormalInputTag = ({tagName, value, onChangeText}) => {
  return (
    <View
      style={{
        width: '100%',
        height: '17%',
        alignItems: 'flex-start',
        justifyContent: 'space-around',
        top: HT(5),
        paddingHorizontal: WD(3),
      }}>
      <Text
        style={{
          color: bgColor.black,
          fontSize: fontSize.Large,
          fontWeight: 'bold',
        }}>
        {tagName}
      </Text>

      <View
        style={{
          width: '97%',
          height: '50%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}>
        <TextInput
          value={value}
          onChangeText={text => onChangeText(text)}
          style={{
            width: '90%',
            height: '100%',
            borderWidth: 1,
            borderColor: bgColor.icons_tertiary,
            borderRadius: WD(2),
            paddingHorizontal: WD(2),
            color: bgColor.black,
          }}
        />
      </View>
    </View>
  );
};

export default NormalInputTag;

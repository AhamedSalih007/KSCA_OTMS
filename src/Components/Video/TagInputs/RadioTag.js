import React from 'react';
import {Pressable, View, Text} from 'react-native';
import {HT, WD} from '../../../Constant/Dimensions';
import {bgColor, fontSize} from '../../../Constant/Fonts&Colors';

const RadioTag = ({tagName, types, value, onChange}) => {
  //   console.log('v', value);
  return (
    <View
      style={{
        width: '100%',
        height: '12%',
        alignItems: 'flex-start',
        justifyContent: 'space-around',
        top: HT(4),
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
          width: '60%',
          height: '50%',
          flexDirection: 'row',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
        }}>
        {types.map((data, index) => {
          return (
            <Pressable
              onPress={() => onChange(data.name)}
              key={index}
              style={{
                width: '35%',
                height: '100%',
                alignItems: 'center',
                justifyContent: 'flex-start',
                flexDirection: 'row',
              }}>
              <View
                style={{
                  width: WD(5),
                  height: WD(5),
                  borderRadius: WD(5) / 2,
                  borderColor: bgColor.black,
                  borderWidth: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                {value == data.name ? (
                  <View
                    style={{
                      width: WD(2.5),
                      height: WD(2.5),
                      borderRadius: WD(2.5) / 2,
                      backgroundColor: bgColor.coloured,
                    }}
                  />
                ) : null}
              </View>
              <Text style={{left: WD(2), color: bgColor.black}}>
                {data.name}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

export default RadioTag;

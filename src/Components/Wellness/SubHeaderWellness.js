import React from 'react';
import {Pressable, Text, View} from 'react-native';
import {bgColor} from '../../Constant/Fonts&Colors';
import {HT, WD} from '../../Constant/Dimensions';

const SubHeaderWellness = ({id, pressedWellness, isCalendar}) => {
  return (
    <View
      style={{
        height: HT(7),
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        backgroundColor: bgColor.tertiaryMain,
        borderBottomColor: bgColor.grey,
        borderBottomWidth: 0.2,
        borderTopColor: bgColor.grey,
        borderTopWidth: isCalendar ? 0.2 : 0,
      }}>
      <Pressable
        onPress={() => pressedWellness(1)}
        style={{
          width: '30%',
          height: '70%',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: id == 1 ? bgColor.coloured : bgColor.secondaryMain,
          borderRadius: WD(30) / 2,
          left: WD(4),
        }}>
        <Text style={{color: id == 1 ? bgColor.white : bgColor.coloured}}>
          Today
        </Text>
      </Pressable>

      <Pressable
        onPress={() => pressedWellness(2)}
        style={{
          width: '30%',
          height: '70%',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: id == 2 ? bgColor.coloured : bgColor.secondaryMain,
          borderRadius: WD(30) / 2,
          left: WD(6),
        }}>
        <Text style={{color: id == 2 ? bgColor.white : bgColor.coloured}}>
          Tomorrow
        </Text>
      </Pressable>
    </View>
  );
};

export default SubHeaderWellness;

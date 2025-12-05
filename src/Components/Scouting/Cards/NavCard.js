import React from 'react';
import {bgColor, fontSize} from '../../../Constant/Fonts&Colors';
import {HT, WD} from '../../../Constant/Dimensions';
import {Pressable, Text, View} from 'react-native';

const NavCard = ({status, onPressStatus, teamA, teamB}) => {
  return (
    <View
      style={{
        width: WD(90),
        height: HT(6),
        backgroundColor: bgColor.white,
        borderRadius: WD(1),
        // overflow: 'hidden',
        flexDirection: 'row',
        elevation: 2,
        shadowColor: bgColor.grey,
        shadowOffset: {width: 0.5, height: 0.5},
        shadowOpacity: 0.4,
        alignSelf: 'center',
        top: HT(2),
      }}>
      <Pressable
        onPress={() => onPressStatus(1)}
        style={{
          width: '50%',
          height: '100%',
          backgroundColor: status == 1 ? bgColor.coloured : bgColor.white,
          alignItems: 'center',
          justifyContent: 'center',
          borderTopLeftRadius: WD(1),
          borderBottomLeftRadius: WD(1),
        }}>
        <Text
          style={{
            color: status == 1 ? bgColor.white : bgColor.black,
            fontSize: fontSize.lightMedium,
            fontWeight: '500',
            textAlign: 'right',
          }}>
          {teamA}
        </Text>
      </Pressable>
      <Pressable
        onPress={() => onPressStatus(2)}
        style={{
          width: '50%',
          height: '100%',
          backgroundColor: status == 2 ? bgColor.coloured : bgColor.white,
          alignItems: 'center',
          justifyContent: 'center',
          borderTopRightRadius: WD(1),
          borderBottomRightRadius: WD(1),
          // padding: WD(1),
        }}>
        <Text
          style={{
            color: status == 2 ? bgColor.white : bgColor.black,
            fontSize: fontSize.lightMedium,
            fontWeight: '500',
            textAlign: 'right',
            width: '90%',
          }}>
          {teamB}
        </Text>
      </Pressable>
    </View>
  );
};

export default NavCard;

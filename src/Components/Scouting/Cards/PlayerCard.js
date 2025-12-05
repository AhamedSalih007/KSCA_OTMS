import React from 'react';
import {Image, Platform, Pressable, Text, View} from 'react-native';
import {HT, WD} from '../../../Constant/Dimensions';
import {bgColor, fontSize} from '../../../Constant/Fonts&Colors';

const PlayerCard = ({item, onPress, selectedIds}) => {
  return (
    <Pressable
      onPress={() => onPress(item)}
      style={{
        width: WD(90),
        height: HT(7),
        backgroundColor: bgColor.white,
        shadowColor: bgColor.grey,
        shadowOffset: {width: 0.5, height: 0.5},
        shadowOpacity: 0.2,
        alignSelf: 'center',
        top: HT(2),
        marginTop: HT(1),
        borderRadius: WD(1),
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        borderWidth: selectedIds.includes(item.UID) ? 1 : 0,
        borderColor: bgColor.coloured,
      }}>
      <Image
        resizeMode="contain"
        style={{width: '10%', height: '90%'}}
        source={require('../../../Assets/Images/player.png')}
      />
      <View
        style={{
          width: '80%',
          height: '100%',
          alignItems: 'flex-start',
          justifyContent: 'center',
          left: WD(4),
        }}>
        <Text
          style={{
            color: bgColor.black,
            bottom: HT(0.25),
            fontSize: fontSize.Large_50,
            fontWeight: '600',
          }}>
          {item.Playername}
        </Text>
        {/* <Text style={{color: bgColor.black, top: HT(0.25)}}>RHB . Captian</Text> */}
      </View>

      {selectedIds.includes(item.UID) ? (
        <View
          style={{
            width: Platform.isPad ? WD(6) : WD(8),
            height: Platform.isPad ? WD(6) : WD(8),
            backgroundColor: bgColor.coloured,
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            right: WD(4),
            borderRadius: Platform.isPad ? WD(6) : WD(8) / 2,
          }}>
          <Image
            resizeMode="contain"
            style={{width: '60%', height: '90%', tintColor: bgColor.white}}
            source={require('../../../Assets/Images/check.png')}
          />
        </View>
      ) : null}
    </Pressable>
  );
};

export default PlayerCard;

import React from 'react';
import {Image, Pressable, Text, View} from 'react-native';
import {HT, WD} from '../../Constant/Dimensions';
import {bgColor, fontSize} from '../../Constant/Fonts&Colors';

const MoreCard = ({
  colorBg,
  colorIcon,
  image,
  name,
  isBottomSheet,
  pressedMoreCard,
}) => {
  return (
    <Pressable
      onPress={pressedMoreCard}
      style={{
        width: WD(90),
        height: HT(9),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: isBottomSheet ? '#E0F2F6' : bgColor.white,
        shadowColor: bgColor.grey,
        shadowOffset: {width: 0.5, height: 0.5},
        shadowOpacity: isBottomSheet ? 0 : 0.2,
        alignSelf: 'center',
        marginTop: 10,
        borderRadius: WD(4),
        flexDirection: 'row',
        elevation: 2,
      }}>
      <View
        style={{
          width: WD(11),
          height: HT(5.5),

          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: colorBg,
          borderRadius: WD(3),
          position: 'absolute',
          left: WD(5),
        }}>
        <Image
          resizeMode="contain"
          style={{
            width: '70%',
            height: '60%',
            tintColor: colorIcon,
          }}
          source={image}
        />
      </View>
      <Text
        style={{
          color: bgColor.black,
          fontSize: fontSize.Large_50,
          position: 'absolute',
          left: WD(20),
        }}>
        {name}
      </Text>

      <Image
        resizeMode="contain"
        style={{
          width: '10%',
          height: '20%',
          tintColor: bgColor.grey,
          position: 'absolute',
          right: WD(5),
          transform: [{rotate: '-90deg'}],
        }}
        source={require('../../Assets/Images/down-arrow.png')}
      />
    </Pressable>
  );
};

export default MoreCard;

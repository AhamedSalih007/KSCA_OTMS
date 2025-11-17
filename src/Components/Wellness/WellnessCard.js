import React from 'react';
import {Image, Pressable, Text, View} from 'react-native';
import {HT, WD} from '../../Constant/Dimensions';
import {bgColor, fontSize} from '../../Constant/Fonts&Colors';

const WellnessCard = ({isFullWidth, item, index, pressedWellnessCard}) => {
  //   console.log('ite', isFullWidth);
  return (
    <Pressable
      onPress={() => pressedWellnessCard(item, index)}
      style={{
        width: isFullWidth ? WD(90) : WD(43),
        height: isFullWidth ? HT(10) : HT(18),
        backgroundColor: bgColor.white,
        borderWidth: 0.2,
        borderColor: bgColor.grey,
        borderRadius: WD(2),
        marginTop: HT(2),
        marginLeft: HT(1),
        marginRight: HT(1),
        alignItems: 'center',
        justifyContent: isFullWidth ? 'center' : 'space-around',
        flexDirection: isFullWidth ? 'row' : 'column',
        paddingVertical: HT(1.2),
      }}>
      {!isFullWidth ? (
        <>
          <View
            style={{
              width: '25%',
              height: '32%',
              backgroundColor: item.colorBg,
              borderRadius: WD(2),
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
            }}>
            <Image
              resizeMode="contain"
              style={{width: '60%', height: '70%', tintColor: item.iconColor}}
              source={item.image}
            />
          </View>

          <Text
            style={{
              fontSize: fontSize.Medium - 1,
              fontWeight: 'bold',
              textAlign: 'center',
              width: '80%',
            }}>
            {item.name}
          </Text>
          <Text
            style={{
              fontSize: fontSize.lightMedium,
              textAlign: 'center',
              width: '80%',
              color: bgColor.grey,
            }}>
            {item.text1}
          </Text>
        </>
      ) : (
        <>
          <View
            style={{
              width: '12%',
              height: '65%',
              backgroundColor: item.colorBg,
              borderRadius: WD(2),
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
            }}>
            <Image
              resizeMode="contain"
              style={{width: '60%', height: '70%', tintColor: item.iconColor}}
              source={item.image}
            />
          </View>
          <View style={{width: '5%'}} />
          <View
            style={{
              width: '70%',
              height: '90%',
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
            }}>
            <Text
              style={{
                fontSize: fontSize.Medium - 1,
                fontWeight: 'bold',
                // width: '80%',
                top: HT(0.7),
              }}>
              {item.name}
            </Text>
            <Text
              style={{
                fontSize: fontSize.lightMedium,
                // width: '80%',
                color: bgColor.grey,
                top: HT(1.2),
              }}>
              {item.text1}
            </Text>
          </View>
        </>
      )}
    </Pressable>
  );
};

export default WellnessCard;

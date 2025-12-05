import React from 'react';
import {HT, WD} from '../../Constant/Dimensions';
import {bgColor, fontSize} from '../../Constant/Fonts&Colors';
import {Image, Text, TouchableOpacity, View} from 'react-native';

const CoachHeader = ({header, subHeader, goBack}) => {
  return (
    <View
      style={{
        height: HT(8),
        width: WD(100),
        backgroundColor: bgColor.white,
        flexDirection: 'row',
      }}>
      {/* // back icon */}
      <TouchableOpacity
        onPress={goBack}
        style={{
          width: '18%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          // backgroundColor: 'red',
          borderRadius: WD(5) * 2,
        }}>
        <Image
          style={{
            resizeMode: 'contain',
            width: '45%',
            height: '45%',
            opacity: 0.8,
          }}
          source={require('../../Assets/Images/left.png')}
        />
      </TouchableOpacity>
      {/* // comp name header text  */}
      <View
        style={{
          width: '82%',
          height: '100%',
          justifyContent: 'center',
          gap: 5,
        }}>
        <Text
          style={{
            fontSize: fontSize.Medium,
            fontWeight: '700',
            color: 'black',
          }}>
          {header}
        </Text>
        <Text
          style={{
            color: bgColor.text_tertiary,
            fontWeight: '600',
            fontSize: fontSize.Small,
          }}>
          {subHeader}
        </Text>
      </View>
    </View>
  );
};

export default CoachHeader;

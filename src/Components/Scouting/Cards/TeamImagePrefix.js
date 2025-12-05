import React from 'react';
import {Image, Platform, Text, View} from 'react-native';
import {bgColor, fontSize} from '../../../Constant/Fonts&Colors';
import {WD} from '../../../Constant/Dimensions';

const TeamImagePrefix = ({
  teamImage,
  teamNamePrefix,
  left,
  right,
  flexDirection,
}) => {
  return (
    <View
      style={{
        width: '30%',
        height: '70%',
        flexDirection,
        position: 'absolute',
        left,
        right,
        alignItems: 'center',
      }}>
      <Image
        resizeMode="contain"
        style={{width: '30%', height: '100%', tintColor: bgColor.black}}
        source={require('../../../Assets/Images/shield.png')}
      />
      <Text
        style={{
          color: bgColor.black,
          left: WD(2),
          fontWeight: 'bold',
          fontSize: Platform.isPad ? fontSize.veryverySmall : fontSize.Small,
        }}>
        {teamNamePrefix}
      </Text>
    </View>
  );
};

export default TeamImagePrefix;

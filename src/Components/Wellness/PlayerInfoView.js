import React from 'react';
import {Image, Text, View} from 'react-native';
import {HT, WD, WIDTH} from '../../Constant/Dimensions';
import {
  bgColor,
  darkTheme,
  fontSize,
  lightTheme,
} from '../../Constant/Fonts&Colors';
import {useSelector} from 'react-redux';
import SwitchType from '../FormTypes/SwitchType';

const PlayerInfoView = ({playerName, date, isRestDay, gender}) => {
  const {userData, darkMode} = useSelector(state => state.localdata);
  // console.log('dar', darkMode);

  const theme = darkMode ? darkTheme : lightTheme;

  return (
    <View
      style={{
        width: WIDTH,
        height: HT(6),
        // backgroundColor: bgColor.red,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        // borderBottomColor: bgColor.grey,
        // borderBottomWidth: 1,
        // paddingBottom: 5,
        margin: HT(1),
      }}>
      <View
        style={{
          width: WD(10),
          height: WD(10),
          borderRadius: WD(10) / 2,
          backgroundColor: theme.tertiary,
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          left: WD(3),
        }}>
        <Image
          resizeMode="contain"
          style={{width: '70%', height: '50%', tintColor: bgColor.grey}}
          source={require('../../Assets/Images/user.png')}
        />
      </View>
      <View
        style={{
          width: '50%',
          height: '100%',
          alignItems: 'flex-start',
          justifyContent: 'center',
          position: 'absolute',
          left: WD(15),
        }}>
        <Text
          style={{
            color: theme.textColor,
            fontSize: fontSize.Large_50,
            fontWeight: 'bold',
          }}>
          {playerName}
        </Text>
        <Text
          style={{
            color: theme.textColor,
            fontSize: fontSize.Small,
            opacity: 0.6,
            top: HT(0.3),
          }}>
          {date}
        </Text>
        <Text
          style={{
            color: theme.textColor,
            fontSize: fontSize.Small,
            opacity: 0.6,
            top: HT(0.5),
          }}>
          {gender}
        </Text>
      </View>
    </View>
  );
};

export default PlayerInfoView;

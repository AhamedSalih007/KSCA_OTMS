import React from 'react';
import {Pressable, View, Image, Text, Platform} from 'react-native';
import {HT, WD} from '../../Constant/Dimensions';
import {
  bgColor,
  darkTheme,
  fontSize,
  lightTheme,
} from '../../Constant/Fonts&Colors';
import {useSelector} from 'react-redux';

const MainHeaderView = ({
  screenName,
  pressedDrawer,
  pressedRightDrawer,
  onTapSearch,
}) => {
  const {darkMode, userData} = useSelector(state => state.localdata);
  // console.log('dar', darkMode);

  const theme = darkMode ? darkTheme : lightTheme;

  return (
    <View
      style={{
        height: HT(7),
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomColor: theme.textColor,
        borderBottomWidth: 0.2,
        flexDirection: 'row',
        backgroundColor: theme.viewColor,
      }}>
      <Pressable
        onPress={() => pressedDrawer()}
        style={{
          width: Platform.isPad ? WD(6) : WD(11),
          height: Platform.isPad ? WD(6) : WD(11),
          backgroundColor: theme.primary,
          borderRadius: Platform.isPad ? WD(6) : WD(11) / 2,
          position: 'absolute',
          left: WD(5),
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{color: theme.selectedButtonColor, fontWeight: 'bold'}}>
          {userData?.displayName?.split(' ')[0][0]}
          {userData?.displayName?.split(' ')[1][0]}
        </Text>
      </Pressable>

      <Text
        style={{
          fontSize: fontSize.Large,
          color: theme.textColor,
          fontWeight: 'bold',
        }}>
        {screenName}
      </Text>

      <Pressable
        onPress={pressedRightDrawer}
        style={{
          width: '15%',
          height: '80%',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          right: WD(2),
        }}>
        <View
          style={{
            width: WD(5),
            height: WD(5),
            borderRadius: WD(5) / 2,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: theme.primary,
            right: WD(2),
            top: 0,
            zIndex: 10,
            position: 'absolute',
          }}>
          <Text
            style={{
              color: theme.selectedButtonColor,
              fontSize: fontSize.lightMedium,
            }}>
            3
          </Text>
        </View>
        <Image
          resizeMode="contain"
          style={{
            width: '50%',
            height: '50%',
            alignSelf: 'center',
            tintColor: theme.textColor,
          }}
          source={require('../../Assets/Images/loudspeaker.png')}
        />
      </Pressable>

      <Pressable
        onPress={onTapSearch}
        style={{
          width: '15%',
          height: '80%',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          right: WD(12),
        }}>
        <Image
          resizeMode="contain"
          style={{
            width: '50%',
            height: '50%',
            alignSelf: 'center',
            tintColor: theme.textColor,
            opacity: 0.8,
          }}
          source={require('../../Assets/Images/search.png')}
        />
      </Pressable>
    </View>
  );
};

export default MainHeaderView;

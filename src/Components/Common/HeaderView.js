import React from 'react';
import {Image, Pressable, Text, View} from 'react-native';
import {HT, WD, WIDTH} from '../../Constant/Dimensions';
import {
  bgColor,
  darkTheme,
  fontSize,
  lightTheme,
} from '../../Constant/Fonts&Colors';
import {useSelector} from 'react-redux';

const HeaderView = ({goBack, screenName}) => {
  const {darkMode} = useSelector(state => state.localdata);

  const theme = darkMode ? darkTheme : lightTheme;
  return (
    <View
      style={{
        width: WIDTH,
        height: HT(7),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.primary,
        // borderBottomColor: bgColor.grey,
        // borderBottomWidth: 0.2,
      }}>
      <Pressable
        onPress={goBack}
        style={{
          width: '10%',
          height: '50%',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          left: WD(3),
        }}>
        <Image
          resizeMode="contain"
          style={{
            width: '80%',
            height: '80%',
            transform: [{rotate: '90deg'}],
            // opacity: 0.8,
            tintColor: theme.viewColor,
          }}
          source={require('../../Assets/Images/down-arrow.png')}
        />
      </Pressable>

      <Text
        style={{
          color: theme.viewColor,
          fontSize: fontSize.Medium,
          fontWeight: 'bold',
        }}>
        {screenName}
      </Text>
    </View>
  );
};

export default HeaderView;

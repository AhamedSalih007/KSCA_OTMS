import React, {useCallback} from 'react';
import {FlatList, Image, Platform, Pressable, Text, View} from 'react-native';
import {HT, WD} from '../../Constant/Dimensions';
import {bgColor, fontSize} from '../../Constant/Fonts&Colors';
import {BlurView} from '@react-native-community/blur';

const TagCard = ({
  width,
  height,
  br,
  right,
  left,
  editImage,
  top,
  metaData,
  thisOnly,
  onPress,
}) => {
  const BlurOrView = Platform.OS === 'ios' ? BlurView : View;
  const renderMetaData = (item, index) => {
    return (
      <View
        style={{
          width: WD(28),
          height: HT(6),
          alignSelf: 'center',
          marginTop: HT(1),
          borderRadius: WD(1),
          overflow: 'hidden',
          alignItems: left == null ? 'flex-start' : 'flex-end',
          justifyContent: 'center',
          borderWidth: 0.5,
          borderColor: bgColor.white,
        }}>
        {/* Overlay */}
        {/* <View
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            backgroundColor: bgColor.white,
            opacity: 0.3,
          }}
        /> */}

        <Text
          style={{
            color: bgColor.white,
            fontWeight: 'bold',
            fontSize: fontSize.lightMedium,
            paddingHorizontal: WD(1),
          }}>
          {item.key}
        </Text>
        <Text
          style={{
            color: bgColor.white,
            fontWeight: 'bold',
            fontSize: fontSize.lightMedium_50,
            top: HT(0.2),
            paddingHorizontal: WD(1),
          }}>
          {item.value == null ? '-' : item.value}
        </Text>
      </View>
    );
  };

  return (
    <BlurOrView
      style={{
        width,
        height,
        borderRadius: br,
        editImage,
        position: 'absolute',
        right,
        left,
        top,
        overflow: 'hidden',
        // borderWidth: 1,
        // borderColor: bgColor.white,
      }}>
      {/* Overlay */}
      {Platform.OS == 'android' ? (
        <View
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: bgColor.black,
            alignSelf: 'center',
            position: 'absolute',
            opacity: 0.7,
          }}
        />
      ) : null}

      <Pressable
        onPress={onPress}
        style={{
          width: '20%',
          height: '10%',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          top: HT(0.2),
          right: right == null ? WD(2) : null,
          left: left == null ? WD(2) : null,
          zIndex: 10,
        }}>
        <Image
          resizeMode="contain"
          style={{width: '90%', height: '90%', tintColor: bgColor.white}}
          source={require('../../Assets/Images/edit.png')}
        />
      </Pressable>

      <FlatList
        style={{top: HT(3)}}
        data={metaData}
        renderItem={({item, index}) => renderMetaData(item, index)}
        ListFooterComponent={() => <View style={{height: HT(5)}} />}
      />
    </BlurOrView>
  );
};

export default TagCard;

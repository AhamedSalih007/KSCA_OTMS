import React from 'react';
import {FlatList, Pressable, StyleSheet, Text, View} from 'react-native';
import {HT, WD} from '../../Constant/Dimensions';
import {bgColor, fontSize} from '../../Constant/Fonts&Colors';
import {BlurView} from '@react-native-community/blur';

// const pad = (n, width = 3) => String(n).padStart(width, '0');

const VideoListTop = ({videos, currentVdoId, pressedVideoTop, fullScreen}) => {
  const renderVideos = (item, index) => {
    return (
      <Pressable
        onPress={() => pressedVideoTop(index)}
        style={{
          width: WD(18),
          height: HT(6),
          backgroundColor:
            currentVdoId == index ? bgColor.coloured : 'transparent',
          marginHorizontal: WD(1),
          borderRadius: WD(2),
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          borderColor: currentVdoId == index ? bgColor.white : bgColor.grey,
          borderWidth: 1,
        }}>
        {currentVdoId != index ? (
          <BlurView
            style={{
              ...StyleSheet.absoluteFillObject,
            }}
            blurType="dark"
            blurAmount={15}
          />
        ) : null}

        {/* {currentVdoId != index ? (
          <View
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: bgColor.black,
              opacity: 0.5,
              position: 'absolute',
            }}
          />
        ) : null} */}
        <Text style={{color: bgColor.white, fontSize: fontSize.Medium}}>
          {`V ${index + 1}`}
        </Text>
      </Pressable>
    );
  };

  return (
    <FlatList
      style={{
        width: 'auto',
        height: HT(10),
        position: 'absolute',
        top: fullScreen ? HT(2) : HT(1.5),
        left: fullScreen ? WD(25) : WD(13),
      }}
      showsHorizontalScrollIndicator={false}
      horizontal
      data={videos}
      renderItem={({item, index}) => renderVideos(item, index)}
      ListFooterComponent={() => <View style={{width: WD(20)}} />}
    />
  );
};

export default VideoListTop;

import React, {useEffect, useRef} from 'react';
import {FlatList, Pressable, StyleSheet, Text, View} from 'react-native';
import {HT, WD} from '../../Constant/Dimensions';
import {bgColor, fontSize} from '../../Constant/Fonts&Colors';
import {BlurView} from '@react-native-community/blur';

const FramesList = ({frames, currentFrameId, pressedFrame, fullScreen}) => {
  const refScroll = useRef(null);

  useEffect(() => {
    if (refScroll.current && frames.length > 0) {
      setTimeout(() => {
        scrollToEndWithExtra();
      }, 50);
    }
  }, [frames]);

  const scrollToEndWithExtra = () => {
    if (!refScroll.current || frames.length === 0) return;

    const itemWidth = WD(20);
    const totalWidth = frames.length * itemWidth;

    refScroll.current.scrollToOffset({
      offset: totalWidth,
      animated: true,
    });
  };

  const renderFrames = (item, index) => {
    return (
      <Pressable
        onPress={() => pressedFrame(item, index)}
        style={{
          width: WD(18),
          height: HT(6),
          backgroundColor:
            currentFrameId == index ? bgColor.coloured : 'transparent',
          marginHorizontal: WD(1),
          borderRadius: WD(2),
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          borderColor: currentFrameId == index ? bgColor.white : bgColor.grey,
          borderWidth: 1,
        }}>
        {currentFrameId != index ? (
          <BlurView
            style={{
              ...StyleSheet.absoluteFillObject,
            }}
            blurType="dark"
            blurAmount={15}
          />
        ) : null}

        {/* {currentFrameId != index ? (
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
          {`F ${index + 1}`}
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
      ref={refScroll}
      showsHorizontalScrollIndicator={false}
      horizontal
      data={frames}
      renderItem={({item, index}) => renderFrames(item, index)}
      ListFooterComponent={() => <View style={{width: WD(20)}} />}
    />
  );
};

export default FramesList;

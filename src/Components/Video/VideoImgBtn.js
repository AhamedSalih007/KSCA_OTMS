import React from 'react';
import {Image, Pressable} from 'react-native';

const VideoImgBtn = ({
  image,
  onPress,
  color,
  right,
  left,
  imgWidth,
  imgHt,
  transform,
  opacity,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={{
        width: '10%',
        height: '70%',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        left,
        right,
        opacity,
      }}>
      <Image
        resizeMode="contain"
        style={{
          width: imgWidth,
          height: imgHt,
          transform: [{rotate: transform}],
          tintColor: color,
        }}
        source={image}
      />
    </Pressable>
  );
};

export default VideoImgBtn;

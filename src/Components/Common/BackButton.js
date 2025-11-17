import React from 'react';
import {Image, Pressable} from 'react-native';

const BackButton = ({goBack, color}) => {
  return (
    <Pressable
      onPress={goBack}
      style={{
        width: '10%',
        height: '50%',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Image
        resizeMode="contain"
        style={{
          width: '80%',
          height: '80%',
          transform: [{rotate: '90deg'}],
          opacity: 0.8,
          tintColor: color,
        }}
        source={require('../../Assets/Images/down-arrow.png')}
      />
    </Pressable>
  );
};

export default BackButton;

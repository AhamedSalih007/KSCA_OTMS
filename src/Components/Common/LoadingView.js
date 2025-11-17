import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import {bgColor} from '../../Constant/Fonts&Colors';

const LoadingView = () => {
  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
      }}>
      <ActivityIndicator size={'large'} color={bgColor.white} />
    </View>
  );
};

export default LoadingView;

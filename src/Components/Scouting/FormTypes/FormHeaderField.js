import React from 'react';
import {Text, View} from 'react-native';
import {HT} from '../../../Constant/Dimensions';

export default function FormHeaderField({label}) {
  return (
    <View style={{marginVertical: HT(1), paddingHorizontal: HT(0.5)}}>
      <Text style={{fontSize: 24, fontWeight: 'bold'}}>{label}</Text>
    </View>
  );
}

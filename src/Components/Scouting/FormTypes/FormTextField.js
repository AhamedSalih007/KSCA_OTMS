import React from 'react';
import {View, Text, TextInput} from 'react-native';
import {fontSize} from '../../../Constant/Fonts&Colors';
import {HT} from '../../../Constant/Dimensions';

export default function FormTextField({label, value, onChange}) {
  return (
    <View style={{marginVertical: HT(1), paddingHorizontal: HT(0.5)}}>
      <Text style={{fontSize: 16, fontWeight: 'bold'}}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChange}
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 6,
          padding: 10,
          marginTop: 5,
        }}
      />
    </View>
  );
}

import React from 'react';
import {View, Text, TextInput} from 'react-native';
import {HT} from '../../../Constant/Dimensions';

export default function FormTextAreaField({label, value, onChange}) {
  return (
    <View style={{marginVertical: HT(1), paddingHorizontal: HT(0.5)}}>
      <Text style={{fontSize: 16, fontWeight: 'bold'}}>{label}</Text>

      <TextInput
        value={value}
        onChangeText={onChange}
        multiline
        numberOfLines={4}
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 6,
          padding: 10,
          marginTop: 5,
          textAlignVertical: 'top',
        }}
      />
    </View>
  );
}

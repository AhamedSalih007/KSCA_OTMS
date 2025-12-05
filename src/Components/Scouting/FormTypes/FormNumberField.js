import React from 'react';
import {View, Text, TextInput} from 'react-native';
import {HT} from '../../../Constant/Dimensions';

export default function FormNumberField({label, value, onChange}) {
  return (
    <View style={{marginVertical: HT(1), paddingHorizontal: HT(0.5)}}>
      <Text style={{fontSize: 16, marginBottom: 6, fontWeight: 'bold'}}>
        {label}
      </Text>

      <TextInput
        value={value?.toString() ?? ''}
        onChangeText={text => {
          // Only allow digits
          const num = text.replace(/[^0-9]/g, '');
          onChange(num);
        }}
        keyboardType="numeric"
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 6,
          paddingHorizontal: 10,
          height: 48,
          fontSize: 16,
        }}
      />
    </View>
  );
}

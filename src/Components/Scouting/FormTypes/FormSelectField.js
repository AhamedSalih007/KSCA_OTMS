import React from 'react';
import {View, Text} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {HT} from '../../../Constant/Dimensions';

export default function FormSelectField({label, options, value, onChange}) {
  const data = options?.map(opt => ({
    label: opt.label,
    value: opt.value,
  }));

  return (
    <View style={{marginVertical: HT(1), paddingHorizontal: HT(0.5)}}>
      <Text style={{fontSize: 16, marginBottom: 6, fontWeight: 'bold'}}>
        {label}
      </Text>

      <Dropdown
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 6,
          paddingHorizontal: 10,
          height: 48,
        }}
        placeholderStyle={{color: '#999'}}
        selectedTextStyle={{fontSize: 16}}
        data={data}
        labelField="label"
        valueField="value"
        placeholder="Select"
        value={value}
        onChange={item => onChange(item.value)}
      />
    </View>
  );
}

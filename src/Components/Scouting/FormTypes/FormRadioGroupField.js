import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {HT, WD} from '../../../Constant/Dimensions';
import {bgColor} from '../../../Constant/Fonts&Colors';

export default function FormRadioGroupField({label, options, value, onChange}) {
  return (
    <View style={{marginVertical: HT(1), paddingHorizontal: HT(0.5)}}>
      <Text style={{fontSize: 16, fontWeight: 'bold', marginBottom: 8}}>
        {label}
      </Text>

      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          columnGap: WD(1),
          rowGap: 12,
          alignItems: 'center',
        }}>
        {options.map((item, index) => (
          <TouchableOpacity
            key={item.value}
            onPress={() => onChange(index)}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginRight: 20,
            }}>
            <View
              style={{
                height: 20,
                width: 20,
                borderRadius: 10,
                borderWidth: 2,
                borderColor: '#333',
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 8,
              }}>
              {value === index && (
                <View
                  style={{
                    height: 12,
                    width: 12,
                    borderRadius: 6,
                    backgroundColor: bgColor.coloured, // your color
                  }}
                />
              )}
            </View>

            <Text style={{fontSize: 15}}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

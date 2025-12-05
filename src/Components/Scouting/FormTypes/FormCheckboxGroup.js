import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {HT} from '../../../Constant/Dimensions';
import {bgColor} from '../../../Constant/Fonts&Colors';

export default function FormCheckboxGroup({label, options, value, onChange}) {
  const handleToggle = val => {
    let updated = [];

    if (value?.includes(val)) {
      updated = value.filter(v => v !== val);
    } else {
      updated = [...value, val];
    }

    onChange(updated);
  };

  return (
    <View style={{marginVertical: HT(0.5), paddingHorizontal: HT(0.5)}}>
      <Text style={{fontSize: 16, fontWeight: 'bold', marginBottom: 8}}>
        {label}
      </Text>

      {/* WRAPPED CHECKBOX CONTAINER */}
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          columnGap: 20,
          rowGap: 12,
          alignItems: 'center',
        }}>
        {options.map(item => {
          const isChecked = value?.includes(item.value);

          return (
            <TouchableOpacity
              key={item.value}
              onPress={() => handleToggle(item.value)}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginRight: 20,
              }}>
              {/* Checkbox Box */}
              <View
                style={{
                  height: 22,
                  width: 22,
                  borderRadius: 4,
                  borderWidth: 1.5,
                  borderColor: bgColor.black,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: 8,
                  backgroundColor: isChecked ? bgColor.coloured : '#fff',
                }}>
                {isChecked && (
                  <Image
                    style={{
                      width: 16,
                      height: 16,
                      tintColor: bgColor.white,
                    }}
                    source={require('../../../Assets/Images/check.png')}
                  />
                )}
              </View>

              <Text style={{fontSize: 16}}>{item.label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

import React from 'react';
import {Text, TextInput, View} from 'react-native';
import {HT, WD} from '../../Constant/Dimensions';
import {bgColor, fontSize} from '../../Constant/Fonts&Colors';

const NormalType = ({label, value, onChangeValue}) => {
  return (
    <View
      style={{
        width: WD(90),
        height: 'auto',
        padding: HT(1),
        alignSelf: 'center',
        backgroundColor: bgColor.white,
        borderRadius: WD(1),
        shadowColor: bgColor.grey,
        shadowOffset: {width: 0.5, height: 0.5},
        shadowOpacity: 0.5,
        elevation: 2,
        marginBottom: HT(1),
      }}>
      <Text
        style={{
          color: bgColor.black,
          fontSize: fontSize.Medium,
          fontWeight: 'bold',
          marginBottom: HT(0.5),
        }}>
        {label}
      </Text>

      {label != 'Date' && label != 'User' ? (
        <TextInput
          style={{
            width: '100%',
            height: HT(6),
            // backgroundColor: bgColor.white,
            borderWidth: 1,
            borderColor: bgColor.grey,
            paddingHorizontal: WD(1),
            borderRadius: WD(1),
            marginTop: HT(0.5),
          }}
          value={value}
          onChangeText={text => onChangeValue(text)}
        />
      ) : (
        <View
          style={{
            width: '100%',
            height: HT(6),
            backgroundColor: bgColor.greyLight,
            borderWidth: 1,
            borderColor: bgColor.grey,
            borderRadius: WD(1),
            marginTop: HT(0.5),
            alignItems: 'center',
            justifyContent: 'center',
            opacity: 0.7,
          }}>
          <Text
            style={{
              color: bgColor.black,
              fontSize: fontSize.Large,
              position: 'absolute',
              left: WD(2),
            }}>
            {value}
          </Text>
        </View>
      )}
    </View>
  );
};

export default NormalType;

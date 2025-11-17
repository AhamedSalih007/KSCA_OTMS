import React from 'react';
import {FlatList, Image, Pressable, Text, TextInput, View} from 'react-native';
import {HT, WD} from '../../Constant/Dimensions';
import {bgColor, fontSize} from '../../Constant/Fonts&Colors';

const RadioType = ({label, value, fields, onRadioBtnPress, userData, item}) => {
  const renderFields = (item, index) => {
    return (
      <Pressable
        onPress={
          label == 'Gender'
            ? null
            : () => onRadioBtnPress(item, index, item.label)
        }
        style={{
          width: 'auto',
          height: 'auto',
          flexDirection: 'row',
          marginTop: HT(0.5),
          opacity: label == 'Gender' ? 0.5 : 1,
        }}>
        <View
          style={{
            width: WD(5),
            height: WD(5),
            borderRadius: WD(5) / 2,
            backgroundColor: bgColor.white,
            borderColor: bgColor.grey,
            borderWidth: 0.2,
            marginRight: HT(0.8),
            marginBottom: HT(0.8),
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {label != 'Gender' ? (
            <>
              {value == item?.label ? (
                <View
                  style={{
                    width: WD(2.5),
                    height: WD(2.5),
                    borderRadius: WD(2.5) / 2,
                    backgroundColor: bgColor.coloured,
                  }}
                />
              ) : null}
            </>
          ) : (
            <>
              {item.id == userData.gender ? (
                <View
                  style={{
                    width: WD(2.5),
                    height: WD(2.5),
                    borderRadius: WD(2.5) / 2,
                    backgroundColor: bgColor.coloured,
                  }}
                />
              ) : null}
            </>
          )}
        </View>

        <Text>{item?.label}</Text>
      </Pressable>
    );
  };

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
          marginBottom: HT(0.8),
        }}>
        {label}
      </Text>

      <View style={{flexDirection: 'row'}}>
        <FlatList
          data={fields}
          renderItem={({item, index}) => renderFields(item, index)}
        />

        <Image
          resizeMode="stretch"
          style={{
            width: WD(44),
            height: HT(24),
            position: 'absolute',
            right: 0,
            top: 0,
          }}
          source={item.image}
        />
      </View>
    </View>
  );
};

export default RadioType;

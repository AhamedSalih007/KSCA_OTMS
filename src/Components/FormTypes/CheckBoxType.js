import React from 'react';
import {FlatList, Image, Pressable, Text, TextInput, View} from 'react-native';
import {HT, WD} from '../../Constant/Dimensions';
import {bgColor, fontSize, lightTheme} from '../../Constant/Fonts&Colors';

const CheckBoxType = ({label, fields, onCheckBoxBtnPress}) => {
  const renderFields = (item, index) => {
    return (
      <Pressable
        onPress={() => onCheckBoxBtnPress(item, index)}
        style={{
          width: 'auto',
          height: 'auto',
          flexDirection: 'row',
          marginTop: HT(0.5),
          marginLeft: WD(1.5),
        }}>
        <View
          style={{
            width: WD(40),
            height: HT(5),
            backgroundColor: lightTheme.inputColor,
            borderRadius: WD(1),
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View
            style={{
              width: '15%',
              height: '50%',
              backgroundColor: bgColor.white,
              borderColor: bgColor.grey,
              borderWidth: 0.2,
              alignItems: 'center',
              justifyContent: 'center',
              left: WD(2),
              borderRadius: WD(1),
              overflow: 'hidden',
            }}>
            {item.selected ? (
              <View
                style={{
                  width: '100%',
                  height: '100%',
                  backgroundColor: bgColor.coloured,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Image
                  resizeMode="contain"
                  style={{
                    width: '60%',
                    height: '80%',
                    tintColor: bgColor.white,
                  }}
                  source={require('../../Assets/Images/check.png')}
                />
              </View>
            ) : null}
          </View>

          <Text
            style={{
              color: bgColor.black,
              fontSize: fontSize.lightMedium_50,
              left: WD(4),
              width: '70%',
            }}>
            {item.label}
          </Text>
        </View>
      </Pressable>
    );
  };

  return (
    <View
      style={{
        width: WD(90),
        height: 'auto',
        paddingTop: HT(1.5),
        backgroundColor: bgColor.white,
        alignSelf: 'center',
        shadowColor: bgColor.grey,
        shadowOffset: {width: 0.5, height: 0.5},
        shadowOpacity: 0.5,
        elevation: 2,
        marginBottom: HT(1),
        padding: HT(1),
        borderRadius: WD(1.5),
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

      <FlatList
        // contentContainerStyle={{flexWrap: 'wrap'}}
        numColumns={2}
        data={fields}
        renderItem={({item, index}) => renderFields(item, index)}
      />
    </View>
  );
};

export default CheckBoxType;

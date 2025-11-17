import React from 'react';
import {
  Pressable,
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
} from 'react-native';
import {HT, WD} from '../../../Constant/Dimensions';
import {bgColor, fontSize} from '../../../Constant/Fonts&Colors';
import {Dropdown} from 'react-native-element-dropdown';

const DropdownTag = ({tagName, data, value, onChange}) => {
  // console.log('dataa', data);
  return (
    <>
      <View
        style={{
          width: '100%',
          height: '17%',
          alignItems: 'flex-start',
          justifyContent: 'space-around',
          top: HT(5),
          paddingHorizontal: WD(3),
        }}>
        <Text
          style={{
            color: bgColor.black,
            fontSize: fontSize.Large,
            fontWeight: 'bold',
          }}>
          {tagName}
        </Text>

        <Dropdown
          data={data}
          style={{
            height: '50%',
            width: '90%',
            borderColor: '#ccc',
            borderWidth: 1,
            borderRadius: 8,
            paddingHorizontal: 8,
          }}
          labelField="Description"
          valueField={'Description'}
          selectedTextStyle={{color: bgColor.black}}
          placeholderStyle={{color: bgColor.black}}
          value={value}
          onChange={item => onChange(item.Description)}
          renderItem={(item, selected) => (
            <View style={[styles.item, selected && {backgroundColor: '#eee'}]}>
              <Text
                style={{
                  fontSize: 16,
                  color: selected ? bgColor.coloured : bgColor.black, // selected item color
                }}>
                {item.Description}
              </Text>
            </View>
          )}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  item: {
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  itemText: {
    fontSize: fontSize.Medium,
    color: bgColor.black, // 👈 change your item text color here
  },
});

export default DropdownTag;

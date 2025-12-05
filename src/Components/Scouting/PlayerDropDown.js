import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {HT, WD} from '../../Constant/Dimensions';
import {bgColor} from '../../Constant/Fonts&Colors';

export default function PlayerDropdown({data, currentValue, onChangePlayer}) {
  const dropdownItems = data.map(item => ({
    label: item.Playername,
    value: item.UID,
    item: item,
  }));

  const [value, setValue] = useState(currentValue);

  return (
    <View style={styles.container}>
      <Dropdown
        placeholderStyle={{color: bgColor.black}}
        selectedTextStyle={{color: bgColor.black}}
        style={styles.dropdown}
        data={dropdownItems}
        labelField="label"
        valueField="value"
        placeholder={`${value}`}
        value={value}
        onChange={item => {
          setValue(item.value);
          // console.log('Selected Item:', item.item);
          onChangePlayer(item.item);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: HT(1),
  },
  dropdown: {
    height: HT(6),
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    width: WD(40),
    backgroundColor: bgColor.white,
  },
});

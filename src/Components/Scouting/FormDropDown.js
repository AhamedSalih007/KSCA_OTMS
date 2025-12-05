import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {HT, WD} from '../../Constant/Dimensions';
import {bgColor} from '../../Constant/Fonts&Colors';

export default function FormDropdown({data, currentValue, onSelect}) {
  const dropdownItems = data.map(item => ({
    label: item.FormName,
    value: item.FormID,
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
        activeColor={bgColor.text_secondary}
        itemTextStyle={{color: bgColor.black}}
        // containerStyle={{borderRadius: WD(2)}}
        itemContainerStyle={{
          borderBottomWidth: 0.2,
          borderBottomColor: bgColor.black,
        }}
        onChange={item => {
          setValue(item.value);
          onSelect(item.item);
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
    width: WD(30),
    backgroundColor: bgColor.white,
  },
});

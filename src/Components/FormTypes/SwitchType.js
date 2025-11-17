import React from 'react';
import {StyleSheet, Switch, Text, View} from 'react-native';
import {HT, WD} from '../../Constant/Dimensions';
import {bgColor, fontSize} from '../../Constant/Fonts&Colors';

const SwitchType = ({isEnabled, toggleSwitch, label}) => {
  return (
    <View
      style={{
        width: WD(45),
        height: HT(5),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        right: 0,
      }}>
      <Text
        style={{
          left: WD(3),
          color: bgColor.black,
          fontSize: fontSize.lightMedium,
        }}>
        {label}
      </Text>

      <Switch
        style={{left: WD(4)}}
        trackColor={{false: '#767577', true: bgColor.bg_island}}
        thumbColor={isEnabled ? bgColor.coloured : bgColor.white}
        // ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SwitchType;

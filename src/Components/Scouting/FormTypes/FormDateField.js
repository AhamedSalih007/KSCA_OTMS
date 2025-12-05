import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Platform, Image} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {HT, WD} from '../../../Constant/Dimensions';
import {bgColor} from '../../../Constant/Fonts&Colors';

export default function FormDateField({label, value, onChange}) {
  // console.log('dat--->', value);
  const initialDate = value ? new Date(value) : new Date();
  useEffect(() => {
    if (!value) {
      const today = new Date();
      const formattedDate = today.toLocaleDateString('en-CA'); // yyyy-mm-dd
      onChange(formattedDate);
    }
  }, []);

  const [date, setDate] = useState(initialDate);
  const [showPicker, setShowPicker] = useState(false);

  const onChangeDate = (_, selectedDate) => {
    if (selectedDate) {
      setDate(selectedDate);

      // Convert to YYYY-MM-DD for saving
      const formatted = selectedDate.toISOString().split('T')[0];

      onChange(formatted);
    }
    // setShowPicker(false);
  };

  // UI display DD/MM/YYYY
  const displayDate = `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()}`;

  return (
    <View style={{marginVertical: HT(1), paddingHorizontal: HT(0.5)}}>
      <Text style={{fontSize: 16, marginBottom: 6, fontWeight: 'bold'}}>
        {label}
      </Text>

      <TouchableOpacity
        onPress={() => setShowPicker(!showPicker)}
        style={{
          borderWidth: 1,
          borderColor: '#d0d0d0',
          padding: 12,
          borderRadius: 6,
          flexDirection: 'row',
        }}>
        <Text style={{fontSize: 16}}>{displayDate}</Text>

        {!showPicker ? (
          <Image
            resizeMode="contain"
            style={{
              width: '10%',
              height: '80%',
              position: 'absolute',
              right: 0,
              alignSelf: 'center',
              top: HT(1.5),
            }}
            source={require('../../../Assets/Images/calendar.png')}
          />
        ) : (
          <Image
            resizeMode="contain"
            style={{
              width: '10%',
              height: '90%',
              position: 'absolute',
              right: 0,
              alignSelf: 'center',
              top: HT(1.5),
            }}
            source={require('../../../Assets/Video/cancel.png')}
          />
        )}
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display={Platform.OS === 'ios' ? 'inline' : 'default'}
          onChange={onChangeDate}
          style={{
            backgroundColor: bgColor.white,
            borderWidth: 0.3,
            borderColor: bgColor.grey,
            borderRadius: WD(1),
          }}
        />
      )}
    </View>
  );
}

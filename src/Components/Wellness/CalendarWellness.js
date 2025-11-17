import React, {useState} from 'react';
import {Calendar} from 'react-native-calendars';
import {HT} from '../../Constant/Dimensions';

export default function CalendarWellness({selectedDate, selectedDateHandle}) {
  const markedDates = {
    '2025-10-02': {marked: true, dotColor: 'green'},
    '2025-10-03': {marked: true, dotColor: 'green'},
    '2025-10-04': {marked: true, dotColor: 'green'},
    '2025-10-05': {marked: true, dotColor: 'green'},
    '2025-10-06': {marked: true, dotColor: 'green'},
    '2025-10-07': {marked: true, dotColor: 'green'},
    [selectedDate]: {selected: true, selectedColor: '#D9EFFE', marked: true},
  };

  return (
    <Calendar
      style={{
        height: HT(37),
        // backgroundColor: 'red',
      }}
      hideExtraDays={true}
      current="2025-10-01"
      onDayPress={day => selectedDateHandle(day)}
      markedDates={markedDates}
      theme={{
        backgroundColor: '#ffffff',
        calendarBackground: '#ffffff',
        textSectionTitleColor: '#333',
        selectedDayBackgroundColor: '#D9EFFE',
        selectedDayTextColor: '#000',
        todayTextColor: '#00adf5',
        dayTextColor: '#222',
        textDisabledColor: '#ccc',
        arrowColor: '#000',
        monthTextColor: '#000',
        textMonthFontWeight: '600',
        textDayFontSize: 16,
        textMonthFontSize: 18,
      }}
    />
  );
}

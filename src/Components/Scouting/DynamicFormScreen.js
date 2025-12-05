import React, {useState} from 'react';
import {ScrollView, View, Text} from 'react-native';
// import {groupFormByHeader} from './groupFormByHeader';
import {renderForm} from './renderForm';
import {renderFormAll} from '../../Utils/renderFormAll';
import {groupFormByHeader} from '../../Utils/GroupedSectionFunc';
import {HT, WIDTH} from '../../Constant/Dimensions';

export default function DynamicFormScreen({formData}) {
  console.log('f', formData.length);
  const [form, setForm] = useState(formData);

  const handleFormInput = (type, item, index, value) => {
    let updated = [...form];

    if (type === 'radio-group') {
      updated[index].values = updated[index].values.map((v, i) => ({
        ...v,
        selected: i === value,
      }));
    } else if (type === 'checkbox-group') {
      updated[index].values = updated[index].values.map(v => ({
        ...v,
        selected: value.includes(v.value),
      }));
    } else {
      updated[index].value = value;
    }

    setForm(updated);
  };

  const getSelectedIndex = (item, index) => {
    return form[index].values.findIndex(v => v.selected);
  };

  const grouped = groupFormByHeader(form);
  const sectionNames = Object.keys(grouped);

  console.log('g', grouped);

  return (
    <ScrollView style={{width: WIDTH, height: HT(90)}}>
      {sectionNames.map((section, sIndex) => (
        <View
          key={sIndex}
          style={{
            backgroundColor: 'white',
            margin: 12,
            padding: 16,
            borderRadius: 12,
            elevation: 4,
          }}>
          {/* SECTION HEADER */}
          <Text
            style={{
              fontSize: 22,
              fontWeight: '700',
              marginBottom: 12,
              color: '#000',
            }}>
            {section}
          </Text>

          {/* SECTION FIELDS */}
          {grouped[section].map((item, index) => (
            <View key={index} style={{marginBottom: 14}}>
              {renderFormAll(
                item,
                index,
                form,
                handleFormInput,
                getSelectedIndex,
              )}
            </View>
          ))}
        </View>
      ))}
    </ScrollView>
  );
}

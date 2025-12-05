import React, {useEffect, useRef, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  GetFormDataScoutingAPI,
  GetFormEntries_ScoutingAPI,
  SubmitForm_ScoutingAPI,
  UpdateForm_ScoutingAPI,
} from '../../../../../API/ScoutingAPI';
import {FlatList, Image, Platform, Pressable, Text, View} from 'react-native';
import {HT, WD, WIDTH} from '../../../../../Constant/Dimensions';
import FormTextField from '../../../../../Components/Scouting/FormTypes/FormTextField';
import FormTextAreaField from '../../../../../Components/Scouting/FormTypes/FormTextAreaField';
import FormRadioGroupField from '../../../../../Components/Scouting/FormTypes/FormRadioGroupField';
import FormSelectField from '../../../../../Components/Scouting/FormTypes/FormSelectField';
import FormHeaderField from '../../../../../Components/Scouting/FormTypes/FormHeaderField';
import FormCheckboxGroup from '../../../../../Components/Scouting/FormTypes/FormCheckboxGroup';
import FormNumberField from '../../../../../Components/Scouting/FormTypes/FormNumberField';
import SelectPlayers from '../../../../../Components/Scouting/Headers/SelectPlayers';
import {bgColor, fontSize} from '../../../../../Constant/Fonts&Colors';
import FormDropdown from '../../../../../Components/Scouting/FormDropDown';
import PlayerDropdown from '../../../../../Components/Scouting/PlayerDropDown';
import {
  GenerateQueryForInsert,
  GenerateQueryForInsert2,
  GenerateQueryForInsert3,
  GenerateQueryForUpdate2,
} from '../../../../../Utils/SubmitFormFunc';
import FormDateField from '../../../../../Components/Scouting/FormTypes/FormDateField';
import {useSelector} from 'react-redux';
import {groupFormByHeader} from '../../../../../Utils/GroupedSectionFunc';
import DynamicFormScreen from '../../../../../Components/Scouting/DynamicFormScreen';
import {getFormValuesAll} from '../../../../../Utils/GetFormValuesFunc';
import MessageToast from '../../../../../Components/Common/MessageToast';

const FormDataPlayers = props => {
  const {selectedPlayers, selectedIds, baseForm, compId, matchId} =
    props.route.params;

  const {userData, darkMode} = useSelector(state => state.localdata);

  const mainListRef = useRef(null);
  const headerRef = useRef(null);
  const sectionLayouts = useRef({});
  const isAutoScrolling = useRef(false);

  const [currentPlayer, setCurrentPlayer] = useState(selectedPlayers[0]);

  const [form, setForm] = useState([]);

  const [formInit, setFormInit] = useState([]);

  const [updateFormAutoId, setUpdateFormAutoId] = useState(null);

  const [currentForm, setCurrentForm] = useState(baseForm[0]);

  const [headerList, setHeaderList] = useState([]);

  const [currentHeaderList, setCurrentHeaderList] = useState(0);

  const [isSubmit, setIsSubmit] = useState(true);

  const [message, setMessage] = useState('');
  const [isToastHide, setIsToastHide] = useState(true);
  const [loading, setLoading] = useState(false);

  // console.log('cf', selectedPlayers);

  // console.log('h', headerList, baseForm[0]);

  // console.log('h', mainListRef.current);

  useEffect(() => {
    initFunc();
  }, []);

  const initFunc = async () => {
    const dataRes = await getFormData(null);

    await getValues(dataRes);
  };

  const getFormData = async formId => {
    // console.log('autoid', baseForm[0].FormID);
    const responseForm = await GetFormDataScoutingAPI(
      formId == null ? baseForm[0].FormID : formId,
    );

    // console.log('res', responseForm);

    if (responseForm != 'Error') {
      let formArray = [];

      for (let i = 0; i < responseForm.length; i++) {
        // console.log('data1', responseForm[0].FormJson);

        const formJson = JSON.parse(responseForm[i].FormJson);
        for (let j = 0; j < formJson.length; j++) {
          formJson[j].label = formJson[j].label.replace(`<b>`, '');
          formJson[j].label = formJson[j].label.replace(`</b>`, '');
          formJson[j].label = formJson[j].label.replace(`&amp`, '');
        }

        const data = {
          AutoId: responseForm[i].AutoId,
          FormJson: formJson,
          Name: responseForm[i].Name,
          Category: responseForm[i].Category,
          currentHeader,
        };

        formArray.push(data);
      }

      let currentHeader = '';

      let formJsonArray = [];

      let headers = [];

      for (let i = 0; i < formArray[0].FormJson.length; i++) {
        if (i == 0) {
          if (formArray[0].FormJson[i].type != 'header') {
            currentHeader = 'Player Info';

            headers.push('Player Info');
          }
        }

        if (formArray[0].FormJson[i].type == 'header') {
          currentHeader = formArray[0].FormJson[i].label;

          if (!headers.includes(formArray[0].FormJson[i].label)) {
            headers.push(formArray[0].FormJson[i].label);
          }
        }

        // console.log('h', formArray[0].FormJson[i].label);

        const data = {
          ...formArray[0].FormJson[i],
          header: currentHeader,
        };

        formJsonArray.push(data);
      }
      // console.log('log', formJsonArray);
      setHeaderList(headers);
      setForm(formJsonArray);
      setFormInit(formJsonArray);
      return formJsonArray;
    } else {
      return [];
    }
  };

  const getValues = async form => {
    const response = await GetFormEntries_ScoutingAPI(
      selectedPlayers[0]?.UID,
      baseForm[0]?.FormID,
      userData?.userID,
      matchId,
      compId,
    );
    // console.log('ress', response?.data);

    if (response != 'Error') {
      response?.data?.length != 0 ? setIsSubmit(false) : setIsSubmit(true);

      if (response?.data?.length != 0) {
        setUpdateFormAutoId(response?.data?.[0].AutoId);
        const resValues = getFormValuesAll(form, response?.data);

        // console.log('resvalues', resValues);
        setForm(resValues);
      } else {
        setUpdateFormAutoId(null);
        setForm(prevForm =>
          prevForm.map(field =>
            field.label.toLowerCase() === 'player name'
              ? {...field, value: selectedPlayers[0]?.Playername ?? ''}
              : field,
          ),
        );
      }
    } else {
      setUpdateFormAutoId(null);
      setForm(prevForm =>
        prevForm.map(field =>
          field.label === 'Name'
            ? {...field, value: selectedPlayers[0]?.Playername ?? ''}
            : field,
        ),
      );
    }
  };

  const handleFormInput = (type, item, index, value) => {
    let updated = [...form];
    // Radio
    if (type == 'radio-group') {
      for (let i = 0; i < updated[index].values.length; i++) {
        if (i == value) {
          updated[index].values[i].selected = true;
        } else {
          updated[index].values[i].selected = false;
        }
      }

      setForm(updated);
      console.log(updated[index]);
    } else if (type === 'select') {
      updated[index].values = updated[index].values.map(opt => ({
        ...opt,
        selected: opt.value === value,
      }));
      setForm(updated);
    } else if (type === 'checkbox-group') {
      updated[index].values = updated[index].values.map(opt => ({
        ...opt,
        selected: value.includes(opt.value),
      }));

      setForm(updated);
    } else if (type === 'date') {
      updated[index].value = value;

      setForm(updated);
    }
    // Text and Textarea
    else {
      updated[index] = {
        ...updated[index],
        value: value,
      };

      setForm(updated);
    }
  };

  const getSelectedIndex = (item, index) => {
    let updated = [...form];

    let returnIndex = '';

    for (let i = 0; i < updated[index].values.length; i++) {
      if (updated[index].values[i].selected) {
        returnIndex = i;
      }
    }

    return returnIndex;
  };

  const renderForm = (item, index, header) => {
    if (header == item.header) {
      switch (item.type) {
        case 'text':
          return (
            <FormTextField
              label={item.label}
              value={form[index]?.value || ''}
              onChange={value => handleFormInput(item.type, item, index, value)}
            />
          );

        case 'date':
          return (
            <FormDateField
              key={item.name}
              label={item.label}
              value={item.value}
              onChange={value => handleFormInput(item.type, item, index, value)}
            />
          );

        case 'select':
          return (
            <FormSelectField
              label={item.label}
              options={form[index].values || []}
              value={form[index].values.find(d => d.selected)?.value || null}
              onChange={value => handleFormInput(item.type, item, index, value)}
            />
          );

        // case 'header':
        //   return <FormHeaderField label={item.label} />;

        case 'radio-group':
          return (
            <FormRadioGroupField
              label={item.label}
              options={form[index]?.values || []}
              value={getSelectedIndex(item, index)}
              onChange={value => handleFormInput(item.type, item, index, value)}
            />
          );

        case 'textarea':
          return (
            <FormTextAreaField
              label={item.label}
              value={form[index]?.value || ''}
              onChange={value => handleFormInput(item.type, item, index, value)}
            />
          );

        case 'checkbox-group':
          return (
            <FormCheckboxGroup
              label={item.label}
              options={form[index].values}
              value={form[index].values
                .filter(v => v.selected)
                .map(v => v.value)}
              onChange={values =>
                handleFormInput(item.type, item, index, values)
              }
            />
          );

        case 'number':
          return (
            <FormNumberField
              label={item.label}
              value={form[index].value || ''}
              onChange={value => handleFormInput(item.type, item, index, value)}
            />
          );
      }
    }
  };

  const onSubmitHandle = async () => {
    setLoading(true);
    const dataset = GenerateQueryForInsert2(form);

    // console.log('submit', dataset);

    const data = {
      formname: currentForm?.FormName,
      data: dataset?.data + ',',
      dataval: dataset?.dataval + ',',
      formid: currentForm?.FormID,
      formcategory: currentForm?.FormName, //Category
      status: 1,
      uid: currentPlayer?.UID,
      userid: userData?.userID,
      matchid: matchId,
      compid: compId,
    };

    // console.log('data', dataset.status, data.formcategory);

    if (dataset.status) {
      const response = await SubmitForm_ScoutingAPI(data);
      if (response != 'Error') {
        console.log('responsePost', response);
        setMessage('Submit Successfully');
        setIsToastHide(!isToastHide);
        setLoading(false);
        setTimeout(() => {
          props.navigation.navigate('Evaluation');
        }, 500);
      } else {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  const onUpdatehandle = async () => {
    setLoading(true);
    // console.log('update');
    const dataset = GenerateQueryForUpdate2(form);

    // console.log('resupdate', dataset);

    const data = {
      dataval: dataset?.dataval + ',',
      formid: currentForm?.FormID,
      status: 1,
      autoid: updateFormAutoId,
    };

    // console.log('data', data);

    const response = await UpdateForm_ScoutingAPI(data);

    if (response != 'Error') {
      console.log('responsePost', response.status);

      setMessage('Update Successfully');

      setIsToastHide(!isToastHide);
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  const onSelectHandle = async data => {
    // console.log('selected', data);
    const resForm = await getFormData(data.FormID);
    // console.log('resForm', resForm);
    setCurrentForm(data);

    const response = await GetFormEntries_ScoutingAPI(
      currentPlayer?.UID,
      data?.FormID,
      userData?.userID,
      matchId,
      compId,
    );
    console.log('ress', response?.data?.length);

    if (response != 'Error') {
      response?.data?.length != 0 ? setIsSubmit(false) : setIsSubmit(true);
      if (response?.data?.length != 0) {
        setUpdateFormAutoId(response?.data?.[0].AutoId);
        const resValues = getFormValuesAll(resForm, response?.data);

        // console.log('resvalues', resValues);
        setForm(resValues);
      } else {
        setForm(resForm);
      }
    } else {
    }
  };

  const onChangePlayer = async player => {
    setCurrentPlayer(player);

    // console.log('pl', player);

    // console.log(
    //   'op',
    //   player?.UID,
    //   currentForm?.FormID,
    //   userData?.userID,
    //   matchId,
    //   compId,
    // );

    const response = await GetFormEntries_ScoutingAPI(
      player?.UID,
      currentForm?.FormID,
      userData?.userID,
      matchId,
      compId,
    );
    console.log('ress2', response?.data?.length);

    if (response != 'Error') {
      response?.data?.length != 0 ? setIsSubmit(false) : setIsSubmit(true);

      if (response?.data?.length != 0) {
        setUpdateFormAutoId(response?.data?.[0].AutoId);
        const resValues = getFormValuesAll(form, response?.data);

        // console.log('resvalues', resValues);
        setForm(resValues);
      } else {
        setForm(formInit);

        setForm(prevForm =>
          prevForm.map(field =>
            field.label === 'Name'
              ? {...field, value: player.Playername ?? ''}
              : field,
          ),
        );
      }
    } else {
    }
  };

  const renderHeadersList = (header, index) => {
    const sectionItems = form.filter(f => f.header === header);

    return (
      <View
        onLayout={e => {
          const {height} = e.nativeEvent.layout;
          sectionLayouts.current[index] = height;
        }}
        style={{
          width: WD(90),
          backgroundColor: bgColor.white,
          marginTop: HT(1),
          alignSelf: 'center',
          borderRadius: WD(1),
          padding: HT(2),
        }}>
        <Text style={{fontSize: 20, fontWeight: '700', marginBottom: 10}}>
          {header}
        </Text>

        {sectionItems.map((item, idx) => {
          const actualIndex = form.findIndex(f => f.name === item.name);
          return <View key={idx}>{renderForm(item, actualIndex, header)}</View>;
        })}
      </View>
    );
  };

  const onPressHeader = index => {
    isAutoScrolling.current = true;

    setCurrentHeaderList(index);

    setTimeout(() => {
      mainListRef.current?.scrollToIndex({
        index,
        animated: true,
        viewPosition: 0,
      });
    }, 50);

    setTimeout(() => {
      isAutoScrolling.current = false;
    }, 400); // Enough for scroll animation
  };
  const renderHeader = (item, index) => {
    return (
      <Pressable
        onPress={() => onPressHeader(index)}
        style={{
          width: WD(31),
          height: HT(5),
          marginLeft: WD(2),
          borderRadius: WD(10),
          left: WD(1),
          alignItems: 'center',
          justifyContent: 'center',
          // padding: WD(2),
          backgroundColor:
            currentHeaderList == index ? bgColor.coloured : bgColor.white,
        }}>
        <Text
          style={{
            color: currentHeaderList == index ? bgColor.white : bgColor.black,
            fontSize: fontSize.Small + 1,
            textTransform: 'capitalize',
            textAlign: 'center',
          }}>
          {item}
        </Text>
      </Pressable>
    );
  };

  const HeaderComp = () => {
    return (
      <View
        style={{
          height: HT(8),
          alignItems: 'center',
          justifyContent: 'center',
          width: 'auto',
        }}>
        <FlatList
          ref={headerRef}
          showsHorizontalScrollIndicator={false}
          style={{top: HT(1)}}
          horizontal
          data={headerList}
          renderItem={({item, index}) => renderHeader(item, index)}
          scrollEventThrottle={16}
        />
      </View>
    );
  };

  const getItemLayout = (data, index) => {
    let offset = 0;

    for (let i = 0; i < index; i++) {
      offset += sectionLayouts.current[i] || 0;
    }

    const length = sectionLayouts.current[index] || 0;

    return {length, offset, index};
  };

  const handleScroll = event => {
    headerRef.current.scrollToIndex({
      index: currentHeaderList,
      animated: true,
      viewPosition: 0.5, // center the selected tab
    });
    if (isAutoScrolling.current) return;

    const scrollY = event.nativeEvent.contentOffset.y;

    let accumulatedHeight = 0;

    for (let i = 0; i < headerList.length; i++) {
      const height = sectionLayouts.current[i] || 0;

      if (scrollY < accumulatedHeight + height - HT(10)) {
        if (currentHeaderList !== i) {
          setCurrentHeaderList(i);
        }
        break;
      }

      accumulatedHeight += height;
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <SelectPlayers
        goBack={() => props.navigation.goBack()}
        onContinue={isSubmit ? () => onSubmitHandle() : () => onUpdatehandle()}
        header={'Form'}
        text={isSubmit ? 'Submit' : 'Update'}
        loading={loading}
      />

      <View
        style={{
          width: WIDTH,
          height: HT(7),
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <FormDropdown
          data={baseForm}
          currentValue={baseForm[0]?.FormName}
          onSelect={onSelectHandle}
        />
        <PlayerDropdown
          data={selectedPlayers}
          currentValue={selectedPlayers[0]?.Playername}
          onChangePlayer={onChangePlayer}
        />

        <Pressable
          onPress={() => props.navigation.goBack()}
          style={{
            width: Platform.isPad ? WD(6) : WD(10),
            height: Platform.isPad ? WD(6) : WD(10),
            borderRadius: WD(1),
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 1,
            borderColor: bgColor.grey,
            backgroundColor: bgColor.white,
          }}>
          <Image
            style={{
              width: '70%',
              height: '70%',
              tintColor: bgColor.coloured,
              opacity: 0.8,
            }}
            source={require('../../../../../Assets/Images/add-group.png')}
          />
        </Pressable>
      </View>

      <View style={{flex: 1}}>
        {HeaderComp()}
        <FlatList
          ref={mainListRef}
          data={headerList}
          renderItem={({item, index}) => renderHeadersList(item, index)}
          ListFooterComponent={() => <View style={{height: HT(30)}} />}
          getItemLayout={getItemLayout}
          removeClippedSubviews={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
        />
      </View>
      <MessageToast
        message={message}
        isToastHide={isToastHide}
        toast={() => setIsToastHide(true)}
      />
    </SafeAreaView>
  );
};

export default FormDataPlayers;

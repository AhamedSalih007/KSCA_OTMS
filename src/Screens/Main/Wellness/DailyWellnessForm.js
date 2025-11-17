import React, {useCallback, useEffect, useRef, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import HeaderView from '../../../Components/Common/HeaderView';
import {bgColor, fontSize} from '../../../Constant/Fonts&Colors';
import NormalType from '../../../Components/FormTypes/NormalType';
import {FlatList, Image, Text, View} from 'react-native';
import {HT, WD, WIDTH} from '../../../Constant/Dimensions';
import {FormMen, FormWomen, MenCategory} from '../../../Constant/FormsData';
import RadioType from '../../../Components/FormTypes/RadioType';
import CheckBoxType from '../../../Components/FormTypes/CheckBoxType';
import {useSelector} from 'react-redux';
import SwitchType from '../../../Components/FormTypes/SwitchType';
import moment from 'moment';
import PlayerInfoView from '../../../Components/Wellness/PlayerInfoView';
import {today} from '../../../Constant/Date';
import CategoryView from '../../../Components/Wellness/CategoryView';
import ButtonImage from '../../../Components/Common/ButtonImage';
import {InsertFormMenAPI} from '../../../API/FormAPI';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import MessageToast from '../../../Components/Common/MessageToast';
import {GetPlayerFormAPI} from '../../../API/PlayerAPI';

const DailyWellnessForm = props => {
  const {selectedDate, previousForm} = props.route.params;

  // console.log('sd', selectedDate);

  const {userData} = useSelector(state => state.localdata);

  // console.log('user', userData);

  const flatListRef = useRef(null);

  // console.log('user', userData);

  const [form, setForm] = useState(
    JSON.parse(JSON.stringify(userData.gender == 1 ? FormMen : FormWomen)),
  );

  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [message, setMessage] = useState('');
  const [isToastHide, setIsToastHide] = useState(true);

  // console.log('user', userData);

  // console.log('userData', userData);

  useEffect(() => {
    // console.log('form', form);
    if (previousForm.length != 0) {
      initFormHandle();
    }

    //Male
    if (userData.gender == '1') {
      setSelectedCategory('Session');
    }
    //Female
    else {
      setSelectedCategory('Mental Condition');
    }

    return () => {
      setForm([]);
    };
  }, []);

  const scrollToTop = () => {
    // use scrollToOffset to reset to top
    flatListRef.current?.scrollToOffset({offset: 0, animated: true});
  };

  const initFormHandle = () => {
    const data = previousForm[0];

    const mappedArray = form.map(item => {
      const key = item.getKey;
      if (key && data.hasOwnProperty(key)) {
        return {...item, value: data[key]};
      }
      return item;
    });

    for (let i = 0; i < mappedArray.length; i++) {
      if (mappedArray[i].type == 'checkbox') {
        console.log('value', mappedArray[i].value.split(','));

        const value = mappedArray[i].value.split(',');

        for (let j = 0; j < mappedArray[i].fields.length; j++) {
          if (value.includes(mappedArray[i].fields[j].label)) {
            mappedArray[i].fields[j].selected = true;
          }
        }
      }
    }

    // console.log('form', mappedArray[4]);
    setForm(mappedArray);
  };

  const changeFormValue = useCallback(
    (text, index) => {
      // console.log('value', text, index);

      let newForm = [...form];

      newForm[index].value = text;

      setForm(newForm);
    },
    [form],
  );

  const onRadioBtnPress = useCallback(
    (item, fieldIndex, selectedLabel, index) => {
      // console.log('data', fieldIndex, index, selectedLabel);

      let newForm = [...form];

      newForm[index].value = selectedLabel;

      setForm(newForm);
    },
    [form],
  );
  const onCheckBoxBtnPress = useCallback(
    (item, selectedIndex, index) => {
      // console.log('data', fieldIndex, index, selectedLabel);

      let newForm = [...form];

      if (newForm[index].fields[selectedIndex].selected) {
        newForm[index].fields[selectedIndex].selected = false;
      } else {
        newForm[index].fields[selectedIndex].selected = true;
      }

      setForm(newForm);
    },
    [form],
  );

  const toggleSwitch = useCallback(
    index => {
      let newForm = [...form];

      newForm[index].value = !newForm[index].value;

      // console.log('newForm', newForm[index]);

      setForm(newForm);
    },
    [form],
  );

  const pressedButton = async id => {
    // console.log('pressed button', id);

    for (let i = 0; i < form.length; i++) {
      if (form[i].postKey == 'Uid') {
        form[i].value = userData.userName;
      }

      if (form[i].postKey == 'UserId') {
        form[i].value = userData.userID;
      }
      if (form[i].postKey == 'date') {
        form[i].value = selectedDate;
      }

      if (form[i].postKey == 'Gender') {
        form[i].value = userData.gender;
      }

      if (form[i].postKey == 'sts') {
        form[i].value = id;
      }

      if (form[i].postKey == 'InjuryorNiggles') {
        form[i].value = form[i].value == 'Yes' ? 1 : 0;
      }

      if (form[i].type == 'checkbox') {
        const subArray = form[i].fields;

        let combineArray = [];
        for (let j = 0; j < subArray.length; j++) {
          if (subArray[j].selected) {
            combineArray.push(subArray[j].label);
          }
        }
        if (combineArray.length != 0) {
          form[i].value = combineArray.join(',');
        }
      }
    }

    // console.log('newForm', form);

    const transformData = form.reduce((acc, item) => {
      if (item.postKey) {
        acc[item.postKey] = item.value;
      }

      return acc;
    }, {});

    console.log('trans', transformData);

    const response = await InsertFormMenAPI(JSON.stringify(transformData));
    console.log('responseMen', response);
    if (response != 'Error') {
      setMessage(id == 0 ? 'Saved Successfully' : 'Submit Successfully');
      setIsToastHide(false);
    } else {
      setMessage('Something went wrong please try again');
      setIsToastHide(false);
    }
  };

  const renderForm = (item, index) => {
    if (item.category == selectedCategory) {
      if (item.type == 'normal') {
        return (
          <NormalType
            label={item.label}
            value={item.value.toString()}
            onChangeValue={text => changeFormValue(text, index)}
            // selectedDate={selectedDate}
          />
        );
      }

      if (item.type == 'radio') {
        return (
          <RadioType
            userData={userData}
            value={item.value}
            label={item.label}
            fields={item.fields}
            onRadioBtnPress={(item, fieldIndex, selectedLabel) =>
              onRadioBtnPress(item, fieldIndex, selectedLabel, index)
            }
            item={item}
          />
        );
      }

      if (item.type == 'checkbox') {
        return (
          <CheckBoxType
            label={item.label}
            fields={item.fields}
            onCheckBoxBtnPress={(item, selectedIndex) =>
              onCheckBoxBtnPress(item, selectedIndex, index)
            }
          />
        );
      }

      if (item.type == 'switch') {
        return (
          <SwitchType
            isEnabled={item.value}
            toggleSwitch={() => toggleSwitch(index)}
            label={item.label}
          />
        );
      }
    }
  };

  const pressedCategory = (item, index) => {
    scrollToTop();

    setSelectedIndex(index);
    // console.log('i', item);
    setSelectedCategory(item.category);
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: bgColor.bg_globe}}>
      <HeaderView
        goBack={() => props.navigation.goBack()}
        screenName={'Daily Wellness'}
      />

      <View style={{width: WIDTH, height: HT(93)}}>
        <PlayerInfoView
          playerName={userData?.displayName}
          date={today}
          isRestDay={false}
          gender={userData?.gender == 1 ? 'Male' : 'Female'}
        />
        <SwitchType
          isEnabled={form[3]?.value}
          toggleSwitch={() => toggleSwitch(3)}
          label={'Rest Day'}
        />

        <CategoryView
          selectedCategory={selectedIndex}
          gender={userData?.gender}
          pressedCategory={(item, index) => pressedCategory(item, index)}
        />
        <View
          style={{
            width: WIDTH,
            height: HT(88),
            // borderTopColor: bgColor.grey,
            // borderTopWidth: 1,
            // bottom: HT(0.5),
          }}>
          <FlatList
            // showsVerticalScrollIndicator={false}
            // style={{alignSelf: 'center'}}
            ref={flatListRef}
            data={form}
            ListHeaderComponent={() => <View style={{height: HT(1)}} />}
            renderItem={({item, index}) => renderForm(item, index)}
            ListFooterComponent={() => (
              <View style={{height: HT(50), width: WD(90)}} />
            )}
          />
        </View>
      </View>

      {/* Save Button */}

      <ButtonImage
        width={WD(30)}
        height={HT(6)}
        br={WD(1)}
        bg={bgColor.coloured}
        text={'Save'}
        image={require('../../../Assets/Images/save.png')}
        pressedButton={() => pressedButton(0)}
        right={WD(5)}
      />
      {/* Submit Button */}
      <ButtonImage
        width={WD(30)}
        height={HT(6)}
        br={WD(1)}
        bg={bgColor.coloured}
        text={'Submit'}
        image={require('../../../Assets/Images/submit.png')}
        pressedButton={() => pressedButton(1)}
        right={WD(40)}
      />

      {/* Toast Message */}
      <MessageToast
        message={message}
        isToastHide={isToastHide}
        toast={() => setIsToastHide(true)}
      />
    </SafeAreaView>
  );
};

export default DailyWellnessForm;

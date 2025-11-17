import React, {useCallback, useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Pressable,
  FlatList,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import HeaderWellness from '../../../Components/Wellness/HeaderWellness';
import SubHeaderWellness from '../../../Components/Wellness/SubHeaderWellness';
import {bgColor} from '../../../Constant/Fonts&Colors';
import CalendarWellness from '../../../Components/Wellness/CalendarWellness';
import moment from 'moment';
import FloatingButton from '../../../Components/Wellness/FloatingButton';
import BottomSheetWellness from '../../../Components/Wellness/BottomSheetWellness';
import {GestureDetector, Gesture} from 'react-native-gesture-handler';
import {HEIGHT, HT, WD, WIDTH} from '../../../Constant/Dimensions';
import {useDispatch, useSelector} from 'react-redux';
import {
  bottomSheetAction,
  drawerHandleAction,
  rightDrawerHandleAction,
} from '../../../Redux/ReducerSlices/UserSlice';
import WellnessCard from '../../../Components/Wellness/WellnessCard';
import {MainStyle} from '../../../Constant/Styles';
import {today, tomorrow} from '../../../Constant/Date';
import DrawerLeftWellness from '../../../Components/Wellness/DrawerLeftWellness';
import DrawerRightWellness from '../../../Components/Wellness/DrawerRightWellness';
import {GetPlayerFormAPI} from '../../../API/PlayerAPI';

// const today = moment().format('YYYY-MM-DD');
// const tomorrow = moment().add(1, 'days').format('YYYY-MM-DD');

const SCREEN_HEIGHT = HEIGHT;
const BOTTOM_SHEET_HEIGHT = HEIGHT / 1.7;

const Schedule_Wellness = props => {
  const {userData, darkMode} = useSelector(state => state.localdata);
  const {isDrawer, isBottomSheet, isRightDrawer} = useSelector(
    state => state.user,
  );

  const dispatch = useDispatch();

  // console.log('count', count);

  const [wellnessRecentId, setWellnessRecentId] = useState(1);
  const [isCalendar, setIsCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(today);
  const [isOpenSheet, setIsOpenSheet] = useState(false);
  const [form, setForm] = useState([]);

  // console.log('sd', selectedDate);

  const wellnessData = [
    {
      id: 1,
      name: 'Daily Wellness',
      text1: 'Completed . Great job!',
      text2: '',
      image: require('../../../Assets/Images/check-box.png'),
      iconColor: '#00A89C',
      colorBg: '#E0F2F1',
    },
    {
      id: 2,
      name: 'New Feedback from Coach',
      text1: 'Batting technique - Session-12',
      text2: '2 hours ago',
      image: require('../../../Assets/Images/chat.png'),
      iconColor: '#3881F6',
      colorBg: '#DBEAFE',
    },
    {
      id: 3,
      name: 'Net Practice Session',
      text1: '4:00 PM - 6:00 PM',
      text2: 'Indoor Practice facility',
      image: require('../../../Assets/Images/cricket.png'),
      iconColor: '#6063F1',
      colorBg: '#E1E7FF',
    },
    {
      id: 3,
      name: 'T20 Match vs Mumbai',
      text1: '7:00 PM',
      text2: 'M Chinnaswamy Stadium',
      image: require('../../../Assets/Images/schedule.png'),
      iconColor: '#1BC458',
      colorBg: '#DCFCE7',
    },
    {
      id: 1,
      name: 'Daily Wellness',
      text1: 'Completed . Great job!',
      text2: '',
      image: require('../../../Assets/Images/schedule.png'),
      iconColor: '#1BC458',
      colorBg: '#DCFCE7',
    },
  ];

  const closeSheet = useCallback(() => {
    setTimeout(() => {
      dispatch(bottomSheetAction(false));
    }, 300);
  }, []);

  const pressedWellness = useCallback(
    id => {
      setWellnessRecentId(id);

      if (id == 1) {
        setSelectedDate(today);
        getForm(today);
      } else {
        setSelectedDate(tomorrow);
        getForm(tomorrow);
      }
    },
    [wellnessRecentId, selectedDate],
  );

  const pressedDate = useCallback(() => {
    setIsCalendar(!isCalendar);
  }, [isCalendar]);

  const selectedDateHandle = useCallback(day => {
    setSelectedDate(day.dateString);
    setIsCalendar(false);

    getForm(day.dateString);

    if (today == day.dateString) {
      setWellnessRecentId(1);
    } else if (tomorrow == day.dateString) {
      setWellnessRecentId(2);
    }
  }, []);

  const pressedDrawer = useCallback(() => {
    dispatch(drawerHandleAction(true));
  }, []);
  const pressedRightDrawer = useCallback(() => {
    dispatch(rightDrawerHandleAction(true));
  }, []);

  // const pressedWellnessCard = useCallback(
  //   (item, index) => {
  //     // console.log('item', item);

  //     //Daily Wellness
  //     if (item.id == 1) {
  //       props.navigation.navigate('DailyWellnessForm', {
  //         selectedDate,
  //         previousForm: form,
  //       });
  //     }
  //   },
  //   [selectedDate, form],
  // );

  const pressedWellnessCard = (item, index) => {
    //Daily Wellness
    if (item.id == 1) {
      props.navigation.navigate('DailyWellnessForm', {
        selectedDate,
        previousForm: form,
      });
    }
  };

  useEffect(() => {
    const date = moment().format('YYYY-MM-DD');

    getForm(date);
  }, []);

  const getForm = async date => {
    const response = await GetPlayerFormAPI(userData.userID, date);

    if (response != 'Error') {
      console.log('res', response.Data.length);
      setForm(response.Data);
    }
  };

  const renderWellnessData = (item, index) => {
    const isLastItem = index === wellnessData.length - 1;
    const isOdd = wellnessData.length % 2 !== 0;

    const isFullWidth = isOdd && isLastItem;

    return (
      <WellnessCard
        isFullWidth={isFullWidth}
        item={item}
        index={index}
        pressedWellnessCard={(item, index) => pressedWellnessCard(item, index)}
      />
    );
  };

  const openSheetHandle = () => {
    dispatch(bottomSheetAction(true));
  };

  return (
    <>
      <SafeAreaView style={MainStyle}>
        <HeaderWellness
          selectedDate={selectedDate}
          isCalendar={isCalendar}
          pressedDate={pressedDate}
          pressedDrawer={pressedDrawer}
          pressedRightDrawer={pressedRightDrawer}
        />

        {isCalendar ? (
          <CalendarWellness
            selectedDate={selectedDate}
            selectedDateHandle={day => selectedDateHandle(day)}
          />
        ) : null}

        {today == selectedDate || tomorrow == selectedDate ? (
          <SubHeaderWellness
            id={wellnessRecentId}
            pressedWellness={id => pressedWellness(id)}
            isCalendar={isCalendar}
          />
        ) : null}

        <View style={{height: HT(75)}}>
          <FlatList
            showsVerticalScrollIndicator={false}
            style={{flexWrap: 'wrap', alignSelf: 'center'}}
            numColumns={2}
            data={wellnessData}
            renderItem={({item, index}) => renderWellnessData(item, index)}
            ListFooterComponent={() => <View style={{height: HT(15)}} />}
          />
        </View>

        {/* <FloatingButton pressedFloating={openSheetHandle} /> */}
      </SafeAreaView>
      {isDrawer ? <DrawerLeftWellness isDrawer={isDrawer} /> : null}

      {isRightDrawer ? <DrawerRightWellness isDrawer={isRightDrawer} /> : null}

      {isOpenSheet ? (
        <BottomSheetWellness
          isOpen={isOpenSheet}
          closeSheet={() => closeSheet()}
        />
      ) : null}
    </>
  );
};

export default Schedule_Wellness;

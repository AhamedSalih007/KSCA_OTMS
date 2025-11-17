import React, {useCallback, useState} from 'react';
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
import MainHeaderView from '../../../Components/Common/MainHeaderView';

const today = moment().format('YYYY-MM-DD');
const tomorrow = moment().add(1, 'days').format('YYYY-MM-DD');

const SCREEN_HEIGHT = HEIGHT;
const BOTTOM_SHEET_HEIGHT = HEIGHT / 1.7;

const Wellness = props => {
  // const {count} = useSelector(state => state.user);

  const dispatch = useDispatch();

  // console.log('count', count);

  const pressedDrawer = useCallback(() => {
    dispatch(drawerHandleAction(true));
  }, []);

  const pressedRightDrawer = useCallback(() => {
    dispatch(rightDrawerHandleAction(true));
  }, []);

  return (
    <SafeAreaView style={MainStyle}>
      <MainHeaderView
        screenName={'Wellness'}
        pressedDrawer={pressedDrawer}
        pressedRightDrawer={pressedRightDrawer}
      />
    </SafeAreaView>
  );
};

export default Wellness;

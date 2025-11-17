import React, {useCallback} from 'react';
import {Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {MainStyle} from '../../../Constant/Styles';
import MainHeaderView from '../../../Components/Common/MainHeaderView';
import {useDispatch} from 'react-redux';
import {
  drawerHandleAction,
  rightDrawerHandleAction,
} from '../../../Redux/ReducerSlices/UserSlice';

const Videos = () => {
  const dispatch = useDispatch();

  const pressedDrawer = useCallback(() => {
    dispatch(drawerHandleAction(true));
  }, []);

  const pressedRightDrawer = useCallback(() => {
    dispatch(rightDrawerHandleAction(true));
  }, []);

  return (
    <SafeAreaView style={MainStyle}>
      <MainHeaderView
        screenName={'Videos'}
        pressedDrawer={pressedDrawer}
        pressedRightDrawer={pressedRightDrawer}
      />
    </SafeAreaView>
  );
};

export default Videos;

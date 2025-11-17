import React, {useEffect} from 'react';
import {Text} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {bgColor, fontSize} from '../Constant/Fonts&Colors';
import {useDispatch, useSelector} from 'react-redux';
import {userDataAction} from '../Redux/ReducerSlices/LocalDataSlice';

const SplashScreen = props => {
  const {userData} = useSelector(state => state.localdata);

  const dispatch = useDispatch();

  // console.log('userData', userData);

  useEffect(() => {
    // dispatch(userDataAction(null));

    setTimeout(() => {
      userData == null
        ? props.navigation.replace('InitScreen')
        : props.navigation.replace('DashboardScreen');
    }, 2000);
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: bgColor.white,
      }}>
      <Text
        style={{
          color: bgColor.black,
          fontSize: fontSize.Large,
        }}>
        KSCA OTMS
      </Text>
    </SafeAreaView>
  );
};

export default SplashScreen;

import React, {useCallback, useEffect, useMemo} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Pressable,
  Image,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
} from 'react-native-reanimated';
import {useDispatch, useSelector} from 'react-redux';
import {
  drawerHandleAction,
  rightDrawerHandleAction,
} from '../../Redux/ReducerSlices/UserSlice';
import {
  bgColor,
  darkTheme,
  fontSize,
  lightTheme,
} from '../../Constant/Fonts&Colors';
import {HT, WD} from '../../Constant/Dimensions';
import {darkModeAction} from '../../Redux/ReducerSlices/LocalDataSlice';

const {width: SCREEN_WIDTH} = Dimensions.get('window');
const DRAWER_WIDTH = SCREEN_WIDTH * 0.8;

export default function DrawerRightWellness({isDrawer}) {
  const {darkMode} = useSelector(state => state.localdata);
  // console.log('dar', darkMode);

  const theme = darkMode ? darkTheme : lightTheme;

  const dispatch = useDispatch();

  const translateX = useSharedValue(DRAWER_WIDTH);

  const closeDrawer = useCallback(() => {
    translateX.value = withSpring(DRAWER_WIDTH, {damping: 15});
    setTimeout(() => {
      dispatch(rightDrawerHandleAction(false));
    }, 300);
  }, []);

  useEffect(() => {
    if (isDrawer) {
      translateX.value = withSpring(0, {damping: 18});
    }
  }, [isDrawer]);

  // Drawer animation
  const drawerStyle = useAnimatedStyle(() => ({
    transform: [{translateX: translateX.value}],
  }));

  // Dim overlay
  const overlayStyle = useAnimatedStyle(() => {
    const opacity = interpolate(translateX.value, [DRAWER_WIDTH, 0], [0, 0.5]);
    return {opacity};
  });

  const handleMode = useCallback(() => {
    dispatch(darkModeAction(!darkMode));
  }, [darkMode]);

  return (
    <>
      <Pressable style={StyleSheet.absoluteFill} onPress={closeDrawer}>
        <Animated.View
          style={[
            {
              backgroundColor: 'black',
              position: 'absolute',
              width: '100%',
              height: '100%',
            },
            overlayStyle,
          ]}
        />
      </Pressable>

      {/* Drawer */}
      <Animated.View
        style={[
          {
            position: 'absolute',
            top: 0,
            right: 0,
            width: DRAWER_WIDTH,
            height: '100%',
            backgroundColor: theme.viewColor,
          },
          drawerStyle,
        ]}>
        <View style={{height: '5%'}}></View>
        <View
          style={{
            width: '100%',
            height: '10%',
            alignItems: 'center',
            justifyContent: 'center',
            borderBottomColor: theme.textColor,
            borderBottomWidth: 0.2,
          }}>
          <View
            style={{
              width: WD(11),
              height: HT(5.5),

              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#E9F2F5',
              borderRadius: WD(3),
              position: 'absolute',
              left: WD(5),
            }}>
            <Image
              resizeMode="contain"
              style={{
                width: '55%',
                height: '55%',
                tintColor: '#107D9E',
              }}
              source={require('../../Assets/Images/loudspeaker.png')}
            />
          </View>

          <Text
            style={{
              position: 'absolute',
              left: WD(18),
              fontSize: fontSize.Large_50,
              color: theme.textColor,
            }}>
            Announcements
          </Text>

          <TouchableOpacity
            onPress={closeDrawer}
            style={{
              position: 'absolute',
              right: WD(5),
            }}>
            <Text style={{color: theme.textColor}}>✕</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </>
  );
}

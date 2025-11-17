import React, {useCallback, useEffect, useMemo} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Pressable,
  Image,
  Alert,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
} from 'react-native-reanimated';
import {useDispatch, useSelector} from 'react-redux';
import {drawerHandleAction} from '../../Redux/ReducerSlices/UserSlice';
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

export default function DrawerLeftWellness({isDrawer, logout}) {
  const {darkMode} = useSelector(state => state.localdata);
  // console.log('dar', darkMode);

  const {userData} = useSelector(state => state.localdata);

  // console.log('name', userData);

  const theme = darkMode ? darkTheme : lightTheme;
  const dispatch = useDispatch();

  const translateX = useSharedValue(-DRAWER_WIDTH);

  const closeDrawer = useCallback(() => {
    translateX.value = withSpring(-DRAWER_WIDTH, {damping: 15});
    setTimeout(() => {
      dispatch(drawerHandleAction(false));
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
    const opacity = interpolate(translateX.value, [-DRAWER_WIDTH, 0], [0, 0.5]);
    return {opacity};
  });

  const handleMode = useCallback(() => {
    dispatch(darkModeAction(!darkMode));
  }, [darkMode]);

  const logoutHandle = () => {
    translateX.value = withSpring(-DRAWER_WIDTH, {damping: 15});
    setTimeout(() => {
      dispatch(drawerHandleAction(false));
    }, 300);

    logout();
  };

  return (
    <>
      <Pressable style={StyleSheet.absoluteFill} onPress={closeDrawer}>
        <Animated.View style={[styles.overlay, overlayStyle]} />
      </Pressable>
      <View
        style={{
          height: '100%',
          position: 'absolute',
          bottom: 0,
          backgroundColor: theme.bgColor,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {/* Drawer */}
        <Animated.View
          style={[
            {
              position: 'absolute',
              top: 0,
              left: 0,
              width: DRAWER_WIDTH,
              height: '100%',
              backgroundColor: theme.viewColor,
              padding: WD(5),
            },
            drawerStyle,
          ]}>
          <TouchableOpacity onPress={closeDrawer} style={styles.closeButton}>
            <Text style={{color: theme.textColor, fontSize: fontSize.Large}}>
              ✕
            </Text>
          </TouchableOpacity>

          <View style={styles.profile}>
            <View style={styles.avatar}>
              <Text
                style={{
                  color: theme.selectedButtonColor,
                  fontSize: 22,
                  fontWeight: '600',
                  textTransform: 'capitalize',
                }}>
                {userData?.displayName?.split(' ')[0][0]}
                {userData?.displayName?.split(' ')[1][0]}
              </Text>
            </View>
            <Text
              style={{
                marginTop: HT(1),
                fontSize: 16,
                fontWeight: '600',
                color: theme.textColor,
              }}>
              {userData?.displayName}
            </Text>
          </View>

          <View style={styles.divider} />

          <TouchableOpacity style={styles.item}>
            <Image
              resizeMode="contain"
              style={{width: '20%', height: '100%', tintColor: theme.textColor}}
              source={require('../../Assets/Images/profile.png')}
            />
            <Text style={{fontSize: 20, color: theme.textColor, left: WD(2.5)}}>
              {' '}
              Profile
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.item}>
            <Image
              resizeMode="contain"
              style={{width: '20%', height: '100%', tintColor: theme.textColor}}
              source={require('../../Assets/Images/settings.png')}
            />
            <Text style={{fontSize: 20, color: theme.textColor, left: WD(2.5)}}>
              Settings
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleMode} style={styles.item}>
            {darkMode == 'undefined' || !darkMode ? (
              <Image
                resizeMode="contain"
                style={{
                  width: '20%',
                  height: '100%',
                  tintColor: theme.textColor,
                }}
                source={require(`../../Assets/Images/dark-mode.png`)}
              />
            ) : (
              <Image
                resizeMode="contain"
                style={{
                  width: '20%',
                  height: '100%',
                  tintColor: theme.textColor,
                }}
                source={require(`../../Assets/Images/light-mode.png`)}
              />
            )}
            <Text style={{fontSize: 20, color: theme.textColor, left: WD(2.5)}}>
              {darkMode == 'undefined' || !darkMode
                ? 'Dark Mode'
                : 'Light Mode'}{' '}
            </Text>
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity onPress={() => logoutHandle()} style={styles.item}>
            <Image
              resizeMode="contain"
              style={{width: '20%', height: '100%', tintColor: bgColor.red}}
              source={require('../../Assets/Images/exit.png')}
            />
            <Text style={[styles.itemText, {color: 'red'}]}>Logout</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    position: 'absolute',
    bottom: 0,
    backgroundColor: bgColor.white,
    justifyContent: 'center',
    alignItems: 'center',
  },

  menuText: {color: 'white', fontSize: 20},
  overlay: {
    backgroundColor: 'black',
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  drawer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: DRAWER_WIDTH,
    height: '100%',
    backgroundColor: 'white',
    padding: WD(5),
    // borderTopRightRadius: 16,
    // borderBottomRightRadius: 16,
  },
  closeButton: {
    position: 'absolute',
    right: WD(5),
    top: HT(6.5),
  },
  profile: {alignItems: 'center', marginTop: HT(8)},
  avatar: {
    backgroundColor: bgColor.coloured,
    width: WD(12),
    height: WD(12),
    borderRadius: WD(12) / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {color: 'white', fontSize: 22, fontWeight: '600'},
  name: {marginTop: HT(1), fontSize: 16, fontWeight: '600'},
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    marginVertical: HT(2),
  },
  item: {
    paddingVertical: HT(1),
    flexDirection: 'row',
    width: WD(30),
    height: HT(6),
    alignItems: 'center',
  },
  itemText: {fontSize: 20, color: bgColor.black, left: WD(2.5)},
});

import React, {useCallback, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HEIGHT, HT, WD, WIDTH} from '../../Constant/Dimensions';
import {bgColor, fontSize} from '../../Constant/Fonts&Colors';
import {
  Alert,
  Image,
  Platform,
  Pressable,
  StatusBar,
  TextInput,
  View,
} from 'react-native';
import Videos from './BottomTabScreens/Videos';
import Wellness from './BottomTabScreens/Wellness';
import Feedback from './BottomTabScreens/Feedback';
import DrawerLeftWellness from '../../Components/Wellness/DrawerLeftWellness';
import {useDispatch, useSelector} from 'react-redux';
import BottomSheetWellness from '../../Components/Wellness/BottomSheetWellness';
import {bottomSheetAction} from '../../Redux/ReducerSlices/UserSlice';
import DrawerRightWellness from '../../Components/Wellness/DrawerRightWellness';
import Home from './BottomTabScreens/Home';
import More from './BottomTabScreens/More';
import {userDataAction} from '../../Redux/ReducerSlices/LocalDataSlice';
import ScoutHome from './BottomTabScreens/ScoutingTabs/ScoutHome';
import Competitions from './BottomTabScreens/ScoutingTabs/Competitions';
import PlayerComparison from './BottomTabScreens/ScoutingTabs/PlayerComparison';
import RequirementTracker from './BottomTabScreens/ScoutingTabs/RequirementTracker';
import Evaluation from './BottomTabScreens/ScoutingTabs/Evaluation';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import CoachHome from './BottomTabScreens/CoachTabs/CoachHome';
import {Session} from './BottomTabScreens/CoachTabs/CoachHome/Session';
import VideoAnalysisCoach from './BottomTabScreens/CoachTabs/CoachHome/VideoAnalysisCoach';
// import FormDataPlayers from './BottomTabScreens/ScoutingTabs/ScoutHome/FormDataPlayers';

const Tab = createBottomTabNavigator();

const DashboardScreen = props => {
  const {isDrawer, isBottomSheet, isRightDrawer} = useSelector(
    state => state.user,
  );
  const {userData} = useSelector(state => state.localdata);

  const dispatch = useDispatch();

  const [open, setOpen] = useState(true);

  // console.log('rd', userData);

  const closeSheet = useCallback(() => {
    setTimeout(() => {
      dispatch(bottomSheetAction(false));
    }, 300);
  }, []);

  const logout = () => {
    dispatch(userDataAction(null));

    props.navigation.replace('InitScreen');

    // console.log('props', props.navigation.replace('InitScreen'));
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to log out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => logout(),
        },
      ],
      {cancelable: true},
    );
  };

  const screenListByRoleId = () => {
    //Scouting
    if (userData?.roleID == 6) {
      return (
        <Tab.Navigator
          initialRouteName={'Home'}
          safeAreaInsets={{bottom: 0}}
          sceneContainerStyle={{
            // height: HT(20),
            width: WIDTH,
            backgroundColor: bgColor.white,
            // borderRadius: 100,
          }}
          screenOptions={{
            headerShown: false,
            tabBarItemStyle: {
              // backgroundColor: bgColor.white,
              height: HT(8),
              // width: WD(60),
              // width: WD(90),
              // borderTopColor: bgColor.divider_light,
              // borderTopWidth: 0.2,
            },
            tabBarStyle: {
              height: Platform.OS == 'android' ? HT(7) : HT(8),
              width: WD(90),
              alignSelf: 'center',
              bottom: HT(3),
              backgroundColor: bgColor.white,
              borderRadius: WD(15),
              shadowColor: bgColor.grey,
              shadowOffset: {width: 0.5, height: 0.5},
              shadowOpacity: 0.3,
              paddingLeft: 5,
              paddingRight: 5,
              // overflow: 'hidden',

              //   alignSelf:'center'
            },
          }}>
          <Tab.Screen
            key={'home'}
            name="Home"
            component={ScoutHome}
            options={{
              tabBarIcon: ({focused, color}) => {
                return (
                  <View
                    style={{
                      width: WD(10),
                      height: HT(6),
                      top: HT(1.8),
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <View
                      style={{
                        width: '100%',
                        height: '100%',
                      }}>
                      {focused ? (
                        <Image
                          resizeMode="contain"
                          style={{
                            width: '70%',
                            height: '50%',
                            alignSelf: 'center',
                            tintColor: bgColor.coloured,
                          }}
                          source={require('../../Assets/Images/homefill.png')}
                        />
                      ) : (
                        <Image
                          resizeMode="contain"
                          style={{
                            width: '70%',
                            height: '50%',
                            alignSelf: 'center',
                            tintColor: bgColor.icons_tertiary,
                          }}
                          source={require('../../Assets/Images/home.png')}
                        />
                      )}
                    </View>
                  </View>
                );
              },
              tabBarInactiveTintColor: bgColor.icons_tertiary,
              tabBarActiveTintColor: bgColor.coloured,
              tabBarLabelStyle: {
                bottom: (HEIGHT / 100) * 0.3,
                fontSize: fontSize.verySmall,
                // left: WD(1),
                // fontFamily: fontFamily.MontserratReg,
              },
              tabBarLabel: Platform.isPad ? '' : 'Home',
            }}
            // listeners={({navigation, route}) => ({
            //   tabPress: e => {
            //     tabIdFunc(1);
            //   },
            // })}
          />
          <Tab.Screen
            key={'competitions'}
            name="Competitions"
            component={Competitions}
            options={{
              tabBarIcon: ({focused, color}) => {
                return (
                  <View
                    style={{
                      width: WD(10),
                      height: HT(6),

                      top: HT(1.4),
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <View
                      style={{
                        width: '100%',
                        height: '100%',
                      }}>
                      {focused ? (
                        <Image
                          resizeMode="contain"
                          style={{
                            width: '70%',
                            height: '60%',
                            alignSelf: 'center',
                            tintColor: bgColor.coloured,
                          }}
                          source={require('../../Assets/Images/trophy.png')}
                        />
                      ) : (
                        <Image
                          resizeMode="contain"
                          style={{
                            width: '70%',
                            height: '60%',
                            alignSelf: 'center',
                            tintColor: bgColor.icons_tertiary,
                          }}
                          source={require('../../Assets/Images/trophy.png')}
                        />
                      )}
                    </View>
                  </View>
                );
              },
              tabBarInactiveTintColor: bgColor.icons_tertiary,
              tabBarActiveTintColor: bgColor.coloured,
              tabBarLabelStyle: {
                bottom: (HEIGHT / 100) * 0.5,
                fontSize: fontSize.verySmall,
                // fontFamily: fontFamily.MontserratReg,
              },
              tabBarLabel: Platform.isPad ? '' : 'Competitions',
            }}
          />

          <Tab.Screen
            key={'compare'}
            name="Compare"
            component={PlayerComparison}
            options={{
              tabBarIcon: ({focused, color}) => {
                return (
                  <View
                    style={{
                      width: WD(10),
                      height: HT(6),
                      top: HT(1.4),
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <View
                      style={{
                        width: '100%',
                        height: '100%',
                      }}>
                      {focused ? (
                        <Image
                          resizeMode="contain"
                          style={{
                            width: '70%',
                            height: '60%',
                            alignSelf: 'center',
                            tintColor: bgColor.coloured,
                          }}
                          source={require('../../Assets/Images/compare.png')}
                        />
                      ) : (
                        <Image
                          resizeMode="contain"
                          style={{
                            width: '70%',
                            height: '60%',
                            alignSelf: 'center',
                            tintColor: bgColor.icons_tertiary,
                          }}
                          source={require('../../Assets/Images/compare.png')}
                        />
                      )}
                    </View>
                  </View>
                );
              },
              tabBarInactiveTintColor: bgColor.icons_tertiary,
              tabBarActiveTintColor: bgColor.coloured,
              tabBarLabelStyle: {
                bottom: (HEIGHT / 100) * 0.5,
                fontSize: fontSize.verySmall,
                // fontFamily: fontFamily.MontserratReg,
              },
              tabBarLabel: Platform.isPad ? '' : 'Compare',
            }}
          />
          <Tab.Screen
            key={'tracker'}
            name="Req Tracker"
            component={RequirementTracker}
            options={{
              tabBarIcon: ({focused, color}) => {
                return (
                  <View
                    style={{
                      width: WD(10),
                      height: HT(6),
                      top: HT(0.3),
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Image
                      resizeMode="contain"
                      style={{
                        width: '70%',
                        height: '60%',
                        alignSelf: 'center',
                        tintColor: focused ? bgColor.coloured : bgColor.grey,
                      }}
                      source={require('../../Assets/Images/tracker.png')}
                    />
                  </View>
                );
              },
              tabBarInactiveTintColor: bgColor.icons_tertiary,
              tabBarActiveTintColor: bgColor.coloured,
              tabBarLabelStyle: {
                bottom: (HEIGHT / 100) * 0.7,
                fontSize: fontSize.verySmall,
                // left: WD(1),
                // fontFamily: fontFamily.MontserratReg,
              },
              tabBarLabel: Platform.isPad ? '' : 'Req Tracker',
            }}
            // listeners={({navigation, route}) => ({
            //   tabPress: e => {
            //     tabIdFunc(1);
            //   },
            // })}
          />
          <Tab.Screen
            key={'evaluation'}
            name="Evaluation"
            component={Evaluation}
            options={{
              tabBarIcon: ({focused, color}) => {
                return (
                  <View
                    style={{
                      width: WD(10),
                      height: HT(6),
                      top: HT(0.3),
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Image
                      resizeMode="contain"
                      style={{
                        width: '70%',
                        height: '60%',
                        alignSelf: 'center',
                        tintColor: focused ? bgColor.coloured : bgColor.grey,
                      }}
                      source={require('../../Assets/Images/check-list.png')}
                    />
                  </View>
                );
              },
              tabBarInactiveTintColor: bgColor.icons_tertiary,
              tabBarActiveTintColor: bgColor.coloured,
              tabBarLabelStyle: {
                bottom: (HEIGHT / 100) * 0.7,
                fontSize: fontSize.verySmall,
                // left: WD(1),
                // fontFamily: fontFamily.MontserratReg,
              },
              tabBarLabel: Platform.isPad ? '' : 'Evaluation',
            }}
            // listeners={({navigation, route}) => ({
            //   tabPress: e => {
            //     tabIdFunc(1);
            //   },
            // })}
          />
        </Tab.Navigator>
      );
    }

    // Coach
    else if (userData?.roleID == 3) {
      return (
        <Tab.Navigator
          initialRouteName={'Home'}
          safeAreaInsets={{bottom: 0}}
          sceneContainerStyle={{
            // height: HT(20),
            width: WIDTH,
            backgroundColor: bgColor.white,
            // borderRadius: 100,
          }}
          screenOptions={{
            headerShown: false,
            tabBarItemStyle: {
              // backgroundColor: bgColor.white,
              height: HT(7),
              // width: WD(60),
              // width: WD(90),
              // borderTopColor: bgColor.divider_light,
              // borderTopWidth: 0.2,
            },
            tabBarStyle: {
              height: Platform.OS == 'android' ? HT(7) : HT(8),
              width: WD(90),
              alignSelf: 'center',
              bottom: HT(3),
              backgroundColor: bgColor.white,
              borderRadius: WD(15),
              shadowColor: bgColor.grey,
              shadowOffset: {width: 0.5, height: 0.5},
              shadowOpacity: 0.3,
              paddingLeft: 5,
              paddingRight: 5,
              // overflow: 'hidden',

              //   alignSelf:'center'
            },
          }}>
          <Tab.Screen
            name="Home"
            component={CoachHome}
            options={{
              tabBarIcon: ({focused, color}) => {
                return (
                  <View
                    style={{
                      width: WD(10),
                      height: HT(6),
                      top: HT(1.8),
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <View
                      style={{
                        width: '100%',
                        height: '100%',
                      }}>
                      {focused ? (
                        <Image
                          resizeMode="contain"
                          style={{
                            width: '70%',
                            height: '50%',
                            alignSelf: 'center',
                            tintColor: bgColor.coloured,
                          }}
                          source={require('../../Assets/Images/homefill.png')}
                        />
                      ) : (
                        <Image
                          resizeMode="contain"
                          style={{
                            width: '70%',
                            height: '50%',
                            alignSelf: 'center',
                            tintColor: bgColor.icons_tertiary,
                          }}
                          source={require('../../Assets/Images/home.png')}
                        />
                      )}
                    </View>
                  </View>
                );
              },
              tabBarInactiveTintColor: bgColor.icons_tertiary,
              tabBarActiveTintColor: bgColor.coloured,
              tabBarLabelStyle: {
                bottom: (HEIGHT / 100) * 0.3,
                fontSize: fontSize.verySmall,
                // left: WD(1),
                // fontFamily: fontFamily.MontserratReg,
              },
              tabBarLabel: Platform.isPad ? '' : 'Home',
            }}
            // listeners={({navigation, route}) => ({
            //   tabPress: e => {
            //     tabIdFunc(1);
            //   },
            // })}
          />
          <Tab.Screen
            name="Session"
            component={Session}
            options={{
              tabBarIcon: ({focused, color}) => {
                return (
                  <View
                    style={{
                      width: WD(10),
                      height: HT(6),

                      top: HT(1.4),
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <View
                      style={{
                        width: '100%',
                        height: '100%',
                      }}>
                      {focused ? (
                        <Image
                          resizeMode="contain"
                          style={{
                            width: '70%',
                            height: '60%',
                            alignSelf: 'center',
                            tintColor: bgColor.coloured,
                          }}
                          source={require('../../Assets/Images/check-list.png')}
                        />
                      ) : (
                        <Image
                          resizeMode="contain"
                          style={{
                            width: '70%',
                            height: '60%',
                            alignSelf: 'center',
                            tintColor: bgColor.icons_tertiary,
                          }}
                          source={require('../../Assets/Images/check-list.png')}
                        />
                      )}
                    </View>
                  </View>
                );
              },
              tabBarInactiveTintColor: bgColor.icons_tertiary,
              tabBarActiveTintColor: bgColor.coloured,
              tabBarLabelStyle: {
                bottom: (HEIGHT / 100) * 0.5,
                fontSize: fontSize.verySmall,
                // fontFamily: fontFamily.MontserratReg,
              },
              tabBarLabel: Platform.isPad ? '' : 'Session',
            }}
          />
          <Tab.Screen
            name="Video Analysis"
            component={VideoAnalysisCoach}
            options={{
              tabBarIcon: ({focused, color}) => {
                return (
                  <View
                    style={{
                      width: WD(10),
                      height: HT(6),

                      top: HT(1.4),
                      // left: WD(0.5),
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <View
                      style={{
                        width: '100%',
                        height: '100%',
                      }}>
                      {focused ? (
                        <Image
                          resizeMode="contain"
                          style={{
                            width: '70%',
                            height: '60%',
                            alignSelf: 'center',
                            tintColor: bgColor.coloured,
                          }}
                          source={require('../../Assets/Images/video.png')}
                        />
                      ) : (
                        <Image
                          resizeMode="contain"
                          style={{
                            width: '70%',
                            height: '60%',
                            alignSelf: 'center',
                            tintColor: bgColor.icons_tertiary,
                          }}
                          source={require('../../Assets/Images/video.png')}
                        />
                      )}
                    </View>
                  </View>
                );
              },
              tabBarInactiveTintColor: bgColor.icons_tertiary,
              tabBarActiveTintColor: bgColor.coloured,
              tabBarLabelStyle: {
                bottom: (HEIGHT / 100) * 0.5,
                fontSize: fontSize.verySmall,
                // fontFamily: fontFamily.MontserratReg,
              },
              tabBarLabel: Platform.isPad ? '' : 'Video Analysis',
            }}
          />
        </Tab.Navigator>
      );
    }
  };

  return (
    <>
      <StatusBar backgroundColor={bgColor.coloured} />
      <View style={{flex: 1, backgroundColor: bgColor.bg_globe}}>
        {screenListByRoleId()}

        {isDrawer ? (
          <DrawerLeftWellness logout={handleLogout} isDrawer={isDrawer} />
        ) : null}

        {isRightDrawer ? (
          <DrawerRightWellness isDrawer={isRightDrawer} />
        ) : null}

        {isBottomSheet ? (
          <BottomSheetWellness
            isOpen={isBottomSheet}
            closeSheet={() => closeSheet()}
          />
        ) : null}
      </View>
    </>
  );
};

export default DashboardScreen;

import React, {useCallback} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HEIGHT, HT, WD, WIDTH} from '../../Constant/Dimensions';
import {bgColor, fontSize} from '../../Constant/Fonts&Colors';
import {Alert, Image, Platform, StatusBar, View} from 'react-native';
import Competitions from './BottomTabScreens/Home';
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

const Tab = createBottomTabNavigator();

const DashboardScreen = props => {
  const {isDrawer, isBottomSheet, isRightDrawer} = useSelector(
    state => state.user,
  );
  const {userData} = useSelector(state => state.localdata);

  const dispatch = useDispatch();

  // console.log('rd', userData);

  const closeSheet = useCallback(() => {
    setTimeout(() => {
      dispatch(bottomSheetAction(false));
    }, 300);
  }, []);

  const logout = () => {
    dispatch(userDataAction(null));
    props.navigation.replace('InitScreen');
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

  return (
    <>
      <StatusBar backgroundColor={bgColor.coloured} />
      <View style={{flex: 1, backgroundColor: bgColor.bg_globe}}>
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
            component={Home}
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
            name="Videos"
            component={Videos}
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
                          source={require('../../Assets/Images/videofill.png')}
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
              tabBarLabel: Platform.isPad ? '' : 'Videos',
            }}
          />

          {userData?.roleId == 4 ? (
            <Tab.Screen
              name="Wellness"
              component={Wellness}
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
                            source={require('../../Assets/Images/heartfill.png')}
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
                            source={require('../../Assets/Images/heart.png')}
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
                tabBarLabel: Platform.isPad ? '' : 'Wellness',
              }}
            />
          ) : null}

          <Tab.Screen
            name="Feedback"
            component={Feedback}
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
                          source={require('../../Assets/Images/chatfill.png')}
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
                          source={require('../../Assets/Images/chat.png')}
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
              tabBarLabel: Platform.isPad ? '' : 'Feedback',
            }}
          />
          <Tab.Screen
            name="More"
            component={More}
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
                      source={require('../../Assets/Images/more.png')}
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
              tabBarLabel: Platform.isPad ? '' : 'More',
            }}
            // listeners={({navigation, route}) => ({
            //   tabPress: e => {
            //     tabIdFunc(1);
            //   },
            // })}
          />
        </Tab.Navigator>

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

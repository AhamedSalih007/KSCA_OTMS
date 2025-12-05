import React, {useCallback, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {bgColor, fontSize} from '../../../../../Constant/Fonts&Colors';
import MainHeaderView from '../../../../../Components/Common/MainHeaderView';
import {useDispatch, useSelector} from 'react-redux';
import {
  drawerHandleAction,
  rightDrawerHandleAction,
} from '../../../../../Redux/ReducerSlices/UserSlice';
import {FlatList, Image, Pressable, Text, View} from 'react-native';
import {HT, WD, WIDTH} from '../../../../../Constant/Dimensions';

export const Session = props => {
  const {session, players, coaches} = useSelector(state => state.coachdata);

  const dispatch = useDispatch();

  const pressedDrawer = useCallback(() => {
    dispatch(drawerHandleAction(true));
  }, []);

  const pressedRightDrawer = useCallback(() => {
    dispatch(rightDrawerHandleAction(true));
  }, []);

  const onPressSession = (item, index) => {
    props.navigation.navigate('SessionPlayers', {session: item});
  };

  const renderSession = (item, index) => {
    return (
      <Pressable
        onPress={() => onPressSession(item, index)}
        style={{
          width: WD(90),
          height: HT(10),
          backgroundColor: bgColor.white,
          alignItems: 'center',
          justifyContent: 'center',
          borderColor: '#ddd',
          borderWidth: 1,
          borderRadius: WD(3),
          marginTop: HT(1),
          padding: WD(1),
        }}>
        <View
          style={{
            width: WD(11),
            height: WD(11),
            borderRadius: WD(11) / 2,
            overflow: 'hidden',
            //   backgroundColor: item.color,
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            left: WD(2.5),
          }}>
          <View
            style={{
              width: '100%',
              height: '100%',
              position: 'absolute',
              backgroundColor: bgColor.coloured,
              opacity: 0.1,
            }}
          />

          <Image
            style={{width: '60%', height: '60%', tintColor: bgColor.coloured}}
            source={require('../../../../../Assets/Images/cricket.png')}
          />
        </View>

        <View
          style={{
            width: '70%',
            height: '100%',
            alignItems: 'flex-start',
            justifyContent: 'space-around',
            marginLeft: WD(4),
          }}>
          <Text
            style={{
              color: bgColor.black,
              fontSize: fontSize.Medium,
              fontWeight: '700',
            }}>
            {item.SessionName}
          </Text>

          <Text
            style={{
              color: bgColor.lightGrey,
              fontSize: fontSize.lightMedium_50,
            }}>
            {item.SessionDateTime}
          </Text>

          <View
            style={{
              width: '100%',
              height: '30%',
              //   backgroundColor: bgColor.red,
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              padding: WD(1),
            }}>
            <View
              style={{
                width: '50%',
                height: '100%',
                alignItems: 'center',
                justifyContent: 'flex-start',
                flexDirection: 'row',
              }}>
              <Image
                resizeMode="contain"
                style={{
                  width: '10%',
                  height: '100%',
                  tintColor: bgColor.lightGrey,
                }}
                source={require('../../../../../Assets/Images/user2.png')}
              />
              <Text style={{left: WD(2), color: bgColor.lightGrey}}>
                {item.NoOfPlayersInSession} Players
              </Text>
            </View>
            <View
              style={{
                width: '50%',
                height: '100%',
                alignItems: 'center',
                justifyContent: 'flex-start',
                flexDirection: 'row',
              }}>
              <Image
                resizeMode="contain"
                style={{
                  width: '10%',
                  height: '100%',
                  tintColor: bgColor.lightGrey,
                }}
                source={require('../../../../../Assets/Images/ball2.png')}
              />
              <Text style={{left: WD(2), color: bgColor.lightGrey}}>
                {item.NoOfDeliveries} Deliveries
              </Text>
            </View>
          </View>
        </View>

        <Image
          resizeMode="contain"
          style={{
            width: '5%',
            height: '60%',
            position: 'absolute',
            right: WD(4),
            transform: [{rotate: '-90deg'}],
            opacity: 0.7,
          }}
          source={require('../../../../../Assets/Images/down-arrow.png')}
        />
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: bgColor.bg_globe}}>
      <MainHeaderView
        screenName={'Session'}
        pressedDrawer={pressedDrawer}
        pressedRightDrawer={pressedRightDrawer}
        // onTapSearch={() => searchRef.current?.open()}
      />

      <View style={{width: WIDTH, height: HT(93), alignItems: 'center'}}>
        <FlatList
          style={{top: HT(1)}}
          data={session}
          renderItem={({item, index}) => renderSession(item, index)}
        />
      </View>
    </SafeAreaView>
  );
};

import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, Image, Pressable, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {bgColor, fontSize} from '../../../../Constant/Fonts&Colors';
import MainHeaderView from '../../../../Components/Common/MainHeaderView';
import {useDispatch, useSelector} from 'react-redux';
import {
  drawerHandleAction,
  rightDrawerHandleAction,
} from '../../../../Redux/ReducerSlices/UserSlice';
import {GetReqTrack_ScoutingAPI} from '../../../../API/ScoutingAPI';
import {HT, WD, WIDTH} from '../../../../Constant/Dimensions';
import moment from 'moment';

const RequirementTracker = props => {
  const {userData, darkMode} = useSelector(state => state.localdata);
  const dispatch = useDispatch();

  const [trackerData, setTrackerData] = useState([]);

  // console.log('t', userData);

  const pressedDrawer = useCallback(() => {
    dispatch(drawerHandleAction(true));
  }, []);

  const pressedRightDrawer = useCallback(() => {
    dispatch(rightDrawerHandleAction(true));
  }, []);

  useEffect(() => {
    GetRequirementData();
  }, []);

  const GetRequirementData = async () => {
    const response = await GetReqTrack_ScoutingAPI();

    if (response != 'Error') {
      console.log('resReq', response?.Data);
      setTrackerData(response?.Data);
    } else {
    }
  };

  const onOpen = item => {
    // console.log('item', item);

    const data = {
      userId: userData?.userID,
      roleId: userData?.roleID,
      reqId: item.ID,
      title: item.Title,
      user: item.UserName,
      description: item.Description,
      time: item.CreatedTime,
    };

    props.navigation.navigate('RequirementTracker2', {data});
  };

  const renderReqTracker = (item, index) => {
    return (
      <View
        style={{
          width: WD(90),
          padding: HT(2),
          alignItems: 'center',
          justifyContent: 'flex-start',
          shadowColor: bgColor.grey,
          shadowOffset: {width: 0, height: 2},
          shadowOpacity: 0.2,
          elevation: 2,
          backgroundColor: bgColor.white,
          borderRadius: WD(2),
          marginTop: HT(2),
        }}>
        <View style={{flexDirection: 'row'}}>
          <Text
            style={{
              color: bgColor.black,
              fontSize: fontSize.Large_50,
              fontWeight: '600',
              width: '72%',
            }}>
            {item.Title}
          </Text>

          <Pressable
            onPress={() => onOpen(item)}
            style={{
              width: '28%',
              height: '70%',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#DCFCE7',
              borderRadius: WD(10),
              flexDirection: 'row',
            }}>
            <View
              style={{
                width: WD(2),
                height: WD(2),
                borderRadius: WD(2) / 2,
                backgroundColor: bgColor.green,
                right: WD(2),
              }}
            />
            <Text>OPEN</Text>
          </Pressable>
        </View>

        <Text
          style={{
            color: bgColor.black,
            fontSize: fontSize.Medium,
            paddingTop: HT(1),
            paddingRight: HT(1),
          }}>
          {item.Description}
        </Text>

        <View
          style={{
            width: '100%',
            // height: HT(),
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            paddingTop: HT(1.2),
            paddingLeft: HT(0.2),
            borderTopColor: bgColor.grey,
            borderTopWidth: 0.2,
            marginTop: HT(1.5),
          }}>
          <Text
            style={{
              color: bgColor.black,
              textTransform: 'capitalize',
              opacity: 0.7,
            }}>
            {item.UserName} (
            {moment(item.CreatedTime, 'MMM DD YYYY h:mmA').fromNow()})
          </Text>
          <Image
            resizeMode="contain"
            style={{
              width: WD(4),
              height: WD(4),
              tintColor: bgColor.black,
              left: WD(2),
              opacity: 0.7,
            }}
            source={require('../../../../Assets/Images/profile.png')}
          />
          <Text
            style={{
              color: bgColor.black,
              opacity: 0.7,
              left: WD(3),
            }}>
            {item.Suggestions} suggestions
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: bgColor.bg_globe}}>
      <MainHeaderView
        screenName={'Requirement Tracker'}
        pressedDrawer={pressedDrawer}
        pressedRightDrawer={pressedRightDrawer}
      />

      <View style={{width: WIDTH, height: HT(93), alignItems: 'center'}}>
        <FlatList
          // contentContainerStyle={{top: HT(2)}}
          data={trackerData}
          renderItem={({item, index}) => renderReqTracker(item, index)}
        />
      </View>
    </SafeAreaView>
  );
};

export default RequirementTracker;

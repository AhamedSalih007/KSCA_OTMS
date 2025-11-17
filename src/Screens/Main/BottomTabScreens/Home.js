import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, Image, Pressable, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {MainStyle} from '../../../Constant/Styles';
import MainHeaderView from '../../../Components/Common/MainHeaderView';
import {useDispatch, useSelector} from 'react-redux';
import {
  bottomSheetAction,
  drawerHandleAction,
  rightDrawerHandleAction,
} from '../../../Redux/ReducerSlices/UserSlice';
import SubHeaderView from '../../../Components/Common/SubHeaderView';
import FloatingButton from '../../../Components/Wellness/FloatingButton';
import {HT, WD, WIDTH} from '../../../Constant/Dimensions';
import {
  bgColor,
  darkTheme,
  fontSize,
  lightTheme,
} from '../../../Constant/Fonts&Colors';
import {GetPlayerFormAPI} from '../../../API/PlayerAPI';
import moment from 'moment';
import {coachData, WellnessData} from '../../../Constant/FormsData';
import {today} from '../../../Constant/Date';
import {useFocusEffect} from '@react-navigation/native';
import {
  GetPlayers_CoachAPI,
  GetTagFields_CoachAPI,
  GetUploadedVideos_CoachAPI,
} from '../../../API/CoachAPI';
import {tagListAction} from '../../../Redux/ReducerSlices/LocalDataSlice';

const Home = props => {
  const {userData, darkMode} = useSelector(state => state.localdata);
  // console.log('dar', darkMode);

  const theme = darkMode ? darkTheme : lightTheme;

  const dispatch = useDispatch();

  // console.log('u', userData);

  const [headerArray, setHeaderArray] = useState([
    {name: 'All'},
    {name: 'Wellness'},
    {name: 'Performance'},
  ]);

  const [players, setPlayers] = useState({});

  const [videos, setVideos] = useState([]);

  const [tagList, setTagList] = useState({});

  const [currentIndex, setCurrentIndex] = useState(0);

  const [isRefresh, setIsRefresh] = useState(false);

  const homeData =
    userData?.roleID == 4
      ? JSON.parse(JSON.stringify(WellnessData))
      : coachData;

  const [wellnessArray, setWellnessArray] = useState(homeData);

  const [form, setForm] = useState([]);

  useEffect(() => {
    //Coach
    if (userData?.roleID == 3) {
      getCoachData();
    }
  }, []);

  const getCoachData = async () => {
    const playersRes = await GetPlayers_CoachAPI(userData?.userID);

    if (playersRes != 'Error') {
      // console.log('playersRes', playersRes?.Data);
      setPlayers(playersRes?.Data);
    } else {
      console.log('players res failed');
    }

    const tagRes = await GetTagFields_CoachAPI();

    // console.log('tagRes', tagRes);

    if (tagRes != 'Error') {
      // setTagList(tagRes?.Data);
      dispatch(tagListAction(tagRes?.Data));
    } else {
      console.log('tag res failed');
    }
  };

  useFocusEffect(
    useCallback(() => {
      // console.log('Screen is focused');
      // Player
      if (userData.roleId == 4) {
        getForm(false);
      }
      // Coach
      else {
        getUploadedVideos();
      }

      // return () => {
      //   console.log('Screen is unfocused');
      // };
    }, []),
  );

  const getUploadedVideos = async () => {
    // console.log('called tags');

    const videosRes = await GetUploadedVideos_CoachAPI(userData?.userID);

    if (videosRes != 'Error') {
      console.log('videoRes', videosRes?.Data?.UploadedVideos.length);
      setVideos(videosRes?.Data?.UploadedVideos);
    } else {
      console.log('video res failed', videosRes);
    }
  };

  const getForm = async isRef => {
    isRef ? setIsRefresh(true) : null;
    const date = moment().format('YYYY-MM-DD');

    const response = await GetPlayerFormAPI(userData.userID, date);

    // console.log('res', response);

    if (response != 'Error') {
      // console.log('res', response.Data.length);
      setForm(response.Data);
      if (response.Data.length != 0) {
        let newData = [...wellnessArray];

        newData[0].text1 = 'Completed. Good Job!';
        newData[0].buttonText = 'Completed';
        newData[0].buttonBgColor = '#DCFCE7';
        newData[0].buttonTextColor = '#1BC458';

        setWellnessArray(newData);
        setIsRefresh(false);
      } else {
        let newData = [...wellnessArray];

        newData[0].text1 = 'Tap to complete your check-in';
        newData[0].buttonText = 'incomplete';
        newData[0].buttonBgColor = '#FEF6EA';
        newData[0].buttonTextColor = '#F59E0B';

        setWellnessArray(newData);
        isRef ? setIsRefresh(false) : null;
      }
    } else {
      let newData = [...wellnessArray];

      newData[0].text1 = 'Tap to complete your check-in';
      newData[0].buttonText = 'incomplete';
      newData[0].buttonBgColor = '#FEF6EA';
      newData[0].buttonTextColor = '#F59E0B';

      setWellnessArray(newData);
      isRef ? setIsRefresh(false) : null;
    }
  };

  const pressedDrawer = useCallback(() => {
    dispatch(drawerHandleAction(true));
  }, []);

  const pressedRightDrawer = useCallback(() => {
    dispatch(rightDrawerHandleAction(true));
  }, []);

  const onChangeIndex = useCallback(index => {
    setCurrentIndex(index);
    //  ALL
    if (index == 0) {
      setWellnessArray(wellnessArray);
    }
    //  Wellness only
    else if (index == 1) {
      const filterData = wellnessArray.filter(d => d.category == 'wellness');

      setWellnessArray(filterData);
    }
    //  Performance only
    else {
      const filterData = wellnessArray.filter(d => d.category == 'performance');

      setWellnessArray(filterData);
    }
  }, []);

  const openSheetHandle = () => {
    dispatch(bottomSheetAction(true));
  };

  const pressedCardHandle = (item, index) => {
    // console.log('item', item, index);
    //PLAYER
    if (userData?.roleID == 4) {
      const prevForm = form;

      if (item.name == 'Daily Wellness') {
        props.navigation.navigate('DailyWellnessForm', {
          selectedDate: today,
          previousForm: prevForm,
        });
      }
    }
    // COACH
    else if (userData?.roleID == 3) {
      if (item.name == 'Video Analysis') {
        console.log('vid', videos.length);
        if (videos.length != 0) {
          // props.navigation.navigate('VideoMain', {videos, tagList});
          props.navigation.navigate('VideosHome', {videos, tagList});
        } else {
          alert('No videos uploaded');
        }
      } else if (item.name == 'Assigned Players') {
        props.navigation.navigate('AssignedPlayers_Coach', {players});
      }
    }
  };

  const renderItem = useCallback(
    (item, index) => {
      return (
        <Pressable
          onPress={() => pressedCardHandle(item, index)}
          style={{
            width: WD(90),
            height: item.height,
            backgroundColor: bgColor.white,
            borderRadius: WD(2),
            borderWidth: 0.18,
            borderColor: item.iconColor,
            marginTop: HT(1),
            shadowColor: item.iconColor,
            shadowOffset: {width: 0.5, height: 0.5},
            shadowOpacity: 0.18,
            flexDirection: 'row',
            padding: HT(1.5),
          }}>
          <View
            style={{
              width: WD(12),
              height: HT(6),

              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: item.colorBg,
              borderRadius: WD(3),
            }}>
            <Image
              resizeMode="contain"
              style={{
                width: '70%',
                height: item.id == 2 ? '50%' : '60%',
                tintColor: item.iconColor,
              }}
              source={item.image}
            />
          </View>
          <View style={{width: '5%'}} />
          <View
            style={{
              width: '80%',
              height: '100%',
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
              // backgroundColor: 'red',
            }}>
            {item.name == 'Daily Wellness' && item.buttonText != 'Completed' ? (
              <Image
                resizeMode="contain"
                style={{
                  width: '10%',
                  height: '18%',
                  tintColor: item.buttonTextColor,
                  position: 'absolute',
                  right: 0,
                  top: 0,
                }}
                source={require('../../../Assets/Images/info.png')}
              />
            ) : null}
            <Text
              style={{
                color: bgColor.black,
                fontSize: fontSize.Large_50,
                fontWeight: 'bold',
              }}>
              {item.name}
            </Text>
            <Text
              style={{
                color: bgColor.grey,
                fontSize: fontSize.Medium,
                paddingTop: 10,
                width: '90%',
              }}>
              {item.text1}
            </Text>
            <Text
              style={{
                color: bgColor.grey,
                fontSize: fontSize.Medium,
                paddingTop: 10,
                width: '90%',
              }}>
              {item.text2}
            </Text>

            {item.name == 'Wellness Summary' ? (
              <>
                <View
                  style={{
                    width: '90%',
                    height: '7%',
                    backgroundColor: '#E8EEF1',
                    bottom: HT(1),
                    borderRadius: WD(2),
                    overflow: 'hidden',
                  }}>
                  <View
                    style={{
                      height: '100%',
                      width: '30%',
                      backgroundColor: '#11B981',
                    }}
                  />
                </View>

                <Text style={{color: '#107D9E', fontSize: fontSize.Medium}}>
                  View Details →
                </Text>
              </>
            ) : null}

            {item.button ? (
              <View
                style={{
                  width: '45%',
                  height: index == 0 ? '30%' : '20%',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  backgroundColor: item.buttonBgColor,
                  flexDirection: 'row',
                  borderRadius: WD(3),
                  paddingHorizontal: WD(0.8),
                  bottom: 0,
                  position: 'absolute',
                }}>
                <Image
                  resizeMode="contain"
                  style={{
                    width: '25%',
                    height: '60%',
                    tintColor: item.buttonTextColor,
                  }}
                  source={item.buttonImage}
                />
                <Text style={{color: item.buttonTextColor}}>
                  {item.buttonText}
                </Text>
              </View>
            ) : null}
          </View>
        </Pressable>
      );
    },
    [currentIndex, wellnessArray, form, videos, players],
  );

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: theme.bgColor}}>
      <MainHeaderView
        screenName={'Home'}
        pressedDrawer={pressedDrawer}
        pressedRightDrawer={pressedRightDrawer}
      />

      {userData?.roleID == 4 ? (
        <SubHeaderView
          dataArray={headerArray}
          currentIndex={currentIndex}
          onChangeIndex={index => onChangeIndex(index)}
        />
      ) : null}

      <View style={{width: WIDTH, height: HT(86)}}>
        <FlatList
          refreshing={isRefresh}
          onRefresh={() => getForm(true)}
          contentContainerStyle={{alignItems: 'center', top: HT(0.5)}}
          data={wellnessArray}
          renderItem={({item, index}) => renderItem(item, index)}
          ListFooterComponent={() => <View style={{height: HT(30)}} />}
        />
      </View>

      {userData?.roleID == 4 ? (
        <FloatingButton pressedFloating={openSheetHandle} />
      ) : null}
    </SafeAreaView>
  );
};

export default Home;

import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  FlatList,
  Pressable,
  SafeAreaView,
  View,
  Text,
  Image,
  TextInput,
} from 'react-native';
import MainHeaderView from '../../../../Components/Common/MainHeaderView';
import {useDispatch, useSelector} from 'react-redux';
import {
  bgColor,
  darkTheme,
  fontSize,
  lightTheme,
} from '../../../../Constant/Fonts&Colors';
import {
  drawerHandleAction,
  rightDrawerHandleAction,
} from '../../../../Redux/ReducerSlices/UserSlice';
import {HT, WD, WIDTH} from '../../../../Constant/Dimensions';
import DataCard from '../../../../Components/Scouting/Cards/DataCard';
import MatchCard from '../../../../Components/Scouting/Cards/MatchCard';
import {
  GetAssignedMatches_ScoutingAPI,
  GetAssignedMatchesScoutingAPI,
  GetCompByMatchType_ScoutingAPI,
  GetDashboardStats_ScoutingAPI,
  GetFormByIndividual_ScoutingAPI,
  GetFormEntry_ScoutingAPI,
  SearchPlayer_ScoutingAPI,
} from '../../../../API/ScoutingAPI';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import AnimatedSearchBar from '../../../../Components/Common/AnimatedSearchBar';
import {useFocusEffect} from '@react-navigation/native';

const ScoutHome = props => {
  const dispatch = useDispatch();
  const searchRef = useRef();
  const {userData, darkMode} = useSelector(state => state.localdata);
  // console.log('dar', userData);

  const theme = darkMode ? darkTheme : lightTheme;

  const [status, setStatus] = useState('Live');

  const [cardList, setCardList] = useState([
    {
      title: 'Competitions Covered',
      value: 5,
      icon: 'trophy',
      color: '#FCD34D',
    },
    {
      title: 'Onsite Days',
      value: 0,
      icon: 'clock',
      color: '#A7F3D0',
    },
    {
      title: 'Forms',
      value: 50,
      icon: 'document',
      color: '#BFDBFE',
    },
    {
      title: 'Reports Received This Week',
      value: 0,
      icon: 'report',
      color: '#FDE68A',
    },
  ]);

  const [open, setOpen] = useState(false);

  const [matches, setMatches] = useState([]);
  const [filteredMatches, setFilteredMatches] = useState([]);
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    getAssignedMatches();
    getDashStats();
  }, []);

  const getDashStats = async () => {
    const responseStats = await GetDashboardStats_ScoutingAPI(userData?.userID);

    if (responseStats != 'Error') {
      // console.log('res', responseStats);

      if (responseStats?.data.length != 0) {
        let newCardList = [...cardList];

        newCardList[0].value = responseStats?.data[0]?.CompetitionCovered;
        newCardList[1].value = responseStats?.data[0]?.ScoutedDays;
        newCardList[2].value = responseStats?.data[0]?.TotalForms;
        newCardList[3].value = responseStats?.data[0]?.WeeklyForms;

        // console.log('c', newCardList);

        setCardList(newCardList);
      } else {
        let newCardList = [...cardList];

        newCardList[0].value = 0;
        newCardList[1].value = 0;
        newCardList[2].value = 0;
        newCardList[3].value = 0;

        // console.log('c', newCardList);

        setCardList(newCardList);
      }
    } else {
    }
  };

  const getAssignedMatches = async () => {
    const response = await GetAssignedMatches_ScoutingAPI(43); //userData?.userID

    // console.log('response', response?.data);

    if (response != 'Error') {
      const filterArray = response?.data.filter(
        d => d.MatchStatus.toLowerCase() == status.toLowerCase(),
      );

      setMatches(filterArray);
      setFilteredMatches(response?.data);
    } else {
    }
  };

  const pressedDrawer = useCallback(() => {
    dispatch(drawerHandleAction(true));
  }, []);

  const pressedRightDrawer = useCallback(() => {
    dispatch(rightDrawerHandleAction(true));
  }, []);

  const onPressStatus = data => {
    setStatus(data);

    const filterArray = filteredMatches.filter(
      d => d.MatchStatus.toLowerCase() == data.toLowerCase(),
    );

    setMatches(filterArray);
  };

  const onPressScoutNow = item => {
    // console.log(item);
    props.navigation.navigate('MatchSquads', {
      compId: item.Competitionid,
      matchId: item.Matchid,
      teamNameA: item.TeamA,
      teamNameB: item.TeamB,
    });
  };

  const onPressDataCard = (data, id) => {
    // console.log(data, id);
    if (id == 0) {
      props.navigation.navigate('Competitions');
    }
  };

  const openState = data => {
    setOpen(data);
  };

  const onSearchPlayer = async text => {
    // console.log('text', text);

    const players = await SearchPlayer_ScoutingAPI(text);

    if (players != 'Error') {
      // console.log('players', players[0]);
      setPlayers(players);
    } else {
    }
  };

  const onPressPlayer = player => {
    // console.log(player);
    searchRef.current?.open();
    searchRef.current?.clearSearch();
    props.navigation.navigate('PlayerProfile', {playerData: player});
  };

  const renderPlayers = (item, index) => {
    return (
      <Pressable
        onPress={() => onPressPlayer(item)}
        style={{
          width: WD(90),
          height: HT(5),
          backgroundColor: bgColor.text_secondary,
          marginTop: HT(1),
          alignSelf: 'center',
          alignItems: 'flex-start',
          justifyContent: 'center',
          paddingHorizontal: WD(3),
          borderRadius: WD(2),
        }}>
        <Text>{item?.PlayerName}</Text>
      </Pressable>
    );
  };

  const onPressMatch = data => {
    // console.log('data', data);
    props.navigation.navigate('CompetitionStats', {
      compid: data.Comprtitionid,
      compname: data.CompetitionName,
      duration: '',
    });
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: theme.bgColor}}>
      <MainHeaderView
        screenName={'Home'}
        pressedDrawer={pressedDrawer}
        pressedRightDrawer={pressedRightDrawer}
        onTapSearch={() => searchRef.current?.open()}
      />

      <AnimatedSearchBar
        ref={searchRef}
        onChangeText={txt => onSearchPlayer(txt)}
        openState={data => openState(data)}
      />

      <View
        style={{
          width: WIDTH,
          height: HT(15),
        }}>
        <DataCard dataList={cardList} onPress={onPressDataCard} />
      </View>

      <View
        style={{
          width: WIDTH,
          height: HT(7),
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            width: '90%',
            height: '85%',
            backgroundColor: bgColor.white,
            borderRadius: WD(10),
            // overflow: 'hidden',
            flexDirection: 'row',
            elevation: 2,
            shadowColor: bgColor.grey,
            shadowOffset: {width: 0.5, height: 0.5},
            shadowOpacity: 0.4,
            alignItems: 'center',
            paddingLeft: WD(1),
            paddingRight: WD(1),
          }}>
          <Pressable
            onPress={() => onPressStatus('Live')}
            style={{
              width: '30%',
              height: '80%',
              backgroundColor:
                status == 'Live' ? bgColor.coloured : bgColor.white,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: WD(10),
            }}>
            <Text
              style={{
                color: status == 'Live' ? bgColor.white : bgColor.black,
                fontSize: fontSize.Medium,
                fontWeight: status == 'Live' ? 'bold' : '500',
              }}>
              Live
            </Text>
          </Pressable>
          <Pressable
            onPress={() => onPressStatus('Completed')}
            style={{
              width: '35%',
              height: '80%',
              backgroundColor:
                status == 'Completed' ? bgColor.coloured : bgColor.white,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: WD(10),
            }}>
            <Text
              style={{
                color: status == 'Completed' ? bgColor.white : bgColor.black,
                fontSize: fontSize.Medium,
                fontWeight: status == 'Completed' ? 'bold' : '500',
              }}>
              Completed
            </Text>
          </Pressable>
          <Pressable
            onPress={() => onPressStatus('Upcoming')}
            style={{
              width: '35%',
              height: '80%',
              backgroundColor:
                status == 'Upcoming' ? bgColor.coloured : bgColor.white,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: WD(10),
            }}>
            <Text
              style={{
                color: status == 'Upcoming' ? bgColor.white : bgColor.black,
                fontSize: fontSize.Medium,
                fontWeight: status == 'Upcoming' ? 'bold' : '500',
              }}>
              Upcoming
            </Text>
          </Pressable>
        </View>
      </View>

      <View
        style={{
          width: WIDTH,
          height: HT(78),
          // backgroundColor: bgColor.accentSecondary,
        }}>
        {matches.length != 0 ? (
          <MatchCard
            matches={matches}
            onPressScoutNow={onPressScoutNow}
            onPressMatch={onPressMatch}
          />
        ) : (
          <Text
            style={{
              textAlign: 'center',
              top: HT(10),
              color: bgColor.black,
              opacity: 0.8,
            }}>
            Matches not found
          </Text>
        )}
      </View>

      {open && players.length != 0 && (
        <View
          style={{
            width: WIDTH,
            // height: HT(20),
            position: 'absolute',
            top: HT(10),
            backgroundColor: bgColor.white,
            shadowColor: bgColor.grey,
            shadowOffset: {width: 0, height: 1},
            shadowOpacity: 0.5,
            maxHeight: HT(40),
            paddingBottom: HT(1),
          }}>
          <FlatList
            data={players}
            renderItem={({item, index}) => renderPlayers(item, index)}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default ScoutHome;

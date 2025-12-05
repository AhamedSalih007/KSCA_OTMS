import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Pressable,
  Image,
  TextInput,
  Platform,
} from 'react-native';
import React, {useState, useCallback, useEffect, useRef} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import MainHeaderView from '../../../../Components/Common/MainHeaderView';
import {HT, WD, WIDTH} from '../../../../Constant/Dimensions';
import {useDispatch, useSelector} from 'react-redux';
import {
  darkTheme,
  fontSize,
  lightTheme,
} from '../../../../Constant/Fonts&Colors';
import {
  bottomSheetAction,
  drawerHandleAction,
  rightDrawerHandleAction,
} from '../../../../Redux/ReducerSlices/UserSlice';
import {useNavigation} from '@react-navigation/native';
import {bgColor} from '../../../../Constant/Fonts&Colors';
import {
  GetCompetitionData_ScoutingAPI,
  SearchPlayer_ScoutingAPI,
} from '../../../../API/ScoutingAPI';
import AnimatedSearchBar from '../../../../Components/Common/AnimatedSearchBar';

const Competitions = props => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const searchRef = useRef();
  const [open, setOpen] = useState(false);
  const {userData, darkMode} = useSelector(state => state.localdata);
  const [selectedId, setSelectedId] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [competitiondata, setCompetitionData] = useState([]);
  const [competitionDataClone, setCompetitionDataClone] = useState([]);

  const [totallivecomp, setTotalLiveComp] = useState(0);
  const [totalupcomingcomp, setTotalUpcomingComp] = useState(0);
  const [totalcompletedcomp, setTotalCompletedComp] = useState(0);
  const [totalplayerstracked, setTotalPlayersTracked] = useState(0);
  const [totalreports, setTotalReports] = useState(0);
  const [players, setPlayers] = useState([]);

  // console.log('comp', competitiondata[3]);
  const theme = darkMode ? darkTheme : lightTheme;

  useEffect(() => {
    handlegetData();
  }, []);

  const handlegetData = async () => {
    const response = await GetCompetitionData_ScoutingAPI();
    setCompetitionDataClone(response);

    // console.log('res', response[0]);

    // for getting  live competitions
    const totallivecount = response.reduce(
      (acc, val) => (val.Status == 'Live' ? acc + 1 : acc),
      0,
    );
    setTotalLiveComp(totallivecount);
    // for getting  upcoming competitions
    const totalupcomingcount = response.reduce(
      (acc, val) => (val.Status == 'Upcoming' ? acc + 1 : acc),
      0,
    );
    setTotalUpcomingComp(totalupcomingcount);
    // for getting  completed competitions
    const totalcompletedcount = response.reduce(
      (acc, val) => (val.Status == 'Completed' ? acc + 1 : acc),
      0,
    );
    setTotalCompletedComp(totalcompletedcount);
    // for getting total players tracked
    const playerscount = response.reduce(
      (acc, val) => acc + val.PlayersEvaluated,
      0,
    );
    setTotalPlayersTracked(playerscount);
    // for getting total reports
    const totalreportscount = response.reduce(
      (acc, val) => acc + val.FormSubmitted,
      0,
    );
    setTotalReports(totalreportscount);

    const filteredresponse = response.filter(val => val.Status == 'Live');
    setCompetitionData(filteredresponse);
  };

  const onPressPlayer = player => {
    // console.log(player);
    searchRef.current?.open();
    searchRef.current?.clearSearch();
    props.navigation.navigate('PlayerProfile', {playerData: player});
  };

  const compFilterData = [
    {
      id: 1,
      text: 'Live Now',
      shorttxt: 'Live',
      num: 2,
      color: '#00ca00ff',
      bg: bgColor.white,
      txtcolor: 'black',
    },
    {
      id: 2,
      text: 'Upcoming',
      shorttxt: 'Upcoming',
      num: 4,
      color: '#1a01ffff',
      bg: bgColor.white,
      txtcolor: 'black',
    },
    {
      id: 3,
      text: 'Completed',
      shorttxt: 'Completed',
      num: 10,
      color: '#ff0000ff',
      bg: bgColor.white,
      txtcolor: 'black',
    },
  ];

  const CompCardData = [
    {
      id: 1,
      text: 'Live Now',
      shorttxt: 'Live',
      num: totallivecomp,
      color: '#00ca00ff',
      bg: bgColor.white,
      txtcolor: 'black',
    },
    {
      id: 2,
      text: 'Upcoming',
      shorttxt: 'Upcoming',
      num: totalupcomingcomp,
      color: '#1a01ffff',
      bg: bgColor.white,
      txtcolor: 'black',
    },
    {
      id: 3,
      text: 'Completed',
      shorttxt: 'Completed',
      num: totalcompletedcomp,
      color: '#ff0000ff',
      bg: bgColor.white,
      txtcolor: 'black',
    },
    {
      id: 4,
      text: 'Players Tracked',
      shorttxt: 'Players Tracked',
      num: totalplayerstracked,
      color: '#EFBF04',
      bg: bgColor.white,
      txtcolor: 'black',
    },
    {
      id: 5,
      text: 'Total Reports',
      shorttxt: 'Total Reports',
      num: totalreports,
      color: '#59007cff',
      bg: bgColor.white,
      txtcolor: 'black',
    },
  ];

  const pressedDrawer = useCallback(() => {
    dispatch(drawerHandleAction(true));
  }, []);

  const pressedRightDrawer = useCallback(() => {
    dispatch(rightDrawerHandleAction(true));
  }, []);

  const handleselectedId = (id, status) => {
    // console.log('this is the id', id);
    setSelectedId(id);
    let arr = [...competitionDataClone];
    const filterredarr = arr?.filter(val => val.Status == status);
    setCompetitionData(filterredarr);
  };

  const handleSearch = text => {
    setSearchText(text);

    let arr = [...competitionDataClone];
    let compclonedata = [];

    if (selectedId == 1) {
      compclonedata = arr.filter(val => val.Status == 'Live');
    } else if (selectedId == 2) {
      compclonedata = arr.filter(val => val.Status == 'Upcoming');
    } else {
      compclonedata = arr.filter(val => val.Status == 'Completed');
    }

    if (text.trim() === '') {
      setCompetitionData(compclonedata);
      return;
    }

    const newData = compclonedata.filter(item =>
      item.CompName.toLowerCase().includes(text.toLowerCase()),
    );

    setCompetitionData(newData);
  };

  const CompCard = ({item, index}) => (
    <Pressable
      style={[
        styles.countCards,
        {
          backgroundColor: item.bg,
          elevation: 5,
          marginRight: CompCardData.length - 1 == index ? 15 : 0,
        },
      ]}>
      <View
        style={{
          width: '100%',
          height: '60%',
          justifyContent: 'center',
          paddingLeft: 20,
        }}>
        <Text
          style={{
            fontSize: fontSize.Large_50,
            fontWeight: '600',
            color: item.color,
          }}>
          {item.num}
        </Text>
      </View>
      <View
        style={{
          width: '100%',
          height: '40%',
          justifyContent: 'flex-start',
          paddingLeft: 20,
        }}>
        <Text
          style={{
            fontSize: fontSize.Small,
            fontWeight: '500',
            color: item.txtcolor,
          }}>
          {item.text}
        </Text>
      </View>
    </Pressable>
  );

  const renderCompCard = ({item, index}) => {
    return <CompCard item={item} index={index} />;
  };

  const Compfilter = ({item, onPress, backgroundColor, textColor}) => (
    <TouchableOpacity
      onPress={onPress}
      style={{
        height: HT(4),
        width: WD(29),
        backgroundColor: backgroundColor,
        borderRadius: WD(3) * 2,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2,
      }}>
      <Text
        style={{
          color: textColor,
          fontWeight: '500',
          fontSize: fontSize.verySmall_75,
        }}>
        {item.shorttxt}
      </Text>
    </TouchableOpacity>
  );

  const rendercompfilter = ({item}) => {
    const backgroundColor =
      item.id === selectedId ? bgColor.coloured : bgColor.text_secondary;
    const color = item.id === selectedId ? bgColor.text_primary : 'black';
    return (
      <Compfilter
        item={item}
        onPress={() => handleselectedId(item.id, item.shorttxt)}
        backgroundColor={backgroundColor}
        textColor={color}
      />
    );
  };

  const MainCompCard = ({item, index, onPress}) => (
    <Pressable
      onPress={onPress}
      style={[
        styles.CompCard,
        {
          marginBottom:
            competitiondata.length - 1 == index && competitiondata.length != 1
              ? 50
              : 0,
        },
      ]}>
      {/* this is the header */}
      <View
        style={{
          height: '74%',
          width: '90%',
        }}>
        {/* this is the comp head details  */}
        <View
          style={{
            width: '100%',
            height: '50%',
            // backgroundColor: 'red',
            paddingTop: 13,
          }}>
          <Text
            style={{
              color: bgColor.coloured,
              fontSize: fontSize.lightMedium,
              fontWeight: '700',
            }}>
            {item.CompName}
          </Text>
          <Text
            style={{
              color: bgColor.text_tertiary,
              fontSize: Platform.isPad
                ? fontSize.verySmall_75 - 2
                : fontSize.Small,
              top: HT(0.5),
            }}>
            {item.FromDate} - {item.ToDate}
          </Text>
        </View>
        {/* this is the match details */}
        <View
          style={{
            width: '100%',
            height: '50%',
            flexDirection: 'row',
          }}>
          <View
            style={{
              width: '33.3%',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontWeight: '700',
                color: '#000',
                fontSize: fontSize.ExtraLarge,
              }}>
              {item.TotalMatches}
            </Text>
            <Text
              style={{
                fontWeight: '500',
                color: bgColor.text_tertiary,
                fontSize: fontSize.Small,
              }}>
              Matches
            </Text>
          </View>
          <View
            style={{
              width: '33.3%',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontWeight: '700',
                color: '#000',
                fontSize: fontSize.ExtraLarge,
              }}>
              {item.PlayersCount}
            </Text>
            <Text
              style={{
                fontWeight: '500',
                color: bgColor.text_tertiary,
                fontSize: fontSize.Small,
              }}>
              Players
            </Text>
          </View>
          <View
            style={{
              width: '33.3%',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontWeight: '700',
                color: '#000',
                fontSize: fontSize.ExtraLarge,
              }}>
              {item.FormSaved}
            </Text>
            <Text
              style={{
                fontWeight: '500',
                color: bgColor.text_tertiary,
                fontSize: fontSize.Small,
              }}>
              forms
            </Text>
          </View>
        </View>
      </View>
      {/* this is the divider */}
      <View
        style={{
          height: '0.3%',
          width: '90%',
          backgroundColor: 'gray',
        }}></View>
      {/* this is the bottom */}
      <View
        style={{
          height: '25%',
          width: '90%',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        {/* this is the progress bar  */}

        <View
          style={{
            width: WD(30),
            height: HT(0.8),
            backgroundColor: bgColor.text_secondary,
            borderRadius: WD(1) * 2,
            left: WD(4),
          }}>
          <View
            style={{
              width: `${item.PlayersEvaluated}%`,
              height: '100%',
              borderRadius: WD(1) * 2,
              backgroundColor: bgColor.coloured,
            }}></View>
        </View>
        <Text
          style={{
            fontWeight: '900',
            right: WD(4.5),
            fontSize: fontSize.Medium,
          }}>
          {item.PlayersEvaluated}
        </Text>
        <View
          style={{
            paddingHorizontal: HT(2),
            paddingVertical: HT(1),
            backgroundColor:
              item.status == 'Live'
                ? '#deffceff'
                : item.status == 'Completed'
                ? bgColor.text_secondary
                : bgColor.coloured,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: WD(2) * 2,
          }}>
          <Text
            style={{
              color: bgColor.white,
              fontSize: fontSize.Small,
              fontWeight: '900',
            }}>
            {item.Status}
          </Text>
        </View>
      </View>
    </Pressable>
  );

  const renderMainCompCard = ({item, index}) => {
    return (
      <MainCompCard
        item={item}
        index={index}
        onPress={() =>
          handleNavigatetoCompStats(
            item.RefCompID,
            item.CompName,
            item.FromDate,
            item.ToDate,
          )
        }
      />
    );
  };

  const handleNavigatetoCompStats = (id, cname, fromdate, todate) => {
    const days = console.log('this is the comp id', id);
    navigation.navigate('CompetitionStats', {
      compid: id,
      compname: cname,
      duration: `${fromdate} - ${todate}`,
    });
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

  const openState = data => {
    setOpen(data);
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: theme.bgColor}}>
      <MainHeaderView
        screenName={'Competitions'}
        pressedDrawer={pressedDrawer}
        pressedRightDrawer={pressedRightDrawer}
        onTapSearch={() => searchRef.current?.open()}
      />

      <AnimatedSearchBar
        ref={searchRef}
        onChangeText={txt => onSearchPlayer(txt)}
        openState={data => openState(data)}
      />

      {/* competitions view container */}
      <View
        style={[
          styles.competitionViewContainer,
          {backgroundColor: '#f3f3f3ff'},
        ]}>
        {/* parent for count cards */}
        <View style={styles.countcardscontainer}>
          <FlatList
            data={CompCardData}
            renderItem={renderCompCard}
            keyExtractor={item => item.id}
            extraData={selectedId}
            horizontal={true}
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            showsHorizontalScrollIndicator={false}
          />
        </View>
        {/* parent for filters  */}
        <View style={styles.filtercardContainer}>
          <FlatList
            data={compFilterData}
            renderItem={rendercompfilter}
            keyExtractor={item => item.id}
            extraData={selectedId}
            horizontal={true}
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: 'space-evenly',
              alignItems: 'center',
            }}
            showsHorizontalScrollIndicator={false}
          />
        </View>
        {/* parent for search */}
        <View style={styles.searchcontainer}>
          <View style={styles.searchcompcontainer}>
            <View style={styles.searchIconcontainer}>
              <Image
                source={require('../../../../Assets/Images/search.png')}
                style={styles.searchIcon}
              />
            </View>
            <View style={styles.searchTextContainer}>
              <TextInput
                style={{width: '100%', height: '100%'}}
                onChangeText={handleSearch}
                value={searchText}
                placeholder="Search Competitions..."
                keyboardType="text"
              />
            </View>
          </View>
        </View>
        {/* parent for competition card  */}
        <View style={styles.competitionCardContainer}>
          {competitiondata.length > 0 ? (
            <FlatList
              data={competitiondata}
              renderItem={renderMainCompCard}
              keyExtractor={item => item.CompID}
              extraData={selectedId}
              vertical={true}
              contentContainerStyle={{
                flexGrow: 1,
                alignItems: 'center',
              }}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <Text
              style={{
                textAlign: 'center',
                top: HT(5),
                color: bgColor.black,
                opacity: 0.5,
              }}>
              No matches
            </Text>
          )}
        </View>
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

export default Competitions;

const styles = StyleSheet.create({
  countcardscontainer: {
    height: HT(13),
    width: WD(100),
    justifyContent: 'center',
    alignItems: 'center',
  },
  filtercardContainer: {
    height: HT(8),
    width: WD(100),
    padding: 10,
  },
  searchcontainer: {
    height: HT(5),
    width: WD(100),
    justifyContent: 'center',
    alignItems: 'center',
  },
  competitionCardContainer: {
    height: HT(57),
    width: WD(100),
    padding: 10,
  },
  competitionViewContainer: {
    height: HT(93),
    width: WD(100),
  },
  countCards: {
    width: WD(33),
    height: HT(10),
    borderRadius: WD(2) * 1,
    marginLeft: 15,
  },
  searchcompcontainer: {
    width: WD(90),
    height: '95%',
    flexDirection: 'row',
    borderColor: '#d4d4d4ff',
    borderWidth: 1,
    borderRadius: WD(1.7) * 1,
    backgroundColor: bgColor.white,
    elevation: 1,
  },
  searchIconcontainer: {
    width: '12%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchIcon: {
    resizeMode: 'contain',
    width: '45%',
    height: '45%',
    tintColor: 'gray',
  },
  searchTextContainer: {
    width: '98%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  CompCard: {
    width: WD(90),
    height: Platform.isPad ? HT(26) : HT(22),
    backgroundColor: bgColor.white,
    marginTop: 15,
    elevation: 3,
    borderRadius: WD(1.5) * 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

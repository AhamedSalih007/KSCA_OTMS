import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Pressable,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useCallback, useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {HT, WD, WIDTH} from '../../../../../Constant/Dimensions';
import {useDispatch, useSelector} from 'react-redux';
import {
  bgColor,
  darkTheme,
  fontSize,
  lightTheme,
} from '../../../../../Constant/Fonts&Colors';
import {useNavigation} from '@react-navigation/native';
import StickyTable from '../../../../../Components/More/StickyTable';
import axios from 'axios';

const CompetitionStats = ({route}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {userData, darkMode} = useSelector(state => state.localdata);
  const [selectedfilter, setSelectedFilter] = useState('Leaderboard');
  const [isbatting, setIsBatting] = useState('Batting');
  const [searchText, setSearchText] = useState('');
  const [tableData, setTableData] = useState([]);
  const [tabledataclone, setTableDataClone] = useState([]);
  const [loading, setIsLoading] = useState(false);
  const [firstcolumn, setFirstColumn] = useState('Player');
  const [hiddencolumns, setHiddenColumns] = useState([
    'C21MatchIds',
    'FSAPlayerId',
    'C21PlayerId',
  ]);

  const LeaderboardHiddenColums = [
    'TeamName',
    'C21MatchIds',
    'FSAPlayerId',
    'C21PlayerId',
    'PlayerID',
    'BowlerID',
  ];

  const FixturesHiddenColumns = ['MatchId'];

  // console.log('b', tab);

  useEffect(() => {
    handlegetdata(selectedfilter, isbatting);
  }, []);

  const {compid, compname, duration} = route.params;

  // console.log('compId', compid, userData);

  const theme = darkMode ? darkTheme : lightTheme;

  const handlegetdata = async (filter, battingfilter) => {
    try {
      setIsLoading(true);
      if (filter == 'Leaderboard') {
        const res = await axios.get(
          `https://staging.cricket-21.com/cricketapi/api/master/getPlayerStats?compid=${compid}&client=ksca`, //UID_00003112
        );
        console.log(
          'link',
          `https://staging.cricket-21.com/cricketapi/api/master/getPlayerStats?compid=${compid}&client=ksca`,
        );
        if (battingfilter == 'Batting') {
          setTableData(res.data.data.batting);
          setTableDataClone(res.data.data.batting);
          setFirstColumn('Player');
        } else {
          setTableData(res.data.data.bowling);
          setTableDataClone(res.data.data.bowling);
          setFirstColumn('Bowler');
        }

        setHiddenColumns(LeaderboardHiddenColums);
        setIsLoading(false);
      } else {
        const res = await axios.get(
          `https://staging.cricket-21.com/cricketapi/api/master/GetCompetitionMatchesOTMS?compid=${compid}&client=ksca`,
        );
        // console.log(res.data.data[0]);
        setTableData(res.data.data[0]);
        setTableDataClone(res.data.data[0]);
        setHiddenColumns(FixturesHiddenColumns);
        setFirstColumn('MatchName');
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectedFilter = text => {
    if (text == selectedfilter) {
      return;
    }

    setSelectedFilter(text);
    if (text == 'Leaderboard') {
      handlegetdata('Leaderboard', isbatting);
    } else if (text == 'Fixtures') {
      handlegetdata('Fixtures', isbatting);
    }
  };

  const handleBattingorBowlingFilter = text => {
    if (text == isbatting || selectedfilter != 'Leaderboard') {
      return;
    }
    setIsBatting(text);
    handlegetdata('Leaderboard', text);
  };

  const handlesearchfilter = text => {
    setSearchText(text);
    if (selectedfilter == 'Leaderboard') {
      if (isbatting == 'Batting') {
        const filteredData = tabledataclone.filter(item =>
          item.Player.toLowerCase().includes(text.toLowerCase()),
        );
        setTableData(filteredData);
      } else {
        const filteredData = tabledataclone.filter(item =>
          item.Bowler.toLowerCase().includes(text.toLowerCase()),
        );
        setTableData(filteredData);
      }
    } else if (selectedfilter == 'Fixtures') {
      const filteredData = tabledataclone.filter(item =>
        item.MatchName.toLowerCase().includes(text.toLowerCase()),
      );
      setTableData(filteredData);
    }
  };

  const onPressPlayer = data => {
    // console.log(data);
    if (selectedfilter == 'Leaderboard') {
      navigation.navigate('PlayerProfile', {playerData: data});
    } else {
      navigation.navigate('Scorecard', {matchId: data.matchId});
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: theme.bgColor}}>
      {/* // this is the parent view  */}
      <View
        style={{
          height: HT(100),
          width: WD(100),
          backgroundColor: '#f3f3f3ff',
          alignItems: 'center',
        }}>
        {/* // this is the header section */}
        <View
          style={{
            height: HT(8),
            width: WD(100),
            backgroundColor: bgColor.white,
            flexDirection: 'row',
          }}>
          {/* // back icon */}
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              width: '18%',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              // backgroundColor: 'red',
              borderRadius: WD(5) * 2,
            }}>
            <Image
              style={{
                resizeMode: 'contain',
                width: '45%',
                height: '45%',
                opacity: 0.8,
              }}
              source={require('../../../../../Assets/Images/left.png')}
            />
          </TouchableOpacity>
          {/* // comp name header text  */}
          <View
            style={{
              width: '82%',
              height: '100%',
              justifyContent: 'center',
              gap: 5,
            }}>
            <Text
              style={{
                fontSize: fontSize.lightMedium_50,
                fontWeight: '700',
                color: 'black',
              }}>
              {compname}
            </Text>
            <Text
              style={{
                color: bgColor.text_tertiary,
                fontWeight: '600',
                fontSize: fontSize.verySmall,
              }}>
              {duration}
            </Text>
          </View>
        </View>
        {/* // this is the filter section */}
        <View
          style={{
            width: WD(100),
            height: HT(9),
            alignItems: 'center',
            justifyContent: 'flex-start',
            flexDirection: 'row',
            paddingLeft: 20,
            gap: 15,
          }}>
          <TouchableOpacity
            onPress={() => handleSelectedFilter('Leaderboard')}
            style={{
              paddingVertical: 10,
              paddingHorizontal: 20,
              backgroundColor:
                selectedfilter == 'Leaderboard'
                  ? bgColor.coloured
                  : bgColor.white,
              borderRadius: WD(3) * 2,
              elevation: 2,
            }}>
            <Text
              style={{
                fontSize: fontSize.Small,
                fontWeight: '700',
                color: selectedfilter == 'Leaderboard' ? bgColor.white : '#000',
              }}>
              Leaderboard
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleSelectedFilter('Fixtures')}
            style={{
              paddingVertical: 10,
              paddingHorizontal: 20,
              backgroundColor:
                selectedfilter == 'Fixtures' ? bgColor.coloured : bgColor.white,
              borderRadius: WD(3) * 2,
              elevation: 2,
            }}>
            <Text
              style={{
                fontSize: fontSize.Small,
                fontWeight: '700',
                color: selectedfilter == 'Fixtures' ? bgColor.white : '#000',
              }}>
              Fixtures
            </Text>
          </TouchableOpacity>
        </View>
        {/* //this is the batting bowling filter  */}
        {selectedfilter == 'Leaderboard' && (
          <View
            style={{
              width: WD(90),
              height: HT(6),
              backgroundColor: bgColor.white,
              borderRadius: WD(2) * 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              elevation: 1,
            }}>
            <Pressable
              onPress={() => handleBattingorBowlingFilter('Batting')}
              style={{
                width: '48%',
                height: '70%',
                backgroundColor:
                  isbatting == 'Batting' ? bgColor.coloured : bgColor.white,
                borderRadius: WD(2) * 0.6,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: isbatting == 'Batting' ? bgColor.white : '#000',
                  fontSize: fontSize.lightMedium,
                  fontWeight: '700',
                }}>
                Batting
              </Text>
            </Pressable>
            <Pressable
              onPress={() => handleBattingorBowlingFilter('Bowling')}
              style={{
                width: '48%',
                height: '70%',
                backgroundColor:
                  isbatting == 'Bowling' ? bgColor.coloured : bgColor.white,
                borderRadius: WD(2) * 0.6,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: isbatting == 'Bowling' ? bgColor.white : '#000',
                  fontSize: fontSize.lightMedium,
                  fontWeight: '700',
                }}>
                Bowling
              </Text>
            </Pressable>
          </View>
        )}
        {/* // this is view is for gap  */}
        <View style={{width: WD(100), height: HT(2.3)}}></View>
        {/* // this is the view for table container  */}
        <View
          style={{
            width: WD(98),
            height: HT(66),
            paddingTop: 15,
            backgroundColor: bgColor.white,
            borderRadius: WD(2) * 1,
            alignItems: 'center',
            justifyContent: 'center',
            gap: 18,
          }}>
          {/* // this is for search box */}
          <View style={styles.searchcontainer}>
            <View style={styles.searchcompcontainer}>
              <View style={styles.searchIconcontainer}>
                <Image
                  source={require('../../../../../Assets/Images/search.png')}
                  style={styles.searchIcon}
                />
              </View>
              <View style={styles.searchTextContainer}>
                <TextInput
                  style={{width: '100%', height: '100%'}}
                  onChangeText={handlesearchfilter}
                  value={searchText}
                  placeholder="Search Players..."
                  keyboardType="text"
                />
              </View>
            </View>
          </View>
          {tableData?.length > 0 && !loading ? (
            <StickyTable
              data={tableData} // or array of players
              hiddenKeys={hiddencolumns}
              firstcol={firstcolumn}
              onPressPlayer={onPressPlayer}
            />
          ) : (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: WD(85),
                height: HT(55),
              }}>
              {loading ? (
                <ActivityIndicator size="large" color={bgColor.coloured} />
              ) : (
                <Text>No data found</Text>
              )}
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CompetitionStats;

const styles = StyleSheet.create({
  searchcontainer: {
    height: HT(5),
    width: WD(90),
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchcompcontainer: {
    width: WD(85),
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
});

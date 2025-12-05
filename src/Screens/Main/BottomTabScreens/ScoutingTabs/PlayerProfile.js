import React, {useEffect, useState} from 'react';
import {bgColor, fontSize} from '../../../../Constant/Fonts&Colors';
import {
  GetPlayerStats2_ScoutingAPI,
  GetPlayerStats_ScoutingAPI,
} from '../../../../API/ScoutingAPI';
import PlayerProfileCard from '../../../../Components/Scouting/Cards/PlayerProfileCard';
import {useSelector} from 'react-redux';
import {SafeAreaView} from 'react-native-safe-area-context';
import MainHeaderView from '../../../../Components/Common/MainHeaderView';
import {
  Image,
  TouchableOpacity,
  View,
  Text,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import {HT, WD, WIDTH} from '../../../../Constant/Dimensions';
import PlayerStatsTable from '../../../../Components/Scouting/PlayerStatsTable';
import MatchModal from '../../../../Components/Modal/MatchModal';

const PlayerProfile = props => {
  const {playerData} = props.route.params;

  const {userData} = useSelector(state => state.localdata);

  // console.log('p', userData);

  const [overall, setOverall] = useState([]);
  const [matchData, setMatchData] = useState([]);
  const [compData, setCompData] = useState([]);
  const [compDataBowl, setCompDataBowl] = useState([]);
  const [matchBatData, setMatchBatData] = useState([]);
  const [matchBowlData, setMatchBowlData] = useState([]);
  const [batOverall, setBatOverall] = useState({});
  const [bowlOverall, setBowlOverall] = useState({});
  const [modal, setModal] = useState(false);
  const [tab, setTab] = useState(0);
  const [loading, setLoading] = useState(true);

  // console.log('data', overall.length, matchData.length, compData.length);

  useEffect(() => {
    getPlayersStats();
  }, []);

  const getPlayersStats = async () => {
    const response = await GetPlayerStats2_ScoutingAPI(playerData?.UID); //playerData?.UID

    if (response != 'Error') {
      // console.log('res', response);
      setLoading(false);
      if (response.data.overall.length != 0) {
        setOverall(response?.data?.overall);
        setMatchData(response?.data?.matchwise);
        // setCompData(response?.data?.compwise);
        if (response?.data?.overall.length != 0) {
          const batoverall = {
            innings: response?.data?.overall[0].Innings,
            runs: response?.data?.overall[0].BatRuns,
            balls: response?.data?.overall[0].BatBalls,
            dismissals: response?.data?.overall[0].Outs,
            sr: response?.data?.overall[0].BatSR,
            avg: response?.data?.overall[0].BatAvg,
            fours: response?.data?.overall[0]._4s,
            sixes: response?.data?.overall[0]._6s,
            bdry: response?.data?.overall[0].BdryPercentage,
            forms: response?.data?.overall[0].Forms,
          };
          const bowloverall = {
            innings: response?.data?.overall[0].Innings,
            runs: response?.data?.overall[0].BowlRuns,
            balls: response?.data?.overall[0].BowlBalls,
            overs: response?.data?.overall[0].Overs,
            wkts: response?.data?.overall[0].BowlWkts,
            sr: response?.data?.overall[0].BowlSR,
            avg: response?.data?.overall[0].BowlAvg,
            econ: response?.data?.overall[0].Econ,
            _4w: response?.data?.overall[0]._4w,
            _5w: response?.data?.overall[0]._5w,
            forms: response?.data?.overall[0].Forms,
          };

          setBatOverall(batoverall);
          setBowlOverall(bowloverall);
        }

        let competitions = [];
        let compBowl = [];

        for (let i = 0; i < response.data.compwise.length; i++) {
          const data = {
            name: response?.data?.compwise[i].CompName,
            innings: response?.data?.compwise[i].Innings,
            runs: response?.data?.compwise[i].BatRuns,
            balls: response?.data?.compwise[i].BatBalls,
            dismissals: response?.data?.compwise[i].Outs,
            sr: response?.data?.compwise[i].BatSR,
            avg: response?.data?.compwise[i].BatAvg,
            fours: response?.data?.compwise[i]._4s,
            sixes: response?.data?.compwise[i]._6s,
            bdry: response?.data?.compwise[i].BdryPercentage,
            forms:
              response?.data?.compwise[i].Forms == null
                ? '0'
                : response?.data?.compwise[i].Forms,
            compId: response?.data?.compwise[i].CompID,
          };

          competitions.push(data);

          const dataBowl = {
            name: response?.data?.compwise[i].CompName,
            innings: response?.data?.compwise[i].Innings,
            runs: response?.data?.compwise[i].BowlRuns,
            balls: response?.data?.compwise[i].BowlBalls,
            overs: response?.data?.compwise[i].Overs,
            wkts: response?.data?.compwise[i].BowlWkts,
            sr: response?.data?.compwise[i].BowlSR,
            avg: response?.data?.compwise[i].BowlAvg,
            econ: response?.data?.compwise[i].Econ,
            _4w: response?.data?.compwise[i]._4w,
            _5w: response?.data?.compwise[i]._5w,
            forms: response?.data?.compwise[i].Forms,
            compId: response?.data?.compwise[i].CompID,
          };

          compBowl.push(dataBowl);
        }

        // console.log('comp', compBowl);

        setCompData(competitions);
        setCompDataBowl(compBowl);
      }
    } else {
      setLoading(false);
    }
  };

  const onPressTab = id => {
    setTab(id);
  };

  const onPressComp = item => {
    // console.log('i', item);
    // setModal(true);

    const filterMatches = matchData.filter(d => d.CompID == item.compId);

    console.log('fil', filterMatches[0], matchData.length);

    setMatchBatData(filterMatches);

    let compBat = [];
    let compBowl = [];

    for (let i = 0; i < filterMatches.length; i++) {
      const data = {
        name: filterMatches[i].MatchName,
        innings: filterMatches[i].Innings,
        runs: filterMatches[i].BatRuns,
        balls: filterMatches[i].BatBalls,
        dismissals: filterMatches[i].Outs,
        sr: filterMatches[i].BatSR,
        avg: filterMatches[i].BatAvg,
        fours: filterMatches[i]._4s,
        sixes: filterMatches[i]._6s,
        bdry: filterMatches[i].BdryPercentage,
        forms: filterMatches[i].Forms == null ? '0' : filterMatches[i].Forms,
        compId: filterMatches[i].CompID,
        matchId: filterMatches[i].MatchId,
      };

      compBat.push(data);

      const dataBowl = {
        name: filterMatches[i].MatchName,
        innings: filterMatches[i].Innings,
        runs: filterMatches[i].BowlRuns,
        balls: filterMatches[i].BowlBalls,
        overs: filterMatches[i].Overs,
        wkts: filterMatches[i].BowlWkts,
        sr: filterMatches[i].BowlSR,
        avg: filterMatches[i].BowlAvg,
        econ: filterMatches[i].Econ,
        _4w: filterMatches[i]._4w,
        _5w: filterMatches[i]._5w,
        forms: filterMatches[i].Forms,
        compId: filterMatches[i].CompID,
        matchId: filterMatches[i].MatchId,
      };

      compBowl.push(dataBowl);
    }

    // console.log('comp', compBowl);

    tab == 0 ? setMatchBatData(compBat) : setMatchBowlData(compBowl);
    setTimeout(() => {
      setModal(true);
    }, 300);
  };

  const onPressQuickScout = () => {
    console.log('player', playerData);
  };

  const onPressMatch = data => {
    console.log('data', data);
    setModal(false);
    props.navigation.navigate('Scorecard', {matchId: data.matchId});
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: bgColor.bg_globe}}>
      <View
        style={{
          height: HT(8),
          width: WD(100),
          backgroundColor: bgColor.white,
          flexDirection: 'row',
          shadowOffset: {width: 0, height: 1},
          shadowColor: bgColor.text_secondary,
          shadowOpacity: 0.8,
        }}>
        {/* // back icon */}
        <TouchableOpacity
          onPress={() => props.navigation.goBack()}
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
              height: '40%',
              tintColor: bgColor.black,
              opacity: 0.8,
            }}
            source={require('../../../../Assets/Images/left.png')}
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
              fontSize: fontSize.Medium,
              fontWeight: '800',
              color: 'black',
            }}>
            Player Profile
          </Text>
        </View>
      </View>
      {!loading ? (
        <>
          {overall.length != 0 ? (
            <>
              <PlayerProfileCard
                player={{
                  name: overall[0]?.Player,
                  batStyle: overall[0]?.BattingType,
                  bowlStyle: overall[0]?.BowlingType,
                  from: overall[0]?.Span,
                  matches: overall[0]?.Mat,
                  runs: overall[0]?.BatRuns,
                  wickets: overall[0]?.Outs,
                  average: overall[0]?.BatAvg,
                  strikeRate: overall[0]?.BatSR,
                  economy: overall[0]?.Econ,
                  forms: overall[0]?.Forms,
                }}
                onPressQuickScout={onPressQuickScout}
              />
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
                    height: '100%',
                    backgroundColor: bgColor.white,
                    borderRadius: WD(2),
                    padding: WD(1.2),
                    flexDirection: 'row',
                    shadowOffset: {width: 0, height: 1},
                    shadowColor: bgColor.text_secondary,
                    shadowOpacity: 0.8,
                  }}>
                  <Pressable
                    onPress={() => onPressTab(0)}
                    style={{
                      width: '50%',
                      height: '100%',
                      backgroundColor:
                        tab == 0 ? bgColor.coloured : bgColor.white,
                      borderRadius: WD(2),
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        color: tab == 0 ? bgColor.white : bgColor.black,
                        fontSize: fontSize.lightMedium_50,
                        fontWeight: '600',
                      }}>
                      Batting
                    </Text>
                  </Pressable>

                  <Pressable
                    onPress={() => onPressTab(1)}
                    style={{
                      width: '50%',
                      height: '100%',
                      backgroundColor:
                        tab == 1 ? bgColor.coloured : bgColor.white,
                      borderRadius: WD(2),
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        color: tab == 1 ? bgColor.white : bgColor.black,
                        fontSize: fontSize.lightMedium_50,
                        fontWeight: '600',
                      }}>
                      Bowling
                    </Text>
                  </Pressable>
                </View>
              </View>

              <PlayerStatsTable
                data={tab == 0 ? compData : compDataBowl}
                overall={tab == 0 ? batOverall : bowlOverall}
                tab={tab}
                onPressComp={onPressComp}
                hideOverall={false}
              />
            </>
          ) : (
            <Text
              style={{
                textAlign: 'center',
                top: HT(20),
                color: bgColor.black,
                opacity: 0.8,
              }}>
              No Stats
            </Text>
          )}
        </>
      ) : (
        <ActivityIndicator
          size={'large'}
          color={bgColor.coloured}
          style={{top: HT(20)}}
        />
      )}

      {/* Match Modal */}

      <MatchModal
        visible={modal}
        onClose={() => setModal(false)}
        tab={tab}
        data={tab == 0 ? matchBatData : matchBowlData}
        overall={tab == 0 ? batOverall : bowlOverall}
        onPressComp={onPressMatch}
        modal={true}
      />
    </SafeAreaView>
  );
};

export default PlayerProfile;

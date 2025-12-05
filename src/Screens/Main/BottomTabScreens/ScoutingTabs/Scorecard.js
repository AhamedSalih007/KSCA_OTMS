import React, {useState, useCallback, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Pressable,
  Image,
  Alert,
} from 'react-native';
import {
  bottomSheetAction,
  drawerHandleAction,
  rightDrawerHandleAction,
} from '../../../../Redux/ReducerSlices/UserSlice';
import {useDispatch} from 'react-redux';
import {SafeAreaView} from 'react-native-safe-area-context';
import {bgColor} from '../../../../Constant/Fonts&Colors';
import MainHeaderView from '../../../../Components/Common/MainHeaderView';
import {
  darkTheme,
  fontSize,
  lightTheme,
} from '../../../../Constant/Fonts&Colors';
import axios from 'axios';
import {HT, WD} from '../../../../Constant/Dimensions';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

const Scorecard = props => {
  const {matchId} = props.route.params;
  console.log('sc', matchId);
  const dispatch = useDispatch();
  const [matchData, setMatchData] = useState(null);
  const [battingData, setBattingData] = useState([]);
  const [bowlingData, setBowlingData] = useState([]);
  const [extrasData, setExtrasData] = useState(null);
  const [firstteamprefix, setFirstteamprefix] = useState('');
  const [secondteamprefix, setSecondteamprefix] = useState('');
  const [inningData, setInningData] = useState(null);
  const [activeTeam, setActiveTeam] = useState('ft');
  const [fow, setFow] = useState('');

  useEffect(() => {
    handleGetScorecardData(0);
  }, []);

  const pressedDrawer = useCallback(() => {
    dispatch(drawerHandleAction(true));
  }, []);

  const pressedRightDrawer = useCallback(() => {
    dispatch(rightDrawerHandleAction(true));
  }, []);

  const SCORECARD_URL = `https://staging.cricket-21.com/cricketapi/api/otms/scoreboard?format=t20&client=ksca`;
  const FULL_SCORECARD_URL = `https://staging.cricket-21.com/cricketapi/api/otms/fullscorecard?format=t20&client=ksca`;

  const getInitials = name =>
    name
      ?.split(' ')
      .map(word => word.charAt(0))
      .join('');

  const handleGetScorecardData = async (inningIndex = 0) => {
    console.log('Fetching scorecard data...');

    try {
      const {data: scoreData} = await axios.get(
        `${SCORECARD_URL}&matchid=${matchId}`,
      );

      if (!scoreData?.innings || scoreData?.innings.length === 0) {
        setMatchData(null);
        setInningData(null);
        setBattingData([]);
        setBowlingData([]);
        setFow('');
        setExtrasData({total: 0, extra: 0});

        // Show popup or message UI
        Alert.alert('No Scorecard Available Yet');
        return;
      }

      const innings = scoreData.innings[inningIndex] ?? scoreData.innings[0];

      setFirstteamprefix(getInitials(innings.BatClubName || ''));
      setSecondteamprefix(getInitials(innings.BowlClubName || ''));

      setMatchData({
        ...innings,
        Venue: scoreData.Venue ?? 'N/A',
        Date: scoreData.Date ?? 'N/A',
      });

      setInningData({
        Runs: innings.Runs ?? 0,
        Overs: innings.Overs ?? 0,
        Wickets: innings.Wickets ?? 0,
      });

      const {data: fullData} = await axios.get(
        `${FULL_SCORECARD_URL}&matchid=${matchId}`,
      );

      const ltInn = fullData?.ltinning?.ltinn?.[inningIndex];

      setExtrasData({
        total: ltInn?.ltextras?.[0]?.total ?? 0,
        extra: ltInn?.ltextras?.[0]?.extra ?? 0,
      });

      setBattingData(ltInn?.ltbattingcard ?? []);
      setBowlingData(ltInn?.ltbowlingcard ?? []);
      setFow(ltInn?.fallofwicketsstr ?? '');
    } catch (error) {
      Alert.alert('Error fetching scorecard');
    }
  };

  const handleteamToggle = team => {
    console.log('t', team);
    if (team === activeTeam) return;
    setActiveTeam(team);
    if (team === 'ft') {
      handleGetScorecardData(0);
    } else if (team === 'st') {
      handleGetScorecardData(1);
    }
  };

  if (!matchData)
    return (
      <SafeAreaView style={[styles.safeArea]}>
        {/* // this is the main header view */}
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
                fontSize: fontSize.Large_50,
                fontWeight: '800',
                color: 'black',
              }}>
              Scorecard
            </Text>
          </View>
        </View>
      </SafeAreaView>
    );

  const BatName = (matchData && matchData.BatClubName) || '';
  const BowlName = (matchData && matchData.BowlClubName) || '';

  return (
    <SafeAreaView style={[styles.safeArea]}>
      {/* // this is the main header view */}
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
              fontSize: fontSize.Large_50,
              fontWeight: '800',
              color: 'black',
            }}>
            Scorecard
          </Text>
        </View>
      </View>
      {/* TOP SECTION */}
      <View style={styles.topContainer}>
        <Text style={styles.teamsText}>
          {BatName} v {BowlName}
        </Text>
        <Text style={styles.dateText}>{matchData.Date}</Text>
        <Text style={styles.venueText}>{matchData.Venue}</Text>

        <View style={styles.toggleRow}>
          <TouchableOpacity
            onPress={() => handleteamToggle('ft')}
            style={
              activeTeam === 'ft'
                ? [
                    styles.toggleBtnActive,
                    {
                      backgroundColor: bgColor.coloured,
                      borderRadius: (SCREEN_WIDTH * 0.6) / 0.6,
                    },
                  ]
                : [
                    styles.toggleBtn,
                    {
                      backgroundColor: '#ffffff',
                      borderTopLeftRadius: (SCREEN_WIDTH * 0.6) / 0.6,
                      borderBottomLeftRadius: (SCREEN_WIDTH * 0.6) / 0.6,
                    },
                  ]
            }>
            <Text
              style={
                activeTeam === 'ft'
                  ? styles.toggleTextActive
                  : styles.toggleText
              }>
              {firstteamprefix}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleteamToggle('st')}
            style={
              activeTeam === 'st'
                ? [
                    styles.toggleBtnActive,
                    {
                      backgroundColor: bgColor.coloured,
                      borderRadius: (SCREEN_WIDTH * 0.6) / 0.6,
                    },
                  ]
                : [
                    styles.toggleBtn,
                    {
                      backgroundColor: '#ffffff',
                      borderTopRightRadius: (SCREEN_WIDTH * 0.6) / 0.6,
                      borderBottomRightRadius: (SCREEN_WIDTH * 0.6) / 0.6,
                    },
                  ]
            }>
            <Text
              style={
                activeTeam === 'st'
                  ? styles.toggleTextActive
                  : styles.toggleText
              }>
              {secondteamprefix}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* RIGHT CONTENT - Scrollable */}
      <ScrollView style={styles.contentScroll}>
        {/* BATTING TABLE */}
        <View style={styles.cardContainer}>
          <View style={styles.tableHeaderBat}>
            <Text style={[styles.col_batsman, , {color: bgColor.text_primary}]}>
              Batsmen
            </Text>
            <Text style={[styles.col_small, {color: bgColor.text_primary}]}>
              R
            </Text>
            <Text style={[styles.col_small, {color: bgColor.text_primary}]}>
              B
            </Text>
            <Text style={[styles.col_small, {color: bgColor.text_primary}]}>
              4s
            </Text>
            <Text style={[styles.col_small, {color: bgColor.text_primary}]}>
              6s
            </Text>
            <Text style={[styles.col_small, {color: bgColor.text_primary}]}>
              SR
            </Text>
          </View>

          {battingData.map(p => (
            <View key={p.id} style={styles.tableRow}>
              <View style={styles.col_batsman}>
                <Text style={styles.playerName}>{p.playerFullName}</Text>
                <Text style={styles.dismissal}>{p.dismissal}</Text>
              </View>
              <Text
                style={[
                  styles.col_small,
                  {color: bgColor.text_secondary_color},
                ]}>
                {p.runs}
              </Text>
              <Text
                style={[
                  styles.col_small,
                  {color: bgColor.text_secondary_color},
                ]}>
                {p.balls}
              </Text>
              <Text
                style={[
                  styles.col_small,
                  {color: bgColor.text_secondary_color},
                ]}>
                {p._4s}
              </Text>
              <Text
                style={[
                  styles.col_small,
                  {color: bgColor.text_secondary_color},
                ]}>
                {p._6s}
              </Text>
              <Text
                style={[
                  styles.col_small,
                  {color: bgColor.text_secondary_color},
                ]}>
                {p.sr}
              </Text>
            </View>
          ))}
        </View>

        {/* // this is for extras  */}
        <View style={{marginTop: 12}}>
          <Text style={{fontWeight: '600', color: bgColor.borderStroke}}>
            Extras: {extrasData?.total} {extrasData?.extra}
          </Text>
        </View>

        {/* TOTAL box similar to screenshot */}
        {inningData && (
          <View style={styles.totalBox}>
            <Text style={styles.totalText}>
              TOTAL: {inningData?.Runs}-{inningData?.Wickets} (
              {inningData?.Overs} Overs)
            </Text>
          </View>
        )}

        {/* FALL OF WICKETS */}
        <View style={styles.fallBox}>
          <Text style={styles.fallTitle}>Fall Of Wickets:</Text>
          <Text style={styles.fallValue}>{fow}</Text>
        </View>

        {/* BOWLING TABLE - show irrespective of toggle (as in screenshot it's below batting) */}
        <View style={styles.cardContainer}>
          <View style={styles.tableHeaderBowl}>
            <Text style={[styles.col_batsman, {color: bgColor.text_primary}]}>
              Bowling
            </Text>
            <Text style={[styles.col_small, {color: bgColor.text_primary}]}>
              O
            </Text>
            <Text style={[styles.col_small, {color: bgColor.text_primary}]}>
              R
            </Text>
            <Text style={[styles.col_small, {color: bgColor.text_primary}]}>
              W
            </Text>
            <Text style={[styles.col_small, {color: bgColor.text_primary}]}>
              ECON
            </Text>
          </View>

          {bowlingData.map(b => (
            <View key={b.id} style={styles.tableRowBowl}>
              <Text
                style={[
                  styles.col_batsman,
                  {fontWeight: '600', color: bgColor.coloured},
                ]}>
                {b.playerFullName}
              </Text>
              <Text
                style={[
                  styles.col_small,
                  {color: bgColor.text_secondary_color},
                ]}>
                {b.overs}
              </Text>
              <Text
                style={[
                  styles.col_small,
                  {color: bgColor.text_secondary_color},
                ]}>
                {b.runs}
              </Text>
              <Text
                style={[
                  styles.col_small,
                  {color: bgColor.text_secondary_color},
                ]}>
                {b.wickets}
              </Text>
              <Text
                style={[
                  styles.col_small,
                  {color: bgColor.text_secondary_color},
                ]}>
                {b.econ.slice(0, 4)}
              </Text>
            </View>
          ))}
        </View>

        {/* Padding at bottom */}
        <View style={{height: 40}} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Scorecard;

const styles = StyleSheet.create({
  safeArea: {flex: 1, backgroundColor: '#ffffff'},
  topContainer: {
    width: SCREEN_WIDTH,
    paddingHorizontal: SCREEN_WIDTH * 0.05,
    paddingTop: SCREEN_HEIGHT * 0.02,
    paddingBottom: SCREEN_HEIGHT * 0.02,
    alignItems: 'center',
  },
  titleText: {
    fontWeight: '800',
    color: '#1b4f72',
    textAlign: 'center',
  },
  teamsText: {
    fontSize: fontSize.Medium,
    fontWeight: '900',
    marginTop: 6,
    color: bgColor.coloured,
    textAlign: 'center',
  },
  dateText: {
    fontSize: fontSize.Small,
    color: bgColor.coloured,
    marginTop: 6,
    textAlign: 'center',
  },
  venueText: {
    fontSize: fontSize.Small,
    color: bgColor.coloured,
    textAlign: 'center',
  },

  toggleRow: {
    flexDirection: 'row',
    marginTop: 14,
    borderRadius: (SCREEN_WIDTH * 0.6) / 0.6,
    overflow: 'hidden',
    width: SCREEN_WIDTH * 0.6,
    borderWidth: 1,
    borderColor: bgColor.coloured,
  },
  toggleBtn: {
    flex: 1,
    paddingVertical: HT(1.5),
    alignItems: 'center',
  },
  toggleBtnActive: {
    flex: 1,
    paddingVertical: HT(1.5),
    alignItems: 'center',
  },
  toggleText: {
    color: bgColor.coloured,
    fontWeight: '600',
    fontSize: fontSize.lightMedium_50,
  },
  toggleTextActive: {
    color: bgColor.text_primary,
    fontWeight: '800',
    fontSize: fontSize.lightMedium_50,
  },

  contentScroll: {
    flex: 1,
    paddingHorizontal: SCREEN_WIDTH * 0.03,
    backgroundColor: '#ffffff',
  },

  totalBox: {
    backgroundColor: bgColor.coloured,
    padding: 12,
    marginTop: 16,
    borderRadius: 6,
  },
  totalText: {fontSize: 16, fontWeight: '800', color: bgColor.text_primary},

  fallBox: {marginTop: 12},
  fallTitle: {
    fontWeight: '600',
    marginBottom: 6,
    color: bgColor.borderStroke,
  },
  fallValue: {color: bgColor.coloured},

  cardContainer: {marginTop: 18, borderRadius: 6, overflow: 'hidden'},

  tableHeaderBat: {
    flexDirection: 'row',
    backgroundColor: bgColor.coloured,
    paddingVertical: 10,
    paddingHorizontal: 8,
    alignItems: 'center',
  },
  tableHeaderBowl: {
    flexDirection: 'row',
    backgroundColor: bgColor.coloured,
    paddingVertical: 10,
    paddingHorizontal: 8,
    alignItems: 'center',
  },

  col_batsman: {
    flex: 3,
    fontWeight: '900',
    fontSize: fontSize.verySmall_75 - 2,
    textTransform: 'capitalize',
  },
  col_small: {
    flex: 1,
    textAlign: 'center',
    fontWeight: '700',
    fontSize: fontSize.lightMedium_50,
  },

  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderColor: bgColor.text_tertiary,
  },
  tableRowBowl: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderColor: bgColor.borderStroke,
  },

  playerName: {
    fontWeight: '700',
    color: bgColor.coloured,
    fontSize: fontSize.verySmall_75 - 2,
    textTransform: 'capitalize',
  },
  dismissal: {
    color: bgColor.text_secondary_color,
    fontSize: fontSize.verySmall_75 - 2,
    marginTop: 4,
  },
});

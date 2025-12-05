import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Modal,
  Dimensions,
  FlatList,
  Alert,
} from 'react-native';
import React, {useState, useCallback} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import MainHeaderView from '../../../../Components/Common/MainHeaderView';
import {HT, WD, WIDTH} from '../../../../Constant/Dimensions';
import {useDispatch, useSelector} from 'react-redux';
import {
  bgColor,
  darkTheme,
  fontSize,
  lightTheme,
} from '../../../../Constant/Fonts&Colors';
import {
  bottomSheetAction,
  drawerHandleAction,
  rightDrawerHandleAction,
} from '../../../../Redux/ReducerSlices/UserSlice';
import {TouchableOpacity} from 'react-native-gesture-handler';
import ComparisonTable from '../../../../Components/More/ComparisonTable';
import axios from 'axios';
import {baseUrl, stagingUrl} from '../../../../Constant/BaseUrl';
import {useRef} from 'react';

const {width, height} = Dimensions.get('window');

const PlayerComparison = () => {
  const dispatch = useDispatch();
  const {userData, darkMode} = useSelector(state => state.localdata);
  const scrollRef = useRef(null);

  const [format, setFormat] = useState('Select Format');

  const [tournament, setTournament] = useState('Select Tournament');
  const [tournamentapidata, setTournamentapidata] = useState([]);
  const [compid, setCompid] = useState(null);

  const [category, setCategory] = useState('Select Category');

  const [playerData, setPlayerData] = useState([]);

  const [player1, setPlayer1] = useState('Select Player');
  const [player1apidata, setPlayer1apidata] = useState([]);
  const [player1id, setPlayer1Id] = useState(null);

  const [player2, setPlayer2] = useState('Select Player');
  const [player2apidata, setPlayer2apidata] = useState([]);
  const [player2id, setPlayer2Id] = useState(null);
  const [compare, setCompare] = useState(false);

  const [comparisonplayer1data, setComparisionPlayer1Data] = useState([]);
  const [comparisonplayer2data, setComparisionPlayer2Data] = useState([]);

  const [currentModal, setCurrentModal] = useState(null);

  const theme = darkMode ? darkTheme : lightTheme;

  console.log('p', player1id);

  const KPIs = [
    {label: 'Matches', key: 'Mat'},
    {label: 'Innings', key: 'Inns'},
    {label: 'Runs', key: 'Runs'},
    {label: 'Balls', key: 'Balls'},
    {label: 'Average', key: 'Avg'},
    {label: 'StrikeRate', key: 'SR'},
    {label: '4s', key: 'Fours'},
    {label: '6s', key: 'Sixes'},
    {label: 'Boundary%', key: 'BdryPer'},
    {label: 'BPD', key: 'BPD'},
    {label: '50s', key: 'Fiftys'},
    {label: '100s', key: 'Hundreds'},
    {label: 'HighScore', key: 'HS'},
  ];

  const pressedDrawer = useCallback(() => {
    dispatch(drawerHandleAction(true));
  }, []);

  const pressedRightDrawer = useCallback(() => {
    dispatch(rightDrawerHandleAction(true));
  }, []);

  const formatData = [
    {id: 1, value: 'T20', val: '13'},
    {id: 2, value: '1 Day League', val: '3,5'},
    {id: 3, value: '2 Day League', val: '4,7'},
  ];

  const categoryData = [
    {id: 1, value: 'Batting'},
    {id: 2, value: 'Bowling'},
  ];

  const ButtonAlert = (title, msg) =>
    Alert.alert(title, msg, [
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);

  const handleSelectedFilter = filter => {
    if (filter == 'tournament') {
      if (format == 'Select Format') {
        ButtonAlert('Missing Format', 'Please Select a format');
        return;
      }
    } else if (filter == 'category') {
      if (tournament == 'Select Tournament') {
        ButtonAlert('Missing Tournament', 'Please Select a Tournament');
        return;
      }
    } else if (filter == 'player1') {
      if (category == 'Select Category') {
        ButtonAlert('Missing Category', 'Please Select a Category');
        return;
      }
    } else if (filter == 'player2') {
      if (player1 == 'Select Player') {
        ButtonAlert('Missing Player1', 'Please Select a Player1');
        return;
      }
    }

    setCurrentModal(filter);
  };

  const handleSelectedItem = async item => {
    // console.log('item', item);
    if (currentModal === 'format') {
      //   console.log('this is the item', item);
      try {
        const res = await axios.get(
          `${stagingUrl}/app/api/competition-data/getbymatchtype/${item.val}`,
        );
        // console.log('this is the response', res.data.Data);
        setTournamentapidata(res.data.Data);
      } catch (error) {
        console.log(error);
      } finally {
        if (format != item.value) {
          setTournament('Select Tournament');
          setCompid(null);
          setPlayerData([]);
          setPlayer1('Select Player');
          setPlayer1apidata([]);
          setPlayer1Id(null);
          setPlayer2('Select Player');
          setPlayer2apidata([]);
          setPlayer2Id(null);
        }
      }
      setFormat(item.value);
    }
    if (currentModal === 'tournament') {
      try {
        const res = await axios.get(
          `${stagingUrl}/app/api/competition-data/get-comp-players/${item.FSAID}`,
        );
        // console.log('this is the response', res.data);
        setPlayerData(res.data);
        setPlayer1apidata(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        if (tournament != item.Name) {
          setPlayer1('Select Player');
          setPlayer2('Select Player');
          setPlayer1Id(null);
          setPlayer2Id(null);
        }
      }
      setTournament(item.Name);
      setCompid(item.FSAID);
    }
    if (currentModal === 'category') {
      setCategory(item.value);
    }
    if (currentModal === 'player1') {
      setPlayer1(item.PlayerName);
      setPlayer1Id(item.PlayerId);
      const arr = playerData.filter(val => val.PlayerId != item.PlayerId);
      setPlayer2apidata(arr);
    }
    if (currentModal === 'player2') {
      setPlayer2(item.PlayerName);
      setPlayer2Id(item.PlayerId);
    }
  };

  const handleCompare = async () => {
    if (
      format == 'Select Format' ||
      tournament == 'Select Tournament' ||
      category == 'Select Category' ||
      player1 == 'Select Player' ||
      player2 == 'Select Player'
    ) {
      ButtonAlert('Missing Filters', 'Please select all the filters');
    } else {
      const selectedObj = formatData.find(item => item.value === format);

      try {
        const res = await axios.get(
          `https://cloud.cricket-21.com/cricketapi/api/otms/GetPlayerCompare_otms?playerid1=532851&playerid2=1472059&category=Batting&format=13&compid=1000001593&fromdate=&todate=`,
        );
        console.log(
          'this is the response',
          res.data,
          `https://cloud.cricket-21.com/cricketapi/api/otms/GetPlayerCompare_otms?playerid1=${player1id}&playerid2=${player2id}&category=${category}&format=${format}&compid=${compid}&fromdate=&todate=`,
        );
        // https://cloud.cricket-21.com/cricketapi/api/otms/GetPlayerCompare_otms?playerid1=532851&playerid2=1472059&category=Batting&format=13&compid=1000001593&fromdate=&todate=
        setComparisionPlayer1Data(res.data.Player1);
        setComparisionPlayer2Data(res.data.Player2);
        setCompare(true);
        if (res.data.Player1.length == 0 && res.data.Player1.length == 0) {
          alert('data not found');
        }
      } catch (error) {
        console.log('this is the error', error);
      } finally {
        setTimeout(() => {
          scrollRef.current?.scrollToEnd({animated: true});
        }, 400);
      }
    }
  };

  // this is the filter modal
  const FilterModal = ({visible, title, data, onSelect, onClose}) => {
    return (
      <Modal transparent visible={visible} animationType="fade">
        <Pressable style={styles.backdrop} onPress={onClose} />

        <View style={styles.modalContainer}>
          {/* Header  */}
          <Text style={styles.title}>{title}</Text>

          {/* List */}
          <FlatList
            data={data}
            style={{width: '100%'}}
            renderItem={({item}) => (
              <Pressable
                style={styles.listItem}
                onPress={() => {
                  onSelect(item);
                  onClose();
                }}>
                <Text style={styles.itemText}>
                  {currentModal === 'format'
                    ? item.value
                    : currentModal === 'tournament'
                    ? item.Name
                    : currentModal === 'player1'
                    ? item.PlayerName
                    : currentModal === 'player2'
                    ? item.PlayerName
                    : item.value}
                </Text>
              </Pressable>
            )}
          />
        </View>
      </Modal>
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: bgColor.bg_globe}}>
      <MainHeaderView
        screenName={'Player Comparison'}
        pressedDrawer={pressedDrawer}
        pressedRightDrawer={pressedRightDrawer}
      />
      <View style={{width: WD(100), alignItems: 'center'}}>
        <ScrollView showsVerticalScrollIndicator={false} ref={scrollRef}>
          {/* format filter  */}
          <View
            style={{
              width: WD(95),
              height: HT(9),
              marginTop: 10,
            }}>
            {/* // this is the text header */}
            <View
              style={{
                width: '100%',
                height: '40%',
                justifyContent: 'flex-end',
                alignItems: 'flex-start',
                paddingLeft: 7.5,
              }}>
              <Text
                style={{
                  fontWeight: '700',
                  color: bgColor.bg_island,
                  fontSize: fontSize.lightMedium_50,
                }}>
                Format
              </Text>
            </View>
            {/* // this is the pressable to open modal */}
            <View
              style={{
                width: '100%',
                height: '60%',
                justifyContent: 'center',
                alignItems: 'center',
                paddingLeft: 5,
              }}>
              <Pressable
                onPress={() => handleSelectedFilter('format')}
                style={{
                  width: '99%',
                  height: '80%',
                  backgroundColor: bgColor.white,
                  borderRadius: WD(1) * 1,
                  elevation: 2,
                  flexDirection: 'row',
                }}>
                <View
                  style={{
                    width: '88%',
                    height: '100%',
                    paddingLeft: 10,
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      fontWeight: '600',
                      fontSize: fontSize.lightMedium_50,
                      color: bgColor.text_tertiary,
                    }}>
                    {format}
                  </Text>
                </View>
                <View
                  style={{
                    width: '12%',
                    height: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    resizeMode="contain"
                    source={require('../../../../Assets/Images/down-arrow.png')}
                    style={{width: '55%', height: '55%'}}
                  />
                </View>
              </Pressable>
            </View>
          </View>
          {/* Tournament filter  */}
          <View
            style={{
              width: WD(95),
              height: HT(9),
            }}>
            {/* // this is the text header */}
            <View
              style={{
                width: '100%',
                height: '40%',
                justifyContent: 'flex-end',
                alignItems: 'flex-start',
                paddingLeft: 7.5,
              }}>
              <Text
                style={{
                  fontWeight: '700',
                  color: bgColor.bg_island,
                  fontSize: fontSize.lightMedium_50,
                }}>
                Tournament
              </Text>
            </View>
            {/* // this is the pressable to open modal */}
            <View
              style={{
                width: '100%',
                height: '60%',
                justifyContent: 'center',
                alignItems: 'center',
                paddingLeft: 5,
              }}>
              <Pressable
                onPress={() => handleSelectedFilter('tournament')}
                style={{
                  width: '99%',
                  height: '80%',
                  backgroundColor: bgColor.white,
                  borderRadius: WD(1) * 1,
                  elevation: 2,
                  flexDirection: 'row',
                }}>
                <View
                  style={{
                    width: '88%',
                    height: '100%',
                    paddingLeft: 10,
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      fontWeight: '600',
                      fontSize: fontSize.lightMedium_50,
                      color: bgColor.text_tertiary,
                    }}>
                    {tournament}
                  </Text>
                </View>
                <View
                  style={{
                    width: '12%',
                    height: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    resizeMode="contain"
                    source={require('../../../../Assets/Images/down-arrow.png')}
                    style={{width: '55%', height: '55%'}}
                  />
                </View>
              </Pressable>
            </View>
          </View>
          {/* Category filter  */}
          <View
            style={{
              width: WD(95),
              height: HT(9),
            }}>
            {/* // this is the text header */}
            <View
              style={{
                width: '100%',
                height: '40%',
                justifyContent: 'flex-end',
                alignItems: 'flex-start',
                paddingLeft: 7.5,
              }}>
              <Text
                style={{
                  fontWeight: '700',
                  color: bgColor.bg_island,
                  fontSize: fontSize.lightMedium_50,
                }}>
                Category
              </Text>
            </View>
            {/* // this is the pressable to open modal */}
            <View
              style={{
                width: '100%',
                height: '60%',
                justifyContent: 'center',
                alignItems: 'center',
                paddingLeft: 5,
              }}>
              <Pressable
                onPress={() => handleSelectedFilter('category')}
                style={{
                  width: '99%',
                  height: '80%',
                  backgroundColor: bgColor.white,
                  borderRadius: WD(1) * 1,
                  elevation: 2,
                  flexDirection: 'row',
                }}>
                <View
                  style={{
                    width: '88%',
                    height: '100%',
                    paddingLeft: 10,
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      fontWeight: '600',
                      fontSize: fontSize.lightMedium_50,
                      color: bgColor.text_tertiary,
                    }}>
                    {category}
                  </Text>
                </View>
                <View
                  style={{
                    width: '12%',
                    height: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    resizeMode="contain"
                    source={require('../../../../Assets/Images/down-arrow.png')}
                    style={{width: '55%', height: '55%'}}
                  />
                </View>
              </Pressable>
            </View>
          </View>
          {/* select player 1  */}
          <View
            style={{
              width: WD(95),
              height: HT(9),
            }}>
            {/* // this is the text header */}
            <View
              style={{
                width: '100%',
                height: '40%',
                justifyContent: 'flex-end',
                alignItems: 'flex-start',
                paddingLeft: 7.5,
              }}>
              <Text
                style={{
                  fontWeight: '700',
                  color: bgColor.bg_island,
                  fontSize: fontSize.lightMedium_50,
                }}>
                Player 1
              </Text>
            </View>
            {/* // this is the pressable to open modal */}
            <View
              style={{
                width: '100%',
                height: '60%',
                justifyContent: 'center',
                alignItems: 'center',
                paddingLeft: 5,
              }}>
              <Pressable
                onPress={() => handleSelectedFilter('player1')}
                style={{
                  width: '99%',
                  height: '80%',
                  backgroundColor: bgColor.white,
                  borderRadius: WD(1) * 1,
                  elevation: 2,
                  flexDirection: 'row',
                }}>
                <View
                  style={{
                    width: '88%',
                    height: '100%',
                    paddingLeft: 10,
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      fontWeight: '600',
                      fontSize: fontSize.lightMedium_50,
                      color: bgColor.text_tertiary,
                    }}>
                    {player1}
                  </Text>
                </View>
                <View
                  style={{
                    width: '12%',
                    height: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    resizeMode="contain"
                    source={require('../../../../Assets/Images/down-arrow.png')}
                    style={{width: '55%', height: '55%'}}
                  />
                </View>
              </Pressable>
            </View>
          </View>
          {/* select player 2  */}
          <View
            style={{
              width: WD(95),
              height: HT(9),
            }}>
            {/* // this is the text header */}
            <View
              style={{
                width: '100%',
                height: '40%',
                justifyContent: 'flex-end',
                alignItems: 'flex-start',
                paddingLeft: 7.5,
              }}>
              <Text
                style={{
                  fontWeight: '700',
                  color: bgColor.bg_island,
                  fontSize: fontSize.lightMedium_50,
                }}>
                Player 2
              </Text>
            </View>
            {/* // this is the pressable to open modal */}
            <View
              style={{
                width: '100%',
                height: '60%',
                justifyContent: 'center',
                alignItems: 'center',
                paddingLeft: 5,
              }}>
              <Pressable
                onPress={() => handleSelectedFilter('player2')}
                style={{
                  width: '99%',
                  height: '80%',
                  backgroundColor: bgColor.white,
                  borderRadius: WD(1) * 1,
                  elevation: 2,
                  flexDirection: 'row',
                }}>
                <View
                  style={{
                    width: '88%',
                    height: '100%',
                    paddingLeft: 10,
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      fontWeight: '600',
                      fontSize: fontSize.lightMedium_50,
                      color: bgColor.text_tertiary,
                    }}>
                    {player2}
                  </Text>
                </View>
                <View
                  style={{
                    width: '12%',
                    height: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    resizeMode="contain"
                    source={require('../../../../Assets/Images/down-arrow.png')}
                    style={{width: '55%', height: '55%'}}
                  />
                </View>
              </Pressable>
            </View>
          </View>
          {/* compare button  */}
          <View
            style={{
              width: WD(95),
              height: HT(8),
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              onPress={() => handleCompare()}
              style={{
                width: WD(25),
                height: HT(4.5),
                backgroundColor: bgColor.coloured,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: WD(2) * 1,
              }}>
              <Text
                style={{
                  fontSize: fontSize.lightMedium,
                  color: bgColor.text_primary,
                  fontWeight: '700',
                }}>
                Compare
              </Text>
            </TouchableOpacity>
          </View>
          {/* table View  */}
          {compare && (
            <ComparisonTable
              player1={comparisonplayer1data[0]}
              player2={comparisonplayer2data[0]}
              kpis={KPIs}
            />
          )}
          {/* // this is for bottom gap   */}
          <View
            style={{
              width: WD(95),
              height: HT(8),
            }}></View>
        </ScrollView>
      </View>

      <FilterModal
        visible={currentModal !== null}
        title={
          currentModal === 'format'
            ? 'Select Format'
            : currentModal === 'tournament'
            ? 'Select Tournament'
            : currentModal === 'category'
            ? 'Select Category'
            : currentModal === 'player1'
            ? 'Select Player 1'
            : 'Select Player 2'
        }
        data={
          currentModal === 'format'
            ? formatData
            : currentModal === 'tournament'
            ? tournamentapidata
            : currentModal === 'category'
            ? categoryData
            : currentModal === 'player1'
            ? player1apidata
            : player2apidata
        }
        onSelect={item => handleSelectedItem(item)}
        onClose={() => setCurrentModal(null)}
      />
    </SafeAreaView>
  );
};

export default PlayerComparison;

const styles = StyleSheet.create({
  backdrop: {
    position: 'absolute',
    width: width,
    height: height,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalContainer: {
    position: 'absolute',
    width: width * 0.8,
    height: height * 0.45,
    top: height * 0.25,
    left: width * 0.1,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    elevation: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },
  listItem: {
    width: '100%',
    height: 55,
    justifyContent: 'center',
    borderBottomWidth: 0.6,
    borderColor: '#ccc',
    paddingHorizontal: 10,
  },
  itemText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

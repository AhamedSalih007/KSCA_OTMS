import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  TextInput,
  Dimensions,
  Modal,
  FlatList,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useState, useCallback, useEffect} from 'react';
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
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {bgColor} from '../../../../Constant/Fonts&Colors';
import StickyTable from '../../../../Components/More/StickyTable';
import {GetEvaluationForm_ScoutingAPI} from '../../../../API/ScoutingAPI';

const {width, height} = Dimensions.get('window');

const Evaluation = ({navigation}) => {
  const dispatch = useDispatch();
  const {userData, darkMode} = useSelector(state => state.localdata);
  const theme = darkMode ? darkTheme : lightTheme;
  const scrollRef = null;
  const [currentModal, setCurrentModal] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [playername, setPlayername] = useState('Select Player');
  const [formtype, setFormtype] = useState('Select Form Type');
  const [evaluationData, setEvaluationData] = useState([]);
  const [evaluationDataClone, setEvaluationDataClone] = useState([]);
  const [playerFilterData, setPlayerFilterData] = useState([]);
  const [firstcolumn, setFirstColumn] = useState('PLAYER_NAME');
  const [hiddencolumns, setHiddenColumns] = useState([
    'ROLE',
    'USERNAME',
    'Userid',
    'FormID',
    'AutoID',
    'ShowStatus',
  ]);

  const formatData = [
    {id: 1, value: 'Bowling'},
    {id: 2, value: 'Batting'},
    {id: 3, value: 'All'},
  ];

  useFocusEffect(
    useCallback(() => {
      console.log('Screen is visible now!');
      getEvalForm();
      return () => {
        console.log('Screen is leaving...');
      };
    }, []),
  );

  // useEffect(() => {

  // }, []);

  const getEvalForm = async () => {
    const response = await GetEvaluationForm_ScoutingAPI(userData?.userID);

    // console.log('res2', response?.data);

    // const dummy = {
    //   AutoID: 79,
    //   FormID: 12,
    //   FormName: 'SELECTOR/TRDO - BOWLING',
    //   Userid: 42,
    //   USERNAME: 'Selector',
    //   ROLE: 6,
    //   ShowStatus: true,
    //   PLAYER_NAME: 'Salih',
    //   KSCA_Id: 'KSCAN9509',
    //   MatchID: 163,
    //   DATE_OF_ASSESSMENT: 'Nov 26, 2025',
    //   CATEGORY: 'Bowling',
    //   CloseStatus: true,f
    // };
    if (response != 'Error') {
      console.log('res', response?.data);
      const playerArr = [...response?.data].map((val, index) => ({
        id: index + 1,
        name: val.PLAYER_NAME,
      }));
      playerArr.unshift({id: 0, name: 'All'});
      setPlayerFilterData(playerArr);
      setEvaluationData([...response?.data]);
      setEvaluationDataClone([...response?.data]);
    } else {
    }
  };

  const pressedDrawer = useCallback(() => {
    dispatch(drawerHandleAction(true));
  }, []);

  const pressedRightDrawer = useCallback(() => {
    dispatch(rightDrawerHandleAction(true));
  }, []);

  const handleSelectedFilter = filterType => {
    if (filterType === 'form') {
      setCurrentModal('form');
    } else if (filterType === 'Player') {
      setCurrentModal('Player');
    }
  };

  const handlesearchfilter = text => {
    setSearchText(text);
    // console.log('eval', evaluationDataClone);
    const filteredData = evaluationDataClone.filter(item => {
      if (item.PLAYER_NAME != null) {
        return item.PLAYER_NAME.toLowerCase().includes(text.toLowerCase());
      }
    });
    setEvaluationData(filteredData);
  };

  const handleSelectedItem = async item => {
    if (currentModal === 'form') {
      setFormtype(item.value);
      if (playername !== 'Select Player' && playername !== 'All') {
        const nwarr = evaluationDataClone.filter(
          val => val.CATEGORY === item.value && val.PLAYER_NAME === playername,
        );
        setEvaluationData(nwarr);
        return;
      }
      if (item.value === 'All') {
        setEvaluationData(evaluationDataClone);
        return;
      }
      const nwarr = evaluationDataClone.filter(
        val => val.CATEGORY === item.value,
      );
      setEvaluationData(nwarr);
    }

    if (currentModal === 'Player') {
      setPlayername(item.name);
      if (formtype !== 'Select Form Type' && formtype !== 'All') {
        const nwarr = evaluationDataClone.filter(
          val => val.PLAYER_NAME === item.name && val.CATEGORY === formtype,
        );
        setEvaluationData(nwarr);
        return;
      }
      if (item.name === 'All') {
        setEvaluationData(evaluationDataClone);
        return;
      }
      const nwarr = evaluationDataClone.filter(
        val => val.PLAYER_NAME === item.name,
      );
      setEvaluationData(nwarr);
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
                  {currentModal === 'form'
                    ? item.value
                    : currentModal === 'Player'
                    ? item.name
                    : null}
                </Text>
              </Pressable>
            )}
          />
        </View>
      </Modal>
    );
  };

  const onPressPlayer = data => {
    console.log(data);

    const data2 = {
      ...data,
      UID: data.KSCA_Id,
    };

    navigation.navigate('PlayerProfile', {playerData: data2});
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: bgColor.bg_globe}}>
      <MainHeaderView
        screenName={'Evaluation'}
        pressedDrawer={pressedDrawer}
        pressedRightDrawer={pressedRightDrawer}
      />
      <View
        style={{
          width: WD(100),
          alignItems: 'center',
          //   backgroundColor: bgColor.,
        }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          ref={scrollRef}
          contentContainerStyle={{alignItems: 'center'}}>
          {/* // this is the view for filters */}
          <View
            style={{
              height: HT(10),
              width: WD(95),
              paddingTop: 5,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            {/* player filter  */}
            <View
              style={{
                width: WD(45),
                height: HT(9),
              }}>
              {/* // this is the text header */}
              <View
                style={{
                  width: '100%',
                  height: '40%',
                  justifyContent: 'flex-end',
                  alignItems: 'flex-start',
                }}>
                <Text
                  style={{
                    fontWeight: '700',
                    color: bgColor.bg_island,
                    fontSize: fontSize.lightMedium_50,
                    paddingLeft: 3,
                  }}>
                  Player
                </Text>
              </View>
              {/* // this is the pressable to open modal */}
              <View
                style={{
                  width: '100%',
                  height: '60%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Pressable
                  onPress={() => handleSelectedFilter('Player')}
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
                      {playername}
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

            {/* Form filter  */}
            <View
              style={{
                width: WD(45),
                height: HT(9),
              }}>
              {/* // this is the text header */}
              <View
                style={{
                  width: '100%',
                  height: '40%',
                  justifyContent: 'flex-end',
                  alignItems: 'flex-start',
                }}>
                <Text
                  style={{
                    fontWeight: '700',
                    color: bgColor.bg_island,
                    fontSize: fontSize.lightMedium_50,
                    paddingLeft: 3,
                  }}>
                  Form
                </Text>
              </View>
              {/* // this is the pressable to open modal */}
              <View
                style={{
                  width: '100%',
                  height: '60%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Pressable
                  onPress={() => handleSelectedFilter('form')}
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
                      {formtype}
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
          </View>

          {/* // this is the view for table title  */}
          <View
            style={{
              width: WD(95),
              height: HT(5),
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: fontSize.Large_50,
                fontWeight: '700',
                color: bgColor.bg_island,
              }}>
              Submitted Entries
            </Text>
          </View>

          {/* // this is view is for gap  */}
          <View style={{width: WD(100), height: HT(1.3)}}></View>

          {/* // this is the view for table container  */}
          <View
            style={{
              width: WD(95),
              height: HT(66),
              paddingTop: 15,
              backgroundColor: bgColor.white,
              borderRadius: WD(2) * 1,
              alignItems: 'center',
              gap: 18,
            }}>
            {/* // this is for search box */}
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
                    onChangeText={handlesearchfilter}
                    value={searchText}
                    placeholder="Search Players..."
                    keyboardType="text"
                  />
                </View>
              </View>
            </View>
            {/* table View  */}
            {evaluationData.length > 0 ? (
              <StickyTable
                data={evaluationData} // or array of players
                hiddenKeys={hiddencolumns}
                firstcol={firstcolumn}
                onPressPlayer={onPressPlayer}
              />
            ) : evaluationData.length == 0 ? (
              <Text>No Data Found</Text>
            ) : (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: WD(85),
                  height: HT(55),
                }}>
                <ActivityIndicator size="large" color="#00ff00" />
              </View>
            )}
          </View>

          {/* // this is for bottom gap */}
          <View
            style={{
              width: WD(95),
              height: HT(8),
            }}></View>

          <FilterModal
            visible={currentModal !== null}
            title={
              currentModal === 'form'
                ? 'Select Form Type'
                : currentModal === 'Player'
                ? 'Select Player'
                : null
            }
            data={
              currentModal === 'form'
                ? formatData
                : currentModal === 'Player'
                ? playerFilterData
                : null
            }
            onSelect={item => handleSelectedItem(item)}
            onClose={() => setCurrentModal(null)}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Evaluation;

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

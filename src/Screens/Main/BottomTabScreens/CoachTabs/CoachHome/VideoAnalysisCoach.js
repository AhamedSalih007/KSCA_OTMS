import React, {useCallback, useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {bgColor} from '../../../../../Constant/Fonts&Colors';
import {useDispatch, useSelector} from 'react-redux';
import {
  drawerHandleAction,
  rightDrawerHandleAction,
} from '../../../../../Redux/ReducerSlices/UserSlice';
import MainHeaderView from '../../../../../Components/Common/MainHeaderView';
import TopTabBar from '../../../../../Components/Anim/TopTabBar';
import Video_Coach from './Video_Coach';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {HT, WD, WIDTH} from '../../../../../Constant/Dimensions';
import {GetUploadedVideos2_CoachAPI} from '../../../../../API/CoachAPI';
import BeehivePlot from '../../../../../Components/Coach/BeehivePlot';
import PitchmapPlot from '../../../../../Components/Coach/PitchmapPlot';
import WagonWheelPlot from '../../../../../Components/Coach/WagonWheelPlot';
import {filtersVideo} from '../../../../../Constant/CoachConstant';
import FilterMasterModal from '../../../../../Components/Modal/FiltersModal';
import SessionModal from '../../../../../Components/Modal/FiltersModal';
import FiltersModal from '../../../../../Components/Modal/FiltersModal';

const VideoAnalysisCoach = () => {
  const {session, players, coaches} = useSelector(state => state.coachdata);

  const dispatch = useDispatch();

  const [currentTab, setCurrentTab] = useState(0);

  const [videos, setVideos] = useState([]);

  const [masterVideos, setMasterVideos] = useState([]);

  const [modal, setModal] = useState(false);

  // const [selectedSession, setSelectedSession] = useState(null);

  // const [selectedBatter, setselectedBatter] = useState(null);

  // const [selectedBowler, setselectedBowler] = useState(null);

  // const [selectedType, setSelectedType] = useState(null);

  const [batters, setBatters] = useState([]);
  const [bowlers, setBowlers] = useState([]);
  const [type, setType] = useState([
    {id: 1, name: 'RHB'},
    {id: 2, name: 'LHB'},
  ]);

  const [sessionAll, setSessionAll] = useState([...session]);

  const [currentData, setCurrentData] = useState(null);

  const [name, setName] = useState('');

  const [selectedData, setSelectedData] = useState(null);

  console.log('v', selectedData);

  const [currentSession, setCurrentSession] = useState(null);
  const [currentBatters, setCurrentBatters] = useState(null);
  const [currentBowlers, setCurrentBowlers] = useState(null);
  const [currentType, setCurrentType] = useState(null);

  useEffect(() => {
    let battersAll = [];
    let bowlersAll = [];

    for (let i = 0; i < players.length; i++) {
      if (players[i]?.Role != null) {
        if (players[i].Role == 'Batsman') {
          battersAll.push(players[i]);
        }
        if (players[i].Role == 'Bowler') {
          bowlersAll.push(players[i]);
        }
        if (players[i].Role == 'All Rounder') {
          battersAll.push(players[i]);
          bowlersAll.push(players[i]);
        }
      }
    }

    // console.log('Bat', battersAll.length);
    // console.log('Bow', bowlersAll.length);

    setBatters(battersAll);
    setBowlers(bowlersAll);
  }, []);

  const [filterIndex, setFilterIndex] = useState(null);

  const pressedDrawer = useCallback(() => {
    dispatch(drawerHandleAction(true));
  }, []);

  const pressedRightDrawer = useCallback(() => {
    dispatch(rightDrawerHandleAction(true));
  }, []);

  useEffect(() => {
    getVideos();
  }, []);

  const getVideos = async () => {
    const response = await GetUploadedVideos2_CoachAPI();

    if (response != 'Error') {
      console.log('res', response?.Data?.UploadedVideos.length);
      setVideos(response?.Data?.UploadedVideos);
      setMasterVideos(response?.Data?.UploadedVideos);
    } else {
    }
  };

  const onPressFilter = (item, index) => {
    // console.log('item', item, index);
    setFilterIndex(index);
    setModal(true);
    // Session
    if (index == 0) {
      setName('Sessions');
      setCurrentData(sessionAll);
    }
    // Batters
    else if (index == 1) {
      setName('Batters');
      setCurrentData(batters);
    }
    // Bowlers
    else if (index == 2) {
      setName('Bowlers');
      setCurrentData(bowlers);
    }
    // Type
    else {
      setName('Type');
      setCurrentData(type);
    }
  };

  const filterVideosHandle = (item, name) => {
    console.log('m', item);

    if (name == 'Sessions') {
      const videosAll = masterVideos.filter(d => d.GroupID == item.SessionId);

      // console.log('v', videosAll.length);

      setVideos(videosAll);
      setCurrentBatters(null);
      setCurrentBowlers(null);
      setCurrentType(null);
    } else {
      // setVideos(videosAll);
    }
  };

  const pressSelect = (item, index) => {
    // console.log('item', item, index);
    setModal(false);
    if (name == 'Sessions') {
      setCurrentSession(item);
      filterVideosHandle(item, name);
    } else if (name == 'Batters') {
      setCurrentBatters(item);
      filterVideosHandle(item, name);
    } else if (name == 'Bowlers') {
      setCurrentBowlers(item);
      filterVideosHandle(item, name);
    } else {
      setCurrentType(item);
      filterVideosHandle(item, name);
    }
  };

  const filterHeaderName = item => {
    if (item == 'Sessions') {
      return currentSession != null ? currentSession?.SessionName : item;
    } else if (item == 'Batters') {
      return currentBatters != null ? currentBatters?.PlayerName : item;
    } else if (item == 'Bowlers') {
      return currentBowlers != null ? currentBowlers?.PlayerName : item;
    } else {
      return currentType != null ? currentType?.name : item;
    }
  };

  const onClearHandle = item => {
    setModal(false);
    if (item == 'Sessions') {
      setCurrentSession(null);
    } else if (item == 'Batters') {
      setCurrentBatters(null);
    } else if (item == 'Bowlers') {
      setCurrentBowlers(null);
    } else {
      setCurrentType(null);
    }
  };

  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: bgColor.bg_globe}}
      onStartShouldSetResponder={() => setFilterIndex(null)}>
      <MainHeaderView
        screenName={'Video Analysis'}
        pressedDrawer={pressedDrawer}
        pressedRightDrawer={pressedRightDrawer}
        // onTapSearch={() => searchRef.current?.open()}
      />

      <TopTabBar onTabChange={index => setCurrentTab(index)} />

      {/* Filter Buttons */}
      <View style={styles.filterRow}>
        {filtersVideo.map((item, index) => (
          <View key={index} style={{position: 'relative'}}>
            <TouchableOpacity
              onPress={() => onPressFilter(item, index)}
              key={index}
              style={styles.filterButton}>
              <View
                style={{
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                  backgroundColor: bgColor.coloured,
                  borderRadius: 20,
                  opacity: 0.2,
                }}
              />
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={styles.filterText}>
                {filterHeaderName(item)}
              </Text>
              <Image
                resizeMode="contain"
                style={{
                  width: '10%',
                  height: '100%',
                  right: WD(2.5),
                  position: 'absolute',
                }}
                source={require('../../../../../Assets/Images/down-arrow.png')}
              />
            </TouchableOpacity>
          </View>
        ))}
      </View>

      <View style={{flex: 1}}>
        {currentTab == 0 ? (
          <Video_Coach
            videos={videos}
            // onPress={onPressFilter}
            filterIndex={filterIndex}
          />
        ) : currentTab == 2 ? (
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <BeehivePlot balls={videos} />
          </View>
        ) : currentTab == 1 ? (
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}>
            <PitchmapPlot balls={videos} />
          </View>
        ) : (
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <WagonWheelPlot balls={videos} />
          </View>
        )}
      </View>

      {/* Filter Modal */}

      <FiltersModal
        visible={modal}
        onClose={() => setModal(false)}
        data={currentData}
        name={name}
        pressSelect={pressSelect}
        currentSession={currentSession}
        currentBatters={currentBatters}
        currentBowlers={currentBowlers}
        currentType={currentType}
        onClear={name => onClearHandle(name)}
        onCancel={() => setModal(false)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  // Filters UI
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: WD(2),
    width: WD(100),
    height: HT(5),
    bottom: HT(1),
  },
  filterButton: {
    // paddingVertical: 5,
    // paddingHorizontal: WD(2),
    borderRadius: WD(5),
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    height: HT(5),
    width: WD(22),
  },
  filterText: {
    color: '#2E4E2E',
    fontSize: 14,
    fontWeight: '600',
    width: '80%',
  },

  image: {
    width: '100%',
    height: '100%',
  },

  // Badge
  badge: {
    position: 'absolute',
    top: 10,
    right: 10,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
    zIndex: 10,
  },
  badgeText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 12,
    left: WD(1),
  },

  // Overlay Text
  overlay: {
    position: 'absolute',
    bottom: 12,
    left: 10,
  },
  title: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
    marginBottom: 4,
  },
  player: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 12,
  },
  date: {
    color: '#eee',
    fontSize: 11,
    marginTop: 4,
  },
});

export default VideoAnalysisCoach;

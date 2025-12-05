import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  Pressable,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {HT, WD} from '../../../../Constant/Dimensions';
import {bgColor, fontSize} from '../../../../Constant/Fonts&Colors';
import MainHeaderView from '../../../../Components/Common/MainHeaderView';
import {
  drawerHandleAction,
  rightDrawerHandleAction,
} from '../../../../Redux/ReducerSlices/UserSlice';
import {useDispatch, useSelector} from 'react-redux';
import {GetSessionMetaData_CoachAPI} from '../../../../API/CoachAPI';
import {
  coachesAction,
  playersAction,
  sessionAction,
} from '../../../../Redux/ReducerSlices/CoachSlice';

const statsData = [
  {
    id: 1,
    title: 'Total Sessions',
    value: '128',
    icon: require('../../../../Assets/Images/group2.png'),
    color: '#13ec5b',
  },
  {
    id: 2,
    title: 'Total Players',
    value: '15',
    icon: require('../../../../Assets/Images/user2.png'),
    color: '#0092ff',
  },
  {
    id: 3,
    title: 'Total Deliveries',
    value: '3,450',
    icon: require('../../../../Assets/Images/ball2.png'),
    color: '#ff6a00',
  },
];

const renderPlayers = (player, index) => {
  return (
    <TouchableOpacity
      key={index}
      style={[styles.playerCard, {width: WD(90), height: HT(8)}]}>
      <View
        style={{
          width: WD(10),
          height: WD(10),
          borderRadius: WD(10) / 2,
          overflow: 'hidden',
          //   backgroundColor: item.color,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            backgroundColor: bgColor.coloured,
            opacity: 0.1,
          }}
        />

        <Image
          style={{width: '50%', height: '50%', tintColor: bgColor.coloured}}
          source={require('../../../../Assets/Images/user2.png')}
        />
      </View>

      <View style={styles.playerInfo}>
        <Text style={styles.playerName}>{player.PlayerName}</Text>
        <Text style={styles.playerRole}>{player.Role}</Text>
      </View>

      <View
        style={{
          width: '15%',
          height: '65%',
          alignItems: 'center',
          //   backgroundColor: bgColor.coloured,
          borderWidth: 1,
          borderColor: '#ddd',
          borderRadius: WD(2),
          flexDirection: 'row',
          justifyContent: 'center',
          right: WD(1),
        }}>
        <Image
          resizeMode="contain"
          style={{
            width: '40%',
            height: '100%',
            tintColor: bgColor.coloured,
            right: WD(0.5),
          }}
          source={require('../../../../Assets/Images/video.png')}
        />
        <Text
          style={{
            color: bgColor.coloured,
            fontSize: fontSize.lightMedium,
            left: WD(0.5),
          }}>
          {player?.NoofClipsTotal}
        </Text>
      </View>

      <View
        style={{
          width: '15%',
          height: '65%',
          alignItems: 'center',
          //   backgroundColor: bgColor.coloured,
          borderWidth: 1,
          borderColor: '#ddd',
          borderRadius: WD(2),
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <Image
          resizeMode="contain"
          style={{
            width: '30%',
            height: '100%',
            tintColor: bgColor.coloured,
            right: WD(0.5),
          }}
          source={require('../../../../Assets/Images/check-list.png')}
        />
        <Text
          style={{
            color: bgColor.coloured,
            fontSize: fontSize.lightMedium,
            left: WD(0.5),
          }}>
          {player?.NoofSessions}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const CoachHome = props => {
  const {session, players, coaches} = useSelector(state => state.coachdata);

  //   console.log('data', session?.length, players?.length, coaches?.length);

  // Local States
  const [stats, setStats] = useState([]);

  //   console.log('st', stats);

  useEffect(() => {
    getSessionPlayers();
  }, []);

  const getSessionPlayers = async () => {
    const response = await GetSessionMetaData_CoachAPI();

    if (response != 'Error') {
      //   console.log('res', response);

      dispatch(sessionAction(response?.Sessions));
      dispatch(playersAction(response?.AssignedPlayers));
      dispatch(coachesAction(response?.Coaches));

      let statsAll = ['3'];

      const totalDeliveries = response?.Sessions?.reduce(
        (sum, item) => sum + item.NoOfDeliveries,
        0,
      );

      const totalPlayers = response?.Sessions?.reduce(
        (sum, item) => sum + item.NoOfPlayersInSession,
        0,
      );

      statsAll.push(totalPlayers);
      statsAll.push(totalDeliveries);

      setStats(statsAll);
    } else {
    }
  };

  const dispatch = useDispatch();

  const pressedDrawer = useCallback(() => {
    dispatch(drawerHandleAction(true));
  }, []);

  const pressedRightDrawer = useCallback(() => {
    dispatch(rightDrawerHandleAction(true));
  }, []);

  const onPressStats = (item, index) => {
    if (index == 0) {
      props.navigation.navigate('Session');
    }
  };

  const renderStats = (item, index) => {
    return (
      <Pressable
        onPress={() => onPressStats(item, index)}
        key={item.id}
        style={[styles.statCard, {justifyContent: 'space-around'}]}>
        <View
          style={{
            width: WD(10),
            height: WD(10),
            borderRadius: WD(10) / 2,
            overflow: 'hidden',
            //   backgroundColor: item.color,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              width: '100%',
              height: '100%',
              position: 'absolute',
              backgroundColor: item.color,
              opacity: 0.1,
            }}
          />

          <Image
            style={{width: '50%', height: '50%', tintColor: item.color}}
            source={item.icon}
          />
        </View>

        <Text
          style={{
            color: bgColor.black,
            fontSize: fontSize.Medium,
          }}>
          {item.title}
        </Text>
        <Text
          style={{
            color: bgColor.black,
            fontSize: fontSize.Large,
            fontWeight: 'bold',
          }}>
          {stats?.[index]}
        </Text>
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <MainHeaderView
        screenName={'Home'}
        pressedDrawer={pressedDrawer}
        pressedRightDrawer={pressedRightDrawer}
        // onTapSearch={() => searchRef.current?.open()}
      />

      {/* Stats Cards */}
      <View
        style={{
          height: HT(16),
          width: 'auto',
          alignItems: 'center',
          justifyContent: 'center',
          top: HT(1),
        }}>
        <FlatList
          contentContainerStyle={{
            paddingLeft: WD(2),
            paddingRight: WD(2),
            alignItems: 'center',
          }}
          showsHorizontalScrollIndicator={false}
          horizontal
          data={statsData}
          renderItem={({item, index}) => renderStats(item, index)}
        />
      </View>

      {/* Players Section */}
      <Text style={styles.sectionTitle}>Players</Text>

      <FlatList
        data={players}
        renderItem={({item, index}) => renderPlayers(item, index)}
      />
    </SafeAreaView>
  );
};

export default CoachHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: bgColor.bg_globe,
  },

  statCard: {
    width: WD(40),
    marginRight: WD(2),
    borderWidth: 1.5,
    padding: WD(2),
    borderRadius: WD(4),
    backgroundColor: bgColor.white,
    height: HT(15),
    borderColor: '#ddd',
  },
  icon: {
    fontSize: 26,
    marginBottom: 8,
  },
  statTitle: {
    fontSize: 12,
    color: '#777',
  },
  statValue: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginLeft: 16,
    marginVertical: 16,
  },
  playerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: WD(3),
    marginVertical: HT(0.5),
    padding: WD(2),
    borderRadius: WD(3),
    backgroundColor: bgColor.white,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  playerImg: {
    height: 48,
    width: 48,
    borderRadius: 50,
    marginRight: 14,
  },
  playerInfo: {
    flex: 1,
    left: WD(2),
  },
  playerName: {
    fontWeight: '600',
    fontSize: 15,
  },
  playerRole: {
    fontSize: 13,
    color: '#777',
  },
  playerSpeedBlock: {
    alignItems: 'flex-end',
  },
  playerSpeed: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  speedUnit: {
    fontSize: 10,
    color: '#888',
  },
  avgSpeedLabel: {
    fontSize: 12,
    color: '#888',
  },
});

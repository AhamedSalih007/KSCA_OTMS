import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Pressable,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {bgColor, fontSize} from '../../../../../Constant/Fonts&Colors';
import {HT, WD, WIDTH} from '../../../../../Constant/Dimensions';
import CoachHeader from '../../../../../Components/Common/CoachHeader';
import {useSelector} from 'react-redux';

const SessionPlayers = props => {
  const {session} = props.route.params;

  const {players} = useSelector(state => state.coachdata);

  //   console.log('players', players.length);

  const [playerAll, setPlayerAll] = useState([]);
  const [filterPlayerAll, setFilterPlayerAll] = useState([]);

  useEffect(() => {
    const playerIds = session.GroupPlayers.split(',').map(Number);

    // console.log(playerIds);

    const filterPlayers = players.filter(d => playerIds.includes(d.PlayerId));

    // console.log('fil', filterPlayers.length);

    setPlayerAll(filterPlayers);
    setFilterPlayerAll(filterPlayers);
  }, []);

  const renderPlayers = (player, index) => {
    return (
      <Pressable
        style={{
          width: WD(90),
          height: HT(8),
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: bgColor.white,
          marginTop: HT(1),
          borderRadius: WD(3),
          borderColor: bgColor.borderGrey,
          borderWidth: 1,
        }}>
        <View
          style={{
            width: WD(11),
            height: WD(11),
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            borderRadius: WD(11) / 2,
            position: 'absolute',
            left: WD(3),
          }}>
          <View
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: bgColor.coloured,
              opacity: 0.2,
              position: 'absolute',
            }}
          />

          <Image
            style={{width: '50%', height: '50%', tintColor: bgColor.coloured}}
            source={require('../../../../../Assets/Images/user2.png')}
          />
        </View>

        <View
          style={{
            width: '70%',
            height: '100%',
            alignItems: 'flex-start',
            justifyContent: 'center',
            left: WD(4),
          }}>
          <Text
            style={{
              color: bgColor.black,
              textTransform: 'capitalize',
              fontWeight: '600',
              width: '70%',
            }}>
            {player.PlayerName}
          </Text>
          <Text
            style={{
              color: bgColor.grey,
              textTransform: 'capitalize',
              top: HT(0.5),
            }}>
            {player.Role}
          </Text>
        </View>

        <View
          style={{
            width: '16%',
            height: '45%',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            right: WD(12),
            borderRadius: WD(2),
            flexDirection: 'row',
            overflow: 'hidden',
            backgroundColor: bgColor.coloured,
          }}>
          <Image
            resizeMode="contain"
            style={{
              width: '40%',
              height: '60%',
              tintColor: bgColor.white,
              right: WD(0.5),
            }}
            source={require('../../../../../Assets/Images/video.png')}
          />
          <Text
            style={{
              color: bgColor.white,
              fontSize: fontSize.Medium,
              fontWeight: '600',
            }}>
            {player?.NoofClipsTotal}
          </Text>
        </View>

        <Image
          resizeMode="contain"
          style={{
            width: '5%',
            height: '60%',
            position: 'absolute',
            right: WD(4),
            transform: [{rotate: '-90deg'}],
            opacity: 0.7,
          }}
          source={require('../../../../../Assets/Images/down-arrow.png')}
        />
      </Pressable>
    );
  };

  const onChange = text => {
    const filter = filterPlayerAll.filter(d => {
      return d.PlayerName.toLowerCase().includes(text.toLowerCase());
    });

    setPlayerAll(filter);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <CoachHeader
        header={session?.SessionName}
        subHeader={session?.SessionDateTime}
        goBack={() => props.navigation.goBack()}
      />

      {/* Search Bar */}
      <TextInput
        placeholder="Search player..."
        placeholderTextColor={bgColor.grey}
        style={styles.searchInput}
        // value={''}
        onChangeText={onChange}
      />

      <View style={{width: WIDTH, height: HT(86), alignItems: 'center'}}>
        <FlatList
          style={{top: HT(2)}}
          data={playerAll}
          renderItem={({item, index}) => renderPlayers(item, index)}
        />
      </View>
    </SafeAreaView>
  );
};

export default SessionPlayers;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: bgColor.bg_globe,
  },

  searchInput: {
    height: HT(6),
    paddingHorizontal: WD(3),
    backgroundColor: bgColor.white,
    borderRadius: WD(4),
    borderWidth: 1,
    borderColor: bgColor.borderGrey,
    fontSize: fontSize.Medium,
    width: WD(90),
    alignSelf: 'center',
    top: HT(2),
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 14,
    marginBottom: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#eee',
  },
  left: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 25,
    marginRight: 14,
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
  },
  role: {
    fontSize: 14,
    color: '#777',
  },
  right: {
    alignItems: 'flex-end',
  },
  sessionChip: {
    backgroundColor: '#13ec5b33',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    marginBottom: 4,
  },
  sessionText: {
    color: '#0bad3c',
    fontWeight: '600',
    fontSize: 12,
  },
  arrow: {
    fontSize: 22,
    color: '#777',
  },
});

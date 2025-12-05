import React, {useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  Platform,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {bgColor, fontSize} from '../../../../../Constant/Fonts&Colors';
import MainHeaderView from '../../../../../Components/Common/MainHeaderView';
import {useDispatch} from 'react-redux';
import {
  drawerHandleAction,
  rightDrawerHandleAction,
} from '../../../../../Redux/ReducerSlices/UserSlice';
import {SafeAreaView} from 'react-native-safe-area-context';
import {HT, WD, WIDTH} from '../../../../../Constant/Dimensions';
import moment from 'moment';
import {
  AddPlayerNotes_ScoutingAPI,
  DeletePlayerNotes_ScoutingAPI,
  GetPlayersByReqTracker_ScoutingAPI,
  SearchPlayer_ScoutingAPI,
  SerachPlayer_ScoutingAPI,
} from '../../../../../API/ScoutingAPI';
import AddPlayersModal from '../../../../../Components/Modal/AddPlayersModal';
import PlayerSuggestionModal from '../../../../../Components/Modal/PlayerSuggestionModal';

const RequirementTracker2 = props => {
  const {data} = props.route.params;

  const [playersModal, setPlayersModal] = useState(false);

  const [searchedPlayers, setSearchedPlayers] = useState([]);

  const getReadableRandomColor = () => {
    const hue = Math.floor(Math.random() * 360); // full spectrum
    const saturation = 80; // very colorful
    const lightness = 60; // dark enough for white text

    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  };

  const getInitials = name => {
    if (!name) return '';

    const clean = name.trim(); // remove leading/trailing spaces
    return clean.substring(0, 2).toUpperCase();
  };

  //   console.log('p', data);

  const dispatch = useDispatch();

  const [players, setPlayers] = useState([]);

  // console.log('t', userData);

  useEffect(() => {
    getPlayers();
  }, []);

  const getPlayers = async () => {
    const response = await GetPlayersByReqTracker_ScoutingAPI(
      data?.userId,
      data?.roleId,
      data?.reqId,
    );

    if (response != 'Error') {
      console.log('res', response?.Data);
      setPlayers(response?.Data);
    } else {
    }
  };

  const searchPlayerHandle = async text => {
    const playerRem = await SearchPlayer_ScoutingAPI(text);

    if (playerRem != 'Error') {
      console.log('search', playerRem.length);

      setSearchedPlayers(playerRem);
    } else {
    }
  };

  const onDeleteNotes = async item => {
    // console.log(item);

    const dataObj = {
      playerId: item?.PlayerId,
      reqId: item?.ReqID,
      userId: data?.userId,
    };

    console.log('res', dataObj);

    const playerDel = await DeletePlayerNotes_ScoutingAPI(dataObj);

    if (playerDel != 'Error') {
      console.log('delPost', playerDel);
      getPlayers();
    } else {
    }
  };

  const renderPlayers = (item, index) => {
    const color = getReadableRandomColor();

    return (
      <View
        style={{
          width: WD(90),
          //   height: HT(20),
          backgroundColor: bgColor.white,
          shadowColor: bgColor.greyLight,
          shadowOffset: {width: 0, height: 1},
          shadowOpacity: 0.3,
          alignSelf: 'center',
          borderRadius: WD(2),
          padding: HT(2),
          marginTop: HT(1),
        }}>
        <Pressable
          onPress={() => onDeleteNotes(item)}
          style={{
            width: Platform.isPad ? WD(6) : WD(10),
            height: Platform.isPad ? WD(6) : WD(10),
            borderRadius: Platform.isPad ? WD(6) : WD(10) / 2,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: bgColor.text_secondary,
            position: 'absolute',
            top: HT(1),
            right: WD(2),
            zIndex: 10,
          }}>
          <Image
            style={{
              width: '50%',
              height: '50%',
              tintColor: bgColor.red,
              opacity: 0.8,
            }}
            source={require('../../../../../Assets/Images/delete.png')}
          />
        </Pressable>

        <View
          style={{
            width: '100%',
            height: HT(7),
            alignItems: 'center',
            justifyContent: 'flex-start',
            flexDirection: 'row',
          }}>
          <View
            style={{
              width: HT(6),
              height: HT(6),
              borderRadius: HT(6) / 2,
              backgroundColor: color,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: fontSize.lightMedium,
              }}>
              {getInitials(item.PlayerName)}
            </Text>
          </View>

          <View
            style={{
              width: '90%',
              height: '100%',
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
              padding: HT(1),
            }}>
            <Text
              style={{
                color: bgColor.black,
                fontSize: fontSize.Medium,
                fontWeight: 'bold',
              }}>
              {item.PlayerName}
            </Text>
            <Text
              style={{
                color: bgColor.black,
                fontSize: fontSize.verySmall,
                // top: HT(0.5),
                opacity: 0.7,
              }}>
              Submitted{' '}
              {moment(item.CreatedTime, 'MMM DD YYYY h:mmA').fromNow()}
            </Text>
          </View>
        </View>

        <View
          style={{
            width: '100%',
            alignItems: 'flex-start',
            justifyContent: 'center',
            marginTop: HT(2.5),
          }}>
          <Text
            style={{
              color: bgColor.black,
              opacity: 0.5,
              fontSize: fontSize.lightMedium,
              fontWeight: 'bold',
            }}>
            NOTE
          </Text>
          <Text
            style={{
              color: bgColor.black,
              fontSize: fontSize.lightMedium,
              marginTop: HT(0.5),
            }}>
            {item.Notes === '' ? '-' : item.Notes}
          </Text>
        </View>
        <View
          style={{
            width: '100%',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            marginTop: HT(1),
            flexDirection: 'row',
          }}>
          <Text
            style={{
              color: bgColor.black,
              opacity: 0.5,
              fontSize: fontSize.lightMedium,
              fontWeight: 'bold',
            }}>
            BY
          </Text>
          <Text
            style={{
              color: bgColor.black,
              fontSize: fontSize.lightMedium,
              left: WD(1),
            }}>
            {item.Scout}
          </Text>
        </View>
      </View>
    );
  };

  const headerComp = () => {
    return (
      <>
        {players.length != 0 ? (
          <View
            style={{
              width: WD(100),
              height: HT(8),
              alignItems: 'flex-start',
              justifyContent: 'center',
              alignSelf: 'center',
              backgroundColor: bgColor.bg_globe,
              left: WD(6),
            }}>
            <Text
              style={{
                color: bgColor.black,
                fontSize: Platform.isPad ? fontSize.Small : fontSize.Large,
                fontWeight: 'bold',
              }}>
              Suggested players
            </Text>
          </View>
        ) : null}
      </>
    );
  };

  const onSubmitPlayers = async players => {
    // console.log('playersSubmitted', players);

    let playerArray = [];

    for (let i = 0; i < players.length; i++) {
      const data = {
        PlayerID: players[i].Playerid,
        Notes: players[i].note,
      };

      playerArray.push(data);
    }

    const dataObj = {
      reqId: data?.reqId,
      userId: data?.userId,
      payload: JSON.stringify(playerArray),
    };

    console.log('post', dataObj);

    const postNotes = await AddPlayerNotes_ScoutingAPI(dataObj);

    if (postNotes != 'Error') {
      console.log('resPost', postNotes);
      setPlayersModal(false);
      setSearchedPlayers([]);
      getPlayers();
    } else {
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: bgColor.bg_globe}}>
      <View
        style={{
          height: HT(8),
          width: WD(100),
          backgroundColor: bgColor.white,
          flexDirection: 'row',
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
              height: '45%',
              tintColor: bgColor.black,
              opacity: 0.8,
            }}
            source={require('../../../../../Assets/Images/left.png')}
          />
        </TouchableOpacity>

        <View
          style={{
            width: '82%',
            height: '100%',
            justifyContent: 'center',
            gap: 5,
          }}>
          <Text
            style={{
              fontSize: fontSize.lightMedium,
              fontWeight: '700',
              color: 'black',
              width: '90%',
            }}>
            {data?.title}
          </Text>
          <Text
            style={{
              color: bgColor.text_tertiary,
              fontWeight: '600',
              fontSize: fontSize.verySmall,
              textTransform: 'capitalize',
            }}>
            {data?.user} ({moment(data?.time, 'MMM DD YYYY h:mmA').fromNow()})
          </Text>
        </View>
      </View>

      <View
        style={{
          width: WD(90),
          backgroundColor: bgColor.text_secondary,
          alignItems: 'center',
          justifyContent: 'flex-start',
          padding: HT(2),
          alignSelf: 'center',
          borderRadius: WD(2),
          marginTop: HT(2),
          borderWidth: 1,
          borderColor: bgColor.black,
        }}>
        <Text>{data?.description}</Text>
      </View>

      <FlatList
        stickyHeaderIndices={[0]}
        data={players}
        ListHeaderComponent={headerComp}
        renderItem={({item, index}) => renderPlayers(item, index)}
        ListFooterComponent={() => <View style={{height: HT(20)}} />}
      />

      <Pressable
        onPress={() => setPlayersModal(true)}
        style={{
          width: Platform.isPad ? WD(10) : WD(13),
          height: Platform.isPad ? WD(10) : WD(13),
          borderRadius: Platform.isPad ? WD(10) : WD(13) / 2,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: bgColor.coloured,
          position: 'absolute',
          bottom: HT(6),
          right: WD(5),
        }}>
        <Image
          style={{
            width: '40%',
            height: '40%',
            tintColor: bgColor.white,
          }}
          source={require('../../../../../Assets/Images/plus.png')}
        />
      </Pressable>

      {/* Players Modal */}
      {/* <AddPlayersModal
        visible={playersModal}
        onClose={() => setPlayersModal(false)}
        onSubmit={text => {
          console.log('Submitted search:', text);
          setPlayersModal(false);
        }}
      /> */}
      <PlayerSuggestionModal
        visible={playersModal}
        onClose={() => setPlayersModal(false)}
        onSubmit={onSubmitPlayers}
        allPlayers={searchedPlayers}
        onSearch={searchPlayerHandle}
        resetPlayers={() => setSearchedPlayers([])}
      />
    </SafeAreaView>
  );
};

export default RequirementTracker2;

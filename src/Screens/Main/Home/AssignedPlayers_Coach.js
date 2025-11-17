import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import HeaderView from '../../../Components/Common/HeaderView';
import {bgColor, fontSize} from '../../../Constant/Fonts&Colors';
import {FlatList, Image, Pressable, Text, View} from 'react-native';
import {HT, WD, WIDTH} from '../../../Constant/Dimensions';

const AssignedPlayers_Coach = props => {
  const {players} = props.route.params;

  // console.log('pl', players);

  const renderPlayers = (item, index) => {
    return (
      <Pressable
        style={{
          width: WD(90),
          height: HT(7),
          backgroundColor: bgColor.white,
          elevation: 2,
          shadowColor: bgColor.grey,
          shadowOffset: {width: 1, height: 1},
          shadowOpacity: 0.2,
          borderRadius: WD(1),
          marginTop: HT(0.5),
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          resizeMode="contain"
          style={{
            width: '10%',
            height: '80%',
            position: 'absolute',
            left: WD(5),
          }}
          source={require('../../../Assets/Images/player.png')}
        />
        <Text
          style={{
            position: 'absolute',
            left: WD(18),
            fontSize: fontSize.Medium,
          }}>
          {item.PlayerName}
        </Text>
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: bgColor.bg_globe}}>
      <HeaderView
        goBack={() => props.navigation.goBack()}
        screenName={'Assigned Players'}
      />

      <View
        style={{
          width: WIDTH,
          height: HT(93),
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <FlatList
          style={{top: HT(2)}}
          data={players.CoachPlayerMapping}
          renderItem={({item, index}) => renderPlayers(item, index)}
          ListFooterComponent={() => <View style={{height: HT(5)}} />}
        />
      </View>
    </SafeAreaView>
  );
};

export default AssignedPlayers_Coach;

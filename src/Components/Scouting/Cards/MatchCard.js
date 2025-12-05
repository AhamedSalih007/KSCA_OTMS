import React from 'react';
import {FlatList, Text, View, Image, Pressable, Platform} from 'react-native';
import {HT, WD} from '../../../Constant/Dimensions';
import {bgColor, fontSize} from '../../../Constant/Fonts&Colors';
import TeamImagePrefix from './TeamImagePrefix';

const MatchCard = ({matches, onPressScoutNow, onPressMatch}) => {
  const renderMatchCard = (item, index) => {
    return (
      <Pressable
        onPress={() => onPressMatch(item)}
        style={{
          width: WD(90),
          height: HT(26),
          backgroundColor: bgColor.white,
          elevation: 2,
          shadowColor: bgColor.grey,
          shadowOffset: {width: 0.5, height: 0.5},
          shadowOpacity: 0.4,
          marginHorizontal: WD(1.5),
          alignSelf: 'center',
          borderRadius: WD(2),
          marginTop: HT(1),
          //   borderWidth: 0.3,
          //   borderColor: bgColor.greyLight,
          padding: WD(3),
        }}>
        <View
          style={{
            width: '100%',
            height: '50%',
          }}>
          <View
            style={{
              width: '100%',
              height: '40%',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}>
            <Text
              style={{
                color: bgColor.black,
                opacity: 0.7,
                width: '70%',
                fontSize: Platform.isPad
                  ? fontSize.veryverySmall
                  : fontSize.lightMedium_50,
              }}>
              {item.CompetitionName}
            </Text>
            <View
              style={{
                backgroundColor:
                  item.MatchStatus.toLowerCase() == 'completed'
                    ? bgColor.grey
                    : item.MatchStatus.toLowerCase() == 'upcoming'
                    ? bgColor.coloured
                    : bgColor.red,
                borderRadius: WD(4),
                alignItems: 'center',
                justifyContent: 'center',
                padding: WD(1.2),
                flexDirection: 'row',
              }}>
              <Text style={{color: bgColor.white}}>
                {item.MatchStatus.toLowerCase() == 'live' ? ' ' : ''}{' '}
              </Text>
              {item.MatchStatus.toLowerCase() == 'live' && (
                <View
                  style={{
                    width: WD(2),
                    height: WD(2),
                    backgroundColor: bgColor.white,
                    borderRadius: WD(2) / 2,
                  }}
                />
              )}
              <Text style={{color: bgColor.white}}>
                {' '}
                {item.MatchStatus.toLowerCase()}
                {item.MatchStatus.toLowerCase() == 'live' ? ' ' : ''}{' '}
              </Text>
            </View>
          </View>
          <View
            style={{
              width: '100%',
              height: '60%',
              //   backgroundColor: bgColor.accentSecondary,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TeamImagePrefix
              teamNamePrefix={item?.TeamA}
              left={WD(2)}
              right={null}
              flexDirection={'row'}
            />
            <Text style={{color: bgColor.black, opacity: 0.7}}>vs</Text>
            <TeamImagePrefix
              teamNamePrefix={item?.TeamB}
              left={null}
              right={WD(2)}
              flexDirection={'row-reverse'}
            />
            <View
              style={{
                width: '95%',
                height: '1%',
                backgroundColor: bgColor.grey,
                position: 'absolute',
                bottom: HT(0.2),
                opacity: 0.7,
              }}
            />
          </View>
        </View>

        <View
          style={{
            width: '100%',
            height: '50%',
          }}>
          <View
            style={{
              width: '100%',
              height: '30%',
              //   backgroundColor: bgColor.accentSecondary,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Image
              resizeMode="contain"
              style={{width: '12%', height: '50%'}}
              source={require('../../../Assets/Images/calendar.png')}
            />
            <Text
              style={{
                color: bgColor.black,
                fontSize: Platform.isPad
                  ? fontSize.veryverySmall - 1
                  : fontSize.Small,
              }}>
              {item?.MatchDate} {item?.MatchTime}
            </Text>
          </View>
          <View
            style={{
              width: '100%',
              height: '30%',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Image
              resizeMode="contain"
              style={{width: '12%', height: '50%'}}
              source={require('../../../Assets/Images/location.png')}
            />
            <Text
              style={{
                color: bgColor.black,
                fontSize: Platform.isPad
                  ? fontSize.veryverySmall - 1
                  : fontSize.Small,
              }}>
              {item?.Ground}
            </Text>
          </View>

          <Pressable
            onPress={() => onPressScoutNow(item)}
            style={{
              width: '95%',
              height: '40%',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: bgColor.coloured,
              alignSelf: 'center',
              borderRadius: WD(1),
              top: HT(0.5),
            }}>
            <Text
              style={{
                color: bgColor.white,
                fontSize: fontSize.Medium,
                fontWeight: '700',
              }}>
              Scout Now
            </Text>
          </Pressable>
        </View>
      </Pressable>
    );
  };

  return (
    <FlatList
      data={matches}
      renderItem={({item, index}) => renderMatchCard(item, index)}
      ListFooterComponent={() => <View style={{height: HT(30)}} />}
    />
  );
};

export default MatchCard;

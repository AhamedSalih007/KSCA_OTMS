import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import HeaderView from '../../../Components/Common/HeaderView';
import {bgColor, fontSize} from '../../../Constant/Fonts&Colors';
import {FlatList, Image, Pressable, Text, View} from 'react-native';
import {HT, WD, WIDTH} from '../../../Constant/Dimensions';
import VideoThumbnail from '../../../Components/Video/VideoThumbnail';
import ImgTextView from '../../../Components/Video/ImgTextView';
import moment from 'moment';

const VideosHome = props => {
  const {videos} = props.route.params;

  //   console.log('v', videos.length);

  const pressedVideoCard = (item, index) => {
    props.navigation.navigate('VideoMain', {videos, videoIndex: index});
  };

  const renderVideos = (item, index) => {
    return (
      <Pressable
        onPress={() => pressedVideoCard(item, index)}
        style={{
          width: WD(90),
          height: HT(30),
          backgroundColor: bgColor.white,
          shadowColor: bgColor.grey,
          shadowOffset: {width: 0, height: 1},
          shadowOpacity: 0.3,
          alignSelf: 'center',
          marginTop: HT(1.5),
          top: HT(1),
          borderRadius: WD(2),
          elevation: 2,
        }}>
        <View
          style={{
            width: '100%',
            height: '55%',
            borderTopLeftRadius: WD(2),
            borderTopRightRadius: WD(2),
          }}>
          <VideoThumbnail
            url={item.VideoURL}
            width={WD(90)}
            height={HT(17)}
            playImgSize={WD(10)}
            videoId={item.VideoId}
          />
        </View>

        <View
          style={{
            width: '100%',
            height: '45%',
            borderBottomLeftRadius: WD(2),
            borderBottomRightRadius: WD(2),
          }}>
          <View
            style={{
              width: '100%',
              height: '70%',
              padding: HT(1),
              alignItems: 'center',
              justifyContent: 'space-around',
            }}>
            <View
              style={{
                width: '100%',
                height: '35%',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
              }}>
              <Text
                style={{
                  color: bgColor.black,
                  position: 'absolute',
                  left: 0,
                  fontWeight: 'bold',
                }}>
                {item.VideoName}
              </Text>
              <Pressable
                style={{
                  width: '10%',
                  height: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'absolute',
                  right: -WD(1.5),
                }}>
                <Image
                  resizeMode="contain"
                  style={{
                    width: '80%',
                    height: '80%',
                    tintColor: bgColor.grey,
                  }}
                  source={require('../../../Assets/Images/edit2.png')}
                />
              </Pressable>
            </View>

            <View
              style={{
                width: '100%',
                height: '55%',
                flexDirection: 'row',
                alignItems: 'space-between',
                justifyContent: 'center',
              }}>
              <ImgTextView
                image={require('../../../Assets/Images/profile.png')}
                text={item.PlayerName}
              />
              <ImgTextView
                image={require('../../../Assets/Images/visible.png')}
                text={item.View}
              />
            </View>
          </View>

          <View
            style={{
              width: '100%',
              height: '30%',
              //   backgroundColor: 'blue',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                width: '100%',
                height: '1%',
                backgroundColor: bgColor.grey,
                position: 'absolute',
                top: 0,
              }}
            />

            <Text
              style={{
                position: 'absolute',
                left: WD(2.5),
                color: bgColor.coloured,
              }}>
              {moment(item.UploadedDate).format('lll')}
            </Text>
            <Pressable
              style={{
                width: '30%',
                height: '75%',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'absolute',
                right: WD(0),
                borderRadius: WD(1.5),
                flexDirection: 'row',
              }}>
              <Image
                resizeMode="contain"
                style={{
                  width: WD(4),
                  height: WD(4),
                  tintColor: bgColor.coloured,
                }}
                source={require('../../../Assets/Images/gallery.png')}
              />
              <Text
                style={{
                  left: WD(2),
                  color: bgColor.coloured,
                  fontSize: fontSize.lightMedium,
                }}>
                Frames
              </Text>
            </Pressable>
          </View>
        </View>
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: bgColor.bg_globe}}>
      <HeaderView
        goBack={() => props.navigation.goBack()}
        screenName={'Videos'}
      />

      <View style={{width: WIDTH, height: HT(93)}}>
        <FlatList
          data={videos}
          renderItem={({item, index}) => renderVideos(item, index)}
          ListFooterComponent={() => <View style={{height: HT(20)}} />}
        />
      </View>
    </SafeAreaView>
  );
};

export default VideosHome;

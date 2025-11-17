import React from 'react';
import {Platform, Pressable, Text, View} from 'react-native';
import {HT, WD} from '../../Constant/Dimensions';
import {bgColor} from '../../Constant/Fonts&Colors';
import Slider from '@react-native-community/slider';
import VideoImgBtn from './VideoImgBtn';
import {convertSecondsToMinutes} from '../math';
import {BlurView} from '@react-native-community/blur';

const VideoBottomView = ({
  pause,
  onPress,
  duration,
  currentTime,
  onSlideStart,
  onSlideComplete,
  onSlideValueChange,
  currentSpeed,
  zoomIn,
  fullScreen,
  videosLength,
  currentVdoId,
}) => {
  const BlurOrView = Platform.OS === 'ios' ? BlurView : View;

  return (
    <BlurOrView
      style={{
        width: WD(90),
        height: HT(12),
        alignSelf: 'center',
        position: 'absolute',
        bottom: HT(5),
        borderRadius: WD(2),
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: bgColor.white,
      }}
      blurType="thinMaterialDark"
      blurAmount={5}>
      {/* Overlay */}
      {Platform.OS == 'android' ? (
        <View
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: bgColor.black,
            alignSelf: 'center',
            position: 'absolute',
            opacity: 0.7,
          }}
        />
      ) : null}

      <View
        style={{
          width: '100%',
          height: '45%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <VideoImgBtn
          onPress={() => onPress('prevVideo')}
          image={require('../../Assets/Video/next-button.png')}
          color={bgColor.white}
          right={0}
          left={WD(18)}
          imgWidth={'70%'}
          imgHt={'70%'}
          transform={'180deg'}
          opacity={currentVdoId != 0 ? 1 : 0.5}
        />

        <VideoImgBtn
          onPress={() => onPress('backward')}
          image={require('../../Assets/Video/left-arrow.png')}
          color={bgColor.white}
          right={0}
          left={WD(28)}
          imgWidth={'70%'}
          imgHt={'70%'}
          transform={'0deg'}
          opacity={1}
        />

        <VideoImgBtn
          onPress={() => onPress('playpause')}
          image={
            pause
              ? require('../../Assets/Video/play.png')
              : require('../../Assets/Video/pause.png')
          }
          color={bgColor.white}
          right={WD(41)}
          left={null}
          imgWidth={'100%'}
          imgHt={'100%'}
          transform={'0deg'}
          opacity={1}
        />

        <VideoImgBtn
          onPress={() => onPress('forward')}
          image={require('../../Assets/Video/left-arrow.png')}
          color={bgColor.white}
          right={WD(28.5)}
          left={null}
          imgWidth={'70%'}
          imgHt={'70%'}
          transform={'180deg'}
          opacity={1}
        />

        <VideoImgBtn
          onPress={() => onPress('nextVideo')}
          image={require('../../Assets/Video/next-button.png')}
          color={bgColor.white}
          right={WD(18.5)}
          left={null}
          imgWidth={'70%'}
          imgHt={'70%'}
          transform={'0deg'}
          opacity={currentVdoId < videosLength ? 1 : 0.5}
        />

        <Pressable
          onPress={() => onPress('speed')}
          style={{
            width: '10%',
            height: '80%',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            right: WD(1.5),
          }}>
          <Text style={{color: bgColor.white}}>{currentSpeed}X</Text>
        </Pressable>
      </View>
      <View
        style={{
          width: '100%',
          height: '15%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Slider
          style={[
            {
              position: 'absolute',
              width: '96%',
              left: WD(1),
            },
          ]}
          minimumValue={0}
          maximumValue={duration}
          value={currentTime}
          onSlidingStart={onSlideStart}
          onSlidingComplete={onSlideComplete}
          minimumTrackTintColor={bgColor.coloured}
          maximumTrackTintColor={'white'}
          tapToSeek={true}
          onValueChange={onSlideValueChange}
          thumbTintColor={'white'}
          // thumbTintColor="transparent"
          // thumbImage={require('../../Assets/Paint/send.png')}
        />
      </View>
      <View
        style={{
          width: '100%',
          height: '40%',
          //   backgroundColor: bgColor.coloured,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{color: bgColor.white, position: 'absolute', left: WD(2)}}>
          {convertSecondsToMinutes(currentTime)} /{' '}
          {convertSecondsToMinutes(duration)}
        </Text>

        <VideoImgBtn
          onPress={() => onPress('fullScreen')}
          image={
            !fullScreen
              ? require('../../Assets/Video/fullscreen.png')
              : require('../../Assets/Images/minimize.png')
          }
          color={bgColor.white}
          right={WD(0)}
          left={null}
          imgWidth={'70%'}
          imgHt={'70%'}
          transform={'0deg'}
        />
        <VideoImgBtn
          onPress={() => onPress('zoomOut')}
          image={require('../../Assets/Video/zoomout.png')}
          color={bgColor.white}
          right={WD(10)}
          left={null}
          imgWidth={'90%'}
          imgHt={'90%'}
          transform={'0deg'}
        />
        <VideoImgBtn
          onPress={() => onPress('zoomIn')}
          image={require('../../Assets/Video/zoomin.png')}
          color={zoomIn ? bgColor.coloured : bgColor.white}
          right={WD(20)}
          left={null}
          imgWidth={'80%'}
          imgHt={'80%'}
          transform={'0deg'}
        />
      </View>
    </BlurOrView>
  );
};

export default VideoBottomView;

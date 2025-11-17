import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {bgColor} from '../../../Constant/Fonts&Colors';
import HeaderView from '../../../Components/Common/HeaderView';
import BackButton from '../../../Components/Common/BackButton';
import {
  Image,
  ImageBackground,
  Platform,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {HEIGHT, HT, WD, WIDTH} from '../../../Constant/Dimensions';
import Video from 'react-native-video';
import VideoBottomView from '../../../Components/Video/VideoBottomView';
import LoadingView from '../../../Components/Common/LoadingView';
import VdoBtn from '../../../Components/Video/VdoBtn';
import DrawingCanvas from './DrawingCanvas';
import ColorListView from '../../../Components/Video/ColorListView';
import ShapeListView from '../../../Components/Video/ShapeListView';
import {
  Gesture,
  GestureHandlerRootView,
  GestureDetector,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  withTiming,
  useSharedValue,
  runOnJS,
} from 'react-native-reanimated';
import AudioRecorderButton from '../../../Components/Video/AudioRecorder';
import Orientation from 'react-native-orientation-locker';
import VideoListTop from '../../../Components/Video/VideoListTop';
import TagCard from '../../../Components/Video/TagCard';
import TagsModal from '../../../Components/Common/TagsModal';
import {Dropdown} from 'react-native-element-dropdown';
import {
  CreateNewFrameAPI,
  editVideoTags,
  GetCommentsByVideo_CoachAPI,
  GetVideoFramesByVideo_CoachAPI,
  postVideoTags,
  UpdateFrameImageAPI,
} from '../../../API/CoachAPI';
import MessageToast from '../../../Components/Common/MessageToast';
import ViewShot, {captureRef, captureScreen} from 'react-native-view-shot';
import AssignedPlayers_Coach from '../Home/AssignedPlayers_Coach';
import {useSelector} from 'react-redux';
import FramesList from '../../../Components/Video/FramesList';
import CanvasBottomView from '../../../Components/Video/CanvasBottomView';

const VideoMain = props => {
  const {videos, videoIndex} = props.route.params;

  const {userData} = useSelector(state => state.localdata);

  // console.log('v', userData);

  const captureRefWrapper = useRef(null);

  const [currentVdoId, setCurrentVdoId] = useState(videoIndex);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedTag, setSelectedTag] = useState(null);
  const [message, setMessage] = useState('');
  const [isToastHide, setIsToastHide] = useState(true);
  const [comments, setComments] = useState([]);
  const [comments2, setComments2] = useState([]);
  const [commentsFrame, setCommentsFrame] = useState([]);
  const [frames, setFrames] = useState([]);
  const [currentFrameId, setCurrentFrameId] = useState(0);
  const [frameNote, setFrameNote] = useState(false);
  const [inst, setInst] = useState(null);

  const [base64Data, setBase64Data] = useState('');
  const [isBaseImage, setIsBaseImage] = useState(false);
  const [isCapture, setIsCapture] = useState(false);

  const videoRef = useRef(null);
  const fps = 24; // assume 24 frames per second
  const frameDuration = 1 / fps; // seconds per frame

  const [zoomIn, setZoomIn] = useState(false);
  const [isVdoBtm, setIsVideoBtm] = useState(true);

  const scale = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const savedX = useSharedValue(0);
  const savedY = useSharedValue(0);

  const videoWidth = WIDTH / 2;
  const videoHeight = HEIGHT * 0.4; // adjust to your video height
  const maxScale = 2;

  const tapGesture = Gesture.Tap().onEnd(() => {
    // runOnJS(onTouchInVideo)();
  });

  const panGesture = Gesture.Pan()
    .onUpdate(e => {
      if (scale.value > 1) {
        // extraWidth = how much video extends beyond screen edges
        const extraWidth = (videoWidth * scale.value - videoWidth) / 2;
        const extraHeight = (videoHeight * scale.value - videoHeight) / 2;

        const newX = savedX.value + e.translationX;
        const newY = savedY.value + e.translationY;

        // clamp so edges stay visible
        translateX.value = Math.min(Math.max(newX, -extraWidth), extraWidth);
        translateY.value = Math.min(Math.max(newY, -extraHeight), extraHeight);
      }
    })
    .onEnd(() => {
      savedX.value = translateX.value;
      savedY.value = translateY.value;
    });

  const composedGesture = Gesture.Simultaneous(tapGesture, panGesture);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {scale: scale.value},
      {translateX: translateX.value},
      {translateY: translateY.value},
    ],
  }));

  //   Video Controls States
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [paused, setPaused] = useState(true);
  const [isBuffering, setIsBuffering] = useState(false);
  const [seekableDuration, setSeekableDuration] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);
  const [seekTime, setSeekTime] = useState(null);
  const [isPaint, setIsPaint] = useState(false);
  const [isNotes, setIsNotes] = useState(false);
  const [selectedColor, setSelectedColor] = useState('red');
  const [selectedShape, setSelectedShape] = useState(1);
  const [fullScreen, setFullScreen] = useState(false);

  //Speed State & data
  const speeds = [1.0, 1.25, 1.5, 1.75, 2, 0.25, 0.5, 0.75];
  const [speedIndex, setSpeedIndex] = useState(0);
  const [currentSpeed, setCurrentSpeed] = useState(1.0);
  const [metaData, setMetaData] = useState([]);
  const [metaData2, setMetaData2] = useState([]);

  // console.log('cr', metaData);

  useEffect(() => {
    return () => {
      if (fullScreen) {
        Orientation.lockToPortrait();
        setFullScreen(false);
      }
      // Stop playback when leaving the screen
      if (videoRef.current) {
        videoRef.current.pause?.(); // Safe call
        videoRef.current = null;
      }
    };
  }, []);

  // ---- DATE PARSER ----
  const parseDate = str => {
    if (!str) return new Date(0);

    // remove double spaces
    str = str.replace(/\s\s+/g, ' ').trim();

    const [mon, day, year, time] = str.split(' ');

    const months = {
      Jan: 0,
      Feb: 1,
      Mar: 2,
      Apr: 3,
      May: 4,
      Jun: 5,
      Jul: 6,
      Aug: 7,
      Sep: 8,
      Oct: 9,
      Nov: 10,
      Dec: 11,
    };

    let hours = parseInt(time.match(/\d+/)[0]);
    let minutes = parseInt(time.match(/:(\d+)/)[1]);
    const isPM = time.includes('PM');

    if (isPM && hours !== 12) hours += 12;
    if (!isPM && hours === 12) hours = 0;

    return new Date(year, months[mon], day, hours, minutes);
  };

  const getCommentsByVideo = async () => {
    const response = await GetCommentsByVideo_CoachAPI(
      videos[currentVdoId].VideoId,
    );

    if (response === 'Error') return;

    const textComments = response?.Data?.TextComments || [];
    const audioComments = response?.Data?.AudioComments || [];

    const merged = [...textComments, ...audioComments];

    let commentsAll = [];
    let commentsFrame = [];

    // ---- MERGE CLEANER ----
    for (let item of merged) {
      let comment;

      if (item.AudioCommentId) {
        comment = {
          id: `Audio-${item.AudioCommentId}`,
          type: 'audio',
          path: item.AudioUrl,
          duration: item.Duration,
          userName: item.UserName,
          time: item.Datetime,
          frameId: item.FrameId,
        };
      } else {
        comment = {
          id: `Text-${item.TextCommentId}`,
          type: 'text',
          path: null,
          text: item.CommentText,
          userName: item.UserName,
          time: item.Datetime,
          frameId: item.FrameId,
        };
      }

      commentsAll.push(comment);

      if (item.FrameId != null) {
        commentsFrame.push(comment);
      }
    }

    // ---- SORTING (LATEST FIRST) ----
    const sortedAll = commentsAll.sort(
      (a, b) => parseDate(a.time) - parseDate(b.time),
    );

    const sortedFrame = commentsFrame.sort(
      (a, b) => parseDate(a.time) - parseDate(b.time),
    );

    setComments(sortedAll);
    setComments2(sortedFrame);
    setCommentsFrame(sortedFrame);
  };

  useEffect(() => {
    getCommentsByVideo();
    getFramesByVideo();

    const data1 = ['Speed', 'Length', 'Line', 'Deviation', 'Beehive'];
    const data2 = ['BatType', 'CreaseMoment', 'Stroke', 'ShotConnection'];

    const videoData = Object.entries(videos[currentVdoId])
      .filter(([key]) => data1.includes(key))
      .map(([key, value]) => ({key, value}));

    // console.log('videoData1', videoData);

    setMetaData(videoData);

    const videoData2 = Object.entries(videos[currentVdoId])
      .filter(([key]) => data2.includes(key))
      .map(([key, value]) => ({key, value}));

    // console.log('videoData2', videoData);

    setMetaData2(videoData2);
  }, [currentVdoId]);

  const getFramesByVideo = async () => {
    const responseFrames = await GetVideoFramesByVideo_CoachAPI(
      videos[currentVdoId].VideoId,
    );

    if (responseFrames != 'Error') {
      console.log('resF', responseFrames?.Data?.VideoFrames.length);
      setFrames(responseFrames?.Data?.VideoFrames);
      // console.log('l', responseFrames?.Data?.VideoFrames.length);
      setCurrentFrameId(responseFrames?.Data?.VideoFrames.length - 1);
    } else {
    }
  };

  const onLoadHandle = async data => {
    // console.log('onLoad--->', data);

    // const isLive =
    //   data.duration !== 0 && Math.abs(data.duration - data.currentTime) < 2;

    // console.log('isLIve', isLive);
    setDuration(data.duration);
    setIsBuffering(false);
    setPaused(false);
  };

  const stepBackward = () => {
    if (videoRef.current) {
      let newTime = currentTime - frameDuration;
      if (newTime < 0) newTime = 0;
      videoRef.current.seek(newTime);
    }
  };

  const stepForward = () => {
    if (videoRef.current) {
      videoRef.current.seek(currentTime + frameDuration);
    }
  };

  const onLoadStartHandle = data => {
    console.log('onLoadStart', data);
    setIsBuffering(true);
    setPaused(true);
  };

  const onSlideComplete = time => {
    setDuration(seekableDuration);
    // console.log('comp');
    if (videoRef.current) {
      videoRef.current.seek(time);
    }
    setCurrentTime(time); // commit seek
    setSeekTime(null); // reset temporary value
    setIsSeeking(false); // resume normal updates
  };

  const playBackStateHandle = data => {
    // console.log('playBackState', data);
    // setIsBuffering(data.isSeeking);
  };

  const onBufferHandle = ({isBuffering}) => {
    // console.log('buff-->', isBuffering);
    setIsBuffering(isBuffering);
  };

  // Update the current time of the video
  const onProgress = data => {
    // console.log('cT', data);
    setSeekableDuration(data.seekableDuration);
    if (!isSeeking) {
      setCurrentTime(data.currentTime);
      setIsBuffering(false);
    }
  };

  const onErrorHandle = e => {
    // console.log('error--->', e);

    alert(
      Platform.OS == 'ios'
        ? e.error.localizedDescription
        : 'Video url not valid',
    );
    setPaused(true);
  };

  // Seek video to specific time
  const onSeek = time => {
    // console.log('time-->', time);

    if (typeof time === 'number' && !isNaN(time)) {
      videoRef.current.seek(time);
      setCurrentTime(time);
      // setPaused(false);
      // setIsBuffering(false);
      setSeekTime(null); // clear temp
      setIsSeeking(false);
    } else {
      console.log('Invalid time value:', time);
    }
  };

  const onEnd = () => {
    console.log('called end');

    setPaused(true);

    setCurrentTime(0);

    // Reset player position
    if (videoRef.current) {
      videoRef.current.seek(0);
    }
  };

  const onSlideStart = time => {
    setDuration(seekableDuration);
    setIsSeeking(true); // lock slider
    // setSeekTime(time);
    // console.log('start');
    // setPaused(true);
  };

  const onSlideValueChange = time => {
    // console.log('valu', time);
    setCurrentTime(time);
    setSeekTime(time);
    setDuration(seekableDuration);
  };

  const goBackhandle = () => {
    if (videoRef.current) {
      videoRef.current.pause?.();
      videoRef.current = null;
    }
    props.navigation.goBack();
  };

  const onPressIcon = data => {
    if (data == 'playpause') {
      setPaused(!paused);
    } else if (data == 'speed') {
      if (speedIndex == 7) {
        setSpeedIndex(0);
        setCurrentSpeed(1.0);
      } else {
        setCurrentSpeed(speeds[speedIndex + 1]);
        setSpeedIndex(speedIndex + 1);
      }
    } else if (data == 'forward') {
      stepForward();
    } else if (data == 'backward') {
      stepBackward();
    } else if (data == 'zoomIn') {
      scale.value = withTiming(maxScale, {duration: 300});
      setZoomIn(true);
    } else if (data == 'zoomOut') {
      scale.value = withTiming(1, {duration: 300});
      translateX.value = withTiming(0);
      translateY.value = withTiming(0);
      savedX.value = 0;
      savedY.value = 0;
      setZoomIn(false);
    } else if (data == 'fullScreen') {
      console.log('fullscreen');
      if (!fullScreen) {
        Orientation.lockToLandscape();
        setFullScreen(true);
      } else {
        Orientation.lockToPortrait();
        setFullScreen(false);
      }
    } else if (data == 'prevVideo') {
      console.log('prev');
      if (currentVdoId != 0) {
        setCurrentVdoId(currentVdoId - 1);
      }
    } else if (data == 'nextVideo') {
      console.log('next');
      if (currentVdoId < videos.length - 1) {
        setCurrentVdoId(currentVdoId + 1);
      }
    }
  };

  const pressedVdoBtn = data => {
    if (data == 'paint') {
      setIsPaint(true);
      setPaused(true);
      const filterCommentsFrames = comments2.filter(
        d => d.frameId == frames[currentFrameId].FrameId,
      );

      setCommentsFrame(filterCommentsFrames);
      handleCaptureFullScreen();
    } else if (data == 'frameNotes') {
      setFrameNote(true);
    } else if (data == 'cancelFrameNotes') {
      setFrameNote(false);
    } else {
      setPaused(true);
      setIsPaint(false);
      setIsNotes(true);
    }
  };

  const cancelPaintHandle = () => {
    setIsPaint(false);
    setIsNotes(false);
  };

  const onPressedColor = data => {
    setSelectedColor(data);
    if (data == 'eraser') {
      setSelectedShape(5);
    }
    if (data != 'eraser' && selectedShape == 5) {
      setSelectedShape(1);
    }
  };

  const handleFullScreen = () => {
    // setTimeout(() => {
    //   handleCaptureFullScreen();
    // }, 2000);
    if (fullScreen) {
      Orientation.lockToPortrait();
      setFullScreen(false);
    } else {
      Orientation.lockToLandscape();
      setFullScreen(true);
    }
  };

  const updateFrameImage = async () => {
    // console.log(
    //   'updated frame image',
    //   frames[currentFrameId].FrameId,
    //   frames[currentFrameId].FrameImageUrl,
    // );

    const base64 = await captureRef(captureRefWrapper, {
      format: 'png',
      quality: 0.9,
      result: 'base64',
    });

    const base64String = `data:image/png;base64,${base64}`;

    setBase64Data(base64String);
    setIsBaseImage(true);

    setTimeout(() => {
      setIsBaseImage(false);
      setIsCapture(false);
    }, 3000);

    const form = new FormData();
    form.append('FrameId', frames[currentFrameId].FrameId);
    form.append('Content', base64String);
    form.append('Fileurl', frames[currentFrameId].FrameImageUrl);
    form.append('VideoId', videos[currentVdoId].VideoId);

    const response = await UpdateFrameImageAPI(form);

    console.log('response@1', response);
  };

  const renderCanvas = useMemo(() => {
    return isPaint && !frameNote ? (
      <DrawingCanvas
        color={selectedColor}
        mode={selectedShape}
        isCapture={isCapture}
        fullScreen={fullScreen}
        handleFullScreen={handleFullScreen}
        updateFrameImage={updateFrameImage}
        inst={inst}
      />
    ) : null;
  }, [
    selectedColor,
    isPaint,
    selectedShape,
    isCapture,
    frameNote,
    fullScreen,
    inst,
  ]);

  const pressedShape = data => {
    setSelectedShape(data);
    if (selectedColor == 'eraser') {
      setSelectedColor('red');
    }
  };

  const onTouchInVideo = () => {
    console.log('called');
    setIsVideoBtm(prev => !prev);
  };

  const pressedBackBtn = () => {
    if (fullScreen) {
      Orientation.lockToPortrait();
      setFullScreen(false);
    } else {
      setFrameNote(false);
      if (isPaint || isNotes) {
        cancelPaintHandle();
        getCommentsByVideo();
      } else {
        goBackhandle();
      }
    }
  };

  const onPressedEdit = data => {
    // console.log('data', data);
    setSelectedTag(data);
    setIsModalVisible(true);
  };

  const onChangeTextTagHandle = (text, id) => {
    let newList = selectedTag == 'left' ? [...metaData] : [...metaData2];

    // console.log('n', newList);

    newList[id].value = text;

    selectedTag == 'left' ? setMetaData(newList) : setMetaData2(newList);
  };

  const pressedSave = async () => {
    const fullData = metaData.concat(metaData2);

    const transformed = fullData.map(item => ({[item.key]: item.value}));

    const responseEdit = await postVideoTags(
      transformed,
      videos[currentVdoId].VideoId,
    );

    if (responseEdit != 'Error') {
      // console.log('res', responseEdit);

      if (responseEdit.Message == 'Request successful') {
        setIsModalVisible(false);
        setMessage('Saved successfully');
        setIsToastHide(false);
      } else {
        setIsModalVisible(false);
        setMessage('Failed to save');
        setIsToastHide(false);
      }
    } else {
      console.log('resError', responseEdit);
      setIsModalVisible(false);
      setMessage('Failed to save');
      setIsToastHide(false);
    }
  };

  const handleCaptureFullScreen = async () => {
    try {
      setIsCapture(true);
      // setIsBuffering(true);
      const base64 = await captureRef(captureRefWrapper, {
        format: 'png',
        quality: 0.9,
        result: 'base64',
      });
      const base64String = `data:image/png;base64,${base64}`;
      setBase64Data(base64String);
      setIsBaseImage(true);
      setTimeout(() => {
        setIsBaseImage(false);
        setIsCapture(false);
      }, 3000);
      const form = new FormData();
      form.append('VideoId', videos[currentVdoId].VideoId);
      form.append('Content', base64String);
      form.append('Frametime', duration);
      // console.log('data', data);
      // const responseFrame = await CreateNewFrameAPI(form);
      // if (responseFrame != 'Error') {
      //   const data = {
      //     FrameId: responseFrame?.Data?.FrameId,
      //     VideoId: videos[currentVdoId].VideoId,
      //     FrameTime: duration,
      //     FrameImageUrl: responseFrame?.Data?.FrameImageUrl,
      //   };
      //   setFrames([...frames, data]);
      //   setCurrentFrameId(prev => prev + 1);
      //   setIsBuffering(false);
      // } else {
      //   setIsBuffering(false);
      // }
      // console.log('Captured:', base64String.slice(0, 100));
    } catch (err) {
      console.log('captureRef error:', err);
      setIsBuffering(false);
    }
  };

  const pressedFrame = useCallback(
    (item, index) => {
      // console.log('item', item, index);
      setCurrentFrameId(index);

      const filterFrames = comments2.filter(
        d => d.frameId == frames[index].FrameId,
      );

      setCommentsFrame(filterFrames);
    },
    [currentFrameId, commentsFrame],
  );

  const onPressedBottomBtn = id => {
    // console.log('id', id);
    // UNDO
    if (id == 1) {
      setInst('undo');
      setIsCapture(!isCapture);
    }
    // REDO
    else if (id == 2) {
      setInst('redo');
      setIsCapture(!isCapture);
    } else if (id == 4) {
      setFullScreen(!fullScreen);
      !fullScreen
        ? Orientation.lockToLandscape()
        : Orientation.lockToPortrait();
    }
    // CANCEL ALL DRAWING SHAPES
    else {
      setInst('clean');
      setIsCapture(!isCapture);
    }
  };

  const updateNotes = () => {
    getCommentsByVideo();
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <GestureHandlerRootView style={{flex: 1}}>
        <StatusBar
          backgroundColor={bgColor.coloured}
          hidden={fullScreen ? true : false}
        />
        <GestureDetector gesture={composedGesture}>
          <Animated.View
            ref={captureRefWrapper}
            // onTouchStart={onTouchInVideo}
            style={[styles.videoContainer, animatedStyle]}
            collapsable={false}>
            <Video
              resizeMode={fullScreen ? 'contain' : 'cover'}
              source={{
                uri: videos[currentVdoId]?.VideoURL,
              }}
              ref={videoRef}
              style={styles.videoStyle}
              // controls
              //   fullscreen={true}
              paused={paused}
              onLoadStart={e => onLoadStartHandle(e)}
              onLoad={e => onLoadHandle(e)}
              onPlaybackStateChanged={e => playBackStateHandle(e)}
              onBuffer={e => onBufferHandle(e)}
              onProgress={e => onProgress(e)}
              onSeek={e => onSeek(e)}
              onEnd={() => onEnd()}
              //   muted={isMute}
              onError={e => onErrorHandle(e)}
              //   repeat={true}
              rate={currentSpeed}
            />
            <Pressable
              style={StyleSheet.absoluteFill}
              onPress={() => onTouchInVideo()}></Pressable>
            {isPaint ? (
              <ImageBackground
                style={{width: '100%', height: '100%', position: 'absolute'}}
                source={{uri: frames[currentFrameId]?.FrameImageUrl}}
              />
            ) : null}
            {renderCanvas}
          </Animated.View>
        </GestureDetector>
        {isVdoBtm && !isPaint && !isNotes && !fullScreen ? (
          <VideoListTop
            videos={videos}
            currentVdoId={currentVdoId}
            pressedVideoTop={id => setCurrentVdoId(id)}
            fullScreen={fullScreen}
          />
        ) : isVdoBtm && isPaint && !isNotes && !fullScreen ? (
          <FramesList
            frames={frames}
            currentFrameId={currentFrameId}
            pressedFrame={(item, id) => pressedFrame(item, id)}
            fullScreen={fullScreen}
          />
        ) : null}

        {/* Back Button */}

        <Pressable
          onPress={pressedBackBtn}
          style={{
            width: '10%',
            height: '10%',
            alignItems: 'center',
            justifyContent: 'center',
            left: !fullScreen ? WD(2) : WD(10),
            position: 'absolute',
            top: !fullScreen ? HT(0) : HT(3),
            zIndex: 10,
          }}>
          {!isPaint && !isNotes ? (
            <Image
              resizeMode="contain"
              style={{
                width: '60%',
                height: '60%',
                transform: [{rotate: '90deg'}],
                tintColor: bgColor.white,
              }}
              source={require('../../../Assets/Images/down-arrow.png')}
            />
          ) : (
            <Image
              resizeMode="contain"
              style={{
                width: '60%',
                height: '60%',
                tintColor: bgColor.white,
              }}
              source={require('../../../Assets/Video/cancel.png')}
            />
          )}
        </Pressable>

        {!isPaint && !isNotes && isVdoBtm ? (
          <>
            <VdoBtn
              left={null}
              right={!fullScreen ? WD(3) : WD(10)}
              image={require('../../../Assets/Video/pen.png')}
              onPress={() => pressedVdoBtn('paint')}
              top={!fullScreen ? HT(53) : HT(10)}
              isMsg={false}
            />
            <VdoBtn
              left={null}
              right={!fullScreen ? WD(3) : WD(10)}
              image={require('../../../Assets/Video/notes.png')}
              onPress={() => pressedVdoBtn('notes')}
              top={!fullScreen ? HT(60) : HT(20)}
              isMsg={true}
              commentsLength={comments.length}
            />
          </>
        ) : null}

        {isPaint && !frameNote ? (
          <VdoBtn
            left={null}
            right={!fullScreen ? WD(3) : WD(30)}
            image={require('../../../Assets/Video/notes.png')}
            onPress={() => pressedVdoBtn('frameNotes')}
            top={!fullScreen ? HT(50) : HT(35)}
            isMsg={true}
            commentsLength={commentsFrame.length}
          />
        ) : isPaint && frameNote ? (
          <VdoBtn
            left={!fullScreen ? WD(3) : WD(10)}
            right={null}
            image={require('../../../Assets/Video/pen.png')}
            onPress={() => pressedVdoBtn('cancelFrameNotes')}
            top={!fullScreen ? HT(50) : HT(20)}
            isMsg={false}
            commentsLength={commentsFrame.length}
          />
        ) : null}

        {/* Tag view */}
        {!fullScreen && isVdoBtm && !isPaint && !isNotes ? (
          <>
            <TagCard
              width={WD(32)}
              height={HT(32)}
              br={WD(2)}
              right={null}
              left={WD(2)}
              top={HT(18)}
              editImage={require('../../../Assets/Images/edit.png')}
              metaData={metaData}
              thisOnly={['Speed', 'Length', 'Line', 'Deviation', 'Beehive']}
              onPress={() => onPressedEdit('left')}
            />

            <TagCard
              width={WD(32)}
              height={HT(32)}
              br={WD(2)}
              right={WD(2)}
              left={null}
              top={HT(18)}
              editImage={require('../../../Assets/Images/edit.png')}
              metaData={metaData2}
              thisOnly={['BatType', 'CreaseMoment', 'Stroke', 'ShotConnection']}
              onPress={() => onPressedEdit('right')}
            />
          </>
        ) : null}

        {/* Loading View */}
        {isBuffering ? <LoadingView /> : null}

        {/* Video Bottom View */}
        {!isPaint && !isNotes && isVdoBtm ? (
          <VideoBottomView
            currentTime={currentTime}
            duration={duration}
            pause={paused}
            onPress={data => onPressIcon(data)}
            onSlideStart={onSlideStart}
            onSlideComplete={onSlideComplete}
            onSlideValueChange={onSlideValueChange}
            currentSpeed={currentSpeed}
            zoomIn={zoomIn}
            fullScreen={fullScreen}
            videosLength={videos.length - 1}
            currentVdoId={currentVdoId}
          />
        ) : null}

        {isPaint && !frameNote ? (
          <ColorListView
            selectedColor={selectedColor}
            onPress={data => onPressedColor(data)}
            fullScreen={fullScreen}
          />
        ) : null}
        {isPaint && !frameNote ? (
          <ShapeListView
            selctedShape={selectedShape}
            onPress={data => pressedShape(data)}
            fullScreen={fullScreen}
          />
        ) : null}

        {isNotes || frameNote ? (
          <AudioRecorderButton
            videoId={videos[currentVdoId]?.VideoId}
            comments={!isPaint ? comments : commentsFrame}
            userId={userData?.userID}
            frames={frameNote ? true : false}
            frameId={isPaint ? frames[currentFrameId]?.FrameId : null}
            updateNotes={updateNotes}
          />
        ) : null}

        {isModalVisible ? (
          <TagsModal
            isModalVisible={isModalVisible}
            closeModal={() => setIsModalVisible(false)}
            currentTag={selectedTag == 'left' ? 'Bowler Tags' : 'Batter Tags'}
            currentTagList={selectedTag == 'left' ? metaData : metaData2}
            onChangeText={(text, id) => onChangeTextTagHandle(text, id)}
            onSave={() => pressedSave()}
          />
        ) : null}

        <MessageToast
          message={message}
          isToastHide={isToastHide}
          toast={() => setIsToastHide(true)}
        />

        {isPaint && !frameNote ? (
          <CanvasBottomView
            onPress={id => onPressedBottomBtn(id)}
            fullScreen={fullScreen}
          />
        ) : null}

        {/* {base64Data && isBaseImage ? (
          <>
            <Image
              resizeMode="contain"
              source={{uri: base64Data}}
              style={{
                width: 250,
                height: 250,
                borderRadius: 10,
                position: 'absolute',
                bottom: HT(20),
                left: WD(20),
              }}
            />
          </>
        ) : null} */}
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  videoStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  slider: {
    position: 'absolute',
    bottom: HT(1),
    width: WD(90),
    alignSelf: 'center',

    // backgroundColor: 'red',
  },
  videoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: bgColor.black,
  },
  video: {
    width: '100%',
    height: '100%',
  },
});

export default VideoMain;

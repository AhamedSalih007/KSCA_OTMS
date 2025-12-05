import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
  Pressable,
  Image,
  TextInput,
  FlatList,
  StyleSheet,
} from 'react-native';
import {Recorder, Player} from '@react-native-community/audio-toolkit';
import Slider from '@react-native-community/slider';
import {HT, WD} from '../../Constant/Dimensions';
import {bgColor} from '../../Constant/Fonts&Colors';
import {convertSecondsToMinutes} from '../math';
import {parseDotNetDate} from '../../Utils/DateTime';
import CommentText from './CommentText';
import {saveCommentsAPI} from '../../API/CoachAPI';
import RNFS from 'react-native-fs';
import moment from 'moment';

export default function AudioRecorderButton({
  comments,
  videoId,
  userId,
  frames,
  frameId,
  updateNotes,
}) {
  // console.log('frameId', frameId);

  const recorderRef = useRef(null);
  const playerRef = useRef(null);
  const audioPlayRef = useRef(null);
  const flatListRef = useRef(null);
  const timerRef = useRef(null);
  const startSoundRef = useRef(null);

  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [filePath, setFilePath] = useState('');
  const [recordingTime, setRecordingTime] = useState(0);
  const [notes, setNotes] = useState(comments);
  const [currentPlayingId, setCurrentPlayingId] = useState(null);
  const [text, setText] = useState('');

  useEffect(() => {
    const player = new Player('start.mp3', {autoDestroy: false});

    player.prepare(err => {
      if (err) console.log('Preload error:', err);
      else console.log('Start sound preloaded');
    });

    startSoundRef.current = player;

    return () => {
      player.destroy();
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({animated: true});
    }, 100);
    return () => {
      playerRef.current?.destroy();
      recorderRef.current?.destroy();
    };
  }, []);

  useEffect(() => {
    setNotes(comments);
  }, [comments, frameId]);

  const playStartSound = isRecording => {
    const player = startSoundRef.current;

    if (!player) {
      console.log('Start sound not loaded yet');
      return;
    }

    player.play(err => {
      if (err) {
        console.log('Error playing start sound:', err);
      }

      if (isRecording) {
        onStartRecord();
      } else {
        onStopRecord();
      }
    });
  };

  const requestPermission = async () => {
    if (Platform.OS !== 'android') return true;
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  };

  // Start Recording
  const onStartRecord = async () => {
    const ok = await requestPermission();
    if (!ok) return;

    const filename = `voice_${Date.now()}.m4a`;

    // Build full path for this platform
    const fullPath =
      Platform.OS === 'ios'
        ? `${RNFS.CachesDirectoryPath}/${filename}`
        : `${RNFS.DocumentDirectoryPath}/${filename}`;

    // console.log('FULL PATH (start):', fullPath);

    const rec = new Recorder(filename, {
      bitrate: 128000,
      channels: 1,
      sampleRate: 44100,
      quality: 'high',
      format: 'aac',
    });

    rec.record(err => {
      if (err) {
        console.error('Recording error:', err);
        return;
      }

      console.log('Recording started');

      recorderRef.current = rec;

      // Save BOTH filename + fullPath
      setFilePath(fullPath);

      setIsRecording(true);
      setRecordingTime(0);

      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    });
  };

  // Stop Recording
  const onStopRecord = async () => {
    if (recorderRef.current) {
      recorderRef.current.stop(async err => {
        if (err) {
          console.error('Stop error:', err);
          return;
        }

        console.log('Recording stopped');

        const path = recorderRef.current._path;
        console.log('Recording saved at:', path);

        const fullPath = recorderRef.current.fsPath;
        console.log('REAL FILE PATH:', fullPath);

        // Push new item into array
        setNotes(prev => [
          ...prev,
          {
            id: Date.now().toString(),
            path,
            type: 'audio',
            time: moment().format('lll'),
          },
        ]);
        setIsRecording(false);

        // Stop the recording timer
        if (timerRef.current) clearInterval(timerRef.current);

        console.log('filepath', filePath);

        try {
          const base64Audio = await RNFS.readFile(fullPath, 'base64');
          // console.log('BASE64 AUDIO:', base64Audio);

          const data = [
            {
              content: `data:audio/aac;base64,${base64Audio}`,
              duration: 0,
              timestamp: Date.now(),
              type: 'audio',
            },
          ];

          await saveCommentsAPI(data, videoId, userId, frameId);
          updateNotes();

          // You can now upload it to your API:
          // await uploadBase64Audio(base64Audio);
        } catch (e) {
          console.error('Base64 conversion error:', e);
        }

        // Wait briefly to ensure the file is finalized
        setTimeout(() => {
          const newPlayer = new Player(filePath, {autoDestroy: true}).prepare(
            prepareErr => {
              if (prepareErr) {
                console.log('Duration check error:', prepareErr);
              } else {
                const totalDuration = Math.max(newPlayer.duration / 1000, 0);
                console.log('Recorded Duration (sec):', totalDuration);
                setDuration(totalDuration);
              }
            },
          );
        }, 2000); // small delay for iOS file write
      });
    }
  };

  const handlePlayPause = item => {
    console.log('called ad', item);
    if (!item.path) return;

    const player = playerRef.current;

    // 🟡 CASE 1: Same audio currently playing → Pause it
    if (currentPlayingId === item.id && isPlaying) {
      player?.pause();
      setIsPlaying(false);
      if (audioPlayRef.current) clearInterval(audioPlayRef.current);
      console.log('⏸️ Paused:', item.id);
      return;
    }

    // 🟢 CASE 2: Same audio was paused → Resume from same position
    if (currentPlayingId === item.id && !isPlaying && player) {
      console.log('▶️ Resuming playback at', player.currentTime);
      startPlayback(); // resume without recreating
      return;
    }

    // 🔴 CASE 3: Different audio → Stop and destroy existing player
    if (player) {
      player.stop();
      player.destroy();
      if (audioPlayRef.current) clearInterval(audioPlayRef.current);
    }

    setDuration(0);
    setCurrentTime(0);
    setCurrentPlayingId(item.id);

    // Create new player for the new item
    const newPlayer = new Player(item.path, {autoDestroy: false});

    newPlayer.prepare(err => {
      if (err) {
        console.log('Prepare error:', err);
        return;
      }

      console.log('✅ Player ready, starting new audio');
      playerRef.current = newPlayer;
      startPlayback();
    });
  };

  const startPlayback = () => {
    const player = playerRef.current;
    if (!player) return;

    player.play(err => {
      if (err) {
        console.log('Play error:', err);
        return;
      }

      setIsPlaying(true);
      console.log('xPlaying from position:', player.currentTime);

      // Clear any previous timers
      if (audioPlayRef.current) clearInterval(audioPlayRef.current);

      // Start progress updates
      audioPlayRef.current = setInterval(() => {
        const current = player.currentTime / 1000;
        const total = player.duration / 1000 || duration;
        setCurrentTime(current);
        setDuration(total);
      }, 500);

      player.on('ended', () => {
        console.log('Playback ended');
        setIsPlaying(false);
        clearInterval(audioPlayRef.current);
        setCurrentTime(0);
        setCurrentPlayingId(null);
      });
    });
  };

  // Format time as 00:00
  const formatTime = sec => {
    const m = Math.floor(sec / 60)
      .toString()
      .padStart(2, '0');
    const s = Math.floor(sec % 60)
      .toString()
      .padStart(2, '0');
    return `${m}:${s}`;
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const micPress = data => {
    if (data == 'In') {
      setIsRecording(true);
      playStartSound(true);
    } else {
      setIsRecording(false);
      playStartSound(false);
    }
  };

  const onSlidingComplete = value => {
    const player = playerRef.current;
    if (!player) return;

    player.seek(value * 1000);

    setCurrentTime(value);
  };

  const renderItem = (item, index) => {
    const playingThis = currentPlayingId === item.id;
    if (item.type == 'audio') {
      const durationThis = item.duration ? item.duration : duration;
      return (
        <View
          style={{
            width: WD(60),
            height: HT(7),
            alignItems: 'center',
            justifyContent: 'center',
            //   position: 'absolute',
            //   bottom: 5,
            alignSelf: 'center',
            flexDirection: 'row',
            marginTop: HT(3),
          }}>
          <View
            style={{
              width: WD(60),
              height: HT(5),
              position: 'absolute',
              bottom: HT(4.5),
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
            }}>
            <Text style={{color: bgColor.white}}>{item.time}</Text>
          </View>
          {/* Overlay */}
          <View
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: bgColor.black,
              opacity: 0.6,
              borderRadius: WD(2),
              position: 'absolute',
            }}
          />

          <Pressable
            onPress={() => handlePlayPause(item)}
            style={{
              width: '25%',
              height: '100%',
              backgroundColor: bgColor.coloured,
              //   position: 'absolute',
              left: 0,
              alignItems: 'center',
              justifyContent: 'center',
              borderTopLeftRadius: WD(2),
              borderBottomLeftRadius: WD(2),
            }}>
            {isPlaying && playingThis ? (
              <Image
                resizeMode="contain"
                style={{
                  width: '60%',
                  height: '60%',
                  tintColor: bgColor.white,
                }}
                source={require('../../Assets/Video/pause.png')}
              />
            ) : (
              <Image
                resizeMode="contain"
                style={{
                  width: '60%',
                  height: '60%',
                  tintColor: bgColor.white,
                }}
                source={require('../../Assets/Video/play.png')}
              />
            )}
          </Pressable>

          <View
            style={{
              width: '75%',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Slider
              style={{width: '95%', right: WD(1), bottom: HT(0.1)}}
              minimumValue={0}
              maximumValue={playingThis ? duration : 0}
              value={playingThis ? currentTime : 0}
              //   onSlidingStart={onSlideStart}
              onSlidingComplete={onSlidingComplete}
              minimumTrackTintColor={bgColor.coloured}
              maximumTrackTintColor={'white'}
              tapToSeek={true}
              // onValueChange={onSliderValueChange}
              //   thumbTintColor={'white'}
              //   thumbTintColor="transparent"
            />
            {playingThis ? (
              <Text
                style={{
                  position: 'absolute',
                  bottom: HT(0.5),
                  right: WD(2),
                  color: bgColor.white,
                }}>
                {formatTime(Math.max(0, duration - currentTime))}
              </Text>
            ) : (
              <Text
                style={{
                  position: 'absolute',
                  bottom: HT(0.5),
                  right: WD(2),
                  color: bgColor.white,
                }}>
                {convertSecondsToMinutes(durationThis)}
              </Text>
            )}
          </View>
        </View>
      );
    }

    if (item.type == 'text') {
      return (
        <CommentText
          time={item.time}
          name={item.userName}
          text={item.text}
          avatar={require('../../Assets/Images/user.png')}
        />
      );
    }
  };

  const onSend = async () => {
    if (text == '') {
      alert('Please enter text');
    } else {
      const textData = {
        id: Date.now().toString(),
        type: 'text',
        path: null,
        text: text,
        time: moment().format('lll'),
      };

      const comments = [
        {
          content: text,
          Duration: duration,
          timestamp: Date.now(),
          Type: 'text',
        },
      ];

      await saveCommentsAPI(comments, videoId, userId, frameId);

      setNotes([...notes, textData]);
      setText('');
      updateNotes();
    }
  };

  return (
    <>
      <View
        style={{
          padding: 5,
          zIndex: 10,
          position: 'absolute',
          width: WD(70),
          height: frames ? HT(62) : HT(67),
          bottom: HT(18),
          right: 0,
          // backgroundColor: 'red',
        }}>
        <FlatList
          ref={flatListRef}
          data={notes}
          renderItem={({item, index}) => renderItem(item, index)}
          //   inverted={true}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'flex-end',
          }}
          onContentSizeChange={() =>
            flatListRef.current?.scrollToEnd({animated: true})
          }
          showsVerticalScrollIndicator={false}
        />
      </View>

      <View
        style={{
          width: WD(90),
          height: HT(12),
          alignSelf: 'center',
          position: 'absolute',
          bottom: HT(5),
          borderRadius: WD(2),
          overflow: 'hidden',
          alignItems: 'center',
        }}>
        {/* Overlay */}
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

        <Text style={{textAlign: 'center', color: bgColor.white, top: HT(1)}}>
          {isRecording ? `Recording... ${formatTime(recordingTime)}` : ''}
        </Text>

        <View
          style={{
            width: '90%',
            height: '50%',
            position: 'absolute',
            bottom: HT(2),
          }}>
          <View
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: bgColor.black,
              alignSelf: 'center',
              position: 'absolute',
              opacity: 0.5,
              borderRadius: WD(2),
              borderWidth: 1,
              borderColor: bgColor.white,
            }}
          />
        </View>

        <TextInput
          value={text}
          onChangeText={text => setText(text)}
          style={{
            width: '85%',
            height: '35%',
            bottom: HT(3),
            position: 'absolute',
            paddingHorizontal: WD(1),
            color: bgColor.white,
          }}
          placeholder="Type your text here"
          placeholderTextColor={bgColor.grey}
          selectionColor={bgColor.coloured}
        />

        {text == '' ? (
          <Pressable
            // onPressIn={() => micPress('In')}
            // onPressOut={() => micPress('Out')}
            onPress={isRecording ? () => micPress('Out') : () => micPress('In')}
            style={{
              width: '15%',
              height: '35%',
              alignItems: 'center',
              justifyContent: 'center',
              bottom: HT(3),
              position: 'absolute',
              right: WD(3.5),
            }}>
            <Image
              resizeMode="contain"
              style={{
                width: '80%',
                height: '80%',
                tintColor: isRecording ? bgColor.red : bgColor.white,
              }}
              source={require('../../Assets/Paint/mic.png')}
            />
          </Pressable>
        ) : (
          <Pressable
            onPress={onSend}
            style={{
              width: '15%',
              height: '35%',
              alignItems: 'center',
              justifyContent: 'center',
              bottom: HT(3),
              position: 'absolute',
              right: WD(3.5),
            }}>
            <Image
              resizeMode="contain"
              style={{width: '70%', height: '70%', tintColor: bgColor.white}}
              source={require('../../Assets/Paint/send.png')}
            />
          </Pressable>
        )}
      </View>
    </>
  );
}

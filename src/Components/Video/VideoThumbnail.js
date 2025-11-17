// VideoThumbnail.js
import React, {useEffect, useState} from 'react';
import {Image, ActivityIndicator, View} from 'react-native';
import {createThumbnail} from 'react-native-create-thumbnail';
import {bgColor} from '../../Constant/Fonts&Colors';
import {HT, WD} from '../../Constant/Dimensions';

export default function VideoThumbnail({
  url,
  width,
  height,
  playImgSize,
  videoId,
}) {
  const [thumb, setThumb] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    createThumbnail({
      url,
      timeStamp: 1000, // 1 second frame
      cacheName: `thumb_${videoId}`,
    })
      .then(res => {
        if (isMounted) {
          setThumb(res.path);
          setLoading(false);
        }
      })
      .catch(err => {
        console.log('Thumbnail Error:', err);
        setLoading(false);
      });

    return () => (isMounted = false);
  }, [url]);

  if (loading)
    return (
      <View
        style={{
          width,
          height,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: bgColor.grey,
            position: 'absolute',
            top: 0,
            borderTopLeftRadius: WD(2),
            borderTopRightRadius: WD(2),
          }}>
          <Image
            resizeMode="contain"
            style={{width: '10%', height: '80%', tintColor: bgColor.white}}
            source={require('../../Assets/Images/video.png')}
          />
          {/* <ActivityIndicator size="small" color={bgColor.black} /> */}
        </View>
      </View>
    );

  return (
    <>
      <Image
        resizeMode="stretch"
        source={{uri: thumb}}
        style={{
          width,
          height,
          borderTopLeftRadius: WD(2),
          borderTopRightRadius: WD(2),
        }}
      />
      <Image
        resizeMode="contain"
        source={require('../../Assets/Video/play.png')}
        style={{
          width: playImgSize,
          height: playImgSize,
          borderTopLeftRadius: WD(2),
          borderTopRightRadius: WD(2),
          position: 'absolute',
          alignSelf: 'center',
          top: HT(6.5),
          tintColor: bgColor.white,
        }}
      />
    </>
  );
}

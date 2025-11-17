import React from 'react';
import {FlatList, Image, Pressable, TouchableOpacity, View} from 'react-native';
import {HT, WD} from '../../Constant/Dimensions';
import {bgColor} from '../../Constant/Fonts&Colors';

const CanvasBottomView = ({onPress, fullScreen}) => {
  const buttonList = [
    {id: 1, image: require('../../Assets/Paint/undo.png')},
    {id: 2, image: require('../../Assets/Paint/redo.png')},
    {id: 3, image: require('../../Assets/Paint/clearAll.png')},
    {
      id: 4,
      image: !fullScreen
        ? require('../../Assets/Video/fullscreen.png')
        : require('../../Assets/Images/minimize.png'),
    },
  ];

  const renderItem = (item, index) => {
    return (
      <TouchableOpacity
        onPress={() => onPress(item.id)}
        style={{
          width: WD(8),
          height: HT(5),
          alignItems: 'center',
          justifyContent: 'center',
          alignSelf: 'center',
          marginHorizontal: WD(2),
        }}>
        <Image
          resizeMode="contain"
          style={{width: '80%', height: '80%', tintColor: bgColor.white}}
          source={item.image}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={{
        width: WD(48),
        height: HT(6),
        position: 'absolute',
        bottom: HT(3),
        borderRadius: WD(10),
        overflow: 'hidden',
        alignItems: 'center',
        alignSelf: 'center',
      }}>
      <View
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          backgroundColor: bgColor.black,
          opacity: 0.6,
        }}
      />

      <FlatList
        horizontal
        data={buttonList}
        renderItem={({item, index}) => renderItem(item, index)}
      />
    </View>
  );
};

export default CanvasBottomView;

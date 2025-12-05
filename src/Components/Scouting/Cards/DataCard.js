import React from 'react';
import {FlatList, Pressable, Text, View} from 'react-native';
import {HT, WD} from '../../../Constant/Dimensions';
import {bgColor, fontSize} from '../../../Constant/Fonts&Colors';

const DataCard = ({dataList, onPress}) => {
  const renderDataCard = (item, index) => {
    return (
      <Pressable
        onPress={() => onPress(item, index)}
        style={{
          width: WD(35),
          height: HT(11),
          backgroundColor: bgColor.white,
          elevation: 2,
          shadowColor: bgColor.grey,
          shadowOffset: {width: 0.5, height: 0.5},
          shadowOpacity: 0.4,
          marginHorizontal: WD(1.5),
          alignSelf: 'center',
          borderRadius: WD(2),
          left: WD(2),
          borderWidth: 1,
          borderColor: item.color,
        }}>
        <Text
          style={{
            position: 'absolute',
            left: WD(2),
            color: bgColor.grey,
            top: HT(1),
            textTransform: 'uppercase',
            width: '90%',
          }}>
          {item.title}
        </Text>
        <Text
          style={{
            position: 'absolute',
            left: WD(2),
            color: bgColor.black,
            top: HT(7),
            fontSize: fontSize.Medium,
            fontWeight: 'bold',
          }}>
          {item.value}
        </Text>
      </Pressable>
    );
  };

  return (
    <FlatList
      showsHorizontalScrollIndicator={false}
      horizontal
      data={dataList}
      renderItem={({item, index}) => renderDataCard(item, index)}
      ListFooterComponent={() => <View style={{width: WD(4)}} />}
    />
  );
};

export default DataCard;
